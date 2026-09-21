// =====================================================
// 1. MOBİL MENÜ
// Hamburger butonuna tıklanınca menüye "nav--open" sınıfı
// ekleniyor/kaldırılıyor. Görünürlük CSS'te (bkz. @media).
// =====================================================
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

function setMenu(open) {
  nav.classList.toggle('nav--open', open);
  navToggle.classList.toggle('nav-toggle--active', open);
  navToggle.setAttribute('aria-expanded', open);
  // Açılınca odak ilk linke, kapanınca butona dönsün (klavye kullanıcıları için)
  if (open) nav.querySelector('.nav__link').focus();
}
navToggle.addEventListener('click', () => setMenu(!nav.classList.contains('nav--open')));

// Esc: açık menüyü kapat
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && nav.classList.contains('nav--open')) {
    setMenu(false);
    navToggle.focus();
  }
});

// Menüdeki bir linke tıklayınca menüyü kapat (mobilde)
document.querySelectorAll('.nav__link').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

// =====================================================
// 1b. HERO ANİMASYONU: hero ekranda değilken ya da sekme
// arka plandayken lekelerin animasyonu durur (CPU tasarrufu).
// =====================================================
const hero = document.querySelector('.hero');
const fluid = document.querySelector('.fluid');
let ticking = false;

function updateHeroState() {
  ticking = false;
  const offscreen = hero.getBoundingClientRect().bottom <= 0 || document.hidden;
  fluid.classList.toggle('fluid--paused', offscreen);
}
// Scroll olayında her karede değil, kare başına en fazla bir kez hesapla
window.addEventListener('scroll', () => {
  if (!ticking) { ticking = true; requestAnimationFrame(updateHeroState); }
}, { passive: true });
document.addEventListener('visibilitychange', updateHeroState);
updateHeroState();

// =====================================================
// 2. AÇILIR MENÜ (CV indir): dışarı tıklayınca kapat
// =====================================================
const dropdown = document.querySelector('.dropdown');
document.addEventListener('click', (event) => {
  if (dropdown && !dropdown.contains(event.target)) dropdown.removeAttribute('open');
});

// =====================================================
// 2b. FOOTER YILI
// =====================================================
document.getElementById('year').textContent = new Date().getFullYear();

// =====================================================
// 3. VİDEO PENCERESİ (MODAL)
// data-video olan görsele tıklanınca modal açılır, video yüklenir.
// Kapatınca durur ve boşalır — video sadece tıklanınca indirilir.
// =====================================================
const modal = document.querySelector('.modal');
const modalVideo = document.querySelector('.modal__video');
const modalClose = document.querySelector('.modal__close');
let lastFocused = null; // modal kapanınca odak buraya döner

function openVideo(src) {
  lastFocused = document.activeElement;
  modalVideo.src = src;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  modalVideo.play().catch(() => {}); // hızlı kapatılırsa reddedilen söz konsola düşmesin
  modalClose.focus();
}

function closeVideo() {
  modalVideo.pause();
  modalVideo.removeAttribute('src');
  modalVideo.load();
  modal.hidden = true;
  document.body.style.overflow = '';
  if (lastFocused) lastFocused.focus();
}

document.querySelectorAll('[data-video]').forEach((btn) => {
  btn.addEventListener('click', () => openVideo(btn.dataset.video));
});
modalClose.addEventListener('click', closeVideo);
modal.addEventListener('click', (event) => { if (event.target === modal) closeVideo(); });
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modal.hidden) closeVideo();
});

