export type Lang = "ar" | "de";

const ar = {
  dir: "rtl" as const,
  nav: {
    home: "الرئيسية",
    about: "من أنا",
    services: "خدماتي",
    resume: "السيرة الذاتية",
    blog: "المقالات",
    contact: "تواصل معي",
  },
  hero: {
    greeting: "مرحباً، أنا",
    name: "ثائر العبسي",
    iam: "أعمل كـ",
    roles: [
      "أخصائي تسويق رقمي",
      "مدير حملات إعلانية",
      "خبير تحسين محركات البحث",
      "استراتيجي علامات تجارية",
      "مسوّق بالمحتوى",
      "محلل بيانات تسويقية",
    ],
    description:
      "أساعد العلامات التجارية على النمو من خلال استراتيجيات تسويقية مدروسة تقوم على البيانات، وأحوّل الأفكار إلى حملات تحقق نتائج ملموسة.",
    contactBtn: "تواصل معي",
    servicesBtn: "استكشف خدماتي",
    scroll: "مرّر للأسفل",
  },
  stats: [
    { value: 8, suffix: "+", label: "سنوات خبرة" },
    { value: 12, suffix: "", label: "جائزة تسويقية" },
    { value: 150, suffix: "+", label: "حملة ناجحة" },
  ],
  about: {
    label: "من أنا",
    title: "شغفي هو تحويل البيانات إلى قصص تسويقية ناجحة",
    bio: "أنا ثائر العبسي، أخصائي تسويق رقمي بخبرة تتجاوز ثماني سنوات في بناء الاستراتيجيات وإدارة الحملات الإعلانية. أؤمن بأن التسويق الناجح يجمع بين الإبداع والتحليل، وأسعى دائماً لتصميم تجارب تسويقية تصل إلى الجمهور المناسب في الوقت المناسب وتحقق عائداً حقيقياً على الاستثمار.",
    skillsTitle: "مهاراتي",
    skills: [
      { name: "التسويق الرقمي", percent: 90 },
      { name: "إدارة الحملات الممولة", percent: 85 },
      { name: "تحسين محركات البحث SEO", percent: 88 },
      { name: "التسويق بالمحتوى", percent: 82 },
      { name: "تحليل البيانات", percent: 78 },
      { name: "إدارة وسائل التواصل", percent: 92 },
    ],
  },
  quote: {
    text: "التسويق الناجح لا يبيع المنتج، بل يروي قصة يصدّقها الناس ويريدون أن يكونوا جزءاً منها.",
    author: "ثائر العبسي",
  },
  services: {
    label: "ماذا أقدم",
    title: "خدماتي",
    items: [
      {
        icon: "target",
        title: "إدارة الحملات الإعلانية",
        text: "تخطيط وتنفيذ حملات ممولة على منصات Google وMeta بدقة استهداف عالية وعائد قابل للقياس.",
      },
      {
        icon: "search",
        title: "تحسين محركات البحث",
        text: "تحسين ظهور موقعك في نتائج البحث عبر استراتيجيات كلمات مفتاحية ومحتوى وبنية تقنية سليمة.",
      },
      {
        icon: "share",
        title: "التسويق عبر وسائل التواصل",
        text: "بناء حضور قوي لعلامتك على منصات التواصل بمحتوى جذاب وإدارة مجتمع فعّالة.",
      },
      {
        icon: "pen",
        title: "التسويق بالمحتوى",
        text: "صياغة محتوى قيّم يجذب جمهورك ويبني الثقة ويحوّل الزوار إلى عملاء دائمين.",
      },
      {
        icon: "chart",
        title: "تحليل البيانات والتقارير",
        text: "قراءة الأرقام وتحويلها إلى قرارات: تقارير أداء واضحة وتوصيات عملية لتحسين النتائج.",
      },
      {
        icon: "badge",
        title: "بناء العلامة التجارية",
        text: "تطوير هوية ورسائل متسقة تميّز علامتك عن المنافسين وتبقى في ذهن العميل.",
      },
    ],
  },
  marquee: ["إبداع", "نمو", "تأثير", "استراتيجية", "علامة تجارية", "نتائج"],
  resume: {
    label: "مسيرتي",
    experienceTitle: "الخبرات العملية",
    educationTitle: "التعليم والشهادات",
    experience: [
      {
        period: "2021 - الآن",
        title: "مدير تسويق رقمي",
        place: "شركة أفق للتقنية",
        text: "قيادة فريق التسويق ووضع الاستراتيجية السنوية، وإدارة ميزانية إعلانية كبيرة حققت نمواً في المبيعات بنسبة 65%.",
      },
      {
        period: "2018 - 2021",
        title: "أخصائي حملات إعلانية",
        place: "وكالة إبداع للإعلان",
        text: "إدارة حملات ممولة لأكثر من 40 عميلاً في قطاعات مختلفة مع تحسين مستمر لمعدلات التحويل وتكلفة الاكتساب.",
      },
      {
        period: "2015 - 2018",
        title: "مسوّق رقمي",
        place: "شركة رواد التجارة",
        text: "تنفيذ استراتيجيات التسويق بالمحتوى والبريد الإلكتروني وتنمية قنوات التواصل الاجتماعي من الصفر.",
      },
    ],
    education: [
      {
        period: "2019 - 2021",
        title: "ماجستير في التسويق الرقمي",
        place: "جامعة برلين للأعمال",
        text: "تخصص في تحليل سلوك المستهلك والاستراتيجيات الرقمية مع مشروع تخرج عن تأثير المحتوى التفاعلي.",
      },
      {
        period: "2011 - 2015",
        title: "بكالوريوس إدارة أعمال - تسويق",
        place: "جامعة دمشق",
        text: "دراسة أساسيات التسويق وإدارة العلامات التجارية وبحوث السوق مع التركيز على التسويق الدولي.",
      },
      {
        period: "2019",
        title: "شهادة تحليل البيانات الاحترافية",
        place: "Google Career Certificates",
        text: "شهادة احترافية في تحليل البيانات التسويقية واستخدام أدوات القياس الحديثة لاتخاذ قرارات مبنية على البيانات.",
      },
    ],
  },
  certificates: {
    title: "شهاداتي",
    items: [
      { title: "شهادة تحليلات Google", issuer: "Google Analytics", year: "2023", image: "/certificates/analytics.svg" },
      { title: "شهادة إعلانات Google", issuer: "Google Skillshop", year: "2022", image: "/certificates/ads.svg" },
      { title: "شهادة التسويق عبر منصات Meta", issuer: "Meta Blueprint", year: "2022", image: "/certificates/meta.svg" },
      { title: "شهادة التسويق الرقمي", issuer: "HubSpot Academy", year: "2021", image: "/certificates/hubspot.svg" },
    ],
  },
  stats2: [
    { value: 240, suffix: "+", label: "مشروع منجز" },
    { value: 120, suffix: "+", label: "عميل سعيد" },
    { value: 12, suffix: "", label: "جائزة وشهادة" },
  ],
  blog: {
    label: "مدونتي",
    title: "أحدث المقالات",
    readMore: "اقرأ المزيد",
    posts: [
      {
        date: "12 مارس 2025",
        title: "كيف تبني استراتيجية محتوى تجذب جمهورك فعلاً؟",
        text: "خطوات عملية لفهم جمهورك وصياغة محتوى يجيب عن أسئلته ويقوده برفق نحو قرار الشراء.",
      },
      {
        date: "28 فبراير 2025",
        title: "خمسة اتجاهات في التسويق الرقمي لا يمكن تجاهلها",
        text: "من الذكاء الاصطناعي إلى الفيديو القصير: نظرة على أهم ما يشكّل مستقبل التسويق هذا العام.",
      },
      {
        date: "10 فبراير 2025",
        title: "أسرار الحملات الإعلانية الناجحة على وسائل التواصل",
        text: "لماذا تنجح بعض الحملات وتفشل أخرى؟ دروس مستفادة من إدارة أكثر من 150 حملة إعلانية.",
      },
    ],
  },
  contact: {
    label: "لنعمل معاً",
    title: "تواصل معي",
    emailLabel: "راسلني عبر البريد",
    email: "hello@thaeralabsi.com",
    phoneLabel: "اتصل بي",
    phone: "+49 30 1234 5678",
    addressLabel: "العنوان",
    address: "برلين، ألمانيا",
    form: {
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      message: "رسالتك",
      send: "أرسل الرسالة",
    },
  },
  footer: {
    rights: "جميع الحقوق محفوظة",
    made: "صُمم وطُوّر بشغف",
  },
};

