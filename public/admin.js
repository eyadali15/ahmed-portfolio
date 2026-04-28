/* ============================================
   ADMIN.JS — Ahmed Abuzenada Admin Panel Logic
   Complete with Layout Editor, Style Engine,
   Design Features, Project CRUD, Import/Export
   ============================================ */
import { ConfigLoader, DEFAULT_CONFIG, SECTION_SELECTORS as LAYOUT_SECTIONS } from './config-loader.js';

const ADMIN_PASS = 'admin123';
let loader, config;
let editingProjectIndex = -1;

/* ============ INIT ============ */
document.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('admin-auth') === 'true') {
    showDashboard();
  } else {
    showLogin();
  }
});

/* ============ LOGIN ============ */
function showLogin() {
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('admin-dashboard').style.display = 'none';
  document.getElementById('login-btn').addEventListener('click', doLogin);
  document.getElementById('login-pass').addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
}

function doLogin() {
  const pass = document.getElementById('login-pass').value;
  if (pass === ADMIN_PASS) {
    sessionStorage.setItem('admin-auth', 'true');
    showDashboard();
  } else {
    const err = document.getElementById('login-error');
    err.style.display = 'block';
    err.textContent = 'Incorrect password.';
  }
}

/* ============ DASHBOARD ============ */
function showDashboard() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('admin-dashboard').style.display = 'flex';

  loader = new ConfigLoader();
  config = loader.config;

  // If projects are empty, try loading from the static JSON files
  if (!config.projects || config.projects.length === 0) {
    loadProjectsFromStatic();
  }

  initSidebar();
  initStyleEngine();
  populateAllForms();
  bindSaveButtons();
  bindProjectActions();
  bindImportExport();
  bindMobileSidebar();
  initLayoutEditor();
  initColorHexDisplay();
  switchSection('general');
}

async function loadProjectsFromStatic() {
  try {
    const resp = await fetch('/seed-projects.json');
    if (resp.ok) {
      const projects = await resp.json();
      if (Array.isArray(projects) && projects.length > 0) {
        config.projects = projects;
        loader.save(config);
        renderProjectList();
        showToast(`✓ Loaded ${projects.length} projects from seed data`);
        return;
      }
    }
  } catch {}
}

/* ============ DYNAMIC STYLE ENGINE ============ */
function initStyleEngine() {
  const customizableIds = {
    'home-name1':     'home.styles.name1',
    'home-name2':     'home.styles.name2',
    'home-subtitle':  'home.styles.subtitle',
    'home-cta-title': 'home.styles.ctaTitle',
    'home-cta-desc':  'home.styles.ctaDescription',
    'about-hero-title':    'about.styles.heroTitle',
    'about-intro-text1':   'about.styles.introText1',
    'about-intro-text2':   'about.styles.introText2',
    'about-quote-text':    'about.styles.quoteText',
    'contact-header-title': 'contact.styles.headerTitle',
    'contact-header-desc':  'contact.styles.headerDesc'
  };

  Object.entries(customizableIds).forEach(([id, path]) => {
    const input = document.getElementById(id);
    if (!input) return;

    const wrap = document.createElement('div');
    wrap.style.marginTop = '8px';
    wrap.style.background = 'rgba(255,255,255,0.02)';
    wrap.style.padding = '10px';
    wrap.style.borderRadius = '8px';
    wrap.style.border = '1px solid rgba(255,255,255,0.05)';
    wrap.innerHTML = `
      <details>
        <summary style="cursor:pointer; font-size:0.75rem; color:#888; font-weight:600; text-transform:uppercase; letter-spacing:0.05em;">⚙ Advanced Styles</summary>
        <div style="display:flex; gap:8px; margin-top:10px; flex-wrap:wrap;">
          <select id="${id}-font" style="flex:1;min-width:120px;" class="admin-input">
            <option value="">Default Font</option>
            <option value="Inter, sans-serif">Inter</option>
            <option value="Outfit, sans-serif">Outfit</option>
            <option value="Syne, sans-serif">Syne</option>
            <option value="Roboto, sans-serif">Roboto</option>
            <option value="Playfair Display, serif">Playfair Display</option>
          </select>
          <input type="text" id="${id}-size" placeholder="Size (e.g. 2rem)" style="flex:1;min-width:100px;" class="admin-input">
          <select id="${id}-align" style="flex:1;min-width:100px;" class="admin-input">
            <option value="">Default Align</option>
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
          <input type="text" id="${id}-color" placeholder="Color (#fff)" style="max-width:110px;" class="admin-input" title="Text Color (leave blank for default)">
        </div>
      </details>
    `;
    input.parentNode.appendChild(wrap);
  });
}

