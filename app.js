/* 
  =========================================
  Platform: أبحاث كمية (النموذج الكمي)
  File: app.js
  Purpose: Fully Separated Multi-Market Experience & Vercel Optimization
  =========================================
*/

document.addEventListener('DOMContentLoaded', () => {
  // --- Portal Market Selector Configuration & State ---
  let activeMarket = 'saudi'; // Default localized market on entry
  let performanceMarket = 'egx'; // Default chart source mirrors the local ML dashboard
  let currentCurrency = 'local'; // 'local' or 'usd' for Backtester
  let currentPeriod = 'ALL'; // Default chart period mirrors the ML dashboard
  let currentScale = 'log'; // Log keeps long-run NAV curves readable
  let liveEquityChart = null;
  let liveEquityCharts = {};

  const marketDetails = {
    saudi: {
      name: 'السعودية',
      indexName: 'مؤشر تاسي (TASI)',
      chartTitle: 'منحنى نمو رأس المال التراكمي - السوق السعودي',
      return: '+312.4%',
      sharpe: '2.42',
      drawdown: '-5.8%',
      winrate: '73.5%',
      indexReturn: 42.5,
      localPriceHtml: 'ما يعادل <b>334 ر.س</b> شهرياً',
      local: {
        currency: 'ر.س',
        min: 10000,
        max: 1000000,
        default: 50000,
        step: 10000,
        limitsHtml: `
          <span>10,000 ر.س</span>
          <span>500,000 ر.س</span>
          <span>1,000,000 ر.س</span>
        `,
        profitLabel: 'الأثر التقديري على المحفظة بالريال السعودي',
        totalLabel: 'القيمة التقديرية للمحفظة (SAR)'
      },
      usd: {
        currency: '$',
        min: 3000,
        max: 300000,
        default: 15000,
        step: 3000,
        limitsHtml: `
          <span>3,000 $</span>
          <span>150,000 $</span>
          <span>300,000 $</span>
        `,
        profitLabel: 'الأثر التقديري على المحفظة بالدولار',
        totalLabel: 'القيمة التقديرية للمحفظة ($)'
      },
      conservativeMult: 0.24,
      balancedMult: 0.42,
      aggressiveMult: 0.81
    },
    uae: {
      name: 'الإمارات',
      indexName: 'مؤشر سوق دبي (DFMGI)',
      chartTitle: 'منحنى نمو رأس المال التراكمي - السوق الإماراتي',
      return: '+268.2%',
      sharpe: '2.15',
      drawdown: '-6.9%',
      winrate: '69.8%',
      indexReturn: 34.8,
      localPriceHtml: 'ما يعادل <b>327 د.إ</b> شهرياً',
      local: {
        currency: 'د.إ',
        min: 10000,
        max: 1000000,
        default: 50000,
        step: 10000,
        limitsHtml: `
          <span>10,000 د.إ</span>
          <span>500,000 د.إ</span>
          <span>1,000,000 د.إ</span>
        `,
        profitLabel: 'الأثر التقديري على المحفظة بالدرهم الإماراتي',
        totalLabel: 'القيمة التقديرية للمحفظة (AED)'
      },
      usd: {
        currency: '$',
        min: 3000,
        max: 300000,
        default: 15000,
        step: 3000,
        limitsHtml: `
          <span>3,000 $</span>
          <span>150,000 $</span>
          <span>300,000 $</span>
        `,
        profitLabel: 'الأثر التقديري على المحفظة بالدولار',
        totalLabel: 'القيمة التقديرية للمحفظة ($)'
      },
      conservativeMult: 0.22,
      balancedMult: 0.38,
      aggressiveMult: 0.74
    },
    egypt: {
      name: 'مصر',
      indexName: 'مؤشر البورصة المصرية (EGX30)',
      chartTitle: 'منحنى نمو رأس المال التراكمي - البورصة المصرية',
      return: '+485.6%',
      sharpe: '1.95',
      drawdown: '-11.2%',
      winrate: '66.4%',
      indexReturn: 92.6,
      localPriceHtml: 'ما يعادل <b>4,380 ج.م</b> شهرياً',
      local: {
        currency: 'ج.م',
        min: 50000,
        max: 5000000,
        default: 200000,
        step: 50000,
        limitsHtml: `
          <span>50,000 ج.م</span>
          <span>2,500,000 ج.م</span>
          <span>5,000,000 ج.م</span>
        `,
        profitLabel: 'الأثر التقديري على المحفظة بالجنيه المصري',
        totalLabel: 'القيمة التقديرية للمحفظة (EGP)'
      },
      usd: {
        currency: '$',
        min: 1000,
        max: 100000,
        default: 5000,
        step: 1000,
        limitsHtml: `
          <span>1,000 $</span>
          <span>50,000 $</span>
          <span>100,000 $</span>
        `,
        profitLabel: 'الأثر التقديري على المحفظة بالدولار',
        totalLabel: 'القيمة التقديرية للمحفظة ($)'
      },
      conservativeMult: 0.35,
      balancedMult: 0.58,
      aggressiveMult: 1.15
    },
    qatar: {
      name: 'قطر',
      indexName: 'مؤشر بورصة قطر (QE Index)',
      chartTitle: 'منحنى نمو رأس المال التراكمي - بورصة قطر',
      return: '+214.8%',
      sharpe: '2.08',
      drawdown: '-6.5%',
      winrate: '68.2%',
      indexReturn: 25.4,
      localPriceHtml: 'ما يعادل <b>324 ر.ق</b> شهرياً',
      local: {
        currency: 'ر.ق',
        min: 10000,
        max: 1000000,
        default: 50000,
        step: 10000,
        limitsHtml: `
          <span>10,000 ر.ق</span>
          <span>500,000 ر.ق</span>
          <span>1,000,000 ر.ق</span>
        `,
        profitLabel: 'الأثر التقديري على المحفظة بالريال القطري',
        totalLabel: 'القيمة التقديرية للمحفظة (QAR)'
      },
      usd: {
        currency: '$',
        min: 3000,
        max: 300000,
        default: 15000,
        step: 3000,
        limitsHtml: `
          <span>3,000 $</span>
          <span>150,000 $</span>
          <span>300,000 $</span>
        `,
        profitLabel: 'الأثر التقديري على المحفظة بالدولار',
        totalLabel: 'القيمة التقديرية للمحفظة ($)'
      },
      conservativeMult: 0.20,
      balancedMult: 0.35,
      aggressiveMult: 0.68
    },
    kuwait: {
      name: 'بورصة الكويت',
      indexName: 'مؤشر السوق الأول (BKP)',
      chartTitle: 'منحنى نمو رأس المال التراكمي - بورصة الكويت',
      return: '+184.2%',
      sharpe: '2.24',
      drawdown: '-4.9%',
      winrate: '71.8%',
      indexReturn: 18.9,
      localPriceHtml: 'ما يعادل <b>27.4 د.ك</b> شهرياً',
      local: {
        currency: 'د.ك',
        min: 1000,
        max: 100000,
        default: 5000,
        step: 1000,
        limitsHtml: `
          <span>1,000 د.ك</span>
          <span>50,000 د.ك</span>
          <span>100,000 د.ك</span>
        `,
        profitLabel: 'الأثر التقديري على المحفظة بالدينار الكويتي',
        totalLabel: 'القيمة التقديرية للمحفظة (KWD)'
      },
      usd: {
        currency: '$',
        min: 3000,
        max: 300000,
        default: 15000,
        step: 3000,
        limitsHtml: `
          <span>3,000 $</span>
          <span>150,000 $</span>
          <span>300,000 $</span>
        `,
        profitLabel: 'الأثر التقديري على المحفظة بالدولار',
        totalLabel: 'القيمة التقديرية للمحفظة ($)'
      },
      conservativeMult: 0.18,
      balancedMult: 0.30,
      aggressiveMult: 0.58
    }
  };

  const performanceChartDetails = {
    egx: {
      name: 'مصر EGX',
      indexName: 'EGX30 Official',
      chartTitle: 'منحنى رأس المال التراكمي — مصر EGX'
    },
    saudi: {
      name: 'تداول السعودية',
      indexName: 'Saudi Index30 Official',
      chartTitle: 'منحنى رأس المال التراكمي — تداول السعودية'
    },
    dubai: {
      name: 'سوق دبي المالي',
      indexName: 'Dubai Index30 Official',
      chartTitle: 'منحنى رأس المال التراكمي — سوق دبي المالي'
    },
    'abu-dhabi': {
      name: 'سوق أبوظبي',
      indexName: 'Abu Dhabi Index30 Official',
      chartTitle: 'منحنى رأس المال التراكمي — سوق أبوظبي'
    },
    qatar: {
      name: 'بورصة قطر',
      indexName: 'QSE Index30 Official',
      chartTitle: 'منحنى رأس المال التراكمي — بورصة قطر'
    },
    kuwait: {
      name: 'بورصة الكويت',
      indexName: 'Kuwait Index30 Official',
      chartTitle: 'منحنى رأس المال التراكمي — بورصة الكويت'
    }
  };

  // --- Global Navigation & Scroll Effects ---
  const header = document.querySelector('header');
  const navLinks = document.querySelectorAll('.header-nav-pill a[href^="#"], .mobile-drawer-nav a[href^="#"]');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Active Link Highlighting on Scroll
    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('nav ul');
  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
      if (navList.style.display === 'flex') {
        navList.style.display = 'none';
      } else {
        navList.style.display = 'flex';
        navList.style.flexDirection = 'column';
        navList.style.position = 'absolute';
        navList.style.top = '100%';
        navList.style.left = '0';
        navList.style.right = '0';
        navList.style.background = 'var(--bg-secondary)';
        navList.style.padding = '20px';
        navList.style.borderBottom = '1px solid var(--border-color)';
        navList.style.gap = '16px';
      }
    });
  }

  // --- Dynamic Scroll Animation ---
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animateElements.forEach(el => scrollObserver.observe(el));

  // --- Historical Equity Chart Data (Arab Markets General Benchmark) ---
  const chartData = {
    '1M': {
      labels: ['الأسبوع 1', 'الأسبوع 2', 'الأسبوع 3', 'الأسبوع 4'],
      model: [0, 6.2, 11.8, 16.5],
      sp500: [0, 0.8, -1.2, 1.5],
      dates: ['2026-04-20', '2026-04-27', '2026-05-04', '2026-05-11']
    },
    '3M': {
      labels: ['بداية مارس', 'منتصف مارس', 'نهاية مارس', 'منتصف أبريل', 'نهاية أبريل', 'منتصف مايو'],
      model: [0, 9.4, 15.1, 22.8, 30.6, 38.2],
      sp500: [0, 1.8, 2.5, 0.4, 1.1, 2.8],
      dates: ['2026-03-01', '2026-03-15', '2026-04-01', '2026-04-15', '2026-05-01', '2026-05-15']
    },
    '1Y': {
      labels: ['يونيو', 'أغسطس', 'أكتوبر', 'ديسمبر', 'فبراير', 'أبريل', 'مايو'],
      model: [0, 20.4, 45.2, 72.8, 98.4, 122.6, 142.4],
      sp500: [0, 3.1, -1.5, 6.2, 8.4, 10.5, 12.1],
      dates: ['2025-06', '2025-08', '2025-10', '2025-12', '2026-02', '2026-04', '2026-05']
    },
    'ALL': {
      labels: ['2023 Q1', '2023 Q3', '2024 Q1', '2024 Q3', '2025 Q1', '2025 Q3', '2026 Q2'],
      model: [0, 38.4, 88.5, 138.2, 198.4, 234.6, 284.6],
      sp500: [0, 6.2, 12.4, 15.1, 24.2, 19.5, 30.2],
      dates: ['2023-01', '2023-07', '2024-01', '2024-07', '2025-01', '2025-07', '2026-05']
    }
  };

  // --- SVG Chart Render Engine ---
  const svgElement = document.getElementById('performance-svg');
  const tooltip = document.getElementById('chart-tooltip');

  function currentPerformanceDetails() {
    return performanceChartDetails[performanceMarket] || performanceChartDetails.egx;
  }

  function createSvgNode(name, attrs) {
    const node = document.createElementNS('http://www.w3.org/2000/svg', name);
    Object.keys(attrs || {}).forEach((key) => node.setAttribute(key, attrs[key]));
    return node;
  }

  function getPeriodStart(points, period) {
    if (!points || points.length === 0 || period === 'ALL') return null;
    const last = new Date(points[points.length - 1].d + 'T00:00:00');
    const years = { '10Y': 10, '5Y': 5, '3Y': 3, '2Y': 2, '1Y': 1 };
    const months = { '3M': 3, '1M': 1 };
    if (years[period]) return new Date(last.getFullYear() - years[period], last.getMonth(), last.getDate());
    if (months[period]) return new Date(last.getFullYear(), last.getMonth() - months[period], last.getDate());
    return null;
  }

  function filterChartPoints(points, period) {
    if (!Array.isArray(points) || points.length === 0) return [];
    const start = getPeriodStart(points, period);
    if (!start) return points;
    const filtered = points.filter((point) => new Date(point.d + 'T00:00:00') >= start);
    return filtered.length > 1 ? filtered : points;
  }

  function normalizeChartPoints(points) {
    if (!Array.isArray(points) || points.length === 0) return [];
    const base = Number(points[0].v) || 1;
    return points.map((point) => ({
      d: point.d,
      raw: Number(point.v) || 0,
      n: ((Number(point.v) || 0) / base) * 100
    }));
  }

  function shortChartDate(value) {
    if (!value) return '';
    const date = new Date(value + 'T00:00:00');
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString('ar-EG', { month: 'short', year: 'numeric' });
  }

  function formatChartAxisValue(value) {
    if (!Number.isFinite(value)) return '';
    if (value >= 1000000000000) return (value / 1000000000000).toFixed(value >= 10000000000000 ? 0 : 1) + 'T';
    if (value >= 1000000000) return (value / 1000000000).toFixed(value >= 10000000000 ? 0 : 1) + 'B';
    if (value >= 1000000) return (value / 1000000).toFixed(value >= 10000000 ? 0 : 1) + 'M';
    if (value >= 1000) return (value / 1000).toFixed(value >= 10000 ? 0 : 1) + 'k';
    if (value >= 100) return value.toFixed(0);
    return value.toFixed(1);
  }

  function updateChartLabels(details, liveMode) {
    const chartTitle = document.getElementById('chart-main-title');
    const chartLegendModel = document.getElementById('chart-legend-model');
    const chartLegendIndex = document.getElementById('chart-legend-index');
    if (chartTitle) chartTitle.textContent = liveMode && liveEquityChart?.title ? liveEquityChart.title : details.chartTitle;
    if (chartLegendModel) chartLegendModel.textContent = liveMode ? (liveEquityChart?.label || 'المحفظة / النموذج الكمي') : 'النموذج الكمي';
    if (chartLegendIndex) chartLegendIndex.textContent = liveMode ? (liveEquityChart?.benchmark_label || 'EGX30 Official') : details.indexName;
  }

  function renderSyntheticChart(period) {
    if (!svgElement) return;
    svgElement.innerHTML = '';

    const details = currentPerformanceDetails();
    updateChartLabels(details, false);

    const data = chartData[period] || ((period === '5Y' || period === '3Y') ? chartData.ALL : chartData['1Y']);
    const width = svgElement.clientWidth || 800;
    const height = svgElement.clientHeight || 350;
    const padding = { top: 40, right: 60, bottom: 42, left: 60 };
    const usableWidth = width - padding.left - padding.right;
    const usableHeight = height - padding.top - padding.bottom;

    const scaleFactorModel = details.return / 284.6;
    const scaleFactorIndex = details.indexReturn / 30.2;
    const scaledModel = data.model.map((value) => value * scaleFactorModel);
    const scaledBenchmark = data.sp500.map((value) => value * scaleFactorIndex);
    const allValues = [...scaledModel, ...scaledBenchmark];
    const maxVal = Math.max(...allValues) * 1.15;
    const minVal = Math.min(...allValues) * 1.15;
    const valRange = maxVal - minVal || 1;
    const getX = (index) => padding.left + (index / Math.max(data.labels.length - 1, 1)) * usableWidth;
    const getY = (value) => padding.top + usableHeight - ((value - minVal) / valRange) * usableHeight;

    drawChartScaffold({
      width,
      height,
      padding,
      labels: data.labels,
      minVal,
      maxVal,
      formatY: (value) => (value >= 0 ? '+' : '') + value.toFixed(1) + '%',
      getX,
      getY
    });

    drawLinePath(scaledBenchmark.map((value, index) => ({ x: getX(index), y: getY(value) })), '#4b5563', true);
    drawAreaAndLine(scaledModel.map((value, index) => ({ x: getX(index), y: getY(value), value, label: data.dates[index] })), getY(minVal), details.indexName);
  }

  function drawChartScaffold(config) {
    const gridLinesGroup = createSvgNode('g', { stroke: 'rgba(148,163,184,0.16)', 'stroke-width': '1' });
    const gridCount = 5;
    const valRange = config.maxVal - config.minVal || 1;
    const axisValues = config.axisValues || Array.from({ length: gridCount + 1 }, (_, index) => (
      config.minVal + (index / gridCount) * valRange
    ));

    axisValues.forEach((value) => {
      const y = config.getY(value);
      gridLinesGroup.appendChild(createSvgNode('line', {
        x1: config.padding.left,
        y1: y,
        x2: config.width - config.padding.right,
        y2: y
      }));

      const text = createSvgNode('text', {
        x: config.padding.left - 12,
        y: y + 4,
        fill: '#94a3b8',
        'font-size': '10px',
        'font-family': 'Cairo',
        'text-anchor': 'end'
      });
      text.textContent = config.formatY(value);
      gridLinesGroup.appendChild(text);
    });

    config.labels.forEach((label, index) => {
      const x = config.getX(index);
      gridLinesGroup.appendChild(createSvgNode('line', {
        x1: x,
        y1: config.padding.top,
        x2: x,
        y2: config.height - config.padding.bottom
      }));

      const text = createSvgNode('text', {
        x,
        y: config.height - config.padding.bottom + 24,
        fill: '#94a3b8',
        'font-size': '11px',
        'font-family': 'Cairo',
        'text-anchor': 'middle'
      });
      text.textContent = label;
      gridLinesGroup.appendChild(text);
    });

    svgElement.appendChild(gridLinesGroup);
  }

  function drawLinePath(points, color, dashed) {
    if (!points.length) return;
    const path = points.map((point, index) => `${index ? 'L' : 'M'} ${point.x} ${point.y}`).join(' ');
    const line = createSvgNode('path', {
      d: path,
      fill: 'none',
      stroke: color,
      'stroke-width': dashed ? '2' : '3',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    });
    if (dashed) line.setAttribute('stroke-dasharray', '6 7');
    svgElement.appendChild(line);
  }

  function drawAreaAndLine(points, baselineY, benchmarkName) {
    if (!points.length) return;
    const defs = createSvgNode('defs');
    const linearGrad = createSvgNode('linearGradient', {
      id: 'chartGrad',
      x1: '0',
      y1: '0',
      x2: '0',
      y2: '1'
    });
    linearGrad.appendChild(createSvgNode('stop', {
      offset: '0%',
      'stop-color': '#16a34a',
      'stop-opacity': '0.24'
    }));
    linearGrad.appendChild(createSvgNode('stop', {
      offset: '100%',
      'stop-color': '#16a34a',
      'stop-opacity': '0'
    }));
    defs.appendChild(linearGrad);
    svgElement.appendChild(defs);

    const linePath = points.map((point, index) => `${index ? 'L' : 'M'} ${point.x} ${point.y}`).join(' ');
    const areaPath = [
      `M ${points[0].x} ${baselineY}`,
      ...points.map((point) => `L ${point.x} ${point.y}`),
      `L ${points[points.length - 1].x} ${baselineY}`,
      'Z'
    ].join(' ');

    svgElement.appendChild(createSvgNode('path', { d: areaPath, fill: 'url(#chartGrad)' }));
    const modelPath = createSvgNode('path', {
      d: linePath,
      fill: 'none',
      stroke: '#16a34a',
      'stroke-width': '3',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      filter: 'drop-shadow(0px 0px 7px rgba(22,163,74,0.32))'
    });
    svgElement.appendChild(modelPath);

    const step = Math.max(1, Math.floor(points.length / 6));
    points.forEach((point, index) => {
      if (index % step !== 0 && index !== points.length - 1) return;
      const circle = createSvgNode('circle', {
        cx: point.x,
        cy: point.y,
        r: '5',
        fill: '#08111b',
        stroke: '#16a34a',
        'stroke-width': '2'
      });
      circle.style.cursor = 'pointer';
      circle.addEventListener('mouseover', () => {
        circle.setAttribute('r', '8');
        if (!tooltip) return;
        tooltip.style.left = `${point.x}px`;
        tooltip.style.top = `${point.y - 12}px`;
        tooltip.style.display = 'block';
        tooltip.innerHTML = `
          <div style="font-weight: 700; color: #fff; margin-bottom: 4px;">${point.label || ''}</div>
          <div style="color: #22c55e;">المحفظة: ${point.value.toFixed(1)}</div>
          <div style="color: var(--text-muted);">${benchmarkName}</div>
        `;
      });
      circle.addEventListener('mouseout', () => {
        circle.setAttribute('r', '5');
        if (tooltip) tooltip.style.display = 'none';
      });
      svgElement.appendChild(circle);
    });
  }

  function renderLiveEquityChart(period) {
    if (!svgElement || !liveEquityChart || !Array.isArray(liveEquityChart.equity_points)) return false;
    const rawModel = filterChartPoints(liveEquityChart.equity_points, period);
    const rawBenchmark = filterChartPoints(liveEquityChart.benchmark_points || [], period);
    const model = normalizeChartPoints(rawModel);
    const benchmark = normalizeChartPoints(rawBenchmark);
    if (model.length < 2) return false;

    svgElement.innerHTML = '';
    const details = currentPerformanceDetails();
    updateChartLabels(details, true);

    const width = svgElement.clientWidth || 800;
    const height = svgElement.clientHeight || 350;
    const padding = { top: 40, right: 60, bottom: 44, left: 64 };
    const usableWidth = width - padding.left - padding.right;
    const usableHeight = height - padding.top - padding.bottom;
    const numericValues = [...model, ...benchmark].map((point) => point.n).filter(Number.isFinite);
    const values = currentScale === 'log' ? numericValues.filter((value) => value > 0) : numericValues;
    if (!values.length) return false;
    const lowRaw = Math.min(...values);
    const highRaw = Math.max(...values);
    const transformValue = (value) => currentScale === 'log'
      ? Math.log10(Math.max(value, 0.001))
      : value;
    const inverseValue = (value) => currentScale === 'log' ? (10 ** value) : value;
    const rawPad = (highRaw - lowRaw) * 0.08 || 8;
    const rawMinVal = currentScale === 'log'
      ? Math.max(1, lowRaw * 0.88)
      : Math.max(0, lowRaw - rawPad);
    const rawMaxVal = currentScale === 'log'
      ? highRaw * 1.08
      : highRaw + rawPad;
    const lowScaled = transformValue(rawMinVal);
    const highScaled = transformValue(rawMaxVal);
    const scaledPad = currentScale === 'log' ? 0 : ((highScaled - lowScaled) * 0.04 || 0.08);
    const minScaled = lowScaled - scaledPad;
    const maxScaled = highScaled + scaledPad;
    const minVal = inverseValue(minScaled);
    const maxVal = inverseValue(maxScaled);
    const start = new Date(model[0].d + 'T00:00:00');
    const end = new Date(model[model.length - 1].d + 'T00:00:00');
    const dateRange = end - start || 1;
    const getXByDate = (value) => padding.left + ((new Date(value + 'T00:00:00') - start) / dateRange) * usableWidth;
    const getY = (value) => {
      const scaled = transformValue(value);
      return padding.top + usableHeight - ((scaled - minScaled) / (maxScaled - minScaled || 1)) * usableHeight;
    };
    const labelIndexes = [0, 0.2, 0.4, 0.6, 0.8, 1]
      .map((ratio) => Math.min(model.length - 1, Math.round((model.length - 1) * ratio)));
    const labels = [...new Set(labelIndexes)].map((index) => shortChartDate(model[index].d));
    const axisValues = Array.from({ length: 6 }, (_, index) => (
      inverseValue(minScaled + (index / 5) * (maxScaled - minScaled))
    ));

    drawChartScaffold({
      width,
      height,
      padding,
      labels,
      minVal,
      maxVal,
      axisValues,
      formatY: formatChartAxisValue,
      getX: (index) => {
        const pointIndex = labelIndexes[index] ?? 0;
        return getXByDate(model[pointIndex].d);
      },
      getY
    });

    drawLinePath(benchmark.map((point) => ({ x: getXByDate(point.d), y: getY(point.n) })), '#b45309', true);
    drawAreaAndLine(
      model.map((point) => ({
        x: getXByDate(point.d),
        y: getY(point.n),
        value: point.n,
        label: point.d
      })),
      getY(minVal),
      liveEquityChart.benchmark_label || 'EGX30 Official'
    );
    return true;
  }

  function renderUnavailableChart() {
    if (!svgElement) return;
    svgElement.innerHTML = '';
    const details = currentPerformanceDetails();
    updateChartLabels(details, false);
    const width = svgElement.clientWidth || 800;
    const height = svgElement.clientHeight || 350;
    const text = createSvgNode('text', {
      x: width / 2,
      y: height / 2,
      fill: 'var(--text-muted)',
      'font-size': '14px',
      'font-family': 'Cairo',
      'text-anchor': 'middle'
    });
    text.textContent = 'لا يوجد منحنى حقيقي منشور لهذا السوق من ملفات ML.';
    svgElement.appendChild(text);
  }

  function renderChart(period) {
    if (!svgElement) return;
    liveEquityChart = liveEquityCharts[performanceMarket] || null;
    if (renderLiveEquityChart(period)) return;
    renderUnavailableChart();
  }

  async function loadLiveEquityChart() {
    try {
      const response = await fetch('egx-live.json?ts=' + Date.now(), { cache: 'no-store' });
      if (!response.ok) return;
      const data = await response.json();
      const charts = data && data.charts && typeof data.charts === 'object'
        ? data.charts
        : (data && data.chart ? { egx: data.chart } : {});
      liveEquityCharts = charts;
      if (!liveEquityCharts[performanceMarket] && liveEquityCharts.egx) {
        performanceMarket = 'egx';
      }
      const activePerformanceTab = document.querySelector(`.market-tab[data-market="${performanceMarket}"]`);
      if (activePerformanceTab) {
        applyPerformanceMarket(performanceMarket, activePerformanceTab);
      } else {
        renderChart(currentPeriod);
      }
    } catch (error) {
      console.warn('Live equity chart load failed:', error);
    }
  }

  // Bind chart period toggle buttons
  const tfBtns = document.querySelectorAll('.timeframe-btn');
  tfBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      tfBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentPeriod = btn.dataset.timeframe;
      renderChart(currentPeriod);
    });
  });

  const scaleBtns = document.querySelectorAll('.scale-btn');
  scaleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      scaleBtns.forEach((item) => item.classList.remove('active'));
      btn.classList.add('active');
      currentScale = btn.dataset.scale === 'linear' ? 'linear' : 'log';
      renderChart(currentPeriod);
    });
  });

  loadLiveEquityChart();

  window.addEventListener('resize', () => renderChart(currentPeriod));

  // --- Interactive Portfolio Backtester with Dynamic Settings ---
  const capitalInput = document.getElementById('capital-slider');
  const capitalVal = document.getElementById('capital-val');
  const riskRadios = document.querySelectorAll('input[name="risk-profile"]');
  const simCard = document.getElementById('sim-results-panel');

  const resultGains = document.getElementById('sim-result-gains');
  const resultDrawdown = document.getElementById('sim-result-drawdown');
  const resultSharpe = document.getElementById('sim-result-sharpe');
  const resultWinrate = document.getElementById('sim-result-winrate');
  const resultTotalReturn = document.getElementById('sim-result-total-return');
  
  const simProfitLabel = document.getElementById('sim-profit-label');
  const simTotalLabel = document.getElementById('sim-total-label');

  // Dynamic backtester config updates based on currency and market
  function updateBacktesterConfig() {
    const market = marketDetails[activeMarket];
    const config = market[currentCurrency];
    
    const btnLocal = document.getElementById('curr-local');
    const btnUsd = document.getElementById('curr-usd');
    
    if (currentCurrency === 'local') {
      if (btnLocal) {
        btnLocal.style.background = 'var(--primary)';
        btnLocal.style.color = '#060913';
        btnLocal.textContent = `العملة المحلية (${config.currency})`;
      }
      if (btnUsd) {
        btnUsd.style.background = 'none';
        btnUsd.style.color = 'var(--text-muted)';
      }
    } else {
      if (btnUsd) {
        btnUsd.style.background = 'var(--primary)';
        btnUsd.style.color = '#060913';
      }
      if (btnLocal) {
        btnLocal.style.background = 'none';
        btnLocal.style.color = 'var(--text-muted)';
        btnLocal.textContent = `العملة المحلية (${market.local.currency})`;
      }
    }
    
    // Update slider limits and step
    if (capitalInput) {
      capitalInput.min = config.min;
      capitalInput.max = config.max;
      capitalInput.step = config.step;
      capitalInput.value = config.default;
      
      const limitsElement = document.getElementById('slider-limits');
      if (limitsElement) {
        limitsElement.innerHTML = config.limitsHtml;
      }
      
      if (simProfitLabel) simProfitLabel.textContent = config.profitLabel;
      if (simTotalLabel) simTotalLabel.textContent = config.totalLabel;
      
      const symbol = config.currency;
      capitalVal.textContent = currentCurrency === 'local' 
        ? `${parseFloat(capitalInput.value).toLocaleString()} ${symbol}`
        : `${symbol}${parseFloat(capitalInput.value).toLocaleString()}`;
    }
  }

  // Exposed global function for Currency Switcher
  window.setCurrency = function(curr) {
    if (curr === currentCurrency) return;
    currentCurrency = curr;
    updateBacktesterConfig();
    runSimulation();
  };

  function runSimulation() {
    if (!capitalInput) return;
    
    // 1. Show processing state
    simCard.classList.add('processing');
    
    setTimeout(() => {
      const capital = parseFloat(capitalInput.value);
      const details = marketDetails[activeMarket];
      const config = details[currentCurrency];
      const symbol = config.currency;
      
      // Determine chosen risk level
      let selectedRisk = 'balanced';
      riskRadios.forEach(radio => {
        if (radio.checked) selectedRisk = radio.value;
      });

      // Simulation Math dynamically scaled off the active market's metrics
      let returnMultiplier, winRate, maxDrawdown, sharpe;
      
      if (selectedRisk === 'conservative') {
        returnMultiplier = details.conservativeMult;
        winRate = (parseFloat(details.winrate) + 1.7).toFixed(1) + '%';
        maxDrawdown = (parseFloat(details.drawdown) * 0.6).toFixed(1) + '%';
        sharpe = (parseFloat(details.sharpe) * 1.15).toFixed(2);
      } else if (selectedRisk === 'balanced') {
        returnMultiplier = details.balancedMult;
        winRate = details.winrate;
        maxDrawdown = details.drawdown;
        sharpe = details.sharpe;
      } else {
        // Aggressive
        returnMultiplier = details.aggressiveMult;
        winRate = (parseFloat(details.winrate) - 7.5).toFixed(1) + '%';
        maxDrawdown = (parseFloat(details.drawdown) * 2.2).toFixed(1) + '%';
        sharpe = (parseFloat(details.sharpe) * 0.78).toFixed(2);
      }

      // Calculations
      const netProfit = capital * returnMultiplier;
      const finalCapital = capital + netProfit;

      // Animate numbers smoothly based on the currency alignment (Prefix vs Suffix)
      animateValue(resultGains, 0, netProfit, 600, currentCurrency === 'local' ? '' : '$', currentCurrency === 'local' ? ` ${symbol}` : '');
      animateValue(resultTotalReturn, 0, finalCapital, 600, currentCurrency === 'local' ? '' : '$', currentCurrency === 'local' ? ` ${symbol}` : '');
      
      resultDrawdown.textContent = maxDrawdown;
      resultSharpe.textContent = sharpe;
      resultWinrate.textContent = winRate;
      
      // 2. Remove processing class
      simCard.classList.remove('processing');
    }, 400);
  }

  // Smooth number ticker effect
  function animateValue(obj, start, end, duration, prefix = '', suffix = '') {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentVal = progress * (end - start) + start;
      
      obj.textContent = prefix + Math.floor(currentVal).toLocaleString() + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  // Listeners for backtester changes
  if (capitalInput) {
    capitalInput.addEventListener('input', () => {
      const details = marketDetails[activeMarket];
      const config = details[currentCurrency];
      const symbol = config.currency;
      capitalVal.textContent = currentCurrency === 'local' 
        ? `${parseFloat(capitalInput.value).toLocaleString()} ${symbol}`
        : `${symbol}${parseFloat(capitalInput.value).toLocaleString()}`;
    });
    capitalInput.addEventListener('change', runSimulation);
    riskRadios.forEach(radio => radio.addEventListener('change', runSimulation));
  }

  // --- FAQ Accordion Toggles ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    if (trigger && content && !content.id) {
      content.id = `${trigger.id || 'faq'}-content`;
      trigger.setAttribute('aria-controls', content.id);
      trigger.setAttribute('aria-expanded', item.classList.contains('active') ? 'true' : 'false');
    }
    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => {
        i.classList.remove('active');
        const btn = i.querySelector('.faq-trigger');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
      if (!isActive) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  const faqFilters = document.querySelectorAll('[data-faq-filter]');
  function setFaqFilter(filter) {
    const activeFilter = filter || 'all';
    faqFilters.forEach(btn => {
      const isActive = btn.dataset.faqFilter === activeFilter;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    faqItems.forEach(item => {
      const shouldShow = activeFilter === 'all' || item.dataset.faqCategory === activeFilter;
      item.hidden = !shouldShow;
      if (!shouldShow) {
        item.classList.remove('active');
        const btn = item.querySelector('.faq-trigger');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  faqFilters.forEach(btn => {
    btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
    btn.addEventListener('click', () => setFaqFilter(btn.dataset.faqFilter));
  });

  // --- YouTube Learning & Manual Analysis Video Library ---
  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, function (char) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }[char];
    });
  }

  function extractYoutubeId(url) {
    const text = String(url || '').trim();
    if (!text) return '';
    const patterns = [
      /youtu\.be\/([A-Za-z0-9_-]{6,})/,
      /youtube\.com\/watch\?[^#]*v=([A-Za-z0-9_-]{6,})/,
      /youtube\.com\/embed\/([A-Za-z0-9_-]{6,})/,
      /youtube\.com\/shorts\/([A-Za-z0-9_-]{6,})/
    ];
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match && match[1]) return match[1];
    }
    return '';
  }

  function youtubeEmbedUrl(url) {
    const id = extractYoutubeId(url);
    return id ? `https://www.youtube.com/embed/${id}?rel=0&controls=1` : '';
  }

  function normalizeSection(row) {
    const id = String(row.id || row.slug || '').trim();
    return {
      id,
      slug: row.slug || id,
      label: row.label || row.name || 'قسم فيديو',
      marketScoped: Boolean(row.market_scoped || row.marketScoped),
      sortOrder: Number(row.sort_order || row.sortOrder || 0)
    };
  }

  function sectionKey(section) {
    return section ? String(section.id || section.slug || '') : '';
  }

  function normalizeVideo(row) {
    const youtubeUrl = row.youtube_url || row.youtubeUrl || '';
    const embedUrl = row.embed_url || row.embedUrl || youtubeEmbedUrl(youtubeUrl);
    const fallbackSection = row.category === 'tutorials' ? 'tutorials' : 'analysis';
    return {
      id: row.id,
      sectionId: String(row.section_id || row.sectionId || fallbackSection),
      market: row.market || '',
      title: row.title || 'فيديو بدون عنوان',
      description: row.description || '',
      embedUrl: embedUrl || youtubeEmbedUrl(youtubeUrl),
      tag: row.tag || 'فيديو',
      date: row.published_at || row.date || row.created_at || '',
      youtubeUrl
    };
  }

  let videoSections = [
    { id: 'analysis', slug: 'analysis', label: 'تحليلات يدوية', marketScoped: true, sortOrder: 10 },
    { id: 'tutorials', slug: 'tutorials', label: 'الدروس والمواد التعليمية', marketScoped: false, sortOrder: 20 }
  ];
  let videoData = [];

  const videosContainer = document.getElementById('videos-library-container');
  const videoSectionSelector = document.getElementById('video-section-selector');
  let currentVideoSectionId = sectionKey(videoSections[0]);

  function currentVideoSection() {
    return videoSections.find(section => sectionKey(section) === currentVideoSectionId) || videoSections[0] || null;
  }

  function renderVideoSectionTabs() {
    if (!videoSectionSelector) return;
    videoSectionSelector.innerHTML = '';
    if (!videoSections.length) return;

    if (!currentVideoSectionId || !videoSections.some(section => sectionKey(section) === currentVideoSectionId)) {
      currentVideoSectionId = sectionKey(videoSections[0]);
    }

    videoSections.forEach(section => {
      const btn = document.createElement('button');
      const key = sectionKey(section);
      btn.type = 'button';
      btn.className = 'tab-btn' + (key === currentVideoSectionId ? ' active' : '');
      btn.dataset.videoSection = key;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', key === currentVideoSectionId ? 'true' : 'false');
      btn.textContent = section.label;
      btn.addEventListener('click', () => {
        currentVideoSectionId = key;
        renderVideoSectionTabs();
        renderVideos(key);
      });
      videoSectionSelector.appendChild(btn);
    });
  }

  function renderVideos(sectionId) {
    if (!videosContainer) return;
    currentVideoSectionId = sectionId || currentVideoSectionId || sectionKey(videoSections[0]);
    
    videosContainer.innerHTML = '';
    
    const selectedSection = currentVideoSection();
    const selectedSectionId = sectionKey(selectedSection);
    const filteredVideos = videoData.filter(vid => {
      const sameSection = vid.sectionId === selectedSectionId || vid.sectionId === selectedSection?.slug;
      if (!sameSection) return false;
      return !selectedSection?.marketScoped || vid.market === activeMarket;
    });

    if (filteredVideos.length === 0) {
      const emptyCard = document.createElement('div');
      emptyCard.className = 'glass-panel video-card video-empty-state';
      const marketName = marketDetails[activeMarket] ? marketDetails[activeMarket].name : 'السوق المحدد';
      emptyCard.innerHTML = `
        <h4>لا توجد فيديوهات منشورة لهذا القسم حالياً</h4>
        <p>${selectedSection?.marketScoped
          ? `لم يتم نشر فيديو خاص بـ ${escapeHtml(marketName)} داخل قسم ${escapeHtml(selectedSection.label)} بعد.`
          : `لم يتم نشر فيديوهات داخل قسم ${escapeHtml(selectedSection?.label || 'الفيديو')} بعد.`}</p>
      `;
      videosContainer.appendChild(emptyCard);
      return;
    }
    
    filteredVideos.forEach(vid => {
      const card = document.createElement('div');
      card.className = 'glass-panel video-card';
      const embedUrl = vid.embedUrl || youtubeEmbedUrl(vid.youtubeUrl);
      const youtubeUrl = vid.youtubeUrl || '#';
      
      card.innerHTML = `
        <div class="video-container-premium">
          <iframe src="${escapeHtml(embedUrl)}" title="${escapeHtml(vid.title)}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        <h4>${escapeHtml(vid.title)}</h4>
        <p>${escapeHtml(vid.description)}</p>
        <div class="video-card-footer-meta">
          <span class="video-tag">${escapeHtml(vid.tag)}</span>
          <a href="${escapeHtml(youtubeUrl)}" target="_blank" rel="noopener noreferrer" class="video-action-link">
            <span>يوتيوب</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
            </svg>
          </a>
        </div>
      `;
      
      videosContainer.appendChild(card);
    });
  }

  async function loadVideosFromSupabase() {
    if (!window.AbdoAuth || typeof window.AbdoAuth.getClient !== 'function') return;
    const client = window.AbdoAuth.getClient();
    if (!client) return;

    try {
      const sectionsResult = await client
        .from('video_sections')
        .select('id,slug,label,market_scoped,sort_order,status,created_at')
        .eq('status', 'published')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: true });

      if (!sectionsResult.error && sectionsResult.data && sectionsResult.data.length > 0) {
        videoSections = sectionsResult.data.map(normalizeSection).filter(section => section.id);
        currentVideoSectionId = sectionKey(videoSections[0]);
        renderVideoSectionTabs();
      } else if (sectionsResult.error) {
        console.warn('Video section load failed:', sectionsResult.error.message);
      }

      const result = await client
        .from('videos')
        .select('id,title,description,youtube_url,embed_url,tag,category,section_id,market,published_at,created_at,sort_order')
        .eq('status', 'published')
        .order('sort_order', { ascending: true })
        .order('published_at', { ascending: false, nullsFirst: false });

      if (result.error) {
        console.warn('Video library load failed:', result.error.message);
        return;
      }

      videoData = result.data ? result.data.map(normalizeVideo).filter(vid => vid.embedUrl) : [];
      renderVideos(currentVideoSectionId);
    } catch (error) {
      console.warn('Video library load failed:', error);
    }
  }

  renderVideoSectionTabs();
  renderVideos(currentVideoSectionId);
  loadVideosFromSupabase();

  // --- Central Switch Market Experience Engine ---
  const portalBtns = document.querySelectorAll('[data-portal-market]');

  function switchMarketExperience(market) {
    if (!marketDetails[market]) return;
    
    activeMarket = market;
    
    // Toggle active classes on Portal buttons
    portalBtns.forEach(btn => {
      if (btn.dataset.portalMarket === market) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    
    const details = marketDetails[market];
    
    // 1. Update Hero Stats
    const returnEl = document.getElementById('hero-quick-return');
    const sharpeEl = document.getElementById('hero-quick-sharpe');
    const drawdownEl = document.getElementById('hero-quick-drawdown');
    const winrateEl = document.getElementById('hero-winrate-display');
    
    if (returnEl) returnEl.textContent = details.return;
    if (sharpeEl) sharpeEl.textContent = details.sharpe;
    if (drawdownEl) drawdownEl.textContent = details.drawdown;
    if (winrateEl) winrateEl.textContent = details.winrate;
    
    // 2. Update Institutional Stats Grid
    const perfReturnEl = document.getElementById('perf-quick-return');
    const perfWinrateEl = document.getElementById('perf-winrate');
    const perfSharpeEl = document.getElementById('perf-quick-sharpe');
    const perfDrawdownEl = document.getElementById('perf-quick-drawdown');
    
    if (perfReturnEl) perfReturnEl.textContent = details.return;
    if (perfWinrateEl) perfWinrateEl.textContent = details.winrate;
    if (perfSharpeEl) perfSharpeEl.textContent = details.sharpe;
    if (perfDrawdownEl) perfDrawdownEl.textContent = details.drawdown;
    
    // 3. Update Pricing Plan
    const pricingLocalPrice = document.getElementById('pricing-local-price');
    if (pricingLocalPrice) {
      pricingLocalPrice.innerHTML = details.localPriceHtml;
    }
    
    // 4. Update Chart Titles & Legends
    const chartTitle = document.getElementById('chart-main-title');
    const chartLegendModel = document.getElementById('chart-legend-model');
    const chartLegendIndex = document.getElementById('chart-legend-index');
    
    if (chartTitle) chartTitle.textContent = details.chartTitle;
    if (chartLegendModel) chartLegendModel.textContent = `نموذج النموذج الكمي - السوق ${details.name === 'مصر' ? 'المصري' : 'ال' + details.name}`;
    if (chartLegendIndex) chartLegendIndex.textContent = details.indexName;
    
    // 5. Update Backtester configuration (default back to local currency when market switches)
    currentCurrency = 'local';
    updateBacktesterConfig();
    runSimulation();
    
    // 6. Synchronize market-scoped video sections
    renderVideos(currentVideoSectionId);
    
    // 7. Re-render Chart
    renderChart(currentPeriod);
  }

  // Connect Market Portal Buttons
  portalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const market = btn.dataset.portalMarket;
      switchMarketExperience(market);
    });
  });

  // --- Initial load of default market experience (Saudi Arabia) ---
  switchMarketExperience('saudi');

  // =========================================
  // 🤖 AI Assistant Logic (Simulated Claude API Ready)
  // =========================================
  const aiAnalyzeBtn = document.getElementById('ai-analyze-btn');
  const aiTickerInput = document.getElementById('ai-ticker-input');
  const aiChatBox = document.getElementById('ai-chat-box');

  if (aiAnalyzeBtn && aiTickerInput && aiChatBox) {
    aiAnalyzeBtn.addEventListener('click', () => {
      const ticker = aiTickerInput.value.trim();
      if (!ticker) return;

      // Show Chat Box
      aiChatBox.style.display = 'flex';

      // 1. Append User Message
      const userMsgHtml = `
        <div class="chat-msg user-msg">
          <div class="chat-avatar user-avatar">أنت</div>
          <div class="chat-bubble">حلل لي سهم: ${ticker}</div>
        </div>
      `;
      aiChatBox.insertAdjacentHTML('beforeend', userMsgHtml);
      aiTickerInput.value = '';
      aiAnalyzeBtn.disabled = true;
      aiChatBox.scrollTop = aiChatBox.scrollHeight;

      // 2. Append AI Typing Indicator
      const aiTypingId = 'ai-typing-' + Date.now();
      const aiTypingHtml = `
        <div class="chat-msg ai-msg" id="${aiTypingId}">
          <div class="chat-avatar ai-avatar">✨</div>
          <div class="chat-bubble">
            <div class="typing-dots">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      `;
      aiChatBox.insertAdjacentHTML('beforeend', aiTypingHtml);
      aiChatBox.scrollTop = aiChatBox.scrollHeight;

      // 3. Simulate AI Network Request (Delay 2.5s)
      setTimeout(() => {
        // Remove Typing Indicator
        const typingEl = document.getElementById(aiTypingId);
        if (typingEl) typingEl.remove();

        // Generate Mock Analysis Content
        const dateStr = new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
        const mockAnalysis = `
          <div class="chat-msg ai-msg">
            <div class="chat-avatar ai-avatar">✨</div>
            <div class="chat-bubble">
              <h4>📊 تحليل سهم (${ticker}) - ${dateStr}</h4>
              <p>بناءً على مسح البيانات الأخير للتدفقات النقدية والتحليل الكمي، إليك التقرير الفوري:</p>
              <ul>
                <li><strong>الاتجاه العام:</strong> صاعد على المدى القصير، مع اختراق إيجابي لمستوى المقاومة الأخير.</li>
                <li><strong>السيولة:</strong> لوحظ دخول سيولة مؤسساتية ذكية (Smart Money) خلال الـ 48 ساعة الماضية.</li>
                <li><strong>التقييم الكمي:</strong> ملف المخاطرة إلى العائد يحتاج مراجعة ضمن حجم المحفظة ونقطة بطلان الفرضية قبل أي قرار.</li>
              </ul>
              <p><em>ملاحظة: هذا عرض تجريبي لأغراض بحثية وتعليمية، ولا يُعد توصية استثمارية.</em></p>
            </div>
          </div>
        `;
        
        aiChatBox.insertAdjacentHTML('beforeend', mockAnalysis);
        aiAnalyzeBtn.disabled = false;
        aiChatBox.scrollTop = aiChatBox.scrollHeight;
      }, 2500);
    });

    // Support Enter Key Trigger
    aiTickerInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') aiAnalyzeBtn.click();
    });
  }

  // =========================================
  // 🔒 Auth Modals Logic (Login / Sign Up)
  // =========================================
  const authModalOverlay = document.getElementById('auth-modal-overlay');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const navLoginBtn = document.getElementById('nav-login-btn');
  const navSignupBtn = document.getElementById('nav-signup-btn');

  // Check session and update header auth UI
  const updateHeaderAuthUI = async () => {
    const session = await window.AbdoAuth.getSession();
    if (session && session.user) {
      // User is logged in - show "حسابي" button
      if (navLoginBtn && navSignupBtn) {
        navLoginBtn.style.display = 'none';
        navSignupBtn.style.display = 'none';
        
        // Create "حسابي" button if it doesn't exist
        let myAccountBtn = document.getElementById('nav-myaccount-btn');
        if (!myAccountBtn) {
          myAccountBtn = document.createElement('a');
          myAccountBtn.id = 'nav-myaccount-btn';
          myAccountBtn.href = '#';
          myAccountBtn.textContent = 'حسابي';
          myAccountBtn.className = 'btn-primary';
          myAccountBtn.style.textDecoration = 'none';
          myAccountBtn.style.display = 'inline-flex';
          myAccountBtn.style.alignItems = 'center';
          myAccountBtn.style.justifyContent = 'center';
          myAccountBtn.style.padding = '10px 20px';
          myAccountBtn.style.fontSize = '0.9rem';
          myAccountBtn.style.fontWeight = '600';
          myAccountBtn.style.borderRadius = '8px';
          myAccountBtn.classList.add('nav-account-link');
          
          // Insert before the mobile menu button
          const mobileMenuBtn = document.getElementById('mobile-menu-btn');
          if (mobileMenuBtn && mobileMenuBtn.parentNode) {
            mobileMenuBtn.parentNode.insertBefore(myAccountBtn, mobileMenuBtn);
          } else if (navSignupBtn.parentNode) {
            navSignupBtn.parentNode.insertBefore(myAccountBtn, navSignupBtn);
          }
          
          myAccountBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = window.AbdoAuth.dashboardUrl();
          });
        } else {
          myAccountBtn.style.display = 'block';
        }
      }
    } else {
      // User is not logged in - show login/signup buttons
      if (navLoginBtn) navLoginBtn.style.display = 'block';
      if (navSignupBtn) navSignupBtn.style.display = 'block';
      
      const myAccountBtn = document.getElementById('nav-myaccount-btn');
      if (myAccountBtn) myAccountBtn.style.display = 'none';
    }
  };

  // Run on page load
  updateHeaderAuthUI();
  loadPublishedInsights();

  async function loadPublishedInsights() {
    const insightsGrid = document.querySelector('#insights .insights-feed-grid');
    if (!insightsGrid || !window.AbdoAuth || !window.AbdoAuth.isConfigured()) return;

    const client = window.AbdoAuth.getClient();
    if (!client) return;

    const escapeHtml = (value) => String(value || '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[char]));

    const formatDate = (value) => {
      if (!value) return '';
      try {
        return new Date(value).toLocaleDateString('ar-EG', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      } catch (error) {
        return value;
      }
    };

    const estimateReadTime = (post) => {
      const text = `${post.excerpt || ''} ${post.content || ''}`.trim();
      const words = text ? text.split(/\s+/).length : 1;
      return Math.max(1, Math.ceil(words / 180));
    };

    try {
      let result = await client
        .from('posts')
        .select('id,title,excerpt,content,image_url,tag,published_at,created_at')
        .eq('status', 'published')
        .order('published_at', { ascending: false, nullsFirst: false })
        .limit(3);

      if (result.error && /image_url/i.test(result.error.message || '')) {
        result = await client
          .from('posts')
          .select('id,title,excerpt,content,tag,published_at,created_at')
          .eq('status', 'published')
          .order('published_at', { ascending: false, nullsFirst: false })
          .limit(3);
        if (result.data) result.data = result.data.map((post) => ({ ...post, image_url: '' }));
      }

      if (result.error || !result.data || result.data.length === 0) {
        if (result.error) console.warn('Published posts load failed:', result.error.message);
        return;
      }

      insightsGrid.innerHTML = result.data.map((post) => {
        const readTime = estimateReadTime(post);
        return `
          <article class="insight-card glass-panel stagger-visible">
            ${post.image_url ? `<div class="insight-card-media"><img src="${escapeHtml(post.image_url)}" alt=""></div>` : ''}
            <div class="insight-meta">
              <span class="insight-tag">${escapeHtml(post.tag || 'بحثي')}</span>
              <span class="insight-date">${formatDate(post.published_at || post.created_at)}</span>
            </div>
            <h3>${escapeHtml(post.title)}</h3>
            <p>${escapeHtml(post.excerpt)}</p>
            <div class="insight-footer">
              <span class="insight-read-time">${readTime} دقيقة قراءة</span>
              <a href="post.html?id=${encodeURIComponent(post.id)}" class="insight-link">اقرأ المنشور<span class="arrow-slide">←</span></a>
            </div>
          </article>
        `;
      }).join('');
    } catch (error) {
      console.warn('Published posts load failed:', error);
    }
  }
  
  const loginFormView = document.getElementById('login-form-view');
  const signupFormView = document.getElementById('signup-form-view');
  
  const switchToSignup = document.getElementById('switch-to-signup');
  const switchToLogin = document.getElementById('switch-to-login');
  
  const submitLoginBtn = document.getElementById('submit-login-btn');
  const submitSignupBtn = document.getElementById('submit-signup-btn');
  const resendConfirmationBtn = document.getElementById('resend-confirmation-btn');
  const loginEmailInput = document.getElementById('login-email');
  const loginPasswordInput = document.getElementById('login-password');
  const signupNameInput = document.getElementById('signup-name');
  const signupEmailInput = document.getElementById('signup-email');
  const signupPasswordInput = document.getElementById('signup-password');
  const authMessage = document.getElementById('auth-message');

  if (authModalOverlay) {
    let lastAuthTrigger = null;
    let pendingSignupEmail = '';

    const setAuthMessage = (message, type = '') => {
      if (!authMessage) return;
      authMessage.textContent = message || '';
      authMessage.classList.remove('is-success', 'is-error');
      if (type) authMessage.classList.add(`is-${type}`);
    };

    const setResendVisible = (visible) => {
      if (resendConfirmationBtn) {
        resendConfirmationBtn.style.display = visible ? 'block' : 'none';
      }
    };

    const authErrorMessage = (error) => {
      const rawMessage = (error && error.message) ? error.message : '';
      const message = rawMessage.toLowerCase();
      if (message.includes('invalid login')) return 'البريد الإلكتروني أو كلمة المرور غير صحيحة.';
      if (message.includes('email not confirmed')) return 'يرجى تأكيد بريدك الإلكتروني قبل تسجيل الدخول.';
      if (message.includes('already registered') || message.includes('already exists')) return 'هذا البريد مسجل بالفعل. جرّب تسجيل الدخول.';
      if (message.includes('email address not authorized')) return 'إرسال البريد غير مفعّل لهذا العنوان. فعّل SMTP مخصص من إعدادات Supabase لإرسال رسائل التأكيد لكل المستخدمين.';
      if (message.includes('rate limit') || message.includes('too many') || message.includes('security purposes')) return 'تم الوصول لحد إرسال رسائل التأكيد. انتظر قليلاً ثم جرّب إعادة الإرسال، أو فعّل SMTP مخصص في Supabase.';
      if (message.includes('password')) return 'كلمة المرور يجب أن تكون 8 أحرف على الأقل.';
      return rawMessage || 'حدث خطأ غير متوقع. حاول مرة أخرى.';
    };

    const setButtonLoading = (btn, loading, label) => {
      if (!btn) return;
      if (loading) {
        btn.dataset.originalText = btn.textContent;
        btn.textContent = label;
        btn.disabled = true;
      } else {
        btn.textContent = btn.dataset.originalText || btn.textContent;
        btn.disabled = false;
      }
    };

    const focusActiveAuthInput = () => {
      window.setTimeout(() => {
        const activeView = loginFormView.style.display === 'none' ? signupFormView : loginFormView;
        const firstInput = activeView && activeView.querySelector('input');
        if (firstInput) firstInput.focus();
      }, 0);
    };

    const openAuthModal = (view, trigger) => {
      lastAuthTrigger = trigger || document.activeElement;
      loginFormView.style.display = view === 'signup' ? 'none' : 'block';
      signupFormView.style.display = view === 'signup' ? 'block' : 'none';
      authModalOverlay.style.display = 'flex';
      setAuthMessage('');
      setResendVisible(false);
      focusActiveAuthInput();
    };

    const closeAuthModal = () => {
      authModalOverlay.style.display = 'none';
      if (lastAuthTrigger && typeof lastAuthTrigger.focus === 'function') {
        lastAuthTrigger.focus();
      }
    };

    if (navLoginBtn) {
      navLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openAuthModal('login', navLoginBtn);
      });
    }

    if (navSignupBtn) {
      navSignupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openAuthModal('signup', navSignupBtn);
      });
    }

    // Close Modal
    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', closeAuthModal);
    }

    // Close on overlay click
    authModalOverlay.addEventListener('click', (e) => {
      if (e.target === authModalOverlay) {
        closeAuthModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && authModalOverlay.style.display === 'flex') {
        closeAuthModal();
      }
    });

    // Switch Views
    if (switchToSignup) {
      switchToSignup.addEventListener('click', (e) => {
        e.preventDefault();
        loginFormView.style.display = 'none';
        signupFormView.style.display = 'block';
        setAuthMessage('');
        setResendVisible(false);
        focusActiveAuthInput();
      });
    }

    if (switchToLogin) {
      switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        signupFormView.style.display = 'none';
        loginFormView.style.display = 'block';
        setAuthMessage('');
        setResendVisible(false);
        focusActiveAuthInput();
      });
    }

    const ensureAuthConfigured = () => {
      if (window.AbdoAuth && window.AbdoAuth.isConfigured()) return true;
      setAuthMessage('أضف بيانات Supabase في ملف auth-config.js لتفعيل تسجيل الحسابات وإرسال رسائل التأكيد.', 'error');
      return false;
    };

    const handleLogin = async (btn) => {
      if (!ensureAuthConfigured()) return;
      const email = loginEmailInput.value.trim();
      const password = loginPasswordInput.value;
      if (!email || !password) {
        setAuthMessage('أدخل البريد الإلكتروني وكلمة المرور.', 'error');
        return;
      }

      setButtonLoading(btn, true, 'جاري التحقق...');
      setAuthMessage('');
      try {
        const result = await window.AbdoAuth.signIn({ email, password });
        if (result.error) throw result.error;
        // Update header UI before redirecting
        await updateHeaderAuthUI();
        window.location.href = window.AbdoAuth.dashboardUrl();
      } catch (error) {
        setAuthMessage(authErrorMessage(error), 'error');
      } finally {
        setButtonLoading(btn, false);
      }
    };

    const handleSignup = async (btn) => {
      if (!ensureAuthConfigured()) return;
      const name = signupNameInput.value.trim();
      const email = signupEmailInput.value.trim();
      const password = signupPasswordInput.value;
      setResendVisible(false);
      if (!name || !email || !password) {
        setAuthMessage('أكمل الاسم والبريد الإلكتروني وكلمة المرور.', 'error');
        return;
      }
      if (password.length < 8) {
        setAuthMessage('كلمة المرور يجب أن تكون 8 أحرف على الأقل.', 'error');
        return;
      }

      setButtonLoading(btn, true, 'جاري إنشاء الحساب...');
      setAuthMessage('');
      try {
        const result = await window.AbdoAuth.signUp({ name, email, password });
        if (result.error) throw result.error;
        if (result.data && result.data.session) {
          window.location.href = window.AbdoAuth.dashboardUrl();
          return;
        }
        pendingSignupEmail = email;
        setResendVisible(true);
        const user = result.data && result.data.user;
        const identities = user && Array.isArray(user.identities) ? user.identities : null;
        if (identities && identities.length === 0) {
          setAuthMessage('هذا البريد قد يكون مسجلاً بالفعل. جرّب تسجيل الدخول، أو أعد إرسال رابط التأكيد إذا لم يكن الحساب مفعلاً.', 'success');
          return;
        }
        setAuthMessage('تم إنشاء الحساب. أرسلنا رابط التأكيد إلى بريدك، افحص الوارد والرسائل غير المرغوبة. يمكنك إعادة الإرسال بعد دقيقة.', 'success');
      } catch (error) {
        setAuthMessage(authErrorMessage(error), 'error');
      } finally {
        setButtonLoading(btn, false);
      }
    };

    const handleResendConfirmation = async (btn) => {
      if (!ensureAuthConfigured()) return;
      const email = signupEmailInput.value.trim() || pendingSignupEmail;
      if (!email) {
        setAuthMessage('اكتب البريد الإلكتروني أولاً لإعادة إرسال رابط التأكيد.', 'error');
        return;
      }

      setButtonLoading(btn, true, 'جاري إعادة الإرسال...');
      setAuthMessage('');
      try {
        const result = await window.AbdoAuth.resendSignup({ email });
        if (result.error) throw result.error;
        pendingSignupEmail = email;
        setAuthMessage('أرسلنا رابط تأكيد جديد. افحص الوارد والرسائل غير المرغوبة خلال دقائق قليلة.', 'success');
      } catch (error) {
        setAuthMessage(authErrorMessage(error), 'error');
      } finally {
        setButtonLoading(btn, false);
      }
    };

    if (submitLoginBtn) {
      submitLoginBtn.addEventListener('click', () => handleLogin(submitLoginBtn));
    }
    if (submitSignupBtn) {
      submitSignupBtn.addEventListener('click', () => handleSignup(submitSignupBtn));
    }
    if (resendConfirmationBtn) {
      resendConfirmationBtn.addEventListener('click', () => handleResendConfirmation(resendConfirmationBtn));
    }

    const authParams = new URLSearchParams(window.location.search);
    if (authParams.get('auth') === 'login') {
      openAuthModal('login', navLoginBtn || document.body);
      if (authParams.get('auth_message') === 'config') {
        setAuthMessage('أضف بيانات Supabase في ملف auth-config.js لتفعيل لوحة التحكم.', 'error');
      } else if (authParams.get('auth_message') === 'signin') {
        setAuthMessage('سجّل الدخول أولاً للوصول إلى لوحة التحكم.', 'error');
      }
      if (window.history && window.history.replaceState) {
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }

  // =========================================
  // PREMIUM ANIMATIONS & MICRO-INTERACTIONS
  // =========================================

  // --- Easing function ---
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  // --- 1 & 6. Counter animation for KPI elements ---
  function animateCounter(el) {
    const target = parseFloat(el.dataset.counter);
    if (isNaN(target)) return;
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const duration = 1800;
    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = eased * target;
      el.textContent = prefix + current.toFixed(decimals) + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = prefix + target.toFixed(decimals) + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  // =========================================
  // 🎯 Market Selection Functionality
  // =========================================
  function formatMetricPct(value, signed = true) {
    const number = Number(value);
    if (!Number.isFinite(number)) return '—';
    const pct = number * 100;
    return (signed && pct > 0 ? '+' : '') + pct.toFixed(1) + '%';
  }

  function formatMetricNumber(value, decimals = 2) {
    const number = Number(value);
    if (!Number.isFinite(number)) return '—';
    return number.toFixed(decimals);
  }

  function getPerformanceMarketData(selectedMarket) {
    const details = performanceChartDetails[selectedMarket];
    if (!details) return null;
    const chart = liveEquityCharts[selectedMarket] || {};
    const metrics = chart.metrics || {};
    return {
      title: chart.title || details.chartTitle,
      totalReturn: metrics.total_return,
      sharpe: metrics.sharpe,
      drawdown: metrics.max_dd
    };
  }

  const marketTabs = document.querySelectorAll('.market-tab');
  function applyPerformanceMarket(selectedMarket, activeTab) {
    const data = getPerformanceMarketData(selectedMarket);
    if (!data) return;
    performanceMarket = selectedMarket;

    marketTabs.forEach(t => {
      t.style.background = 'transparent';
      t.style.color = 'var(--primary)';
      t.style.borderColor = 'var(--border-gold)';
      t.classList.remove('active');
    });

    if (activeTab) {
      activeTab.style.background = 'var(--primary)';
      activeTab.style.color = 'var(--text-dark)';
      activeTab.style.borderColor = 'var(--primary)';
      activeTab.classList.add('active');
    }

    const returnEl = document.getElementById('perf-quick-return');
    const winrateEl = document.getElementById('perf-winrate');
    const sharpeEl = document.getElementById('perf-quick-sharpe');
    const drawdownEl = document.getElementById('perf-quick-drawdown');
    if (returnEl) {
      returnEl.textContent = formatMetricPct(data.totalReturn);
      returnEl.dataset.counter = Number(data.totalReturn || 0) * 100;
    }
    if (winrateEl) {
      winrateEl.textContent = '—';
      winrateEl.dataset.counter = 0;
    }
    if (sharpeEl) {
      sharpeEl.textContent = formatMetricNumber(data.sharpe, 2);
      sharpeEl.dataset.counter = Number(data.sharpe || 0);
    }
    if (drawdownEl) {
      drawdownEl.textContent = formatMetricPct(data.drawdown, false);
      drawdownEl.dataset.counter = Math.abs(Number(data.drawdown || 0) * 100);
    }

    const chartTitle = document.getElementById('chart-main-title');
    if (chartTitle) chartTitle.textContent = data.title;
    renderChart(currentPeriod);
  }

  marketTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const selectedMarket = e.target.dataset.market;
      applyPerformanceMarket(selectedMarket, e.target);
    });
  });

  const initialPerformanceTab = document.querySelector('.market-tab.active') || document.querySelector('.market-tab');
  if (initialPerformanceTab) {
    applyPerformanceMarket(initialPerformanceTab.dataset.market, initialPerformanceTab);
  }

  // Observe hero KPI values
  const heroKpiObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.hero-kpi-val[data-counter]').forEach(el => {
    heroKpiObserver.observe(el);
  });

  // Observe Bloomberg KPI strip values
  const bloombergStripEl = document.querySelector('.bloomberg-kpi-strip');
  if (bloombergStripEl) {
    const bloombergObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('[data-counter]').forEach(el => animateCounter(el));
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    bloombergObserver.observe(bloombergStripEl);
  }

  // --- 3. Staggered reveal for stagger-children containers ---
  const staggerObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const children = Array.from(entry.target.children);
        children.forEach((child, index) => {
          setTimeout(() => {
            child.classList.add('stagger-visible');
          }, index * 80);
        });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.stagger-children').forEach(el => {
    staggerObserver.observe(el);
  });

  // --- 8. Page load progress bar ---
  const progressBar = document.getElementById('page-progress-bar');
  if (progressBar) {
    function updateProgressBar() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    }
    window.addEventListener('scroll', updateProgressBar, { passive: true });
    updateProgressBar();
  }

});
