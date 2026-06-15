(function () {
  "use strict";

  var STORAGE_KEY = "abdo_research_lang";
  var supported = { ar: true, en: true };
  var originalText = new WeakMap();
  var originalAttrs = new WeakMap();
  var observerTimer = null;

  var entries = [
    ["عبدالرحمن محمد | باحث كمي", "Abdulrhman Mohamed | Quant Researcher"],
    ["عبدالرحمن محمد — باحث كمي. أبحاث وأدوات تداول لإدارة مخاطر الصفقات والمحافظ عبر اختبارات خارج العينة وقياس منضبط للأداء.", "Abdulrhman Mohamed — Quant researcher. Research and trading tools for managing trade and portfolio risk through out-of-sample testing and disciplined performance measurement."],
    ["أبحاث كمية وأدوات تداول لإدارة الصفقات والمحافظ، ضبط المخاطر، وقياس الأداء خارج العينة.", "Quant research and trading tools for managing trades and portfolios, controlling risk, and measuring out-of-sample performance."],
    ["عبدالرحمن محمد | باحث كمي مستقل · تداول منهجي", "Abdulrhman Mohamed | Independent Quant Researcher · Systematic Trading"],
    ["عبدالرحمن محمد — باحث كمي. أبحاث نماذج تداول وأدوات للمتداول اليدوي وإدارة مخاطر الصفقات والمحافظ.", "Abdulrhman Mohamed — Quant researcher. Trading model research and tools for discretionary traders and trade/portfolio risk management."],
    ["404 — الصفحة غير موجودة | أبحاث كمية", "404 — Page Not Found | Quant Research"],
    ["تواصل معي | أبحاث كمية", "Contact Me | Quant Research"],
    ["شروط الخدمة | عبدالرحمن محمد", "Terms of Service | Abdulrhman Mohamed"],
    ["سياسة الخصوصية | عبدالرحمن محمد", "Privacy Policy | Abdulrhman Mohamed"],
    ["الأسئلة الشائعة | أبحاث كمية", "FAQ | Quant Research"],
    ["من أنا | عبدالرحمن محمد", "About Me | Abdulrhman Mohamed"],
    ["نبذة عن عبدالرحمن محمد ومنهجيته في بناء أبحاث وأدوات تداول قابلة للمراجعة عبر الأسواق المالية.", "About Abdulrhman Mohamed and his approach to building reviewable research and trading tools across financial markets."],
    ["منشور بحثي | عبدالرحمن محمد", "Research Post | Abdulrhman Mohamed"],

    ["أبحاث", "Research"],
    ["كمية", "Quant"],
    ["أبحاث كمية · الأسواق العربية", "Quant Research · Arabic Markets"],
    ["عبدالرحمن محمد", "Abdulrhman Mohamed"],
    ["أحجز مكالمة", "Book a Call"],
    ["المنهجية", "Methodology"],
    ["الأبحاث", "Research"],
    ["من أنا", "About Me"],
    ["الأسئلة الشائعة", "FAQ"],
    ["تسجيل الدخول", "Log In"],
    ["إنشاء حساب", "Create Account"],
    ["استراتيجيتنا", "Our Approach"],
    ["تواصل معي", "Contact Me"],
    ["التواصل", "Contact"],
    ["اختر قناة التواصل", "Get in Touch"],
    ["اختر القناة المناسبة لاستفسارك. المكالمات التعريفية مخصصة لفهم احتياجك البحثي وتركيزك في الأسواق، وليست جلسات استشارية أو إدارة محافظ أو اشتراك إشارات.", "Select the appropriate channel for your inquiry. Introductory calls are scoped to understanding your research needs and market focus — they are not advisory, portfolio management, or signal-subscription sessions."],
    ["حجز مكالمة", "Schedule a Call"],
    ["جلسة مركزة لمدة 20 دقيقة لمناقشة أهدافك البحثية، الأسواق محل الاهتمام، وكيف يمكن أن تناسب لوحة البيانات سير عملك.", "A focused 20-minute session to discuss your research objectives, market coverage, and how my dashboard fits your workflow."],
    ["احجز جلسة", "Book a Session"],
    ["تواصل مباشرة للأسئلة المتعلقة بالوصول، الاشتراكات، أو المواد البحثية المنشورة.", "Reach out directly for questions about access, subscriptions, or existing research material."],
    ["راسلني على تيليجرام", "Message on Telegram"],
    ["جميع المحتويات تُنتج لأغراض بحثية وتعليمية فقط. لا يمثل أي محتوى في هذه الصفحة نصيحة استثمارية أو دعوة لاتخاذ قرار أو ضماناً للعوائد. لا يتم تقديم خدمات إدارة محافظ.", "All content is produced for research and educational purposes only. Nothing on this page constitutes investment advice, a solicitation, or a guarantee of returns. No portfolio management services are offered."],
    ["جميع المحتويات لأغراض بحثية وتعليمية فقط. لا يمثل أي محتوى نصيحة استثمارية أو دعوة لاتخاذ قرار أو ضماناً للعوائد. لا يتم تقديم خدمات إدارة محافظ.", "All content is produced for research and educational purposes only. Nothing on this page constitutes investment advice, a solicitation, or a guarantee of returns. No portfolio management services are offered."],
    ["روابط مهمة", "Important Links"],
    ["روابط سريعة", "Quick Links"],
    ["تواصل عبر تيليجرام", "Contact on Telegram"],
    ["العودة للرئيسية", "Back to Home"],
    ["الرئيسية", "Home"],
    ["لوحة التحكم", "Dashboard"],
    ["شروط الخدمة", "Terms of Service"],
    ["سياسة الخصوصية", "Privacy Policy"],
    ["إطار البحث", "Research Framework"],
    ["قناة يوتيوب", "YouTube Channel"],
    ["قناة YouTube", "YouTube Channel"],
    ["© 2026 عبدالرحمن محمد", "© 2026 Abdulrhman Mohamed"],
    ["قنوات التواصل", "Contact Channels"],
    ["الشروط القانونية", "Legal Terms"],
    ["بيان الخصوصية", "Privacy Notice"],
    ["إطار بحثي يساعد على قراءة القرار قبل التنفيذ، بدون وعود بعائد أو توصيات جاهزة.", "A research framework for reading decisions before execution, without return promises or ready-made calls."],
    ["السياق الكلي", "Macro Context"],
    ["الحالة المالية وسلوك السعر", "Financial Condition and Price Behavior"],
    ["مخاطر الصفقة والمحفظة", "Trade and Portfolio Risk"],
    ["لمن؟", "For Whom?"],
    ["الرؤى", "Insights"],
    ["المبادئ", "Principles"],
    ["البحث", "Research"],
    ["الفيديو", "Videos"],
    ["الخطط", "Pricing"],
    ["مسارات واضحة حسب احتياجك البحثي.", "Clear paths based on your research needs."],
    ["ابدأ من مجتمع تيليجرام البحثي المجاني، أو اختر لوحة الأبحاث، مكالمة خاصة 1v1، أو نطاق متابعة محفظة قائم على البحث والمخاطر.", "Start with the free Telegram Research Community, or choose the research dashboard, a private 1v1 call, or a research-and-risk portfolio monitoring scope."],
    ["مجتمع تيليجرام البحثي", "Telegram Research Community"],
    ["متابعة مجانية للإعلانات العامة، تحديثات الأبحاث، والتنبيهات الخاصة بالفيديوهات أو المحتوى الجديد.", "Free access to general announcements, research updates, and notices for new videos or material."],
    ["تحديثات عامة حول الأبحاث والفيديوهات", "General research and video updates"],
    ["إعلانات الوصول والمحتوى الجديد", "Access and new-content announcements"],
    ["بدون التزام أو رسوم", "No commitment or fee"],
    ["انضم إلى تيليجرام", "Join Telegram"],
    ["خطة لوحة الأبحاث", "Research Dashboard Plan"],
    ["تواصل لتفعيل الحساب", "Contact to Activate"],
    ["مكالمة استشارة خاصة 1v1", "Private 1v1 Consultation Call"],
    ["جلسة خاصة لمناقشة هدفك البحثي، أسئلتك، وطريقة استخدامك للأدوات أو قراءة المخاطر.", "A private session to discuss your research objective, questions, and how you use tools or read risk."],
    ["مناقشة خاصة للأسئلة والمنهجية", "Private discussion for questions and methodology"],
    ["توضيح قراءة السياق والمخاطر", "Clarify context and risk reading"],
    ["ليست توصية شراء أو بيع", "Not a buy or sell recommendation"],
    ["احجز مكالمة خاصة", "Book Private Call"],
    ["نطاق متابعة المحفظة", "Portfolio Monitoring Scope"],
    ["احجز مكالمة", "Book a Call"],
    ["خطط قابلة للتخصيص حسب نطاق العمل.", "Custom plans based on scope."],
    ["اختر بين الوصول إلى لوحة الأبحاث أو نطاق متابعة المحفظة. التسعير النهائي يعتمد على الأسواق، عدد الأدوات، وتكرار المراجعة المطلوبة.", "Choose between research dashboard access or a portfolio monitoring scope. Final pricing depends on markets, number of tools, and required review cadence."],
    ["خطة لوحة البيانات", "Dashboard Plan"],
    ["وصول إلى لوحة الأبحاث، مكتبة الفيديو، وسجل القراءات حسب الأسواق التي تختارها.", "Access the research dashboard, video library, and market readings for the markets you choose."],
    ["تخصيص الأسواق المغطاة", "Customize covered markets"],
    ["مكتبة أبحاث وفيديو حسب اللغة", "Research and video library by language"],
    ["متابعة مؤشرات الأداء والمخاطر", "Track performance and risk metrics"],
    ["تخصيص الخطة", "Customize Plan"],
    ["خطة إدارة المحفظة", "Portfolio Monitoring Scope"],
    ["إطار مخصص لمتابعة التعرض، المخاطر، ومراجعة القرارات على مستوى المحفظة.", "A customized framework for monitoring exposure, risk, and decision review at the portfolio level."],
    ["تحديد ميزانية المخاطر", "Define risk budget"],
    ["مراجعات دورية للصفقات والمراكز", "Periodic trade and position reviews"],
    ["تقارير بحثية حسب نطاق المحفظة", "Research reports by portfolio scope"],
    ["مرحباً بعودتك", "Welcome back"],
    ["البريد الإلكتروني", "Email"],
    ["أدخل بريدك الإلكتروني", "Enter your email"],
    ["كلمة المرور", "Password"],
    ["أدخل كلمة المرور", "Enter your password"],
    ["الدخول للوحة التحكم", "Open Dashboard"],
    ["ليس لديك حساب؟", "No account yet?"],
    ["أنشئ حساباً جديداً", "Create a new account"],
    ["إنشاء حساب جديد", "Create New Account"],
    ["اطلب الوصول إلى مكتبة الأبحاث والفيديو", "Request access to the research and video library"],
    ["الاسم الكامل", "Full Name"],
    ["استخدم كلمة مرور قوية", "Use a strong password"],
    ["إنشاء الحساب", "Create Account"],
    ["لديك حساب بالفعل؟", "Already have an account?"],
    ["إعادة إرسال رابط التأكيد", "Resend confirmation link"],

    ["باحث كمي · خبرة أكثر من 8 سنوات", "Quant Researcher · 8+ Years of Experience"],
    ["أبحاث وأدوات تداول لبناء قرارات قابلة للقياس", "Quant Research and Trading Tools for Measurable Decisions"],
    ["أطوّر أطر بحث ونماذج تداول تُعامل السوق كمسألة احتمالات لا كوعود. يبدأ العمل من الفرضية، يمر عبر اختبار خارج العينة، ثم يُترجم إلى قواعد للصفقة أو المحفظة تشمل حجم الصفقة أو المركز، حدود المخاطر، ومراجعة الأداء.", "I develop research frameworks and trading models that treat markets as probabilities, not promises. The process starts with a hypothesis, passes through out-of-sample testing, then becomes trade or portfolio rules covering trade/position size, risk limits, and performance review."],
    ["الأسواق المغطّاة", "Covered Markets"],
    ["مصر", "Egypt"],
    ["السعودية", "Saudi Arabia"],
    ["الإمارات", "UAE"],
    ["قطر", "Qatar"],
    ["الكويت", "Kuwait"],
    ["الولايات المتحدة الأمريكية", "United States"],
    ["العملات المشفرة", "Crypto"],
    ["العقود الآجلة", "Futures"],
    ["راجع إطار البحث", "Review the Framework"],
    ["إطار التداول والمخاطر", "Trading and Risk Framework"],
    ["من الفرضية البحثية إلى قواعد تداول قابلة للمراجعة.", "From research hypothesis to reviewable trading rules."],
    ["صياغة فرضية تبدأ من حالة الاقتصاد الكلي، ثم الحالة المالية للشركة أو العملة، ثم سلوك السعر.", "Form a hypothesis that starts with the macro backdrop, then the financial condition of the company or currency, then price behavior."],
    ["اختبار الفرضية عبر فترات سوق مختلفة مع فصل بيانات التطوير عن بيانات التحقق.", "Test the hypothesis across different market regimes while separating development data from validation data."],
    ["تحويل النتائج إلى قواعد تنفيذ: حجم صفقة أو مركز، حدود خسارة، شروط دخول وخروج.", "Turn results into execution rules: trade or position size, loss limits, and entry/exit conditions."],
    ["مراجعة دورية للأداء، الانحراف، والتعرّض للمخاطر قبل أي تعديل على النموذج.", "Periodically review performance, drift, and risk exposure before changing any model."],

    ["ثلاث ركائز قبل أي قرار تداول أو استثمار.", "Three pillars before any trading or investment decision."],
    ["مراجعة البيانات والسياق", "Data and Context Review"],
    ["تحديد فرضية قابلة للقياس بناءً على حالة الاقتصاد الكلي، الحالة المالية للشركة أو العملة، ثم سلوك السعر.", "Define a measurable hypothesis based on the macro backdrop, the company or currency's financial condition, then price behavior."],
    ["اختبارات خارج العينة ومنهجية مراجعة", "Out-of-Sample Tests and Review Process"],
    ["اختبار خارج العينة ومنهجية Walk-Forward لتقليل خطر الملاءمة الزائدة، مع عرض فترات التراجع بوضوح.", "Use out-of-sample and walk-forward testing to reduce overfitting risk, while showing drawdown periods clearly."],
    ["إدارة الصفقة والمخاطر", "Trade and Risk Management"],
    ["تحديد حجم الصفقة أو المركز وفق مخاطرة الفكرة، حالة المركز، وحالة المحفظة ككل. الحفاظ على رأس المال يسبق السعي للعائد.", "Size the trade or position according to idea risk, position state, and the portfolio as a whole. Capital preservation comes before return seeking."],
    ["بحث منظم", "Structured Research"],
    ["إفصاح منهجي", "Method Disclosure"],
    ["إدارة المخاطر أولاً", "Risk First"],
    ["القيم التي تحكم عملية البحث واتخاذ القرار: قابلية القياس، وضوح الافتراضات، والانضباط أمام المخاطر.", "The values behind the research and decision process: measurability, clear assumptions, and discipline around risk."],
    ["المنهجية البحثية", "Research Methodology"],
    ["المنهجية الكمية", "Quantitative Methodology"],
    ["تحديد السؤال", "Define the Question"],
    ["أبدأ بسؤال بحثي محدد: ما السلوك الذي نريد قياسه؟ وفي أي سوق أو سهم يظهر بوضوح؟", "I start with a specific research question: what behavior do we want to measure, and in which market or stock does it show clearly?"],
    ["صياغة الفرضية", "Form the Hypothesis"],
    ["أفصل كل سوق عن الآخر، وأراجع الاقتصاد الكلي، الحالة المالية للشركات أو العملات، ثم مستويات السعر وسلوكه قبل بناء أي قراءة.", "I separate each market, then review the macro backdrop, company or currency financial condition, and price levels/behavior before building a reading."],
    ["معيار قبول النموذج", "Model Acceptance Criteria"],
    ["يتم تقييم كل نموذج وفق التوقع الرياضي، التراجع الأقصى، الحساسية للمعايير، وجودة التنفيذ بعد التكاليف.", "Each model is evaluated by expected value, maximum drawdown, parameter sensitivity, and execution quality after costs."],
    ["صياغة قواعد المخاطر", "Define Risk Rules"],
    ["لا يتم النظر في أي مركز قبل تحديد مخاطرة الصفقة، حجم التعرض، أثرها على المحفظة ككل، والسيناريو الذي يجعل الفرضية غير صالحة.", "No position is considered before defining trade risk, exposure size, portfolio impact, and the scenario that invalidates the hypothesis."],
    ["النشر والمتابعة", "Publish and Monitor"],
    ["عندما تصبح القراءة واضحة، تتحول إلى بحث أو فيديو داخل المكتبة، ثم تتم مراجعتها عند تغير ظروف السوق.", "When the reading is clear, it becomes a research post or video in the library, then gets reviewed when market conditions change."],
    ["عرض الافتراضات والمخاطر", "Show Assumptions and Risk"],
    ["ميزة إحصائية موثّقة", "Documented Statistical Edge"],
    ["تخصيص حجم المراكز وفق ميزانية المخاطر", "Position Sizing by Risk Budget"],
    ["مراجعة أداء تشمل فترات التراجع", "Performance Review Including Drawdowns"],

    ["أبني أبحاثاً كمية تُقيّم القرار قبل التنفيذ.", "I build quantitative research that evaluates decisions before execution."],
    ["محلل ومتداول بخبرة تزيد عن ٨ سنوات في الأسواق المالية العالمية.", "Analyst and trader with more than 8 years of experience in global financial markets."],
    ["أنا عبدالرحمن محمد.", "I am Abdulrhman Mohamed."],
    ["أنا محلل ومتداول بخبرة تزيد عن ٨ سنوات في الأسواق المالية العالمية. أعمل على تحويل الخبرة العملية إلى محتوى بحثي واضح، قابل للمراجعة، بعيد عن المبالغة.", "I am an analyst and trader with more than 8 years of experience in global financial markets. I turn practical market experience into clear, reviewable research without exaggeration."],
    ["الفلسفة", "Philosophy"],
    ["الفلسفة بسيطة: لا أتعامل مع السوق كقصة أو إحساس. أبدأ من فرضية واضحة، أراجع الاقتصاد الكلي، الحالة المالية للشركة أو العملة، سلوك السعر، ثم أحدد متى تكون الفكرة صالحة ومتى يجب تجاهلها.", "The philosophy is simple: I do not treat the market as a story or a feeling. I start with a clear hypothesis, review the macro backdrop, the company or currency's financial condition, price behavior, then define when the idea is valid and when it should be ignored."],
    ["المتداول اليدوي", "Discretionary Trader"],
    ["لديك خبرة في السوق وتريد نقل قراراتك من القراءة الانطباعية إلى قواعد قابلة للاختبار والمراجعة.", "You have market experience and want to move decisions from impression-based readings into rules that can be tested and reviewed."],
    ["صاحب المحفظة النشطة", "Active Portfolio Owner"],
    ["تحتاج إلى منهجية تساعدك على تقييم التعرض، التنويع، والتراجع المحتمل قبل زيادة المخاطر.", "You need a process that helps evaluate exposure, diversification, and possible drawdown before increasing risk."],
    ["المتداول المنهجي", "Systematic Trader"],
    ["تحتاج إلى أدوات وقراءات تساعدك على فهم السياق، مستويات بطلان الفكرة، وإدارة الصفقة قبل التنفيذ.", "You need tools and readings that clarify context, invalidation levels, and trade management before execution."],
    ["الميزة القابلة للقياس", "Measurable Edge"],
    ["كل نموذج يبدأ بسؤال قابل للقياس، لا بانطباع بصري. يبدأ التحليل من الاقتصاد الكلي، ثم مالية الشركات أو العملات، ثم سلوك السعر عبر بيئات سوق مختلفة.", "Every model starts with a measurable question, not a visual impression. Analysis begins with macro conditions, then company or currency financials, then price behavior across market regimes."],
    ["مخاطرة حسب الفكرة", "Risk by Idea"],
    ["القرار لا يقف عند نقطة الدخول. يتم تحديد المخاطر حسب الصفقة أو المركز وحالة المحفظة ككل، مع شروط واضحة للخروج أو بطلان الفرضية.", "The decision does not stop at entry. Risk is defined by the trade or position and the state of the whole portfolio, with clear exit and invalidation conditions."],
    ["نطاق بحث متعدد", "Multi-Market Research Scope"],
    ["العمل يغطي أسواقاً متعددة حسب الدولة وفئة الأصل، مع قراءة تبدأ من السياق الاقتصادي والمالي ثم سلوك السعر وقابلية التنفيذ.", "The work covers multiple markets by country and asset class, with each reading starting from economic and financial context, then price behavior and execution feasibility."],

    ["مكتبة الفيديو", "Video Library"],
    ["مواد تعليمية تدعم القرار اليدوي", "Educational material for discretionary decisions"],
    ["تعليمي", "Education"],
    ["تغطية من نظام ML", "Coverage from the ML System"],
    ["لا يوجد منحنى حقيقي منشور لهذا السوق من ملفات ML.", "No real published curve is available for this market from the ML files."],
    ["المحفظة / النموذج الكمي", "Portfolio / Quant Model"],
    ["النموذج الكمي", "Quant Model"],

    ["رؤى بحثية", "Research Insights"],
    ["أبحاث ورؤى السوق", "Research and Market Insights"],
    ["اقرأ على تيليجرام", "Read on Telegram"],
    ["تيليجرام", "Telegram"],
    ["قراءة سوقية", "Market Reading"],
    ["توقع بحثي تاريخي", "Historical Research View"],
    ["تحليل كمي", "Quant Analysis"],
    ["متابعة بحثية", "Research Follow-Up"],
    ["قراءة السياق والسعر في البورصة المصرية: Q2 2026", "Context and Price Reading in the Egyptian Exchange: Q2 2026"],
    ["قراءة منهجية تجمع حالة الاقتصاد الكلي، جودة القوائم المالية، وسلوك السعر في أسهم EGX30 القيادية، مع توثيق واضح للفرضية وحدود المخاطر.", "A structured reading combining the macro backdrop, financial statement quality, and price behavior in leading EGX30 stocks, with clear documentation of the hypothesis and risk limits."],
    ["لماذا تتفوق الأسهم القيادية السعودية في بيئات التضخم المرتفع؟", "Why Do Saudi Blue Chips Outperform in High-Inflation Environments?"],
    ["دراسة إحصائية على بيانات 8 سنوات تقارن أداء أسهم الطاقة والمواد الأساسية في تداول بالمؤشر العام خلال دورات التضخم من منظور العائد المعدّل بالمخاطر.", "An 8-year statistical study comparing Saudi energy and materials stocks with the broad index during inflation cycles from a risk-adjusted return perspective."],
    ["الميزة الإحصائية: لماذا نسبة النجاح 36% قد تكون أفضل من 70%؟", "Statistical Edge: Why a 36% Win Rate Can Be Better Than 70%"],
    ["أشرح رياضياً مفهوم Expected Value ولماذا لا تكفي نسبة النجاح وحدها لتقييم جودة أي نموذج أو قرار داخل المحفظة.", "A mathematical explanation of expected value and why win rate alone is not enough to judge the quality of a model or portfolio decision."],
    ["28 مايو 2026", "May 28, 2026"],
    ["24 مايو 2026", "May 24, 2026"],
    ["19 مايو 2026", "May 19, 2026"],
    ["20 دقيقة", "20 min"],

    ["إطار عمل واضح يشبه طريقة فرق التداول والبحث المهنية: سؤال محدد، بيانات قابلة للمراجعة، قواعد مخاطر، ثم متابعة دورية.", "A clear workflow similar to professional trading and research teams: a defined question, reviewable data, risk rules, then periodic monitoring."],
    ["لمن هذا؟", "Who Is This For?"],
    ["خبرة عملية عبر أسواق متعددة", "Practical Experience Across Markets"],
    ["عدة أسواق", "Multiple Markets"],
    ["تنويع مصادر المخاطر", "Diversified Risk Sources"],
    ["تخصيص حجم المراكز وفق ميزانية المخاطر", "Position Sizing by Risk Budget"],
    ["قراءة واضحة قبل الدخول أو الخروج", "Clear Reading Before Entry or Exit"],
    ["تركيز على حجم الصفقة وحدود الخسارة", "Focus on Trade Size and Loss Limits"],
    ["إطار موحد لتقييم العائد مقابل المخاطر", "Unified Framework for Return vs Risk"],
    ["تنويع عبر فئات أصول وأسواق مختلفة", "Diversification Across Asset Classes and Markets"],
    ["إدارة المخاطر قبل العائد", "Risk Before Return"],
    ["مكالمة تعريفية", "Introductory Call"],
    ["محادثة قصيرة لفهم أسلوبك، أفقك الزمني، وحدود المخاطر المقبولة قبل مناقشة أي منهجية أو نموذج.", "A short conversation to understand your style, time horizon, and acceptable risk limits before discussing any methodology or model."],
    ["بلا التزام", "No Commitment"],
    ["بلا التزام مسبق", "No Upfront Commitment"],
    ["ناقش ما إذا كان إطار البحث مناسباً لطريقتك في التداول", "Discuss whether the research framework fits your trading approach"],

    ["إجابات مباشرة حول منهجيتي، تغطية الأسواق، الوصول، مكتبة الفيديو، وحدود المحتوى البحثي.", "Direct answers about my methodology, market coverage, access, the video library, and the limits of the research content."],
    ["كل الأسئلة", "All Questions"],
    ["الأسواق", "Markets"],
    ["الوصول", "Access"],
    ["مبادئ العمل", "Working Principles"],
    ["ما الفلسفة الأساسية خلف أبحاث عبدالرحمن محمد؟", "How is the research framework built?"],
    ["يركز عملي على بناء نماذج قابلة للاختبار ومواد تساعد المتداول اليدوي وصاحب المحفظة على قراءة السوق وإدارة المخاطر. ما أقدمه هو إطار بحث وتحليل، وليس وعداً بعائد أو توصية تنفيذ.", "My work focuses on building testable models and material that help discretionary traders and portfolio owners read the market and manage risk. What I provide is a research and analysis framework, not a promise of returns or execution advice."],
    ["هل المحتوى توصية تداول أو نصيحة استثمارية؟", "Is the content trading advice or investment advice?"],
    ["لا. المحتوى بحثي وتعليمي فقط. لا توجد وعود بعائد، ولا أتحمل قرار الدخول أو الخروج أو حجم الصفقة. أي قرار مالي يجب أن يعتمد على تقييمك الشخصي ووضعك ومخاطرك.", "No. The content is research and education only. There are no return promises, and I do not take responsibility for entries, exits, or trade size. Any financial decision must be based on your own evaluation, circumstances, and risk."],
    ["ما الأسواق التي تغطيها؟", "Which markets do you cover?"],
    ["أتابع الأسواق حسب الدولة أو فئة الأصل: مصر، السعودية، الإمارات، قطر، الكويت، الولايات المتحدة الأمريكية، العملات المشفرة، والعقود الآجلة. كل سوق له بياناته وقراءته بشكل منفصل.", "I track markets by country or asset class: Egypt, Saudi Arabia, UAE, Qatar, Kuwait, the United States, crypto, and futures. Each market has its own data and reading."],
    ["ما أنواع الأدوات أو الأفكار التي تركز عليها؟", "What types of instruments or ideas do you focus on?"],
    ["أركز على الربط بين حالة الاقتصاد الكلي، الحالة المالية للشركات أو العملات، ثم سلوك السعر: مناطق الفشل والاستعادة، الانحراف عن المتوسط، وسلوك الأدوات الأكثر قابلية للقراءة داخل كل سوق. الهدف ليس تغطية كل شيء، بل اختيار ما يمكن قياسه بوضوح.", "I focus on linking the macro backdrop, company or currency financial condition, then price behavior: failure and reclaim zones, mean deviation, and the most readable instruments within each market. The goal is not to cover everything, but to choose what can be measured clearly."],
    ["كيف يتم فصل الأسواق داخل الموقع؟", "How are markets separated inside the site?"],
    ["كيف تتغير المنهجية مع تغير ظروف السوق؟", "How does the methodology change with market conditions?"],
    ["عندما تتغير حالة الاقتصاد الكلي، أو الحالة المالية للأداة، أو سلوك السعر، تتغير طريقة قراءة الفكرة. لا أتعامل مع نموذج واحد كأنه صالح دائماً، بل أراجع الشروط قبل الاعتماد عليه.", "When the macro backdrop, the instrument's financial condition, or price behavior changes, the reading changes. I do not treat one model as always valid; I review the conditions before relying on it."],
    ["ما الذي تتضمنه الخطة البحثية؟", "What does the research plan include?"],
    ["الخطة البحثية تشمل تحديد السوق، مراجعة الاقتصاد الكلي، قراءة الحالة المالية، مراقبة سلوك السعر، توثيق الفرضية، ثم مراجعة المخاطر قبل نشر البحث أو الفيديو.", "The research plan includes selecting the market, reviewing macro conditions, reading financial condition, monitoring price behavior, documenting the hypothesis, then reviewing risk before publishing research or video."],
    ["كيف يتم ربط التحليل بهدف المتداول أو المستثمر؟", "How is analysis connected to a trader or investor's objective?"],
    ["أفرّق بين من يريد متابعة سوق محدد، ومن يريد فهم منهجية، ومن يريد قراءة مخاطر صفقة أو محفظة. لذلك لا أقدم نفس الإجابة للجميع، بل أوضح الإطار المناسب للسؤال.", "I distinguish between someone tracking a specific market, someone learning a methodology, and someone reading trade or portfolio risk. I do not give the same answer to everyone; I clarify the right framework for the question."],
    ["كيف تتعامل مع إدارة المخاطر؟", "How do you handle risk management?"],
    ["قبل أي فكرة أسأل: أين تكون خاطئة؟ ما حجم الصفقة أو المركز؟ ما أثرها على المحفظة ككل؟ وما أسوأ سيناريو منطقي؟ إذا لم تكن المخاطرة واضحة، لا أعتبر الفكرة مكتملة.", "Before any idea, I ask: where is it wrong, what is the trade or position size, what is its impact on the portfolio as a whole, and what is the logical worst case? If risk is not clear, the idea is incomplete."],
    ["كيف تتحول الفكرة إلى بحث قابل للاستخدام؟", "How does an idea become usable research?"],
    ["نُخضع كل فرضية لتسلسل واضح: اقتصاد كلي، حالة مالية، سلوك سعر، ثم إطار مخاطر قابل للمراجعة.", "Every hypothesis goes through a clear sequence: macro conditions, financial condition, price behavior, then a reviewable risk framework."],
    ["ما الذي يجعل المنهجية مختلفة عن متابعة توصيات؟", "What makes the methodology different from following tips?"],
    ["التركيز ليس على كلمة \"شراء\" أو \"بيع\". الأهم هو لماذا الفكرة موجودة، ما الشرط الذي يبطلها، كيف تُدار المخاطرة، وهل السلوك قابل للتكرار أم مجرد حركة عشوائية.", "The focus is not the word \"buy\" or \"sell\". What matters is why the idea exists, what invalidates it, how risk is managed, and whether the behavior is repeatable or just random movement."],
    ["كيف أعرف أن المحتوى يستحق وقتي؟", "How do I know the content is worth my time?"],
    ["القيمة ليست في كثرة المنشورات، بل في وضوح الفكرة. إذا كنت تريد فهم السياق، المخاطر، ومستويات بطلان الفرضية بدلاً من مطاردة إشارات عشوائية، فالمحتوى مناسب لك.", "The value is not in the number of posts, but in the clarity of the idea. If you want to understand context, risk, and invalidation levels instead of chasing random signals, the content is for you."],
    ["كيف تبدأ عملية الوصول أو التعارف؟", "How does access or introduction start?"],
    ["تبدأ بمكالمة قصيرة لفهم السوق الذي تهتم به، مستوى خبرتك، وطريقة استخدامك للأبحاث أو الفيديوهات. بعدها يتم توضيح ما يناسبك وما لا يناسبك بصراحة.", "It starts with a short call to understand the market you care about, your experience level, and how you will use the research or videos. After that, I clearly explain what fits and what does not."],
    ["هل يوجد اشتراك أو رسوم للوصول؟", "Is there a subscription or access fee?"],
    ["تفاصيل الوصول يتم توضيحها بشكل مباشر قبل أي التزام. لا توجد وعود بعائد، ولا يتم تقديم الوصول كمنتج سريع، بل كمساحة أبحاث وفيديوهات لمن يفهم طبيعة المخاطر.", "Access details are explained directly before any commitment. There are no return promises, and access is not presented as a quick product, but as a research and video space for people who understand risk."],
    ["هل يمكن طلب تفضيلات أو قيود معينة؟", "Can I request preferences or constraints?"],
    ["نعم، يمكن مناقشة سوق محدد، أسهم مستبعدة، أو مستوى مخاطرة مفضل. قبول أي طلب يعتمد على توفر بيانات اقتصادية ومالية وسعرية كافية تسمح بتحليل محترم.", "Yes. A specific market, excluded stocks, or preferred risk level can be discussed. Acceptance depends on having enough economic, financial, and price data for a proper analysis."],
    ["هل توجد تكاليف إضافية يجب معرفتها؟", "Are there additional costs to know about?"],
    ["أي تكاليف خاصة بمنصة التداول، البيانات، العمولات، أو تنفيذ الصفقات تكون خارج الموقع وخارج المحتوى البحثي. دوري هو توضيح الفكرة والمخاطر، وليس إدارة حسابات أو تنفيذ أوامر.", "Any costs related to trading platforms, data, commissions, or execution are outside the site and outside the research content. My role is to clarify the idea and risk, not manage accounts or execute orders."],
    ["هل يوجد حد أدنى لحجم الحساب؟", "Is there a minimum account size?"],
    ["لا أضع حداً عاماً داخل الموقع لأن الهدف ليس إدارة أموال. لكن حجم الحساب مهم عند تطبيق أي فكرة، لأن العمولات، حجم الصفقة أو المركز، وحالة المحفظة ككل قد تجعل نفس الفكرة مناسبة لشخص وغير مناسبة لشخص آخر.", "I do not set a general minimum on the site because the goal is not money management. But account size matters when applying any idea, because commissions, trade or position size, and portfolio state can make the same idea suitable for one person and unsuitable for another."],
    ["كيف أبقى على اطلاع بالتحديثات؟", "How do I stay updated?"],
    ["التحديثات تظهر داخل لوحة التحكم من خلال الأبحاث المنشورة ومكتبة الفيديو. التحليلات المهمة يمكن أيضاً الإشارة لها عبر قنوات التواصل الرسمية.", "Updates appear inside the dashboard through published research and the video library. Important analysis may also be referenced through official communication channels."],

    ["للاستفسارات المهنية أو طلب الوصول إلى الأبحاث، اختر القناة المناسبة. المكالمة التعريفية مخصصة لفهم احتياجك البحثي ونطاق الأسواق محل الاهتمام، وليست جلسة توصيات أو إدارة أموال.", "For professional inquiries or research access requests, choose the right channel. The introductory call is for understanding your research need and markets of interest; it is not a recommendations or money-management session."],
    ["مكالمة تعريفية قصيرة لمناقشة نطاق الأبحاث، أسلوب إدارة المخاطر، وطريقة استخدام لوحة الأبحاث.", "A short introductory call to discuss research scope, risk management style, and how to use the research dashboard."],
    ["للتواصل السريع بخصوص الحساب، الوصول، أو الأسئلة العامة حول الاشتراك والمواد البحثية.", "For quick contact about accounts, access, subscriptions, or research material."],
    ["افتح تيليجرام", "Open Telegram"],
    ["تابع الشروحات العامة والتحديثات التعليمية المرتبطة بالمنهجية الكمية والأسواق.", "Follow general explanations and educational updates related to the quantitative methodology and markets."],
    ["جميع النقاشات والمحتويات لأغراض بحثية وتعليمية فقط. لا يتم تقديم توصيات شخصية أو ضمان عائد أو إدارة محافظ من خلال هذه الصفحة.", "All discussions and content are for research and education only. No personal recommendations, return guarantees, or portfolio management are provided through this page."],

    ["آخر تحديث: 11 يونيو 2026", "Last updated: June 11, 2026"],
    ["1. نطاق الخدمة", "1. Scope of Service"],
    ["يوفر هذا الموقع محتوى بحثياً وتعليمياً حول النماذج الكمية، سلوك الأسواق، وإدارة مخاطر المحافظ. المحتوى لا يمثل نصيحة استثمارية شخصية، ولا يعد عرضاً لإدارة أموال أو شراء أو بيع أي أصل مالي.", "This website provides research and educational content about quantitative models, market behavior, and portfolio risk management. The content is not personal investment advice and is not an offer to manage money or buy or sell any financial asset."],
    ["2. استخدام المحتوى", "2. Use of Content"],
    ["تستخدم الأبحاث لأغراض التحليل والتعلم فقط.", "Research is used for analysis and learning only."],
    ["أي قرار تداول أو استثمار تتحمله أنت بالكامل بناءً على ظروفك وأهدافك ومخاطرك.", "You are fully responsible for any trading or investment decision based on your circumstances, objectives, and risk."],
    ["الأداء السابق أو نتائج النماذج لا يضمنان نتائج مستقبلية.", "Past performance or model results do not guarantee future results."],
    ["3. الحسابات والوصول", "3. Accounts and Access"],
    ["قد يتطلب الوصول إلى لوحة التحكم أو بعض الأبحاث إنشاء حساب وموافقة إدارية. نحتفظ بحق قبول أو رفض أو تعليق الوصول عند وجود إساءة استخدام، بيانات غير صحيحة، أو نشاط يخالف هذه الشروط.", "Access to the dashboard or some research may require an account and administrative approval. We reserve the right to accept, reject, or suspend access in cases of misuse, inaccurate information, or activity that violates these terms."],
    ["4. الملكية الفكرية", "4. Intellectual Property"],
    ["جميع النصوص، التصاميم، النماذج التوضيحية، وطريقة عرض المحتوى مملوكة لعبدالرحمن محمد أو مرخصة له. لا يجوز نسخها أو إعادة نشرها أو بيعها دون إذن مكتوب.", "All text, designs, illustrative models, and content presentation are owned by or licensed to Abdulrhman Mohamed. They may not be copied, republished, or sold without written permission."],
    ["5. حدود المسؤولية", "5. Limitation of Liability"],
    ["نقدم المحتوى كما هو، دون ضمان دقة مطلقة أو ملاءمة لغرض استثماري محدد. لا نتحمل مسؤولية الخسائر أو الأضرار الناتجة عن استخدام الموقع أو الاعتماد على محتواه.", "Content is provided as is, without a guarantee of absolute accuracy or suitability for any specific investment purpose. We are not responsible for losses or damages resulting from site use or reliance on its content."],
    ["6. التغييرات والتواصل", "6. Changes and Contact"],
    ["قد نقوم بتحديث هذه الشروط عند الحاجة. استمرار استخدامك للموقع بعد التحديث يعني قبول النسخة الجديدة. للاستفسار، استخدم صفحة", "We may update these terms when needed. Continued use of the site after an update means accepting the new version. For inquiries, use the"],

    ["1. البيانات التي نجمعها", "1. Data We Collect"],
    ["عند إنشاء حساب أو التواصل معي، قد نجمع الاسم، البريد الإلكتروني، حالة الموافقة على الحساب، وأي معلومات ترسلها طوعاً عبر نماذج التسجيل أو قنوات التواصل.", "When you create an account or contact me, we may collect your name, email, account approval status, and any information you voluntarily send through registration forms or communication channels."],
    ["2. كيف نستخدم البيانات", "2. How We Use Data"],
    ["تشغيل الحساب وتحديد صلاحية الوصول إلى لوحة الأبحاث.", "Operate the account and determine access permission to the research dashboard."],
    ["إدارة طلبات التسجيل والموافقة أو الرفض.", "Manage registration requests and approvals or rejections."],
    ["الرد على الاستفسارات وتحسين تجربة الموقع.", "Respond to inquiries and improve the site experience."],
    ["حماية الموقع من إساءة الاستخدام أو النشاط غير المصرح به.", "Protect the site from misuse or unauthorized activity."],
    ["3. مزودو الخدمة", "3. Service Providers"],
    ["يعتمد الموقع على مزودين تقنيين مثل Supabase للمصادقة وقاعدة البيانات، وVercel للاستضافة. قد يعالج هؤلاء المزودون بيانات تقنية ضرورية لتشغيل الخدمة وفق سياساتهم.", "The site relies on technology providers such as Supabase for authentication and database services, and Vercel for hosting. These providers may process technical data necessary to operate the service according to their policies."],
    ["4. مشاركة البيانات", "4. Data Sharing"],
    ["لا نبيع بياناتك الشخصية. قد نشارك بيانات محدودة فقط عند الحاجة لتشغيل الخدمة، الامتثال القانوني، حماية الحقوق، أو منع إساءة الاستخدام.", "We do not sell your personal data. We may share limited data only when needed to operate the service, comply with law, protect rights, or prevent misuse."],
    ["5. الاحتفاظ والأمان", "5. Retention and Security"],
    ["نحتفظ بالبيانات طالما كانت لازمة لتشغيل الحساب أو الوفاء بالتزاماتنا. نستخدم ضوابط وصول وتقنيات استضافة آمنة، لكن لا يمكن ضمان أمان كامل لأي نظام متصل بالإنترنت.", "We retain data as long as needed to operate the account or meet obligations. We use access controls and secure hosting practices, but no internet-connected system can be guaranteed completely secure."],
    ["6. حقوقك والتواصل", "6. Your Rights and Contact"],
    ["يمكنك طلب تحديث أو حذف بيانات الحساب عندما يكون ذلك ممكناً قانونياً وتقنياً. للاستفسار عن الخصوصية، استخدم صفحة", "You may request account data updates or deletion when legally and technically possible. For privacy inquiries, use the"],

    ["الصفحة غير موجودة", "Page Not Found"],
    ["يبدو أن الصفحة التي تبحث عنها غير متاحة أو تم نقلها.", "It looks like the page you are looking for is unavailable or has been moved."],
    ["العودة إلى الأبحاث", "Back to Research"],
    ["كل الأبحاث", "All Research"],
    ["جاري تحميل المنشور...", "Loading post..."],

    ["مرحباً بعودتك", "Welcome Back"],
    ["البريد الإلكتروني", "Email"],
    ["كلمة المرور", "Password"],
    ["الدخول للوحة التحكم", "Open Dashboard"],
    ["ليس لديك حساب؟", "Don't have an account?"],
    ["أنشئ حساباً جديداً", "Create a new account"],
    ["إنشاء حساب جديد", "Create a New Account"],
    ["اطلب الوصول إلى مكتبة الأبحاث والفيديو", "Request access to the research and video library"],
    ["الاسم الكامل", "Full Name"],
    ["إنشاء الحساب", "Create Account"],
    ["لديك حساب بالفعل؟", "Already have an account?"],
    ["إعادة إرسال رابط التأكيد", "Resend Confirmation Link"],

    ["القائمة الجانبية", "Sidebar"],
    ["فتح القائمة الجانبية", "Open Sidebar"],
    ["مسار التنقل", "Breadcrumb"],
    ["لوحة التحكم › نظرة عامة", "Dashboard › Overview"],
    ["الإشعارات", "Notifications"],
    ["عضو مؤكد", "Verified Member"],
    ["أدمن", "Admin"],
    ["نشر المنشور", "Publish Post"],
    ["حفظ التعديل", "Save Changes"],
    ["حفظ القسم", "Save Section"],
    ["حفظ الفيديو", "Save Video"],
    ["حفظ تعديل القسم", "Save Section Changes"],
    ["حفظ تعديل الفيديو", "Save Video Changes"],
    ["لا توجد منشورات بعد.", "No posts yet."],
    ["جاري تحميل المنشورات...", "Loading posts..."],
    ["جاري تحميل أقسام الفيديو...", "Loading video sections..."],
    ["جاري تحميل مكتبة الفيديو...", "Loading video library..."],
    ["جاري تحميل طلبات الحسابات...", "Loading account requests..."],
    ["لا توجد حسابات مسجلة بعد.", "No registered accounts yet."],
    ["أضف قسماً أولاً", "Add a section first"],
    ["لغة القسم", "Section Language"],
    ["العربية", "Arabic"],
    ["مراجعة السوق", "Market Review"],
    ["مثلاً: مراجعة السوق", "Example: Market Review"],
    ["معاينة صورة المنشور", "Post image preview"],

    ["إطار بحثي يوازن بين حالة الاقتصاد الكلي، جودة البيانات المالية، سلوك السعر، والانضباط في تخصيص رأس المال.", "A research framework that balances the macro backdrop, financial data quality, price behavior, and disciplined capital allocation."],
    ["يتم تقييم النموذج وفق التوقع الرياضي، التراجع، الثبات، وحساسية النتائج، بدلاً من الاكتفاء بنسبة نجاح سطحية.", "The model is evaluated by expected value, drawdown, stability, and result sensitivity instead of relying on a surface-level win rate."],
    ["مقياس بحثي", "Research Metric"],
    ["لمن يناسب هذا الإطار؟", "Who Is This Framework For?"],
    ["المنهجية موجّهة لمن يريد قراءة الأسواق من منظور صفقة ومخاطر ومحفظة، لا من منظور توصيات سريعة.", "The methodology is for people who want to read markets through trades, risk, and portfolios, not through quick recommendations."],
    ["نماذج مستقلة لبيئات سوق مختلفة", "Independent Models for Different Market Regimes"],
    ["الأكثر ملاءمة", "Best Fit"],
    ["قراءات سوقية أُعدّها بنفسي تبدأ من الاقتصاد الكلي، ثم الحالة المالية للشركات أو العملات، ثم سلوك السعر، مع فصل واضح بين التحليل البحثي وقرار التنفيذ.", "Market readings I prepare myself, starting with macro conditions, then company or currency financial condition, then price behavior, with a clear separation between research analysis and execution decisions."],
    ["مبادئ إدارة البحث والمخاطر", "Research and Risk Management Principles"],
    ["ميزانية مخاطرة مبدئية", "Initial Risk Budget"],
    ["6 أسواق", "6 Markets"],
    ["تُعرض النتائج مع فترات التراجع والافتراضات المستخدمة. الهدف هو فهم المخاطر لا تسويق رقم منفرد.", "Results are shown with drawdown periods and the assumptions used. The goal is to understand risk, not market a single number."],
    ["يُنظر إلى كل سوق كمصدر مستقل للمخاطر والعائد، مع تجنب الاعتماد المفرط على بيئة واحدة أو نمط واحد.", "Each market is treated as an independent source of risk and return, avoiding overreliance on one environment or one pattern."],
    ["3 نماذج", "3 Models"],
    ["نمذجة مساعدة", "Assisted Modeling"],
    ["تُستخدم أدوات إحصائية وتعلم آلي كطبقة مساعدة لتقييم جودة المدخلات، مع إبقاء القرار النهائي محكوماً بإطار المخاطر.", "Statistical and machine-learning tools are used as an assisting layer to evaluate input quality, while the final decision remains governed by the risk framework."],
    ["منهجية البحث", "Research Process"],
    ["الاختبار الخلفي المنضبط", "Disciplined Backtesting"],
    ["المراجعة الدورية", "Periodic Review"],
    ["تقييم دوري لكل نموذج مقابل المؤشر المرجعي ومعايير المخاطر. عند تدهور السلوك إحصائياً، تتم مراجعة النموذج أو إيقافه.", "Each model is periodically evaluated against the benchmark and risk criteria. When behavior deteriorates statistically, the model is reviewed or paused."],
    ["طريقتي في العمل تبدأ بتحديد الفرضية، ثم اختبارها، ثم وضعها داخل إطار مخاطر واضح. لا أتعامل مع السوق كقصة أو إحساس، بل كمجموعة احتمالات يجب قياسها ومراجعتها.", "My process starts by defining the hypothesis, testing it, then placing it inside a clear risk framework. I do not treat the market as a story or a feeling, but as a set of probabilities that must be measured and reviewed."],
    ["جميع المحتويات لأغراض بحثية وتعليمية ولا تُعد نصيحة استثمارية أو توصية تداول أو عرضاً لإدارة أموال. الأداء السابق لا يضمن نتائج مستقبلية.", "All content is produced for research and educational purposes only. Nothing on this page constitutes investment advice, a solicitation, or a guarantee of returns. No portfolio management services are offered."],
    ["آلية العمل", "How It Works"],
    ["لا تكتمل الفكرة قبل تحديد نقطة الخطأ، حجم الصفقة أو المركز، وأثرها على المحفظة ككل. إدارة المخاطر تأتي قبل التنفيذ.", "An idea is not complete before defining the invalidation point, trade or position size, and impact on the whole portfolio. Risk management comes before execution."],
    ["لا توجد فيديوهات منشورة لهذا القسم حالياً", "No videos have been published for this section yet"],
    ["أسئلة شائعة", "Frequently Asked Questions"],
    ["الخبرة", "Experience"],
    ["الخطة البحثية", "Research Plan"],
    ["ما خبرتك في الأسواق؟", "What is your market experience?"],
    ["جميع المحتويات لأغراض بحثية وتعليمية ولا تُعد نصيحة استثمارية أو توصية تداول.", "All content is produced for research and educational purposes only. Nothing on this page constitutes investment advice, a solicitation, or a guarantee of returns. No portfolio management services are offered."]
  ];

  var EN = {};
  entries.forEach(function (pair) {
    EN[normalize(pair[0])] = pair[1];
  });

  function normalize(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function getLang() {
    var saved = localStorage.getItem(STORAGE_KEY);
    return supported[saved] ? saved : "ar";
  }

  function setLang(lang) {
    var nextLang = supported[lang] ? lang : "ar";
    localStorage.setItem(STORAGE_KEY, nextLang);
    applyLanguage();
    window.dispatchEvent(new CustomEvent("abdo:languagechange", { detail: { lang: nextLang } }));
  }

  function translate(value) {
    return EN[normalize(value)] || value;
  }

  function preserveSpace(original, translated) {
    var leading = (String(original).match(/^\s*/) || [""])[0];
    var trailing = (String(original).match(/\s*$/) || [""])[0];
    return leading + translated + trailing;
  }

  function shouldSkip(node) {
    if (!node || node.nodeType !== 1) return false;
    return Boolean(node.closest("script, style, noscript, template, svg, canvas, [data-i18n-skip]"));
  }

  function translateTextNode(node, lang) {
    if (!node || !node.nodeValue || !node.nodeValue.trim()) return;
    if (shouldSkip(node.parentElement)) return;
    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    var original = originalText.get(node);
    if (lang === "ar") {
      node.nodeValue = original;
      return;
    }
    var translated = EN[normalize(original)];
    if (translated) node.nodeValue = preserveSpace(original, translated);
  }

  function translateAttributes(root, lang) {
    var attrNames = ["aria-label", "alt", "title", "placeholder"];
    var selector = attrNames.map(function (attr) { return "[" + attr + "]"; }).join(",");
    var nodes = Array.prototype.slice.call(root.querySelectorAll(selector));
    if (root.nodeType === 1 && root.matches && root.matches(selector)) nodes.unshift(root);

    nodes.forEach(function (el) {
      if (shouldSkip(el)) return;
      var store = originalAttrs.get(el);
      if (!store) {
        store = {};
        originalAttrs.set(el, store);
      }
      attrNames.forEach(function (attr) {
        if (!el.hasAttribute(attr)) return;
        if (!Object.prototype.hasOwnProperty.call(store, attr)) store[attr] = el.getAttribute(attr);
        var original = store[attr];
        el.setAttribute(attr, lang === "ar" ? original : translate(original));
      });
    });

    Array.prototype.slice.call(document.querySelectorAll("meta[content]")).forEach(function (meta) {
      var store = originalAttrs.get(meta);
      if (!store) {
        store = {};
        originalAttrs.set(meta, store);
      }
      if (!Object.prototype.hasOwnProperty.call(store, "content")) store.content = meta.getAttribute("content");
      var original = store.content;
      meta.setAttribute("content", lang === "ar" ? original : translate(original));
    });
  }

  function removePricingFromFooterQuickLinks() {
    Array.prototype.slice.call(document.querySelectorAll(".footer-links-col")).forEach(function (column) {
      var heading = column.querySelector("h4");
      var title = normalize(heading ? heading.textContent : "");
      if (title !== "روابط سريعة" && title !== "Quick Links") return;

      Array.prototype.slice.call(column.querySelectorAll("a")).forEach(function (link) {
        var href = String(link.getAttribute("href") || "").toLowerCase();
        var text = normalize(link.textContent);
        if (href === "/pricing" || href === "pricing.html" || href === "#pricing" || text === "الخطط" || text === "Pricing") {
          var item = link.closest("li");
          if (item) item.remove();
          else link.remove();
        }
      });
    });
  }

  function translateTree(root, lang) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (shouldSkip(node.parentElement)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [];
    var node;
    while ((node = walker.nextNode())) nodes.push(node);
    nodes.forEach(function (textNode) { translateTextNode(textNode, lang); });
    translateAttributes(root, lang);
  }

  function installSwitcher() {
    if (document.querySelector(".language-switcher")) return;
    var switcher = document.createElement("div");
    switcher.className = "language-switcher";
    switcher.setAttribute("role", "group");
    switcher.setAttribute("aria-label", "Language");
    switcher.setAttribute("data-i18n-skip", "true");
    switcher.innerHTML = [
      '<button type="button" class="lang-toggle-btn" data-lang="ar" aria-label="العربية">AR</button>',
      '<button type="button" class="lang-toggle-btn" data-lang="en" aria-label="English">EN</button>'
    ].join("");

    var desktopTarget = document.querySelector(".header-auth-group");
    var simpleTarget = document.querySelector(".nav-container");
    var dashboardTarget = document.querySelector(".db-topbar-actions");
    var target = desktopTarget || dashboardTarget || simpleTarget || document.body;

    if (desktopTarget) {
      desktopTarget.insertBefore(switcher, desktopTarget.firstChild);
    } else if (dashboardTarget) {
      dashboardTarget.insertBefore(switcher, dashboardTarget.firstChild);
    } else if (simpleTarget) {
      simpleTarget.appendChild(switcher);
    } else {
      document.body.insertBefore(switcher, document.body.firstChild);
    }

    switcher.addEventListener("click", function (event) {
      var button = event.target.closest("[data-lang]");
      if (!button) return;
      setLang(button.getAttribute("data-lang"));
    });
  }

  function updateSwitcher(lang) {
    Array.prototype.slice.call(document.querySelectorAll(".lang-toggle-btn")).forEach(function (button) {
      var active = button.getAttribute("data-lang") === lang;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function applyLanguage() {
    var lang = getLang();
    var html = document.documentElement;
    if (!html.dataset.originalTitle) html.dataset.originalTitle = document.title;
    html.lang = lang;
    html.dir = lang === "en" ? "ltr" : "rtl";
    document.body && document.body.classList.toggle("lang-en", lang === "en");
    document.title = lang === "ar" ? html.dataset.originalTitle : translate(html.dataset.originalTitle);
    installSwitcher();
    if (document.body) translateTree(document.body, lang);
    translateAttributes(document.documentElement, lang);
    removePricingFromFooterQuickLinks();
    updateSwitcher(lang);
  }

  function observeDynamicContent() {
    if (!document.body || window.__abdoI18nObserver) return;
    window.__abdoI18nObserver = new MutationObserver(function (mutations) {
      var needsUpdate = mutations.some(function (mutation) {
        return mutation.addedNodes && mutation.addedNodes.length;
      });
      if (!needsUpdate) return;
      clearTimeout(observerTimer);
      observerTimer = setTimeout(function () {
        applyLanguage();
      }, 40);
    });
    window.__abdoI18nObserver.observe(document.body, { childList: true, subtree: true });
  }

  window.AbdoI18n = {
    applyLanguage: applyLanguage,
    currentLang: getLang,
    setLanguage: setLang,
    t: function (value) {
      return getLang() === "en" ? translate(value) : value;
    },
    formatDate: function (value, options) {
      var date = value instanceof Date ? value : new Date(value);
      if (Number.isNaN(date.getTime())) return "";
      return date.toLocaleDateString(getLang() === "en" ? "en-US" : "ar-EG", options);
    }
  };

  document.addEventListener("DOMContentLoaded", function () {
    applyLanguage();
    observeDynamicContent();
  });
})();
