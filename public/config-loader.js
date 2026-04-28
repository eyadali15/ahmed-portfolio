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
      linkedin: 'https://linkedin.com',
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
    philosophy: {
      visible: true,
      title1: 'Philosophy',
      text1: 'Cinema is more than entertainment, it\'s a mirror reflecting our shared humanity. Every project begins with: what truth are we trying to reveal?',
      text2: 'I approach each production with meticulous attention to detail and deep respect for the collaborative nature of filmmaking.',
      title2: 'Expertise',
      expertiseItems: [
        { title: 'Direction', description: 'Narrative, documentary, and commercial' },
        { title: 'Assistant Direction', description: 'Large scale productions' },
        { title: 'Storytelling', description: 'Script development and visual narrative' },
        { title: 'Post Production', description: 'Editing, grading, and VFX supervision' }
      ]
    },
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
      heroTitle: { font: '', size: '', align: '', color: '' },
      introText1: { font: '', size: '', align: '', color: '' },
      introText2: { font: '', size: '', align: '', color: '' },
      quoteText: { font: '', size: '', align: '', color: '' }
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
    header: {
      label: 'Get in Touch',
      title: "Let's create together",
      description: "Whether you're looking for an assistant director or a creative collaborator — I'd love to hear from you."
    },
    info: {
      email: 'contact@ahmedabuzenada.com',
      location: 'Saudi Arabia',
      vimeoUrl: 'https://vimeo.com/ahmedabuzenada',
      linkedinUrl: 'https://linkedin.com',
      whatsappUrl: 'https://wa.me/',
      formButtonText: 'Send Message'
    },
    styles: {
      headerTitle: { font: '', size: '', align: '', color: '' },
      headerDesc: { font: '', size: '', align: '', color: '' }
    }
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
      footer:         s()
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
    services:      { label: 'Services',           sel: '.about-services' },
    timeline:      { label: 'Timeline',          sel: '.about-timeline' },
    quote:         { label: 'Quote',             sel: '.about-quote' },
    footer:        { label: 'Footer',            sel: '.footer' }
  },
  contact: {
    header:        { label: 'Header',            sel: '.contact-header' },
    contactInfo:   { label: 'Contact Info',      sel: '.contact-info' },
    footer:        { label: 'Footer',            sel: '.footer' }
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