function populateStyleFields() {
  const maps = {
    'home-name1':    config.home?.styles?.name1,
    'home-name2':    config.home?.styles?.name2,
    'home-subtitle': config.home?.styles?.subtitle,
    'home-cta-title': config.home?.styles?.ctaTitle,
    'home-cta-desc': config.home?.styles?.ctaDescription,
    'about-hero-title': config.about?.styles?.heroTitle,
    'about-intro-text1': config.about?.styles?.introText1,
    'about-intro-text2': config.about?.styles?.introText2,
    'about-quote-text': config.about?.styles?.quoteText,
    'contact-header-title': config.contact?.styles?.headerTitle,
    'contact-header-desc': config.contact?.styles?.headerDesc
  };
  Object.entries(maps).forEach(([id, s]) => {
    if (!s) return;
    setVal(`${id}-font`, s.font);
    setVal(`${id}-size`, s.size);
    setVal(`${id}-align`, s.align);
    setVal(`${id}-color`, s.color);
  });
}

function readStyleFields() {
  function readStyle(id) {
    return {
      font: getVal(`${id}-font`),
      size: getVal(`${id}-size`),
      align: getVal(`${id}-align`),
      color: getVal(`${id}-color`)
    };
  }
  if (!config.home.styles) config.home.styles = {};
  config.home.styles.name1 = readStyle('home-name1');
  config.home.styles.name2 = readStyle('home-name2');
  config.home.styles.subtitle = readStyle('home-subtitle');
  config.home.styles.ctaTitle = readStyle('home-cta-title');
  config.home.styles.ctaDescription = readStyle('home-cta-desc');

  if (!config.about.styles) config.about.styles = {};
  config.about.styles.heroTitle = readStyle('about-hero-title');
  config.about.styles.introText1 = readStyle('about-intro-text1');
  config.about.styles.introText2 = readStyle('about-intro-text2');
  config.about.styles.quoteText = readStyle('about-quote-text');

  if (!config.contact.styles) config.contact.styles = {};
  config.contact.styles.headerTitle = readStyle('contact-header-title');
  config.contact.styles.headerDesc = readStyle('contact-header-desc');
}

/* ============ COLOR HEX DISPLAY ============ */
function initColorHexDisplay() {
  const colorInput = document.getElementById('design-accent');
  const hexSpan = document.getElementById('design-accent-hex');
  if (colorInput && hexSpan) {
    const update = () => { hexSpan.textContent = colorInput.value.toUpperCase(); };
    colorInput.addEventListener('input', update);
    update();
  }
}

/* ============ LAYOUT & SPACING EDITOR ============ */
function initLayoutEditor() {
  const pageSelect = document.getElementById('layout-page-select');
  if (!pageSelect) return;
  pageSelect.addEventListener('change', () => renderLayoutEditors(pageSelect.value));
  renderLayoutEditors(pageSelect.value);
}

