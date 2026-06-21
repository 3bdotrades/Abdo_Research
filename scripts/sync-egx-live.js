#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const mlRootEnv = process.env.ML_ROOT;
if (!mlRootEnv) {
  console.error('ML_ROOT is not set. Point it at your local ML project root, e.g. ML_ROOT=/path/to/ml node scripts/sync-egx-live.js');
  process.exit(1);
}
const mlRoot = path.resolve(mlRootEnv);
const marketsRoot = path.join(mlRoot, 'markets');
const outPath = path.join(repoRoot, 'egx-live.json');

const marketConfigs = [
  {
    slug: 'egx',
    name: 'مصر EGX',
    title: 'منحنى رأس المال التراكمي — مصر EGX',
    label: 'المحفظة / النموذج الكمي',
    benchmarkLabel: 'EGX30 Official'
  },
  {
    slug: 'saudi',
    name: 'تداول السعودية',
    title: 'منحنى رأس المال التراكمي — تداول السعودية',
    label: 'المحفظة / النموذج الكمي',
    benchmarkLabel: 'Saudi Index30 Official'
  },
  {
    slug: 'dubai',
    name: 'سوق دبي المالي',
    title: 'منحنى رأس المال التراكمي — سوق دبي المالي',
    label: 'المحفظة / النموذج الكمي',
    benchmarkLabel: 'Dubai Index30 Official'
  },
  {
    slug: 'abu-dhabi',
    name: 'سوق أبوظبي',
    title: 'منحنى رأس المال التراكمي — سوق أبوظبي',
    label: 'المحفظة / النموذج الكمي',
    benchmarkLabel: 'Abu Dhabi Index30 Official'
  },
  {
    slug: 'qatar',
    name: 'بورصة قطر',
    title: 'منحنى رأس المال التراكمي — بورصة قطر',
    label: 'المحفظة / النموذج الكمي',
    benchmarkLabel: 'QSE Index30 Official'
  },
  {
    slug: 'kuwait',
    name: 'بورصة الكويت',
    title: 'منحنى رأس المال التراكمي — بورصة الكويت',
    label: 'المحفظة / النموذج الكمي',
    benchmarkLabel: 'Kuwait Index30 Official'
  }
];

const primaryMarketSlug = 'egx';
const primaryMarketRoot = path.join(marketsRoot, primaryMarketSlug);

function readJsonFromRoot(root, relativePath, fallback) {
  const filePath = path.join(root, relativePath);
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    return fallback;
  }
}

function round(value, decimals = 4) {
  const number = Number(value);
  if (!Number.isFinite(number)) return null;
  const factor = 10 ** decimals;
  return Math.round(number * factor) / factor;
}

function compactList(value) {
  return Array.isArray(value)
    ? value.map((item) => String(item || '').trim()).filter(Boolean)
    : [];
}

function readMarketCurves() {
  const pythonCode = String.raw`
import json
import sys
from pathlib import Path

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

import pandas as pd

root = Path(sys.argv[1])
specs = json.loads(sys.argv[2])

def to_points(series):
    series = pd.to_numeric(series, errors="coerce").dropna().sort_index()
    if series.empty:
        return []
    return [[str(idx.date()), round(float(value), 6)] for idx, value in series.items()]

def read_nav(market_root):
    path = market_root / "logs" / "backtest_equity.parquet"
    if not path.exists():
        return [], {}
    df = pd.read_parquet(path)
    if "date" in df.columns:
        df = df.set_index(pd.to_datetime(df["date"]))
    else:
        df.index = pd.to_datetime(df.index)
    df = df.sort_index()
    nav = pd.to_numeric(df["nav"], errors="coerce").dropna()
    if nav.empty:
        return [], {}
    first = float(nav.iloc[0]) or 1.0
    last = float(nav.iloc[-1])
    return to_points(nav), {
        "start": str(nav.index[0].date()),
        "end": str(nav.index[-1].date()),
        "point_count": int(len(nav)),
        "latest_nav": round(last, 6),
        "total_return": round((last / first) - 1.0, 6),
    }

def read_benchmark(market_root, equity_points):
    if not equity_points:
        return []
    path = market_root / "data" / "processed" / "benchmarks" / "index30_official.parquet"
    if not path.exists():
        return []
    df = pd.read_parquet(path).sort_values("date")
    if df.empty:
        return []
    col = "total_return" if "total_return" in df.columns else "daily_return"
    eq = (1.0 + pd.to_numeric(df[col], errors="coerce").fillna(0.0)).cumprod()
    eq.index = pd.to_datetime(df["date"].values)
    start = pd.Timestamp(equity_points[0][0])
    end = pd.Timestamp(equity_points[-1][0])
    eq = eq[(eq.index >= start) & (eq.index <= end)]
    if not eq.empty and eq.index[-1] < end:
        eq = pd.concat([eq, pd.Series([eq.iloc[-1]], index=[end])])
    return to_points(eq)

payload = {}
for spec in specs:
    slug = spec["slug"]
    market_root = root / "markets" / slug
    equity, meta = read_nav(market_root)
    if len(equity) < 2:
        continue
    payload[slug] = {
        **meta,
        "equity_points": equity,
        "benchmark_points": read_benchmark(market_root, equity),
    }

print(json.dumps(payload, ensure_ascii=False))
`;

  try {
    const result = spawnSync(
      process.env.PYTHON || 'python',
      ['-c', pythonCode, mlRoot, JSON.stringify(marketConfigs.map(({ slug }) => ({ slug })))],
      {
        encoding: 'utf8',
        env: {
          ...process.env,
          PYTHONIOENCODING: 'utf-8',
          PYTHONUTF8: '1'
        },
        maxBuffer: 1024 * 1024 * 32
      }
    );
    if (result.status !== 0 || !result.stdout.trim()) {
      if (result.stderr) console.warn(result.stderr.trim());
      return {};
    }
    return JSON.parse(result.stdout);
  } catch (error) {
    console.warn(`Could not read ML market curves: ${error.message}`);
    return {};
  }
}

