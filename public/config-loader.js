/* ============================================
   CONFIG LOADER — localStorage-based CMS config
   for Ahmed Hany Abuzenada Portfolio
   ============================================ */

const STORAGE_KEY = 'aha-site-config';

/* Helper to structure default spacing */
function s(align='', pt='', pb='', mt='', mb='', gridCols='') {
  return { align, pt, pb, mt, mb, gridCols };
}

export const DEFAULT_CONFIG = {
  general: {
    siteTitle: 'Ahmed Hany Abuzenada — Film & Commercial Director',
    metaDescription: 'Ahmed Hany Abuzenada is an award-winning Saudi filmmaker, assistant director and director.',
    logoText: 'AHA',
    copyrightText: '© 2025 Ahmed Hany Abuzenada. All rights reserved.',
    socialLinks: {
      vimeo: 'https://vimeo.com/ahmedabuzenada',
      facebook: '',
      whatsapp: 'https://wa.me/',
      instagram: ''
    }
  },
  home: {
    hero: {
      visible: true,
      name1: 'Ahmed',
      name2: 'Abuzenada',
      subtitle: 'Film & Commercial Director',
      description: ' ',
      heroVideo: '/uploads/136726-764934405_small.mp4',
      bannerVideo: '/uploads/239444_small.mp4',
      buttonText: 'Portfolio'
    },
    featured: {
      visible: true,
      label: 'Selected Portfolio',
      title: 'Projects',
      buttonText: 'Show All'
    },
    videoBanner: {
      visible: true,
      label: 'Behind the Lens',
      titlePart1: 'Where Stories',
      titlePart2: 'Come Alive',
      fallbackImage: ''
    },
    cta: {
      visible: true,
      label: "Let's Collaborate",
      title: 'Always eager for the next adventure.',
      description: "Whether it's a commercial, documentary, or narrative film, every great project starts with a conversation.",
      buttonText: 'Start a Conversation'
    },
    styles: {
      name1: { font: '', size: '', align: '', color: '' },
      name2: { font: '', size: '', align: '', color: '' },
      subtitle: { font: '', size: '', align: '', color: '' },
      ctaTitle: { font: '', size: '', align: '', color: '' },
      ctaDescription: { font: '', size: '', align: '', color: '' }
    }
  },
  about: {
    heroBanner: {
      visible: true,
      heroBackground: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1920&q=80',
      label: ' ',
      title: 'About '
    },
    intro: {
      visible: true,
      text1: "I'm Ahmed Hany Abuzenada, an award-winning Saudi filmmaker and assistant director passionate about making a change through storytelling.",
      text2: 'My work sits at the intersection of technical precision and emotional resonance. Every frame serves the story, every cut feels intentional.'
    },
    gallery: {
      visible: true,
      label: 'Behind the Scenes',
      title: 'The Filmmaker',
      photos: [
        '/uploads/photo_1_2026-04-21_09-17-26.jpg',
        '/uploads/photo_2_2026-04-21_09-17-26.jpg',
        '/uploads/photo_3_2026-04-21_09-17-26.jpg',
        '/uploads/photo_4_2026-04-21_09-17-26.jpg',
        '/uploads/photo_5_2026-04-21_09-17-26.jpg',
        '/uploads/photo_6_2026-04-21_09-17-26.jpg',
        '/uploads/photo_7_2026-04-21_09-17-26.jpg',
        '/uploads/photo_8_2026-04-21_09-17-26.jpg'
      ]
    },
    servicesLabel: 'Services',
    servicesTitle: 'What I Do',
    services: [
      { icon: '🎬', title: 'Film Director', description: 'Bringing stories to life through narrative filmmaking.', tags: ['Narrative Films', 'Short Films', 'Music Videos', 'Visual Storytelling'], svgPath: 'M15.91 13.34l2.636-4.026-.454-.406-3.673 3.099c-.675-.138-1.402.068-1.894.618-.736.823-.665 2.088.159 2.824.824.736 2.088.665 2.824-.159.492-.55.615-1.295.402-1.95zm-3.91-10.646v-2.694h4v2.694c-1.439-.243-2.592-.238-4 0zm8.851 2.064l1.407-1.407 1.414 1.414-1.321 1.321c-.462-.484-.964-.927-1.5-1.328zm-18.851 4.242h8v2h-8v-2zm-2 4h8v2h-8v-2zm3 4h7v2h-7v-2zm21-3c0 5.523-4.477 10-10 10-2.79 0-5.3-1.155-7.111-3h3.28c1.138.631 2.439 1 3.831 1 4.411 0 8-3.589 8-8s-3.589-8-8-8c-1.392 0-2.693.369-3.831 1h-3.28c1.811-1.845 4.321-3 7.111-3 5.523 0 10 4.477 10 10z' },
      { icon: '📽️', title: 'Commercial Director', description: 'Creating high-impact commercials and brand films.', tags: ['TV Commercials', 'Brand Films', 'Product Videos', 'Campaign Direction'], svgPath: 'M18 3l-3-3-8.156 8.156 2.994 3.02L18 3zM2 7l5 5-2 5-5-2 2-8zm7.063 11.063l3.02 2.994L20.24 12.9l-3-3-8.177 8.163zM17 21l-5-2 5-2-2 5 2-1z' },
      { icon: '🎥', title: 'Assistant Director (Commercial)', description: 'Managing the creative flow on set for high-profile commercial productions.', tags: ['Set Management', 'Scheduling', 'Crew Coordination', 'Production Flow'], svgPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' },
      { icon: '🎞️', title: 'Assistant Director (Film)', description: 'First assistant direction on narrative film sets.', tags: ['Script Breakdown', 'Talent Management', 'Shot Lists', 'On-Set Direction'], svgPath: 'M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z' }
    ],
    timeline: {
      visible: true,
      label: 'Journey',
      title: 'Career Timeline',
      milestones: [
        { year: '2018', title: 'Began Filmmaking', description: 'First picked up a camera and discovered a passion for visual storytelling.' },
        { year: '2020', title: 'First Short Film', description: 'Directed and produced first narrative short, selected for multiple festivals.' },
        { year: '2021', title: 'Trucage Documentary', description: 'Award-winning documentary exploring stunt professionals. Saudi Film Festival selection.' },
        { year: '2022', title: 'Commercial Work', description: 'Began working as assistant director on major commercial productions.' },
        { year: '2023', title: 'Major Campaigns', description: 'Collaborated on high-profile campaigns for brands including Almarai.' },
        { year: '2024', title: 'Creative Direction', description: 'Expanded into creative direction for commercial and documentary projects.' }
      ]
    },
    quote: {
      visible: true,
      text: 'Every frame is an opportunity to reveal something true about the world we live in.',
      author: 'Ahmed Hany Abuzenada'
    },
    styles: {
      heroLabel: { font: '', size: '', align: '', color: '' },
      heroTitle: { font: '', size: '', align: '', color: '' },
      introText1: { font: '', size: '', align: '', color: '' },
      introText2: { font: '', size: '', align: '', color: '' },
      galleryLabel: { font: '', size: '', align: '', color: '' },
      galleryTitle: { font: '', size: '', align: '', color: '' },
      svcLabel: { font: '', size: '', align: '', color: '' },
      svcTitle: { font: '', size: '', align: '', color: '' },
      tlLabel: { font: '', size: '', align: '', color: '' },
      tlTitle: { font: '', size: '', align: '', color: '' },
      quoteText: { font: '', size: '', align: '', color: '' },
      quoteAuthor: { font: '', size: '', align: '', color: '' }
    }
  },
  portfolio: {
    hero: {
      label: 'Portfolio',
      titlePart1: 'Selected',
      titlePart2: 'Portfolio',
      heroBackground: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?auto=format&fit=crop&w=1920&q=80'
    },
    showMoreText: 'Show More',
    noProjectsText: 'No projects found.',
    styles: {
      heroLabel:     { size: '', align: '' },
      heroTitle:     { size: '', align: '' },
      roleButtons:   { size: '', align: '' },
      filterButtons: { size: '', align: '' },
      showMoreBtn:   { size: '', align: '' }
    }
  },
  contact: {
    heroBanner: {
      visible: true,
      heroBackground: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1920&q=80',
      label: 'Contact',
      title: 'Get in Touch'
    },
    header: {
      label: 'Get in Touch',
      title: "Let's create together",
      description: "Whether you're looking for an assistant director or a creative collaborator — I'd love to hear from you."
    },
    info: {
      email: 'contact@ahmedabuzenada.com',
      location: 'Saudi Arabia',
      vimeoUrl: 'https://vimeo.com/ahmedabuzenada',
      facebookUrl: '',
      whatsappUrl: 'https://wa.me/',
      instagramUrl: '',
      formButtonText: 'Send Message',
      formHeaderLabel: 'Send a Message'
    },
    styles: {
      headerTitle: { font: '', size: '', align: '', color: '' },
      headerDesc: { font: '', size: '', align: '', color: '' }
    }
  },
  footer: {
    name1: 'Ahmed',
    name2: 'Abuzenada',
    description: 'Award-winning filmmaker & assistant director based in Saudi Arabia. Crafting cinematic stories that inspire.',
    location: 'Saudi Arabia & Egypt',
    email: 'abuzfilms@gmail.com',
    instagramUrl: 'https://www.instagram.com/_ahmedhanyy/',
    facebookUrl: 'https://www.facebook.com/ahmed.hany.39',
    vimeoUrl: 'https://vimeo.com/ahmedabuzenada',
    copyrightName: 'Ahmed Hany Abuzenada',
    tagline: 'Crafted with passion for cinema'
  },
  design: {
    accentColor: '#d4af37',
    bgColor: '#0a0a0a',
    textColor: '#ffffff',
    enablePreloader: true,
    enableTransitions: true,
    enableSmoothScroll: true
  },
  spacing: {
    home: {
      heroPaddingX: 24, ctaTextPaddingTop: 6, ctaTitleMarginBottom: 27, featuredGridGap: 50,
      ctaButtonMarginTop: 20, featuredButtonAlign: 'center', heroSubtitleMarginBottom: 20,
      featuredTitleToGridGap: 80, videoBannerHeight: 75, featuredGridToButtonGap: 15,
      ctaAlign: 'center', ctaTextMarginBottom: 40, heroTitleMarginBottom: 36,
      heroDescriptionMarginBottom: 36, featuredTitleAlign: 'center', ctaButtonMarginBottom: 20,
      ctaSectionPaddingX: 0, ctaSectionPaddingY: 0, ctaLabelMarginBottom: 20,
      featuredSectionPaddingX: 0, heroTextAlign: 'center', featuredSectionPaddingY: 160
    },
    work: {
      heroBackground: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?auto=format&fit=crop&w=1920&q=80',
      topSpacerHeight: 200, gridPaddingTop: 15, titleToFilterGap: 10, sectionPaddingX: 0,
      sectionPaddingY: 64, roleToFilterGap: 32, filterAlign: 'left', titleAlign: 'left',
      gridGap: 32, filterToGridGap: 40, bottomSpacerHeight: 40
    },
    about: {
      heroPaddingX: 0, heroPaddingY: 80, galleryGap: 8, topSpacerHeight: 110,
      quoteAlign: 'center', philosophyColumnsGap: 80, timelineSectionPaddingX: 0,
      heroAlign: 'left', timelineSectionPaddingY: 96, quoteSectionPaddingX: 0,
      quoteSectionPaddingY: 112, timelineItemsGap: 64, philosophySectionPaddingX: 0,
      gallerySectionPaddingY: 96, philosophySectionPaddingY: 96
    },
    contact: {
      topSpacerHeight: 110, sectionPaddingY: 64, sectionPaddingX: 0,
      headerMarginBottom: 80, headerAlign: 'center', columnsGap: 80, infoItemsGap: 40
    },
    footer: {
      mainPaddingY: 64, mainPaddingX: 0, columnsGap: 56, bottomBarPaddingY: 48
    },
    buttons: {
      filterPaddingLeft: 28, filterPaddingRight: 28, filterPaddingBottom: 12,
      paddingTop: 16, marginTop: 16, paddingRight: 32, marginRight: 0,
      style: 'rounded', marginLeft: 0, filterBorderRadius: 8, paddingLeft: 32,
      filterStyle: 'rounded', marginBottom: 16, filterPaddingTop: 12,
      paddingBottom: 16, borderRadius: 8
    }
  },
  layout: {
    home: {
      hero:           s(),
      featured:       s(),
      featuredGrid:   s(),
      videoBanner:    s(),
      cta:            s(),
      footer:         s()
    },
    portfolio: {
      hero:           s(),
      roleButtons:    s(),
      filters:        s(),
      grid:           s(),
      footer:         s()
    },
    about: {
      hero:           s(),
      intro:          s(),
      gallery:        s(),
      services:       s(),
      timeline:       s(),
      quote:          s(),
      footer:         s()
    },
    contact: {
      header:         s(),
      contactInfo:    s(),
      formHeaderLabel:s(),
      form:           s(),
      formFieldGroup: s(),
      formLabels:     s(),
      formInputs:     s(),
      formSubmitBtn:  s(),
      footer:         s()
    },
    footer: {
      wrapper:        s(),
      mainContent:    s(),
      brandSection:   s(),
      brandName:      s(),
      brandDesc:      s(),
      locationTag:    s(),
      navColumn:      s(),
      navTitle:       s(),
      navLinks:       s(),
      connectColumn:  s(),
      connectTitle:   s(),
      emailLink:      s(),
      socialIcons:    s(),
      bottomBar:      s(),
      copyright:      s(),
      tagline:        s()
    }
  },
  projects: []
};

/* Section ID → CSS selector mapping for layout editor */
export const SECTION_SELECTORS = {
  home: {
    hero:          { label: 'Hero Banner',       sel: '.hero-section' },
    featured:      { label: 'Featured Projects', sel: '.featured-section' },
    featuredGrid:  { label: 'Project Grid',      sel: '.featured-grid', gridSel: '.featured-grid' },
    videoBanner:   { label: 'Video Banner',      sel: '.video-banner-section' },
    cta:           { label: 'Call to Action',     sel: '.cta-section' },
    footer:        { label: 'Footer',            sel: '.footer' }
  },
  portfolio: {
    hero:          { label: 'Hero',              sel: '.work-hero' },
    roleButtons:   { label: 'Role Buttons',      sel: '.role-buttons' },
    filters:       { label: 'Category Filters',  sel: '.filter-bar' },
    grid:          { label: 'Project Grid',      sel: '.projects-grid', gridSel: '.projects-grid' },
    footer:        { label: 'Footer',            sel: '.footer' }
  },
  about: {
    hero:          { label: 'Hero Banner',       sel: '.about-hero' },
    intro:         { label: 'Intro Section',     sel: '.about-intro' },
    gallery:       { label: 'Gallery',           sel: '.about-gallery' },
    servicesSection: { label: 'Services Section', sel: '.about-services' },
    servicesHeader:  { label: 'Services Label',   sel: '.services-header' },
    servicesTitle:   { label: 'Services Title',   sel: '.services-title' },
    servicesGrid:    { label: 'Services Grid',    sel: '.services-grid', gridSel: '.services-grid' },
    servicesCard:    { label: 'Service Card',     sel: '.service-card' },
    timeline:      { label: 'Timeline',          sel: '.about-timeline' },
    quote:         { label: 'Quote',             sel: '.about-quote' },
    footer:        { label: 'Footer',            sel: '.footer' }
  },
  contact: {
    header:        { label: 'Header Section',    sel: '.contact-header' },
    label:         { label: 'Label Text',        sel: '.contact-label' },
    title:         { label: 'Title Text',        sel: '.contact-title' },
    description:   { label: 'Description Text',  sel: '.contact-description' },
    infoRow:       { label: 'Info Row (Email/Location/Social)', sel: '.contact-info-row' },
    formWrapper:   { label: 'Form Container',    sel: '.contact-form-wrapper' },
    formHeaderLabel:{ label: 'Form "Send a Message" Line', sel: '.contact-form-header' },
    form:          { label: 'Form Body',         sel: '.contact-form' },
    formFieldGroup:{ label: 'Field Groups',      sel: '.form-field-group' },
    formLabels:    { label: 'Field Labels',       sel: '.form-field-label' },
    formInputs:    { label: 'Input Fields',       sel: '.contact-input' },
    formSubmitBtn: { label: 'Submit Button',      sel: '.contact-submit-btn' },
    contactInfo:   { label: 'Contact Info (Overall)', sel: '.contact-info' },
    footer:        { label: 'Footer',            sel: '.footer' }
  },
  footer: {
    wrapper:       { label: 'Footer (Overall)',       sel: '.footer' },
    mainContent:   { label: 'Main Content Area',      sel: '.footer-main-content' },
    brandSection:  { label: 'Brand Section (Left)',    sel: '.footer-brand' },
    brandName:     { label: 'Brand Name',              sel: '.footer-brand-name' },
    brandDesc:     { label: 'Brand Description',       sel: '.footer-brand-desc' },
    locationTag:   { label: 'Location Tag',            sel: '.footer-location' },
    navColumn:     { label: 'Navigation Column',       sel: '.footer-nav' },
    navTitle:      { label: 'Navigation Title',        sel: '.footer-nav-title' },
    navLinks:      { label: 'Navigation Links',        sel: '.footer-nav-links' },
    connectColumn: { label: 'Connect Column',          sel: '.footer-connect' },
    connectTitle:  { label: 'Connect Title',           sel: '.footer-connect-title' },
    emailLink:     { label: 'Email Link',              sel: '.footer-email' },
    socialIcons:   { label: 'Social Icons Row',        sel: '.footer-socials' },
    bottomBar:     { label: 'Bottom Bar',              sel: '.footer-bottom-bar' },
    copyright:     { label: 'Copyright Text',          sel: '.footer-copyright' },
    tagline:       { label: 'Tagline Text',            sel: '.footer-tagline' }
  }
};

export class ConfigLoader {
  constructor() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        this.config = this.deepMerge(structuredClone(DEFAULT_CONFIG), parsed);
      } catch {
        this.config = structuredClone(DEFAULT_CONFIG);
      }
    } else {
      this.config = structuredClone(DEFAULT_CONFIG);
    }
    // Load projects from separate key if main config has none
    if (!this.config.projects || this.config.projects.length === 0) {
      const projRaw = localStorage.getItem(STORAGE_KEY + '-projects');
      if (projRaw) {
        try { this.config.projects = JSON.parse(projRaw); } catch {}
      }
    }
  }

  save(config) {
    this.config = config;
    // Store projects separately to avoid localStorage size issues
    const { projects, ...rest } = config;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
    localStorage.setItem(STORAGE_KEY + '-projects', JSON.stringify(projects || []));
  }

  deepMerge(target, source) {
    for (const key of Object.keys(source)) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        if (!target[key]) target[key] = {};
        this.deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
    return target;
  }
}
