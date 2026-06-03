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
  let currentCurrency = 'local'; // 'local' or 'usd' for Backtester
  let currentPeriod = '1Y'; // Default chart period

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
        profitLabel: 'صافي الأرباح المستهدفة بالريال السعودي',
        totalLabel: 'رأس المال النهائي للمحفظة (SAR)'
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
        profitLabel: 'صافي الأرباح المستهدفة بالدولار',
        totalLabel: 'رأس المال النهائي للمحفظة ($)'
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
        profitLabel: 'صافي الأرباح المستهدفة بالدرهم الإماراتي',
        totalLabel: 'رأس المال النهائي للمحفظة (AED)'
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
        profitLabel: 'صافي الأرباح المستهدفة بالدولار',
        totalLabel: 'رأس المال النهائي للمحفظة ($)'
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
        profitLabel: 'صافي الأرباح المستهدفة بالجنيه المصري',
        totalLabel: 'رأس المال النهائي للمحفظة (EGP)'
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
        profitLabel: 'صافي الأرباح المستهدفة بالدولار',
        totalLabel: 'رأس المال النهائي للمحفظة ($)'
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
        profitLabel: 'صافي الأرباح المستهدفة بالريال القطري',
        totalLabel: 'رأس المال النهائي للمحفظة (QAR)'
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
        profitLabel: 'صافي الأرباح المستهدفة بالدولار',
        totalLabel: 'رأس المال النهائي للمحفظة ($)'
      },
      conservativeMult: 0.20,
      balancedMult: 0.35,
      aggressiveMult: 0.68
    },
    kuwait: {
      name: 'الكويت',
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
        profitLabel: 'صافي الأرباح المستهدفة بالدينار الكويتي',
        totalLabel: 'رأس المال النهائي للمحفظة (KWD)'
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
        profitLabel: 'صافي الأرباح المستهدفة بالدولار',
        totalLabel: 'رأس المال النهائي للمحفظة ($)'
      },
      conservativeMult: 0.18,
      balancedMult: 0.30,
      aggressiveMult: 0.58
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

  function renderChart(period) {
    if (!svgElement) return;
    
    // Clear previous drawing
    svgElement.innerHTML = '';
    
    const data = chartData[period];
    const width = svgElement.clientWidth || 800;
    const height = svgElement.clientHeight || 350;
    const padding = { top: 40, right: 60, bottom: 40, left: 60 };
    
    const usableWidth = width - padding.left - padding.right;
    const usableHeight = height - padding.top - padding.bottom;
    
    // Scale standard data points to match specific active market's return rate
    const market = marketDetails[activeMarket];
    const scaleFactorModel = parseFloat(market.return) / 284.6;
    const scaleFactorIndex = market.indexReturn / 30.2;
    
    const scaledModel = data.model.map(v => v * scaleFactorModel);
    const scaledSp500 = data.sp500.map(v => v * scaleFactorIndex);
    
    // Find min/max values across both scaled datasets
    const allValues = [...scaledModel, ...scaledSp500];
    const maxVal = Math.max(...allValues) * 1.15; // 15% head room
    const minVal = Math.min(...allValues) * 1.15; // 15% bottom room
    
    const valRange = maxVal - minVal;
    
    // Dynamic coordinate mapping functions
    const getX = (index) => padding.left + (index / (data.labels.length - 1)) * usableWidth;
    const getY = (val) => padding.top + usableHeight - ((val - minVal) / valRange) * usableHeight;

    // Draw Grid Lines (Horizontal & Vertical)
    const gridLinesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    gridLinesGroup.setAttribute('stroke', 'rgba(255,255,255,0.04)');
    gridLinesGroup.setAttribute('stroke-width', '1');
    
    // Horizontal grids
    const gridCount = 5;
    for (let i = 0; i <= gridCount; i++) {
      const yVal = minVal + (i / gridCount) * valRange;
      const y = getY(yVal);
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', padding.left);
      line.setAttribute('y1', y);
      line.setAttribute('x2', width - padding.right);
      line.setAttribute('y2', y);
      gridLinesGroup.appendChild(line);
      
      // Grid Y labels
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', width - padding.right + 10);
      text.setAttribute('y', y + 4);
      text.setAttribute('fill', 'var(--text-muted)');
      text.setAttribute('font-size', '10px');
      text.setAttribute('font-family', 'Cairo');
      text.setAttribute('text-anchor', 'start');
      text.textContent = `+${yVal.toFixed(1)}%`;
      gridLinesGroup.appendChild(text);
    }
    
    // Vertical grids & X labels
    data.labels.forEach((label, idx) => {
      const x = getX(idx);
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', x);
      line.setAttribute('y1', padding.top);
      line.setAttribute('x2', x);
      line.setAttribute('y2', height - padding.bottom);
      gridLinesGroup.appendChild(line);
      
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', x);
      text.setAttribute('y', height - padding.bottom + 22);
      text.setAttribute('fill', 'var(--text-muted)');
      text.setAttribute('font-size', '11px');
      text.setAttribute('font-family', 'Cairo');
      text.setAttribute('text-anchor', 'middle');
      text.textContent = label;
      gridLinesGroup.appendChild(text);
    });
    
    svgElement.appendChild(gridLinesGroup);

    // --- Benchmark Line drawing (Scaled local index) ---
    let spPathD = '';
    scaledSp500.forEach((val, idx) => {
      const x = getX(idx);
      const y = getY(val);
      if (idx === 0) spPathD += `M ${x} ${y}`;
      else spPathD += ` L ${x} ${y}`;
    });
    
    const spPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    spPath.setAttribute('d', spPathD);
    spPath.setAttribute('fill', 'none');
    spPath.setAttribute('stroke', '#4b5563');
    spPath.setAttribute('stroke-width', '2');
    spPath.setAttribute('stroke-dasharray', '5,5');
    svgElement.appendChild(spPath);

    // --- أبحاث كمية Equity Path drawing (Smooth Bezier) ---
    let modelPathD = '';
    let areaPathD = `M ${getX(0)} ${getY(minVal)}`; // Start of gradient area
    
    scaledModel.forEach((val, idx) => {
      const x = getX(idx);
      const y = getY(val);
      
      if (idx === 0) {
        modelPathD += `M ${x} ${y}`;
        areaPathD += ` L ${x} ${y}`;
      } else {
        // Curve construction using simple midpoints control
        const prevX = getX(idx - 1);
        const prevY = getY(scaledModel[idx - 1]);
        const cpX1 = prevX + (x - prevX) / 2;
        const cpY1 = prevY;
        const cpX2 = prevX + (x - prevX) / 2;
        const cpY2 = y;
        modelPathD += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${x} ${y}`;
        areaPathD += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${x} ${y}`;
      }
      
      if (idx === scaledModel.length - 1) {
        areaPathD += ` L ${x} ${getY(minVal)} Z`; // Close the path at the bottom
      }
    });

    // Create Gradient Definition
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const linearGrad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    linearGrad.setAttribute('id', 'chartGrad');
    linearGrad.setAttribute('x1', '0');
    linearGrad.setAttribute('y1', '0');
    linearGrad.setAttribute('x2', '0');
    linearGrad.setAttribute('y2', '1');
    
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', 'var(--primary)');
    stop1.setAttribute('stop-opacity', '0.25');
    
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', 'var(--primary)');
    stop2.setAttribute('stop-opacity', '0');
    
    linearGrad.appendChild(stop1);
    linearGrad.appendChild(stop2);
    defs.appendChild(linearGrad);
    svgElement.appendChild(defs);

    // Draw area gradient
    const area = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    area.setAttribute('d', areaPathD);
    area.setAttribute('fill', 'url(#chartGrad)');
    svgElement.appendChild(area);

    // Draw main line path with glowing stroke
    const modelPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    modelPath.setAttribute('d', modelPathD);
    modelPath.setAttribute('fill', 'none');
    modelPath.setAttribute('stroke', 'var(--primary)');
    modelPath.setAttribute('stroke-width', '3');
    modelPath.setAttribute('filter', 'drop-shadow(0px 0px 8px var(--primary))');
    svgElement.appendChild(modelPath);

    // Draw Interactive Data Points & Hover Triggers
    const pointsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    scaledModel.forEach((val, idx) => {
      const x = getX(idx);
      const y = getY(val);
      
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', x);
      circle.setAttribute('cy', y);
      circle.setAttribute('r', '5');
      circle.setAttribute('fill', 'var(--bg-secondary)');
      circle.setAttribute('stroke', 'var(--primary)');
      circle.setAttribute('stroke-width', '2');
      circle.style.cursor = 'pointer';
      circle.style.transition = 'r 0.2s ease';
      
      // Interactive mouseover events to display floating tooltip
      circle.addEventListener('mouseover', (e) => {
        circle.setAttribute('r', '8');
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y - 12}px`;
        tooltip.style.display = 'block';
        tooltip.innerHTML = `
          <div style="font-weight: 700; color: #fff; margin-bottom: 4px;">الفترة: ${data.dates[idx]}</div>
          <div style="color: var(--accent-green);">نمو محفظة النموذج الكمي: +${val.toFixed(1)}%</div>
          <div style="color: var(--text-muted);">${market.indexName}: +${scaledSp500[idx].toFixed(1)}%</div>
        `;
      });
      
      circle.addEventListener('mouseout', () => {
        circle.setAttribute('r', '5');
        tooltip.style.display = 'none';
      });
      
      pointsGroup.appendChild(circle);
    });
    svgElement.appendChild(pointsGroup);
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


  // --- Middle Eastern Localized Stock Signals Dashboard Grid ---
  const initialSignals = [
    {
      id: 1,
      asset: 'الراجحي (1120)',
      market: 'saudi',
      marketName: 'السعودية',
      type: 'شراء (BUY)',
      entry: '84.20 ر.س',
      tp: '89.50 ر.س',
      sl: '82.00 ر.س',
      time: 'منذ ساعة',
      status: 'active',
      statusText: 'نشط الآن ⚡',
      badgeClass: 'buy'
    },
    {
      id: 2,
      asset: 'إعمار (EMAAR)',
      market: 'uae',
      marketName: 'الإمارات',
      type: 'شراء (BUY)',
      entry: '8.12 د.إ',
      tp: '8.65 د.إ',
      sl: '7.92 د.إ',
      time: 'منذ 3 ساعات',
      status: 'active',
      statusText: 'نشط الآن ⚡',
      badgeClass: 'buy'
    },
    {
      id: 3,
      asset: 'CIB (COMI)',
      market: 'egypt',
      marketName: 'مصر',
      type: 'شراء (BUY)',
      entry: '81.50 ج.م',
      tp: '88.00 ج.م',
      sl: '78.80 ج.م',
      time: 'منذ 5 ساعات',
      status: 'target-hit',
      statusText: 'تم تحقيق الهدف 🎯 (+7.9%)',
      badgeClass: 'buy'
    },
    {
      id: 4,
      asset: 'قطر الوطني (QNBK)',
      market: 'qatar',
      marketName: 'قطر',
      type: 'بيع (SELL)',
      entry: '14.10 ر.ق',
      tp: '13.20 ر.ق',
      sl: '14.50 ر.ق',
      time: 'أمس',
      status: 'target-hit',
      statusText: 'تم تحقيق الهدف 🎯 (+6.3%)',
      badgeClass: 'sell'
    },
    {
      id: 5,
      asset: 'بيتك (KFH)',
      market: 'kuwait',
      marketName: 'الكويت',
      type: 'شراء (BUY)',
      entry: '0.725 د.ك',
      tp: '0.765 د.ك',
      sl: '0.708 د.ك',
      time: 'منذ يومين',
      status: 'stop-loss-hit',
      statusText: 'ضرب وقف الخسارة 🟥 (-2.3%)',
      badgeClass: 'buy'
    },
    {
      id: 6,
      asset: 'أرامكو (2222)',
      market: 'saudi',
      marketName: 'السعودية',
      type: 'شراء (BUY)',
      entry: '30.15 ر.س',
      tp: '31.90 ر.س',
      sl: '29.50 ر.س',
      time: 'منذ 3 أيام',
      status: 'target-hit',
      statusText: 'تم تحقيق الهدف 🎯 (+5.8%)',
      badgeClass: 'buy'
    },
    {
      id: 7,
      asset: 'أبوظبي الأول (FAB)',
      market: 'uae',
      marketName: 'الإمارات',
      type: 'بيع (SELL)',
      entry: '12.80 د.إ',
      tp: '12.10 د.إ',
      sl: '13.15 د.إ',
      time: 'منذ 4 أيام',
      status: 'target-hit',
      statusText: 'تم تحقيق الهدف 🎯 (+5.4%)',
      badgeClass: 'sell'
    },
    {
      id: 8,
      asset: 'السويدي (SWDY)',
      market: 'egypt',
      marketName: 'مصر',
      type: 'شراء (BUY)',
      entry: '42.20 ج.م',
      tp: '46.00 ج.م',
      sl: '40.50 ج.م',
      time: 'منذ 5 أيام',
      status: 'target-hit',
      statusText: 'تم تحقيق الهدف 🎯 (+9.0%)',
      badgeClass: 'buy'
    }
  ];

  const signalsGrid = document.getElementById('signals-grid-container');
  const signalTabBtns = document.querySelectorAll('.signals-tabs .tab-btn');

  function renderSignals(filter = 'all') {
    if (!signalsGrid) return;
    
    signalsGrid.innerHTML = '';
    
    const filteredSignals = filter === 'all' 
      ? initialSignals 
      : initialSignals.filter(sig => sig.market === filter);
      
    filteredSignals.forEach(sig => {
      const card = document.createElement('div');
      card.className = `glass-panel signal-card ${sig.status}`;
      card.id = `signal-card-${sig.id}`;
      
      card.innerHTML = `
        <div class="signal-card-header">
          <div class="asset-info">
            <div class="asset-logo" style="font-size:0.75rem; background:rgba(0,240,255,0.05); color:var(--primary); font-weight:800; border-color:rgba(0,240,255,0.15); padding: 0 8px;">
              ${sig.marketName}
            </div>
            <div class="asset-details">
              <span class="asset-name">${sig.asset}</span>
              <span class="asset-type" style="font-size:0.65rem;">سوق ${sig.marketName} للأسهم</span>
            </div>
          </div>
          <span class="direction-badge ${sig.badgeClass}">${sig.type}</span>
        </div>
        <div class="signal-card-body">
          <div class="signal-price-box">
            <span class="price-label">سعر الدخول</span>
            <span class="price-val text-cyan">${sig.entry}</span>
          </div>
          <div class="signal-price-box">
            <span class="price-label">الهدف المرصود</span>
            <span class="price-val text-green">${sig.tp}</span>
          </div>
          <div class="signal-price-box">
            <span class="price-label">حد وقف الخسارة</span>
            <span class="price-val text-red">${sig.sl}</span>
          </div>
        </div>
        <div class="signal-card-footer">
          <span class="signal-time">${sig.time}</span>
          <span class="signal-result-text ${sig.status === 'target-hit' ? 'text-green' : sig.status === 'stop-loss-hit' ? 'text-red' : 'text-cyan'}">
            ${sig.status === 'active' ? `<span class="pulse-circle" style="display:inline-block; vertical-align:middle; margin-left:6px;"></span>` : ''}
            ${sig.statusText}
          </span>
        </div>
      `;
      
      signalsGrid.appendChild(card);
    });
  }

  // Handle signal filter tab switching
  signalTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      signalTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSignals(btn.dataset.market);
    });
  });



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

  // --- YouTube Learning & Manual Analysis Video Library ---
  const videoData = [
    // --- Category: analysis (تحليلات البورصات اليدوية) ---
    {
      id: 1,
      category: 'analysis',
      market: 'saudi',
      title: 'تحليل سهم الراجحي وأرامكو ومسار تاسي الأسبوعي 🇸🇦',
      description: 'تحليل فني وكمي لحركة السيولة ومستويات التجميع للأسهم القيادية في السوق السعودي عقب الإغلاق الأسبوعي الأخير لمؤشر تاسي.',
      embedUrl: 'https://www.youtube.com/embed/H7iPwbC0W4M?rel=0&amp;controls=1',
      tag: 'تحليل تداول 🇸🇦',
      date: '20 مايو 2026',
      youtubeUrl: 'https://www.youtube.com/watch?v=H7iPwbC0W4M'
    },
    {
      id: 2,
      category: 'analysis',
      market: 'uae',
      title: 'فرص السيولة الذكية في سهم إعمار وأبوظبي الأول 🇦🇪',
      description: 'رصد لمناطق التجميع المؤسسي في أسواق الإمارات (دبي وأبوظبي) وتوقع نقاط الارتداد القوية المتوافقة مع النموذج الكمي.',
      embedUrl: 'https://www.youtube.com/embed/xWd6F26UvV8?rel=0&amp;controls=1',
      tag: 'سوق دبي وأبوظبي 🇦🇪',
      date: '18 مايو 2026',
      youtubeUrl: 'https://www.youtube.com/watch?v=xWd6F26UvV8'
    },
    {
      id: 3,
      category: 'analysis',
      market: 'egypt',
      title: 'تحليل البورصة المصرية وسهم التجاري الدولي (CIB) 🇪🇬',
      description: 'دراسة سلوك رأس المال الأجنبي وحركة السيولة في سهم البنك التجاري الدولي والفرص السانحة في مؤشر EGX30.',
      embedUrl: 'https://www.youtube.com/embed/3S_1aR1f1n4?rel=0&amp;controls=1',
      tag: 'البورصة المصرية 🇪🇬',
      date: '17 مايو 2026',
      youtubeUrl: 'https://www.youtube.com/watch?v=3S_1aR1f1n4'
    },
    {
      id: 4,
      category: 'analysis',
      market: 'qatar',
      title: 'الأداء الإحصائي لبورصة قطر وسهم بنك قطر الوطني (QNB) 🇶🇦',
      description: 'مراجعة أسبوعية للتدفقات النقدية ومعدل تذبذب أسعار الأسهم القيادية في قطر لفرص الدخول الكمية القادمة.',
      embedUrl: 'https://www.youtube.com/embed/8u9f8KjVpMo?rel=0&amp;controls=1',
      tag: 'بورصة قطر 🇶🇦',
      date: '15 مايو 2026',
      youtubeUrl: 'https://www.youtube.com/watch?v=8u9f8KjVpMo'
    },
    {
      id: 5,
      category: 'analysis',
      market: 'kuwait',
      title: 'تحليل سهم بيتك (KFH) والمسار العام لبورصة الكويت 🇰🇼',
      description: 'استعراض رياضي وفني متكامل لنقاط الدعم التاريخية للأسهم القيادية الكويتية وفرص جني الأرباح للمشتركين.',
      embedUrl: 'https://www.youtube.com/embed/g95D5m-J2o0?rel=0&amp;controls=1',
      tag: 'بورصة الكويت 🇰🇼',
      date: '14 مايو 2026',
      youtubeUrl: 'https://www.youtube.com/watch?v=g95D5m-J2o0'
    },
    
    // --- Category: tutorials (الدروس والمواد التعليمية) ---
    {
      id: 6,
      category: 'tutorials',
      title: 'كورس التداول الكمي: كيف تعمل الخوارزميات وصناديق التحوط؟ 📊',
      description: 'فهم الأساس الرياضي خلف أنظمة التداول الكمية وكيف تتغلب البيانات الإحصائية الصارمة على التحيز البشري والعواطف.',
      embedUrl: 'https://www.youtube.com/embed/H7iPwbC0W4M?rel=0&amp;controls=1',
      tag: 'أساسيات الكوانت 🧠',
      date: 'متاح دائماً',
      youtubeUrl: 'https://www.youtube.com/watch?v=H7iPwbC0W4M'
    },
    {
      id: 7,
      category: 'tutorials',
      title: 'إدارة المخاطر الحسابية وحساب حجم الصفقة (Position Sizing) 🛡️',
      description: 'الطريقة الصحيحة لإدارة رأس المال وتحديد حجم العقود بما يضمن حماية المحفظة أثناء فترات التراجع الطبيعية للسوق.',
      embedUrl: 'https://www.youtube.com/embed/xWd6F26UvV8?rel=0&amp;controls=1',
      tag: 'إدارة المخاطر 🛡️',
      date: 'متاح دائماً',
      youtubeUrl: 'https://www.youtube.com/watch?v=xWd6F26UvV8'
    },
    {
      id: 8,
      category: 'tutorials',
      title: 'شرح طريقة تطبيق إشارات الدخول والوقف بدقة عالية 📱',
      description: 'دليل مرئي تفصيلي خطوة بخطوة لكيفية نقل أسعار الدخول، أهداف جني الأرباح (TP) ووقف الخسارة (SL) إلى وسيطك المحلي.',
      embedUrl: 'https://www.youtube.com/embed/3S_1aR1f1n4?rel=0&amp;controls=1',
      tag: 'دليل التطبيق ⚙️',
      date: 'متاح دائماً',
      youtubeUrl: 'https://www.youtube.com/watch?v=3S_1aR1f1n4'
    },
    {
      id: 9,
      category: 'tutorials',
      title: 'استراتيجية مشاركة الأرباح: لماذا هي الخيار الأكثر أماناً للمشترك؟ 🤝',
      description: 'تعرف على فلسفة منصة النموذج الكمي: لا نكسب إلا عندما تكسب أنت. تفاصيل حساب الأداء الشهري وتفعيل العضوية مجاناً.',
      embedUrl: 'https://www.youtube.com/embed/8u9f8KjVpMo?rel=0&amp;controls=1',
      tag: 'نظام الأرباح 🤝',
      date: 'متاح دائماً',
      youtubeUrl: 'https://www.youtube.com/watch?v=8u9f8KjVpMo'
    }
  ];

  const videosContainer = document.getElementById('videos-library-container');
  const videoTabAnalysis = document.getElementById('video-tab-analysis');
  const videoTabTutorials = document.getElementById('video-tab-tutorials');

  function renderVideos(categoryFilter) {
    if (!videosContainer) return;
    
    videosContainer.innerHTML = '';
    
    // Completely isolate manual analysis videos by country
    const filteredVideos = categoryFilter === 'analysis'
      ? videoData.filter(vid => vid.category === categoryFilter && vid.market === activeMarket)
      : videoData.filter(vid => vid.category === categoryFilter);
    
    filteredVideos.forEach(vid => {
      const card = document.createElement('div');
      card.className = 'glass-panel video-card';
      
      card.innerHTML = `
        <div class="video-container-premium">
          <iframe src="${vid.embedUrl}" title="${vid.title}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        <h4>${vid.title}</h4>
        <p>${vid.description}</p>
        <div class="video-card-footer-meta">
          <span class="video-tag">${vid.tag}</span>
          <a href="${vid.youtubeUrl}" target="_blank" rel="noopener noreferrer" class="video-action-link">
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

  // Handle Tab Switch for Videos
  if (videoTabAnalysis && videoTabTutorials) {
    videoTabAnalysis.addEventListener('click', () => {
      videoTabAnalysis.classList.add('active');
      videoTabTutorials.classList.remove('active');
      renderVideos('analysis');
    });

    videoTabTutorials.addEventListener('click', () => {
      videoTabTutorials.classList.add('active');
      videoTabAnalysis.classList.remove('active');
      renderVideos('tutorials');
    });
  }

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
    
    // 6. Synchronize Live Signals (Activate corresponding tab and filter)
    const signalTabBtns = document.querySelectorAll('.signals-tabs .tab-btn');
    signalTabBtns.forEach(btn => {
      if (btn.dataset.market === market) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    renderSignals(market);
    
    // 7. Synchronize Video Library Analysis Video
    const videoTabAnalysis = document.getElementById('video-tab-analysis');
    if (videoTabAnalysis && videoTabAnalysis.classList.contains('active')) {
      renderVideos('analysis');
    }
    
    // 8. Re-render Chart
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
                <li><strong>التقييم الكمي:</strong> معامل المخاطرة إلى العائد (Risk/Reward) ممتاز حالياً. ينصح بوضع وقف الخسارة أسفل منطقة التجميع الحالية بنسبة 2.5%.</li>
              </ul>
              <p><em>ملاحظة: هذا التحليل آلي ومبني على محرك الذكاء الاصطناعي التجريبي لمنصة النموذج الكمي.</em></p>
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
  
  const loginFormView = document.getElementById('login-form-view');
  const signupFormView = document.getElementById('signup-form-view');
  
  const switchToSignup = document.getElementById('switch-to-signup');
  const switchToLogin = document.getElementById('switch-to-login');
  
  const submitLoginBtn = document.getElementById('submit-login-btn');
  const submitSignupBtn = document.getElementById('submit-signup-btn');
  const loginEmailInput = document.getElementById('login-email');
  const loginPasswordInput = document.getElementById('login-password');
  const signupNameInput = document.getElementById('signup-name');
  const signupEmailInput = document.getElementById('signup-email');
  const signupPasswordInput = document.getElementById('signup-password');
  const authMessage = document.getElementById('auth-message');

  if (authModalOverlay) {
    let lastAuthTrigger = null;

    const setAuthMessage = (message, type = '') => {
      if (!authMessage) return;
      authMessage.textContent = message || '';
      authMessage.classList.remove('is-success', 'is-error');
      if (type) authMessage.classList.add(`is-${type}`);
    };

    const authErrorMessage = (error) => {
      const rawMessage = (error && error.message) ? error.message : '';
      const message = rawMessage.toLowerCase();
      if (message.includes('invalid login')) return 'البريد الإلكتروني أو كلمة المرور غير صحيحة.';
      if (message.includes('email not confirmed')) return 'يرجى تأكيد بريدك الإلكتروني قبل تسجيل الدخول.';
      if (message.includes('already registered') || message.includes('already exists')) return 'هذا البريد مسجل بالفعل. جرّب تسجيل الدخول.';
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
        focusActiveAuthInput();
      });
    }

    if (switchToLogin) {
      switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        signupFormView.style.display = 'none';
        loginFormView.style.display = 'block';
        setAuthMessage('');
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
        setAuthMessage('تم إنشاء الحساب. افتح بريدك الإلكتروني واضغط رابط التأكيد لتفعيل الدخول.', 'success');
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
