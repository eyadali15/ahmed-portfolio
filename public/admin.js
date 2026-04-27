/* ============================================
   ADMIN.JS — Ahmed Abuzenada Admin Panel Logic
   ============================================ */
import { ConfigLoader, DEFAULT_CONFIG } from './config-loader.js';

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
  populateAllForms();
  bindSaveButtons();
  bindProjectActions();
  bindImportExport();
  bindMobileSidebar();
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
  // Fallback: projects stay empty, user adds manually
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
  setVal('gen-linkedin', c.general.socialLinks.linkedin);
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
  setVal('contact-linkedin', c.contact.info.linkedinUrl);
  setVal('contact-whatsapp', c.contact.info.whatsappUrl);

  // Design
  setVal('design-accent', c.design.accentColor);
  setVal('design-bg', c.design.bgColor);
  setVal('design-text', c.design.textColor);

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
  config.general.socialLinks.linkedin = getVal('gen-linkedin');
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
  config.contact.info.linkedinUrl = getVal('contact-linkedin');
  config.contact.info.whatsappUrl = getVal('contact-whatsapp');

  // Design
  config.design.accentColor = getVal('design-accent');
  config.design.bgColor = getVal('design-bg');
  config.design.textColor = getVal('design-text');
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
        <input type="text" value="${item.title}" id="exp-title-${i}" placeholder="Title" style="flex:1;">
        <button class="btn-admin btn-admin--sm btn-admin--danger" onclick="removeExpertise(${i})">✕</button>
      </div>
      <input type="text" value="${item.description}" id="exp-desc-${i}" placeholder="Description">
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
        <input type="text" value="${t.year}" id="tl-year-${i}" placeholder="Year" style="width:100px;">
        <input type="text" value="${t.title}" id="tl-title-${i}" placeholder="Title" style="flex:1;">
        <button class="btn-admin btn-admin--sm btn-admin--danger" onclick="removeTimeline(${i})">✕</button>
      </div>
      <textarea id="tl-desc-${i}" placeholder="Description" style="min-height:60px;">${t.description}</textarea>
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
        ${p.thumbnail ? `<img src="${p.thumbnail}" alt="${p.title}">` : ''}
      </div>
      <div class="project-list-item__info">
        <div class="project-list-item__title">${p.title}</div>
        <div class="project-list-item__meta">${p.role || 'No role'} · ${p.category} · ${p.year}</div>
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
    <input type="text" class="cr-role" value="${credit.role}" placeholder="Role (e.g. Director)">
    <input type="text" class="cr-name" value="${credit.name}" placeholder="Name">
    <button class="btn-admin btn-admin--danger btn-admin--sm" type="button" onclick="this.parentElement.remove()">✕</button>
  `;
  container.appendChild(div);
};

document.getElementById('pm-add-credit')?.addEventListener('click', () => window.addCreditInput());

function closeProjectModal() {
  document.getElementById('project-modal-overlay').classList.remove('active');
}

function saveProject() {
  // Read credits
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

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}