export type Dict = Omit<typeof ar, "dir"> & { dir: "rtl" | "ltr" };

const de: Dict = {
  dir: "ltr" as const,
  nav: {
    home: "Start",
    about: "Über mich",
    services: "Leistungen",
    resume: "Lebenslauf",
    blog: "Blog",
    contact: "Kontakt",
  },
  hero: {
    greeting: "Hallo, ich bin",
    name: "Thaer Alabsi",
    iam: "Ich bin",
    roles: [
      "Digital-Marketing-Spezialist",
      "Kampagnen-Manager",
      "SEO-Experte",
      "Markenstratege",
      "Content-Marketer",
      "Marketing-Analyst",
    ],
    description:
      "Ich helfe Marken zu wachsen – mit datenbasierten Marketingstrategien, die aus Ideen Kampagnen mit messbaren Ergebnissen machen.",
    contactBtn: "Kontakt aufnehmen",
    servicesBtn: "Meine Leistungen",
    scroll: "Nach unten scrollen",
  },
  stats: [
    { value: 8, suffix: "+", label: "Jahre Erfahrung" },
    { value: 12, suffix: "", label: "Marketing-Awards" },
    { value: 150, suffix: "+", label: "Erfolgreiche Kampagnen" },
  ],
  about: {
    label: "Über mich",
    title: "Meine Leidenschaft: Daten in erfolgreiche Marketing-Geschichten verwandeln",
    bio: "Ich bin Thaer Alabsi, Digital-Marketing-Spezialist mit über acht Jahren Erfahrung in Strategieentwicklung und Kampagnenmanagement. Ich bin überzeugt, dass erfolgreiches Marketing Kreativität und Analyse verbindet – und ich entwickle Marketing-Erlebnisse, die zur richtigen Zeit die richtige Zielgruppe erreichen und echten Return on Investment liefern.",
    skillsTitle: "Meine Fähigkeiten",
    skills: [
      { name: "Digitales Marketing", percent: 90 },
      { name: "Paid-Kampagnen", percent: 85 },
      { name: "SEO", percent: 88 },
      { name: "Content-Marketing", percent: 82 },
      { name: "Datenanalyse", percent: 78 },
      { name: "Social-Media-Management", percent: 92 },
    ],
  },
  quote: {
    text: "Gutes Marketing verkauft kein Produkt – es erzählt eine Geschichte, der die Menschen glauben und zu der sie gehören wollen.",
    author: "Thaer Alabsi",
  },
  services: {
    label: "Was ich anbiete",
    title: "Meine Leistungen",
    items: [
      {
        icon: "target",
        title: "Kampagnen-Management",
        text: "Planung und Umsetzung bezahlter Kampagnen auf Google und Meta – mit präzisem Targeting und messbarem Ertrag.",
      },
      {
        icon: "search",
        title: "Suchmaschinenoptimierung",
        text: "Bessere Sichtbarkeit in den Suchergebnissen durch Keyword-Strategien, starken Content und saubere Technik.",
      },
      {
        icon: "share",
        title: "Social-Media-Marketing",
        text: "Eine starke Präsenz für Ihre Marke auf sozialen Plattformen – mit ansprechendem Content und aktiver Community.",
      },
      {
        icon: "pen",
        title: "Content-Marketing",
        text: "Wertvolle Inhalte, die Ihr Publikum anziehen, Vertrauen aufbauen und Besucher in treue Kunden verwandeln.",
      },
      {
        icon: "chart",
        title: "Datenanalyse & Reporting",
        text: "Zahlen verstehen und daraus Entscheidungen ableiten: klare Performance-Berichte und praxisnahe Empfehlungen.",
      },
      {
        icon: "badge",
        title: "Markenaufbau",
        text: "Eine konsistente Identität und Botschaft, die Ihre Marke von Wettbewerbern abhebt und im Kopf bleibt.",
      },
    ],
  },
  marquee: ["Kreativität", "Wachstum", "Wirkung", "Strategie", "Marke", "Ergebnisse"],
  resume: {
    label: "Mein Werdegang",
    experienceTitle: "Berufserfahrung",
    educationTitle: "Ausbildung & Zertifikate",
    experience: [
      {
        period: "2021 - heute",
        title: "Leiter Digital Marketing",
        place: "Ofoq Technologies GmbH",
        text: "Leitung des Marketing-Teams und der Jahresstrategie; Verantwortung eines großen Werbebudgets mit 65 % Umsatzwachstum.",
      },
      {
        period: "2018 - 2021",
        title: "Performance-Marketing-Spezialist",
        place: "Ibdaa Werbeagentur",
        text: "Betreuung bezahlter Kampagnen für über 40 Kunden aus verschiedenen Branchen mit kontinuierlicher Optimierung von Conversion-Rate und Akquisitionskosten.",
      },
      {
        period: "2015 - 2018",
        title: "Digital Marketing Manager",
        place: "Rowad Handels GmbH",
        text: "Umsetzung von Content- und E-Mail-Marketing-Strategien sowie Aufbau der Social-Media-Kanäle von Grund auf.",
      },
    ],
    education: [
      {
        period: "2019 - 2021",
        title: "M.Sc. Digitales Marketing",
        place: "Berlin School of Business",
        text: "Schwerpunkt Konsumentenverhalten und digitale Strategien; Abschlussarbeit über die Wirkung interaktiver Inhalte.",
      },
      {
        period: "2011 - 2015",
        title: "Bachelor Betriebswirtschaft – Marketing",
        place: "Universität Damaskus",
        text: "Grundlagen des Marketings, Markenführung und Marktforschung mit Fokus auf internationales Marketing.",
      },
      {
        period: "2019",
        title: "Professionelles Zertifikat Datenanalyse",
        place: "Google Career Certificates",
        text: "Zertifizierung in Marketing-Datenanalyse und modernen Analyse-Tools für datenbasierte Entscheidungen.",
      },
    ],
  },
  certificates: {
    title: "Meine Zertifikate",
    items: [
      { title: "Google Analytics Zertifizierung", issuer: "Google Analytics", year: "2023", image: "/certificates/analytics.svg" },
      { title: "Google Ads Zertifizierung", issuer: "Google Skillshop", year: "2022", image: "/certificates/ads.svg" },
      { title: "Meta Marketing Zertifizierung", issuer: "Meta Blueprint", year: "2022", image: "/certificates/meta.svg" },
      { title: "Digital-Marketing-Zertifikat", issuer: "HubSpot Academy", year: "2021", image: "/certificates/hubspot.svg" },
    ],
  },
  stats2: [
    { value: 240, suffix: "+", label: "Abgeschlossene Projekte" },
    { value: 120, suffix: "+", label: "Zufriedene Kunden" },
    { value: 12, suffix: "", label: "Auszeichnungen" },
  ],
  blog: {
    label: "Mein Blog",
    title: "Aktuelle Beiträge",
    readMore: "Weiterlesen",
    posts: [
      {
        date: "12. März 2025",
        title: "Wie Sie eine Content-Strategie bauen, die Ihr Publikum wirklich erreicht",
        text: "Praktische Schritte, um Ihre Zielgruppe zu verstehen und Inhalte zu erstellen, die ihre Fragen beantworten und sanft zur Kaufentscheidung führen.",
      },
      {
        date: "28. Februar 2025",
        title: "Fünf Digital-Marketing-Trends, die man nicht ignorieren kann",
        text: "Von KI bis Kurzvideos: ein Blick auf die wichtigsten Entwicklungen, die das Marketing in diesem Jahr prägen.",
      },
      {
        date: "10. Februar 2025",
        title: "Die Geheimnisse erfolgreicher Social-Media-Kampagnen",
        text: "Warum gelingen manche Kampagnen und andere nicht? Erkenntnisse aus über 150 betreuten Werbekampagnen.",
      },
    ],
  },
  contact: {
    label: "Lassen Sie uns zusammenarbeiten",
    title: "Kontakt",
    emailLabel: "E-Mail",
    email: "hello@thaeralabsi.com",
    phoneLabel: "Telefon",
    phone: "+49 30 1234 5678",
    addressLabel: "Adresse",
    address: "Berlin, Deutschland",
    form: {
      name: "Vollständiger Name",
      email: "E-Mail-Adresse",
      message: "Ihre Nachricht",
      send: "Nachricht senden",
    },
  },
  footer: {
    rights: "Alle Rechte vorbehalten",
    made: "Mit Leidenschaft gestaltet und entwickelt",
  },
};

export const dict: Record<Lang, Dict> = { ar, de };