// =====================================================
// 4. DİL DEĞİŞTİRME (TR / EN)
// HTML'de data-i18n="anahtar" olan her elemanın metni,
// aşağıdaki sözlükten seçili dile göre değiştiriliyor.
// Yeni metin eklemek için: HTML'e data-i18n ver, buraya
// hem tr hem en karşılığını yaz.
// =====================================================
const translations = {
  tr: {
    'meta.title': 'Ece Eren — Full Stack Web & Mobile Developer',
    'skip': 'İçeriğe atla',
    'hero.subtitle': 'Full Stack Web & Mobil Geliştirici',
    'nav.home': 'ana sayfa',
    'nav.skills': 'tech stack',
    'nav.projects': 'projeler',
    'nav.experience': 'deneyim',
    'nav.contact': 'iletişim',
    'cv.button': 'CV indir ▾',
    'cv.tr': 'Türkçe',
    'cv.en': 'English',

    'about.title': 'Hakkımda',
    'about.p1': "Mersin Üniversitesi Bilgisayar Programcılığı mezunuyum; İstanbul Üniversitesi'nde Yönetim Bilişim Sistemleri lisans eğitimime devam ediyorum. Yapay Zeka ve Teknoloji Akademisi'nde AI Fellow olarak Python ve yapay zeka odaklı bir programda yer alıyorum.",
    'about.p2': 'Frontend geliştirme ile arayüz tasarımını bir arada ele alan bir yaklaşım benimsiyorum. Figma ile arayüz tasarlıyor; HTML, CSS, JavaScript ve React ekseninde modern web teknolojilerini sistemli biçimde ilerletiyorum.',

    'skills.title': 'Tech Stack',
    'tags.learningLabel': 'öğreniyorum',
    'skills.cat.web': 'Web Geliştirme',
    'skills.cat.mobile': 'Mobil Geliştirme',
    'skills.cat.ai': 'Yapay Zeka & Backend',
    'skills.cat.tools': 'Araçlar & Veri',
    'tags.animation': 'Animasyon',
    'tags.pm': 'Proje Planlama',

    'projects.title': 'Projelerim',
    'projects.featured': 'Öne çıkan proje',
    'projects.watch': 'Demoyu izle',
    'projects.cat.ai': 'Yapay Zeka · Otomasyon',
    'projects.cat.ai2': 'Yapay Zeka · RAG',
    'projects.cat.desktop': 'Masaüstü · Yönetim Sistemi',
    'projects.gastromic.desc': 'Kişiselleştirilmiş gastronomi ve seyahat rotaları sunan AI destekli mobil uygulama. Rolüm: görsel kimlik ve animasyon (ikon, splash screen), ayarlar/profil/tercihler modüllerinin UI/UX tasarımı.',
    'projects.aura.desc': 'Envanter yönetimini otomatikleştiren ve WhatsApp üzerinden müşteri iletişimini yöneten AI asistan. Yapay Zeka ve Teknoloji Akademisi hackathonu için tek başıma geliştirdim.',
    'projects.docmind.desc': 'Belgeler üzerinde semantik arama yapan RAG tabanlı doküman analiz aracı. Groq ile hızlı çıkarım, Streamlit arayüzü.',
    'projects.expotrack.desc': 'Sergi ve fuar planlama, stant takibi için yönetim sistemi. Mersin Üniversitesi bitirme projesi.',

    'exp.title': 'Deneyim',
    'org.yzta': 'Yapay Zeka ve Teknoloji Akademisi',
    'exp.fellow.date': 'Ara 2025 — devam ediyor · Uzaktan',
    'exp.fellow.desc': '31.700 başvuru arasından seçilen 1.500 bursiyerden biri (~%4,7 kabul). Google Türkiye, Türkiye Girişimcilik Vakfı ve T3 iş birliğiyle yürütülen program. Odak: Python ile yapay zeka geliştirme, teknoloji girişimciliği.',
    'exp.intern.date': 'Haz 2025 — Ağu 2025 · Adana',
    'exp.intern.org': 'Adana Büyükşehir Belediyesi',
    'exp.intern.desc': 'İç yazılım çözümleri ve web uygulamalarının geliştirilmesine destek; BT ekibiyle teknik sorun giderme ve iş akışı iyileştirme.',

    'edu.title': 'Eğitim',
    'edu.ongoing': 'devam ediyor',
    'edu.mis': 'Yönetim Bilişim Sistemleri (Lisans)',
    'edu.istanbul': 'İstanbul Üniversitesi',
    'edu.cp.date': 'Eyl 2023 — May 2025',
    'edu.cp': 'Bilgisayar Programcılığı (Önlisans)',
    'edu.mersin': 'Mersin Üniversitesi',

    'cert.title': 'Sertifikalar',
    'cert.google.org': 'Google · Tem 2026',
    'cert.dl.org': 'YZTA · Nis 2026',
    'cert.web.org': 'YZTA · Mar 2026',
    'cert.inProgress': 'devam ediyor',
    'cert.ent1.org': 'YZTA · Şub 2026',
    'cert.ent2.org': 'YZTA · Şub 2026',
    'cert.ent3.org': 'YZTA · Mar 2026',
    'cert.ent4.org': 'YZTA · Mar 2026',
    'cert.unity.org': 'Udemy · Eki 2025',
    'cert.note': 'YZTA: Yapay Zeka ve Teknoloji Akademisi',

    'contact.title': 'Birlikte çalışalım',
    'contact.lead': 'Frontend, UI/UX ya da küçük bir web projesi için e-posta ile ulaşabilirsin.',
    'status.label': 'Şu an',
    'status.open': 'Staj ve junior frontend pozisyonlarına açığım',
    'status.remote': 'Adana · uzaktan çalışmaya uygun',
    'status.reply1': 'Genelde 24 saat içinde dönüş yaparım.',
    'status.reply2': 'Kısa bir merhaba bile yeterli.',
    'footer.text': 'HTML, CSS, JS ile yapıldı',
    'footer.source': 'Kaynak kod',
  },

  en: {
    'meta.title': 'Ece Eren — Full Stack Web & Mobile Developer',
    'skip': 'Skip to content',
    'hero.subtitle': 'Full Stack Web & Mobile Developer',
    'nav.home': 'home',
    'nav.skills': 'tech stack',
    'nav.projects': 'work',
    'nav.experience': 'experience',
    'nav.contact': 'contact',
    'cv.button': 'Download CV ▾',
    'cv.tr': 'Turkish',
    'cv.en': 'English',

    'about.title': 'About',
    'about.p1': "I hold an associate degree in Computer Programming from Mersin University and am pursuing a bachelor's degree in Management Information Systems at Istanbul University. I am an AI Fellow at the AI and Technology Academy, in a program focused on Python and artificial intelligence.",
    'about.p2': 'I take an approach that brings frontend development and interface design together. I design interfaces in Figma and am systematically advancing in modern web technologies across HTML, CSS, JavaScript and React.',

    'skills.title': 'Tech Stack',
    'skills.web.title': 'Web Development',
    'skills.web.text': 'Semantic HTML, modern CSS and responsive layouts. Learning JavaScript; React is next.',
    'skills.design.title': 'UI/UX Design',
    'skills.design.text': 'From paper sketch to Figma prototype: interface design, visual identity, icons and splash screen animations.',
    'skills.ai.title': 'Backend & AI',
    'skills.ai.text': 'APIs and AI with Python: FastAPI services, RAG architecture with LangChain and AI agent prototypes.',
    'skills.tools.title': 'Tools & Data',
    'skills.tools.text': 'Version control, containers and database fundamentals; desktop apps with C#/.NET.',
    'tags.learning': 'React (learning)',
    'tags.learningLabel': 'learning',
    'skills.cat.web': 'Web Development',
    'skills.cat.mobile': 'Mobile Development',
    'skills.cat.ai': 'AI & Backend',
    'skills.cat.tools': 'Tools & Data',
    'tags.prototype': 'Prototype',
    'tags.animation': 'Animation',
    'tags.pm': 'Project Planning',

    'projects.title': 'My Work',
    'projects.featured': 'Featured project',
    'projects.watch': 'Watch demo',
    'projects.cat.ai': 'AI · Automation',
    'projects.cat.ai2': 'AI · RAG',
    'projects.cat.desktop': 'Desktop · Management System',
    'projects.gastromic.desc': 'AI-powered mobile app offering personalized gastronomy and travel routes. My role: visual identity and animation (app icon, splash screen), UI/UX design of the settings, profile and preferences modules.',
    'projects.aura.desc': 'AI assistant that automates inventory management and handles customer communication over WhatsApp. Built solo for the AI and Technology Academy hackathon.',
    'projects.docmind.desc': 'RAG-based document analysis tool with semantic search over documents. Fast inference with Groq, Streamlit interface.',
    'projects.expotrack.desc': 'Management system for exhibition and fair planning and booth tracking. Graduation project at Mersin University.',

    'exp.title': 'Experience',
    'org.yzta': 'AI and Technology Academy',
    'exp.fellow.date': 'Dec 2025 — present · Remote',
    'exp.fellow.desc': 'One of 1,500 fellows selected from 31,700 applicants (~4.7% acceptance). Program run in partnership with Google Turkey, the Turkish Entrepreneurship Foundation and T3. Focus: AI development with Python, tech entrepreneurship.',
    'exp.intern.date': 'Jun 2025 — Aug 2025 · Adana',
    'exp.intern.org': 'Adana Metropolitan Municipality',
    'exp.intern.desc': 'Supported development and maintenance of internal software and web applications; troubleshooting and workflow improvement with the IT team.',

    'edu.title': 'Education',
    'edu.ongoing': 'ongoing',
    'edu.mis': "Management Information Systems (Bachelor's)",
    'edu.istanbul': 'Istanbul University',
    'edu.cp.date': 'Sep 2023 — May 2025',
    'edu.cp': 'Computer Programming (Associate)',
    'edu.mersin': 'Mersin University',

    'cert.title': 'Certificates',
    'cert.google.org': 'Google · Jul 2026',
    'cert.dl.org': 'YZTA · Apr 2026',
    'cert.web.org': 'YZTA · Mar 2026',
    'cert.inProgress': 'in progress',
    'cert.ent1.org': 'YZTA · Feb 2026',
    'cert.ent2.org': 'YZTA · Feb 2026',
    'cert.ent3.org': 'YZTA · Mar 2026',
    'cert.ent4.org': 'YZTA · Mar 2026',
    'cert.unity.org': 'Udemy · Oct 2025',
    'cert.note': 'YZTA: AI and Technology Academy (Turkey)',

    'contact.title': "Let's work together",
    'contact.lead': 'For frontend, UI/UX or a small web project, reach me by email.',
    'status.label': 'Currently',
    'status.open': 'Open to internships and junior frontend roles',
    'status.remote': 'Adana · open to remote work',
    'status.reply1': 'I usually reply within 24 hours.',
    'status.reply2': 'Even a short hello is enough.',
    'footer.text': 'Built with HTML, CSS, JS',
    'footer.source': 'Source code',
  },
};


const langToggle = document.querySelector('.lang-toggle');

function setLanguage(lang) {
  const dict = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
  document.documentElement.lang = lang;
  langToggle.textContent = lang === 'tr' ? 'EN' : 'TR';
  localStorage.setItem('lang', lang);
}

langToggle.addEventListener('click', () => {
  setLanguage(document.documentElement.lang === 'tr' ? 'en' : 'tr');
});

// Sayfa açılınca: daha önce seçilmiş dil varsa onu yükle, yoksa TR
setLanguage(localStorage.getItem('lang') || 'tr');