function buildChart(config, rawChart) {
  if (!rawChart || !Array.isArray(rawChart.equity_points) || rawChart.equity_points.length < 2) {
    return null;
  }
  const backtest = readJsonFromRoot(path.join(marketsRoot, config.slug), 'logs\\backtest_full.json', {});
  const portfolio = backtest.portfolio && typeof backtest.portfolio === 'object'
    ? backtest.portfolio
    : {};
  return {
    slug: config.slug,
    name: config.name,
    title: config.title,
    label: config.label,
    benchmark_label: config.benchmarkLabel,
    start: rawChart.start || null,
    end: rawChart.end || backtest.end || null,
    point_count: Number(rawChart.point_count || rawChart.equity_points.length),
    equity_points: rawChart.equity_points,
    benchmark_points: rawChart.benchmark_points || [],
    metrics: {
      total_return: round(rawChart.total_return),
      cagr: round(portfolio.cagr),
      sharpe: round(portfolio.sharpe, 3),
      sortino: round(portfolio.sortino, 3),
      max_dd: round(portfolio.max_dd),
      calmar: round(portfolio.calmar, 3),
      vol: round(portfolio.vol),
      n_days: Number(backtest.n_days || rawChart.point_count || 0),
      trade_count: Number(backtest.fusion_trade_count || 0)
    }
  };
}

const rawCharts = readMarketCurves();
const charts = Object.fromEntries(
  marketConfigs
    .map((config) => [config.slug, buildChart(config, rawCharts[config.slug])])
    .filter(([, chart]) => chart)
);

const feed = readJsonFromRoot(primaryMarketRoot, 'data\\processed\\data_feed_status.json', {});
const picks = readJsonFromRoot(primaryMarketRoot, 'logs\\tomorrow_picks.json', {});
const backtest = readJsonFromRoot(primaryMarketRoot, 'logs\\backtest_full.json', {});
const dailyScan = readJsonFromRoot(primaryMarketRoot, 'logs\\backtest_daily_scan.json', {});
const chart = charts[primaryMarketSlug] || Object.values(charts)[0] || null;

const portfolio = backtest.portfolio && typeof backtest.portfolio === 'object'
  ? backtest.portfolio
  : {};

const snapshot = {
  generated_at: new Date().toISOString(),
  source: 'ml-market-dashboard-snapshot',
  source_files: [
    'markets/*/logs/backtest_equity.parquet',
    'markets/*/logs/backtest_full.json',
    'markets/*/data/processed/benchmarks/index30_official.parquet',
    'markets/egx/data/processed/data_feed_status.json',
    'markets/egx/logs/tomorrow_picks.json',
    'markets/egx/logs/backtest_daily_scan.json'
  ],
  available_markets: marketConfigs
    .filter((config) => charts[config.slug])
    .map((config) => ({
      slug: config.slug,
      name: config.name,
      point_count: charts[config.slug].point_count,
      start: charts[config.slug].start,
      end: charts[config.slug].end
    })),
  feed: {
    status: feed.status || 'UNKNOWN',
    latest_session: feed.latest_session || null,
    generated_at: feed.generated_at || null,
    market: feed.market || 'EGX',
    mode: feed.mode || null,
    symbols_total: Number(feed.symbols_total || 0),
    symbols_ok: Number(feed.symbols_ok || 0),
    failed_symbols: compactList(feed.failed_symbols),
    stale_vs_latest_symbols: compactList(feed.stale_vs_latest_symbols)
  },
  live: {
    available: Boolean(picks.available),
    decided_at: picks.decided_at || null,
    fire_at_next_close: picks.fire_at_next_close || null,
    current_holdings: compactList(picks.current_holdings),
    rebalance_targets: compactList(picks.rebalance_targets),
    rebalance_signal_day: picks.rebalance_signal_day || null,
    daily_scan_targets: compactList(picks.daily_scan_targets),
    notes: picks.notes || ''
  },
  portfolio: {
    cagr: round(portfolio.cagr),
    sharpe: round(portfolio.sharpe, 3),
    sortino: round(portfolio.sortino, 3),
    max_dd: round(portfolio.max_dd),
    calmar: round(portfolio.calmar, 3),
    vol: round(portfolio.vol),
    end: backtest.end || null,
    n_days: Number(backtest.n_days || 0),
    fusion_trade_count: Number(backtest.fusion_trade_count || 0)
  },
  strategy: {
    mode: backtest.mode || null,
    max_positions: Number(backtest.max_positions || 0),
    sector_cap: Number(backtest.sector_cap || 0),
    rebalance_every: Number(backtest.rebalance_every || 0),
    trailing_stop_pct: round(backtest.trailing_stop_pct),
    breakeven_trigger: round(backtest.breakeven_trigger),
    range_pctile_blend: round(backtest.range_pctile_blend),
    daily_scan_enabled: Boolean(dailyScan.enabled)
  },
  health: {
    status: feed.status || 'UNKNOWN',
    ok_ratio: feed.symbols_total ? round(Number(feed.symbols_ok || 0) / Number(feed.symbols_total), 4) : null,
    failed_count: compactList(feed.failed_symbols).length,
    stale_count: compactList(feed.stale_vs_latest_symbols).length
  },
  chart,
  charts,
  note: 'ML market snapshots for research monitoring only. Curves are read from local ML outputs and are not investment advice.'
};

fs.writeFileSync(outPath, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
console.log(`ML market snapshot written: ${outPath}`);
