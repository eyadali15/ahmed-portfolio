import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PAGE_LIST = [
  { id: 'home', label: 'Home Page', icon: '🏠' },
  { id: 'about', label: 'About Page', icon: '👤' },
  { id: 'work', label: 'Work Page', icon: '🎬' },
  { id: 'contact', label: 'Contact Page', icon: '✉️' },
];

export default function AdminPages() {
  const [activePage, setActivePage] = useState('home');
  const [activeSection, setActiveSection] = useState('hero');

  // Advanced structure allowing granular control per text element
  const [content, setContent] = useState({
    hero: {
      content: { 
        title: "Ahmed Abuzenada",
        subtitle: "Assistant Director & Filmmaker", 
        description: "Crafting cinematic stories that inspire through visual storytelling" 
      },
      spacing: {
        title: { marginTop: 0, marginBottom: 36, paddingTop: 0, paddingBottom: 0 },
        subtitle: { marginTop: 0, marginBottom: 20, paddingTop: 0, paddingBottom: 0 },
        description: { marginTop: 0, marginBottom: 36, paddingTop: 0, paddingBottom: 0 },
        divider: { marginTop: 24, marginBottom: 24 }
      },
      layout: { paddingTop: 0, paddingBottom: 0, align: "center" }
    },
    featured: {
      content: { label: "Selected Work", title: "Featured Projects" },
      spacing: {
        label: { marginTop: 0, marginBottom: 12, paddingTop: 0, paddingBottom: 0 },
        title: { marginTop: 0, marginBottom: 80, paddingTop: 0, paddingBottom: 10 },
      },
      layout: { paddingTop: 160, paddingBottom: 160, align: "left", gridGap: 40 }
    },
    cta: {
      content: { label: "Let's Collaborate", title: "Have a vision? Let's bring it to life.", description: "Whether it's a commercial...", buttonText: "Start a Conversation" },
      spacing: {
        label: { marginTop: 0, marginBottom: 32, paddingTop: 0, paddingBottom: 0 },
        title: { marginTop: 0, marginBottom: 40, paddingTop: 0, paddingBottom: 0 },
        description: { marginTop: 0, marginBottom: 96, paddingTop: 36, paddingBottom: 0 },
      },
      layout: { paddingTop: 176, paddingBottom: 176, align: "center" }
    }
  });

  const sections = Object.keys(content);

  const handleUpdate = (section: string, category: string, elementKey: string, propKey: string, value: any) => {
    setContent(prev => {
      const currentSection = section as keyof typeof prev;
      const sectionData = { ...prev[currentSection] } as any;
      if (category === 'content') {
        sectionData.content[elementKey] = value;
      } else if (category === 'spacing') {
        sectionData.spacing[elementKey][propKey] = value;
      } else {
        sectionData.layout[elementKey] = value;
      }
      return { ...prev, [section]: sectionData };
    });
  };

  return (
    <div className="flex h-full gap-8 max-w-7xl mx-auto">
      {/* Sidebar: Page Selection */}
      <aside className="w-48 space-y-2">
        <h3 className="text-[10px] uppercase tracking-widest font-bold text-white/30 px-4 mb-4">Pages</h3>
        {PAGE_LIST.map(page => (
          <button
            key={page.id}
            onClick={() => setActivePage(page.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activePage === page.id ? 'bg-[var(--color-accent)] text-black' : 'text-white/40 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span>{page.icon}</span>
            {page.label}
          </button>
        ))}
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 space-y-8 pb-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 p-1 bg-white/5 border border-white/10 rounded-2xl w-fit">
            {sections.map(section => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-6 py-2 rounded-xl text-[10px] uppercase font-bold tracking-widest transition-all ${
                  activeSection === section ? 'bg-white/10 text-white shadow-lg' : 'text-white/40 hover:text-white'
                }`}
              >
                {section} Section
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => {
              const json = JSON.stringify(content, null, 2);
              const blob = new Blob([json], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `${activePage}.json`;
              link.click();
            }}
            className="px-6 py-2 bg-[var(--color-accent)] text-black text-[10px] uppercase font-black tracking-widest rounded-xl hover:opacity-90 transition-all shadow-lg shadow-[var(--color-accent)]/20"
          >
            Save Changes
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Elements Spacing Editor */}
          {Object.entries((content as any)[activeSection].spacing).map(([elementName, props]: [string, any]) => (
            <div key={elementName} className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
              <div className="px-6 py-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
                <h4 className="text-sm font-bold capitalize flex items-center gap-2">
                  <span className="opacity-40">Text Element:</span> {elementName}
                </h4>
                <div className="text-[10px] uppercase tracking-widest font-bold text-white/20 italic">Granular Spacing</div>
              </div>
              
              <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Content for this element */}
                {(content as any)[activeSection].content[elementName] !== undefined && (
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Text Content</label>
                    <textarea
                      value={(content as any)[activeSection].content[elementName]}
                      onChange={(e) => handleUpdate(activeSection, 'content', elementName, '', e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-[var(--color-accent)] outline-none transition-all resize-none min-h-[120px]"
                    />
                  </div>
                )}

                {/* Spacing Controls */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                  {Object.entries(props).map(([propKey, value]) => (
                    <div key={propKey} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">
                          {propKey.replace(/([A-Z])/g, ' $1')}
                        </label>
                        <span className="text-[10px] font-mono text-[var(--color-accent)] font-bold bg-[var(--color-accent)]/10 px-2 py-0.5 rounded">{value}px</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="-50"
                          max="200"
                          value={value as number}
                          onChange={(e) => handleUpdate(activeSection, 'spacing', elementName, propKey, parseInt(e.target.value))}
                          className="flex-1 accent-[var(--color-accent)]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Section Layout */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl p-8">
            <h4 className="text-sm font-bold mb-8 flex items-center gap-2 uppercase tracking-tight">
              <span>📐</span> Section Master Layout
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.entries((content as any)[activeSection].layout).map(([key, value]) => (
                <div key={key} className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">{key.replace(/([A-Z])/g, ' $1')}</label>
                  {key === 'align' || key === 'buttonAlign' ? (
                    <div className="flex gap-1 bg-black/20 p-1 rounded-xl border border-white/5">
                      {['left', 'center', 'right'].map(a => (
                        <button
                          key={a}
                          onClick={() => handleUpdate(activeSection, 'layout', key, '', a)}
                          className={`flex-1 py-2 rounded-lg text-[9px] uppercase font-black transition-all ${
                            value === a ? 'bg-[var(--color-accent)] text-black' : 'text-white/30 hover:text-white'
                          }`}
                        >
                          {a}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 bg-black/20 border border-white/10 rounded-xl px-4 py-2">
                      <input
                        type="number"
                        value={value as number}
                        onChange={(e) => handleUpdate(activeSection, 'layout', key, '', parseInt(e.target.value))}
                        className="bg-transparent w-full text-sm outline-none font-mono"
                      />
                      <span className="text-[10px] text-white/20 font-bold">PX</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