function renderLayoutEditors(page) {
  const container = document.getElementById('layout-editors-container');
  if (!container) return;
  
  const sections = LAYOUT_SECTIONS[page];
  const pageLayout = config.layout?.[page] || {};
  
  if (!sections) {
    container.innerHTML = '<p style="color:var(--admin-text-muted);">No sections defined for this page.</p>';
    return;
  }

  container.innerHTML = Object.keys(sections).map(key => {
    const info = sections[key];
    const data = pageLayout[key] || {};
    const hasGrid = !!info.gridSel;
    
    return `
      <div class="layout-editor" data-page="${page}" data-section="${key}">
        <div class="layout-editor__header">
          <span class="layout-editor__title">${info.label}</span>
          <div class="layout-align">
            <button type="button" class="layout-align__btn ${data.align === 'left' ? 'active' : ''}" data-align="left" title="Align Left">◀</button>
            <button type="button" class="layout-align__btn ${data.align === 'center' || !data.align ? 'active' : ''}" data-align="center" title="Align Center">●</button>
            <button type="button" class="layout-align__btn ${data.align === 'right' ? 'active' : ''}" data-align="right" title="Align Right">▶</button>
          </div>
        </div>
        <div class="box-model">
          <div class="box-model__input-group">
            <span>margin-top</span>
            <input type="number" class="layout-input" data-prop="mt" value="${data.mt || ''}" placeholder="0">
          </div>
          <div class="box-model__padding-area">
            <div class="box-model__input-group">
              <span>padding-top</span>
              <input type="number" class="layout-input" data-prop="pt" value="${data.pt || ''}" placeholder="0">
            </div>
            <div class="box-model__content-area">${info.label}</div>
            <div class="box-model__input-group">
              <span>padding-bottom</span>
              <input type="number" class="layout-input" data-prop="pb" value="${data.pb || ''}" placeholder="0">
            </div>
          </div>
          <div class="box-model__input-group">
            <span>margin-bottom</span>
            <input type="number" class="layout-input" data-prop="mb" value="${data.mb || ''}" placeholder="0">
          </div>
          ${hasGrid ? `
          <div class="box-model__input-group" style="margin-top:12px;">
            <span>grid columns</span>
            <input type="number" class="layout-input" data-prop="gridCols" value="${data.gridCols || ''}" placeholder="auto" min="1" max="6">
          </div>` : ''}
        </div>
      </div>
    `;
  }).join('');

  // Bind alignment buttons
  container.querySelectorAll('.layout-align__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.layout-align');
      group.querySelectorAll('.layout-align__btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

function readLayoutEditors() {
  document.querySelectorAll('.layout-editor').forEach(editor => {
    const page = editor.dataset.page;
    const section = editor.dataset.section;
    if (!config.layout[page]) config.layout[page] = {};
    if (!config.layout[page][section]) config.layout[page][section] = {};
    
    const data = config.layout[page][section];
    
    // Read align
    const activeAlign = editor.querySelector('.layout-align__btn.active');
    data.align = activeAlign ? activeAlign.dataset.align : '';
    
    // Read all layout inputs
    editor.querySelectorAll('.layout-input').forEach(input => {
      const prop = input.dataset.prop;
      data[prop] = input.value;
    });
  });
}

/* ============ SIDEBAR NAV ============ */
function initSidebar() {
  document.querySelectorAll('.sidebar__link[data-section]').forEach(link => {
    link.addEventListener('click', () => switchSection(link.dataset.section));
  });
}

function switchSection(id) {
  document.querySelectorAll('.sidebar__link').forEach(l => l.classList.remove('active'));
  document.querySelector(`.sidebar__link[data-section="${id}"]`)?.classList.add('active');
  document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
  document.getElementById(`section-${id}`)?.classList.add('active');
  document.querySelector('.sidebar')?.classList.remove('open');
}

/* ============ POPULATE ============ */
function populateAllForms() {
  const c = config;
  // General
  setVal('gen-site-title', c.general.siteTitle);
  setVal('gen-meta-desc', c.general.metaDescription);
  setVal('gen-logo', c.general.logoText);
  setVal('gen-copyright', c.general.copyrightText);
  setVal('gen-vimeo', c.general.socialLinks.vimeo);
  setVal('gen-facebook', c.general.socialLinks.facebook);
  setVal('gen-whatsapp', c.general.socialLinks.whatsapp);
  setVal('gen-instagram', c.general.socialLinks.instagram);

  // Home - Hero
  setVal('home-name1', c.home.hero.name1);
  setVal('home-name2', c.home.hero.name2);
  setVal('home-subtitle', c.home.hero.subtitle);
  setVal('home-description', c.home.hero.description);
  setVal('home-hero-video', c.home.hero.heroVideo);
  setVal('home-banner-video', c.home.hero.bannerVideo);
  setVal('home-hero-btn', c.home.hero.buttonText);
  setChecked('home-hero-visible', c.home.hero.visible);
  // Home - Featured
  setVal('home-feat-label', c.home.featured.label);
  setVal('home-feat-title', c.home.featured.title);
  setVal('home-feat-btn', c.home.featured.buttonText);
  setChecked('home-feat-visible', c.home.featured.visible);
  // Home - Video Banner
  setVal('home-vb-label', c.home.videoBanner.label);
  setVal('home-vb-title1', c.home.videoBanner.titlePart1);
  setVal('home-vb-title2', c.home.videoBanner.titlePart2);
  setChecked('home-vb-visible', c.home.videoBanner.visible);
  // Home - CTA
  setVal('home-cta-label', c.home.cta.label);
  setVal('home-cta-title', c.home.cta.title);
  setVal('home-cta-desc', c.home.cta.description);
  setVal('home-cta-btn', c.home.cta.buttonText);
  setChecked('home-cta-visible', c.home.cta.visible);

  // About
  setVal('about-hero-bg', c.about.heroBanner.heroBackground);
  setVal('about-hero-label', c.about.heroBanner.label);
  setVal('about-hero-title', c.about.heroBanner.title);
  setChecked('about-hero-visible', c.about.heroBanner.visible);
  setVal('about-intro-text1', c.about.intro.text1);
  setVal('about-intro-text2', c.about.intro.text2);
  setChecked('about-intro-visible', c.about.intro.visible);
  setVal('about-gallery-label', c.about.gallery.label);
  setVal('about-gallery-title', c.about.gallery.title);
  setVal('about-gallery-photos', (c.about.gallery.photos || []).join('\n'));
  setChecked('about-gallery-visible', c.about.gallery.visible);
  setVal('about-phil-title1', c.about.philosophy.title1);
  setVal('about-phil-text1', c.about.philosophy.text1);
  setVal('about-phil-text2', c.about.philosophy.text2);
  setVal('about-phil-title2', c.about.philosophy.title2);
  setChecked('about-phil-visible', c.about.philosophy.visible);
  renderExpertiseItems();
  setVal('about-tl-label', c.about.timeline.label);
  setVal('about-tl-title', c.about.timeline.title);
  setChecked('about-tl-visible', c.about.timeline.visible);
  renderTimeline();
  setVal('about-quote-text', c.about.quote.text);
  setVal('about-quote-author', c.about.quote.author);
  setChecked('about-quote-visible', c.about.quote.visible);

  // Contact
  setVal('contact-header-label', c.contact.header.label);
  setVal('contact-header-title', c.contact.header.title);
  setVal('contact-header-desc', c.contact.header.description);
  setVal('contact-email', c.contact.info.email);
  setVal('contact-location', c.contact.info.location);
  setVal('contact-vimeo', c.contact.info.vimeoUrl);
  setVal('contact-facebook', c.contact.info.facebookUrl);
  setVal('contact-instagram', c.contact.info.instagramUrl);
  setVal('contact-whatsapp', c.contact.info.whatsappUrl);

  // Portfolio
  if (c.portfolio) {
    setVal('port-hero-label', c.portfolio.hero?.label);
    setVal('port-hero-title1', c.portfolio.hero?.titlePart1);
    setVal('port-hero-title2', c.portfolio.hero?.titlePart2);
    setVal('port-hero-bg', c.portfolio.hero?.heroBackground);
    setVal('port-showmore-text', c.portfolio.showMoreText);
    setVal('port-noprojects-text', c.portfolio.noProjectsText);
    // Styles
    setVal('port-hero-label-size', c.portfolio.styles?.heroLabel?.size);
    setVal('port-hero-label-align', c.portfolio.styles?.heroLabel?.align);
    setVal('port-hero-title-size', c.portfolio.styles?.heroTitle?.size);
    setVal('port-hero-title-align', c.portfolio.styles?.heroTitle?.align);
    setVal('port-role-btn-size', c.portfolio.styles?.roleButtons?.size);
    setVal('port-role-btn-align', c.portfolio.styles?.roleButtons?.align);
    setVal('port-filter-btn-size', c.portfolio.styles?.filterButtons?.size);
    setVal('port-filter-btn-align', c.portfolio.styles?.filterButtons?.align);
    setVal('port-showmore-size', c.portfolio.styles?.showMoreBtn?.size);
    setVal('port-showmore-align', c.portfolio.styles?.showMoreBtn?.align);
  }

  // Footer
  if (c.footer) {
    setVal('footer-name1', c.footer.name1);
    setVal('footer-name2', c.footer.name2);
    setVal('footer-description', c.footer.description);
    setVal('footer-location', c.footer.location);
    setVal('footer-email', c.footer.email);
    setVal('footer-instagram', c.footer.instagramUrl);
    setVal('footer-facebook', c.footer.facebookUrl);
    setVal('footer-vimeo', c.footer.vimeoUrl);
    setVal('footer-copyright', c.footer.copyrightName);
    setVal('footer-tagline', c.footer.tagline);
  }

  // Design
  setVal('design-accent', c.design.accentColor);
  setVal('design-bg', c.design.bgColor);
  setVal('design-text', c.design.textColor);
  setChecked('design-preloader', c.design.enablePreloader);
  setChecked('design-transitions', c.design.enableTransitions);
  setChecked('design-smooth', c.design.enableSmoothScroll);

  // Style fields
  populateStyleFields();

  // Projects
  renderProjectList();
}

/* ============ READ ALL ============ */
function readAllForms() {
  // General
  config.general.siteTitle = getVal('gen-site-title');
  config.general.metaDescription = getVal('gen-meta-desc');
  config.general.logoText = getVal('gen-logo');
  config.general.copyrightText = getVal('gen-copyright');
  config.general.socialLinks.vimeo = getVal('gen-vimeo');
  config.general.socialLinks.facebook = getVal('gen-facebook');
  config.general.socialLinks.whatsapp = getVal('gen-whatsapp');
  config.general.socialLinks.instagram = getVal('gen-instagram');

  // Home
  config.home.hero.name1 = getVal('home-name1');
  config.home.hero.name2 = getVal('home-name2');
  config.home.hero.subtitle = getVal('home-subtitle');
  config.home.hero.description = getVal('home-description');
  config.home.hero.heroVideo = getVal('home-hero-video');
  config.home.hero.bannerVideo = getVal('home-banner-video');
  config.home.hero.buttonText = getVal('home-hero-btn');
  config.home.hero.visible = getChecked('home-hero-visible');
  config.home.featured.label = getVal('home-feat-label');
  config.home.featured.title = getVal('home-feat-title');
  config.home.featured.buttonText = getVal('home-feat-btn');
  config.home.featured.visible = getChecked('home-feat-visible');
  config.home.videoBanner.label = getVal('home-vb-label');
  config.home.videoBanner.titlePart1 = getVal('home-vb-title1');
  config.home.videoBanner.titlePart2 = getVal('home-vb-title2');
  config.home.videoBanner.visible = getChecked('home-vb-visible');
  config.home.cta.label = getVal('home-cta-label');
  config.home.cta.title = getVal('home-cta-title');
  config.home.cta.description = getVal('home-cta-desc');
  config.home.cta.buttonText = getVal('home-cta-btn');
  config.home.cta.visible = getChecked('home-cta-visible');

  // About
  config.about.heroBanner.heroBackground = getVal('about-hero-bg');
  config.about.heroBanner.label = getVal('about-hero-label');
  config.about.heroBanner.title = getVal('about-hero-title');
  config.about.heroBanner.visible = getChecked('about-hero-visible');
  config.about.intro.text1 = getVal('about-intro-text1');
  config.about.intro.text2 = getVal('about-intro-text2');
  config.about.intro.visible = getChecked('about-intro-visible');
  config.about.gallery.label = getVal('about-gallery-label');
  config.about.gallery.title = getVal('about-gallery-title');
  config.about.gallery.photos = getVal('about-gallery-photos').split('\n').map(s => s.trim()).filter(Boolean);
  config.about.gallery.visible = getChecked('about-gallery-visible');
  config.about.philosophy.title1 = getVal('about-phil-title1');
  config.about.philosophy.text1 = getVal('about-phil-text1');
  config.about.philosophy.text2 = getVal('about-phil-text2');
  config.about.philosophy.title2 = getVal('about-phil-title2');
  config.about.philosophy.visible = getChecked('about-phil-visible');
  readExpertiseItems();
  config.about.timeline.label = getVal('about-tl-label');
  config.about.timeline.title = getVal('about-tl-title');
  config.about.timeline.visible = getChecked('about-tl-visible');
  readTimeline();
  config.about.quote.text = getVal('about-quote-text');
  config.about.quote.author = getVal('about-quote-author');
  config.about.quote.visible = getChecked('about-quote-visible');

  // Contact
  config.contact.header.label = getVal('contact-header-label');
  config.contact.header.title = getVal('contact-header-title');
  config.contact.header.description = getVal('contact-header-desc');
  config.contact.info.email = getVal('contact-email');
  config.contact.info.location = getVal('contact-location');
  config.contact.info.vimeoUrl = getVal('contact-vimeo');
  config.contact.info.facebookUrl = getVal('contact-facebook');
  config.contact.info.instagramUrl = getVal('contact-instagram');
  config.contact.info.whatsappUrl = getVal('contact-whatsapp');

  // Design
  config.design.accentColor = getVal('design-accent');
  config.design.bgColor = getVal('design-bg');
  config.design.textColor = getVal('design-text');
  config.design.enablePreloader = getChecked('design-preloader');
  config.design.enableTransitions = getChecked('design-transitions');
  config.design.enableSmoothScroll = getChecked('design-smooth');

  // Footer
  if (!config.footer) config.footer = {};
  config.footer.name1 = getVal('footer-name1');
  config.footer.name2 = getVal('footer-name2');
  config.footer.description = getVal('footer-description');
  config.footer.location = getVal('footer-location');
  config.footer.email = getVal('footer-email');
  config.footer.instagramUrl = getVal('footer-instagram');
  config.footer.facebookUrl = getVal('footer-facebook');
  config.footer.vimeoUrl = getVal('footer-vimeo');
  config.footer.copyrightName = getVal('footer-copyright');
  config.footer.tagline = getVal('footer-tagline');

  // Portfolio
  if (!config.portfolio) config.portfolio = {};
  if (!config.portfolio.hero) config.portfolio.hero = {};
  config.portfolio.hero.label = getVal('port-hero-label');
  config.portfolio.hero.titlePart1 = getVal('port-hero-title1');
  config.portfolio.hero.titlePart2 = getVal('port-hero-title2');
  config.portfolio.hero.heroBackground = getVal('port-hero-bg');
  config.portfolio.showMoreText = getVal('port-showmore-text');
  config.portfolio.noProjectsText = getVal('port-noprojects-text');
  if (!config.portfolio.styles) config.portfolio.styles = {};
  config.portfolio.styles.heroLabel =     { size: getVal('port-hero-label-size'), align: getVal('port-hero-label-align') };
  config.portfolio.styles.heroTitle =     { size: getVal('port-hero-title-size'), align: getVal('port-hero-title-align') };
  config.portfolio.styles.roleButtons =   { size: getVal('port-role-btn-size'),   align: getVal('port-role-btn-align') };
  config.portfolio.styles.filterButtons = { size: getVal('port-filter-btn-size'), align: getVal('port-filter-btn-align') };
  config.portfolio.styles.showMoreBtn =   { size: getVal('port-showmore-size'),   align: getVal('port-showmore-align') };

  // Styles
  readStyleFields();

  // Layout
  readLayoutEditors();
}

/* ============ SAVE ============ */
function bindSaveButtons() {
  document.querySelectorAll('[data-action="save"]').forEach(btn => {
    btn.addEventListener('click', saveAll);
  });
  document.getElementById('logout-btn')?.addEventListener('click', () => {
    sessionStorage.removeItem('admin-auth');
    location.reload();
  });
}

function saveAll() {
  readAllForms();
  loader.save(config);
  showToast('✓ Settings saved! Refresh the live site to see changes.');
}

/* ============ EXPERTISE ITEMS ============ */
function renderExpertiseItems() {
  const container = document.getElementById('expertise-list');
  if (!container) return;
  const items = config.about.philosophy.expertiseItems || [];
  container.innerHTML = items.map((item, i) => `
    <div class="project-list-item" style="flex-direction:column;align-items:stretch;gap:0.5rem;">
      <div style="display:flex;gap:0.5rem;">
        <input type="text" value="${esc(item.title)}" id="exp-title-${i}" placeholder="Title" style="flex:1;">
        <button class="btn-admin btn-admin--sm btn-admin--danger" onclick="removeExpertise(${i})">✕</button>
      </div>
      <input type="text" value="${esc(item.description)}" id="exp-desc-${i}" placeholder="Description">
    </div>
  `).join('');
}

function readExpertiseItems() {
  config.about.philosophy.expertiseItems = (config.about.philosophy.expertiseItems || []).map((item, i) => ({
    title: getVal(`exp-title-${i}`) || item.title,
    description: getVal(`exp-desc-${i}`) || item.description
  }));
}

window.removeExpertise = function(i) {
  readExpertiseItems();
  config.about.philosophy.expertiseItems.splice(i, 1);
  renderExpertiseItems();
};

window.addExpertise = function() {
  readExpertiseItems();
  config.about.philosophy.expertiseItems.push({ title: '', description: '' });
  renderExpertiseItems();
};

/* ============ TIMELINE ============ */
function renderTimeline() {
  const container = document.getElementById('timeline-list');
  if (!container) return;
  const items = config.about.timeline.milestones || [];
  container.innerHTML = items.map((t, i) => `
    <div class="project-list-item" style="flex-direction:column;align-items:stretch;gap:0.5rem;">
      <div style="display:flex;gap:0.5rem;">
        <input type="text" value="${esc(t.year)}" id="tl-year-${i}" placeholder="Year" style="width:100px;">
        <input type="text" value="${esc(t.title)}" id="tl-title-${i}" placeholder="Title" style="flex:1;">
        <button class="btn-admin btn-admin--sm btn-admin--danger" onclick="removeTimeline(${i})">✕</button>
      </div>
      <textarea id="tl-desc-${i}" placeholder="Description" style="min-height:60px;">${esc(t.description)}</textarea>
    </div>
  `).join('');
}

function readTimeline() {
  config.about.timeline.milestones = (config.about.timeline.milestones || []).map((t, i) => ({
    year: getVal(`tl-year-${i}`) || t.year,
    title: getVal(`tl-title-${i}`) || t.title,
    description: getVal(`tl-desc-${i}`) || t.description
  }));
}

window.removeTimeline = function(i) {
  readTimeline();
  config.about.timeline.milestones.splice(i, 1);
  renderTimeline();
};

window.addTimeline = function() {
  readTimeline();
  config.about.timeline.milestones.push({ year: '', title: '', description: '' });
  renderTimeline();
};

/* ============ PROJECTS ============ */
function renderProjectList() {
  const list = document.getElementById('project-list');
  if (!list) return;
  const projects = config.projects || [];
  if (projects.length === 0) {
    list.innerHTML = '<p style="color:var(--admin-text-muted);padding:1rem;">No projects yet. Click "+ Add Project" to create one.</p>';
    return;
  }
  list.innerHTML = projects.map((p, i) => `
    <div class="project-list-item" data-index="${i}">
      <div class="project-list-item__thumb">
        ${p.thumbnail ? `<img src="${p.thumbnail}" alt="${esc(p.title)}">` : ''}
      </div>
      <div class="project-list-item__info">
        <div class="project-list-item__title">${esc(p.title)}</div>
        <div class="project-list-item__meta">${p.role || 'No role'} · ${p.category} · ${p.year}${p.featured ? ' · ⭐' : ''}</div>
      </div>
      <div class="project-list-item__actions">
        <button class="btn-admin btn-admin--sm" onclick="editProject(${i})">Edit</button>
        <button class="btn-admin btn-admin--sm btn-admin--danger" onclick="deleteProject(${i})">✕</button>
      </div>
    </div>
  `).join('');
}

function bindProjectActions() {
  document.getElementById('add-project-btn')?.addEventListener('click', () => {
    editingProjectIndex = -1;
    openProjectModal({
      slug: '', title: '', client: '', role: 'assistant', category: 'commercial',
      year: new Date().getFullYear(), vimeoId: '', thumbnail: '',
      description: '', featured: false, credits: []
    });
  });
  document.getElementById('project-modal-close')?.addEventListener('click', closeProjectModal);
  document.getElementById('project-modal-save')?.addEventListener('click', saveProject);
}

window.editProject = function(index) {
  editingProjectIndex = index;
  openProjectModal(config.projects[index]);
};

window.deleteProject = function(index) {
  if (confirm(`Delete "${config.projects[index].title}"?`)) {
    config.projects.splice(index, 1);
    loader.save(config);
    renderProjectList();
    showToast('Project deleted');
  }
};

function openProjectModal(p) {
  setVal('pm-title', p.title);
  setVal('pm-slug', p.slug);
  setVal('pm-client', p.client);
  const roleVal = (p.role || '').toLowerCase();
  setVal('pm-role', (roleVal.includes('director') && !roleVal.includes('assistant')) ? 'director' : 'assistant');
  setVal('pm-category', p.category);
  setVal('pm-year', p.year);
  setVal('pm-vimeoId', p.vimeoId);
  setVal('pm-thumbnail', p.thumbnail);
  setVal('pm-description', p.description);
  setChecked('pm-featured', p.featured);

  // Render credits
  const creditsContainer = document.getElementById('pm-credits-container');
  if (creditsContainer) {
    creditsContainer.innerHTML = '';
    (p.credits || []).forEach(c => addCreditInput(c));
  }

  document.getElementById('project-modal-title').textContent = editingProjectIndex === -1 ? 'Add Project' : 'Edit Project';
  document.getElementById('project-modal-overlay').classList.add('active');
}

window.addCreditInput = function(credit = { role: '', name: '' }) {
  const container = document.getElementById('pm-credits-container');
  const div = document.createElement('div');
  div.className = 'credit-row';
  div.innerHTML = `
    <input type="text" class="cr-role" value="${esc(credit.role)}" placeholder="Role (e.g. Director)">
    <input type="text" class="cr-name" value="${esc(credit.name)}" placeholder="Name">
    <button class="btn-admin btn-admin--danger btn-admin--sm" type="button" onclick="this.parentElement.remove()">✕</button>
  `;
  container.appendChild(div);
};

document.getElementById('pm-add-credit')?.addEventListener('click', () => window.addCreditInput());

function closeProjectModal() {
  document.getElementById('project-modal-overlay').classList.remove('active');
}

function saveProject() {
  const creditRows = document.querySelectorAll('#pm-credits-container .credit-row');
  const credits = [];
  creditRows.forEach(r => {
    const role = r.querySelector('.cr-role').value.trim();
    const name = r.querySelector('.cr-name').value.trim();
    if (role || name) credits.push({ role, name });
  });

  const vimeoId = getVal('pm-vimeoId');
  let thumbnail = getVal('pm-thumbnail');
  if (!thumbnail && vimeoId) {
    thumbnail = `https://vumbnail.com/${vimeoId}.jpg`;
  }

  const p = {
    slug: getVal('pm-slug') || getVal('pm-title').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    title: getVal('pm-title'),
    client: getVal('pm-client'),
    role: getVal('pm-role') === 'director' ? 'Director' : 'Assistant Director',
    category: getVal('pm-category'),
    year: parseInt(getVal('pm-year')) || new Date().getFullYear(),
    vimeoId: vimeoId,
    thumbnail: thumbnail,
    description: getVal('pm-description'),
    featured: getChecked('pm-featured'),
    credits: credits
  };

  if (!p.title) { alert('Title is required'); return; }

  if (editingProjectIndex === -1) {
    config.projects.push(p);
  } else {
    config.projects[editingProjectIndex] = p;
  }

  loader.save(config);
  renderProjectList();
  closeProjectModal();
  showToast(editingProjectIndex === -1 ? 'Project added' : 'Project updated');
}

/* ============ IMPORT / EXPORT ============ */
function bindImportExport() {
  document.getElementById('export-btn')?.addEventListener('click', () => {
    readAllForms();
    const full = { ...config };
    const json = JSON.stringify(full, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'aha-site-config.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Config exported');
  });

  document.getElementById('import-btn')?.addEventListener('click', () => {
    document.getElementById('import-file').click();
  });

  document.getElementById('import-file')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const imported = JSON.parse(ev.target.result);
        config = loader.deepMerge(structuredClone(DEFAULT_CONFIG), imported);
        if (imported.projects) config.projects = imported.projects;
        loader.save(config);
        populateAllForms();
        showToast('Config imported successfully');
      } catch (err) {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  });

  document.getElementById('reset-btn')?.addEventListener('click', () => {
    if (confirm('Reset ALL settings to defaults? This cannot be undone.')) {
      localStorage.removeItem('aha-site-config');
      localStorage.removeItem('aha-site-config-projects');
      config = structuredClone(DEFAULT_CONFIG);
      loader.config = config;
      populateAllForms();
      showToast('Reset to defaults');
    }
  });
}

/* ============ MOBILE SIDEBAR ============ */
function bindMobileSidebar() {
  document.getElementById('sidebar-toggle')?.addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('open');
  });
}

/* ============ HELPERS ============ */
function setVal(id, val) { const el = document.getElementById(id); if (el) el.value = val ?? ''; }
function getVal(id) { return document.getElementById(id)?.value ?? ''; }
function setChecked(id, val) { const el = document.getElementById(id); if (el) el.checked = !!val; }
function getChecked(id) { return document.getElementById(id)?.checked ?? false; }
function esc(str) { return (str || '').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}
