#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const egxRootCandidates = [
  process.env.EGX_ROOT,
  'D:\\Orderflow\\Projects\\ml\\markets\\egx',
  'D:\\stable\\egx'
].filter(Boolean);
const egxRoot = path.resolve(egxRootCandidates.find((candidate) => fs.existsSync(candidate)) || egxRootCandidates[0]);
const outPath = path.join(repoRoot, 'egx-live.json');

function readJson(relativePath, fallback) {
  const filePath = path.join(egxRoot, relativePath);
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

function readEquityChart() {
  const pythonCode = String.raw`
import json
import sys
from pathlib import Path

root = Path(sys.argv[1])

def thin(series, limit=1500):
    series = series.dropna()
    if series.empty:
        return []
    step = max(1, len(series) // limit)
    thinned = series.iloc[::step]
    if thinned.index[-1] != series.index[-1]:
        thinned = thinned._append(series.iloc[[-1]])
    return [{"d": str(idx.date()), "v": round(float(value), 6)} for idx, value in thinned.items()]

def read_nav():
    import pandas as pd
    path = root / "logs" / "backtest_equity.parquet"
    if not path.exists():
        return []
    df = pd.read_parquet(path)
    if "date" in df.columns:
        df = df.set_index(pd.to_datetime(df["date"]))
    else:
        df.index = pd.to_datetime(df.index)
    return thin(df["nav"])

def read_benchmark(equity_points):
    import pandas as pd
    if not equity_points:
        return []
    path = root / "data" / "processed" / "benchmarks" / "index30_official.parquet"
    if not path.exists():
        return []
    df = pd.read_parquet(path).sort_values("date")
    if df.empty:
        return []
    col = "total_return" if "total_return" in df.columns else "daily_return"
    eq = (1.0 + pd.to_numeric(df[col], errors="coerce").fillna(0.0)).cumprod()
    eq.index = pd.to_datetime(df["date"].values)
    start = pd.Timestamp(equity_points[0]["d"])
    end = pd.Timestamp(equity_points[-1]["d"])
    eq = eq[(eq.index >= start) & (eq.index <= end)]
    if not eq.empty and eq.index[-1] < end:
        eq = pd.concat([eq, pd.Series([eq.iloc[-1]], index=[end])])
    return thin(eq)

equity = read_nav()
payload = {
    "title": "منحنى رأس المال التراكمي — مصر EGX",
    "label": "المحفظة / النموذج الكمي",
    "benchmark_label": "EGX30 Official",
    "equity_points": equity,
    "benchmark_points": read_benchmark(equity),
}
print(json.dumps(payload, ensure_ascii=False))
`;

  try {
    const result = spawnSync(process.env.PYTHON || 'python', ['-c', pythonCode, egxRoot], {
      encoding: 'utf8',
      maxBuffer: 1024 * 1024 * 8
    });
    if (result.status !== 0 || !result.stdout.trim()) {
      if (result.stderr) console.warn(result.stderr.trim());
      return null;
    }
    const chart = JSON.parse(result.stdout);
    if (!Array.isArray(chart.equity_points) || chart.equity_points.length < 2) return null;
    return chart;
  } catch (error) {
    console.warn(`Could not read equity chart data: ${error.message}`);
    return null;
  }
}

const feed = readJson('data\\processed\\data_feed_status.json', {});
const picks = readJson('logs\\tomorrow_picks.json', {});
const backtest = readJson('logs\\backtest_full.json', {});
const dailyScan = readJson('logs\\backtest_daily_scan.json', {});
const chart = readEquityChart();
const sourceLabel = egxRoot.toLowerCase().includes('projects\\ml')
  ? 'egx-ml-dashboard-snapshot'
  : 'egx-stable-snapshot';

const portfolio = backtest.portfolio && typeof backtest.portfolio === 'object'
  ? backtest.portfolio
  : {};

const snapshot = {
  generated_at: new Date().toISOString(),
  source: sourceLabel,
  source_files: [
    'data/processed/data_feed_status.json',
    'logs/tomorrow_picks.json',
    'logs/backtest_full.json',
    'logs/backtest_daily_scan.json',
    'logs/backtest_equity.parquet',
    'data/processed/benchmarks/index30_official.parquet'
  ],
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
  note: 'EGX operational snapshot for research monitoring only. Not investment advice.'
};

fs.writeFileSync(outPath, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
console.log(`EGX live snapshot written: ${outPath}`);
