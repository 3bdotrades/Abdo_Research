#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const egxRoot = path.resolve(process.env.EGX_ROOT || 'D:\\stable\\egx');
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

const feed = readJson('data\\processed\\data_feed_status.json', {});
const picks = readJson('logs\\tomorrow_picks.json', {});
const backtest = readJson('logs\\backtest_full.json', {});
const dailyScan = readJson('logs\\backtest_daily_scan.json', {});

const portfolio = backtest.portfolio && typeof backtest.portfolio === 'object'
  ? backtest.portfolio
  : {};

const snapshot = {
  generated_at: new Date().toISOString(),
  source: 'egx-stable-snapshot',
  source_files: [
    'data/processed/data_feed_status.json',
    'logs/tomorrow_picks.json',
    'logs/backtest_full.json',
    'logs/backtest_daily_scan.json'
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
  note: 'EGX operational snapshot for research monitoring only. Not investment advice.'
};

fs.writeFileSync(outPath, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
console.log(`EGX live snapshot written: ${outPath}`);
