import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, Project } from '@/data/projects';

export default function AdminProjects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
    setSelectedProject(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Project Management</h2>
          <p className="text-white/40 text-sm">Manage and update your portfolio projects.</p>
        </div>
        <button className="px-4 py-2 bg-[var(--color-accent)] text-black text-xs font-bold uppercase tracking-widest rounded-lg hover:opacity-90 transition-all flex items-center gap-2">
          <span>➕</span> New Project
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
        <div className="flex-1 flex items-center gap-3 px-3 py-2 bg-black/20 border border-white/10 rounded-xl">
          <span className="text-white/30">🔍</span>
          <input 
            type="text" 
            placeholder="Search projects by title, client, or category..." 
            className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-white/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Project Grid/List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredProjects.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="group flex items-center gap-6 p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition-all"
          >
            <div className="w-24 h-16 bg-black/40 rounded-lg overflow-hidden flex-shrink-0 relative">
              {project.thumbnail ? (
                <img src={project.thumbnail} alt="" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs opacity-20 italic">No Image</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold truncate">{project.title}</h3>
                {project.featured && (
                  <span className="px-1.5 py-0.5 bg-[var(--color-accent)]/20 border border-[var(--color-accent)]/30 text-[var(--color-accent)] text-[8px] font-bold uppercase tracking-widest rounded">Featured</span>
                )}
              </div>
              <div className="flex items-center gap-3 text-[10px] text-white/40 uppercase tracking-widest">
                <span className="text-[var(--color-accent)]/60 font-bold">{project.category}</span>
                <span>•</span>
                <span className="truncate">{project.client}</span>
                <span>•</span>
                <span>{project.year}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleEdit(project)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/40 hover:text-white"
                title="Edit Project"
              >
                ✏️
              </button>
              <button 
                className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-white/20 hover:text-red-500"
                title="Delete Project"
              >
                🗑️
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Edit Modal (Simulated) */}
      <AnimatePresence>
        {isEditing && selectedProject && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-4xl bg-[#0d0d0d] border border-white/10 rounded-3xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                <div>
                  <h3 className="text-xl font-bold">Edit Project</h3>
                  <p className="text-white/40 text-xs">Modifying: {selectedProject.title}</p>
                </div>
                <button onClick={handleClose} className="p-2 hover:bg-white/10 rounded-full text-white/40 hover:text-white">✕</button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Title</label>
                      <input type="text" defaultValue={selectedProject.title} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[var(--color-accent)] outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Client</label>
                      <input type="text" defaultValue={selectedProject.client} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[var(--color-accent)] outline-none transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Category</label>
                        <select defaultValue={selectedProject.category} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[var(--color-accent)] outline-none transition-all appearance-none">
                          <option value="commercial">Commercial</option>
                          <option value="film">Film</option>
                          <option value="documentary">Documentary</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Year</label>
                        <input type="number" defaultValue={selectedProject.year} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[var(--color-accent)] outline-none transition-all" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Vimeo ID / Video ID</label>
                      <input type="text" defaultValue={selectedProject.vimeoId} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[var(--color-accent)] outline-none transition-all font-mono" />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Description</label>
                      <textarea rows={4} defaultValue={selectedProject.description} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[var(--color-accent)] outline-none transition-all resize-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Thumbnail URL</label>
                      <input type="text" defaultValue={selectedProject.thumbnail} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[var(--color-accent)] outline-none transition-all font-mono text-[10px]" />
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
                      <div className="flex-1">
                        <h4 className="text-xs font-bold mb-1">Featured Project</h4>
                        <p className="text-[10px] text-white/40">Show this project on the homepage and at the top of lists.</p>
                      </div>
                      <input type="checkbox" defaultChecked={selectedProject.featured} className="w-5 h-5 accent-[var(--color-accent)]" />
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10">
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/40 mb-4">Production Credits</h4>
                  <div className="space-y-3">
                    {selectedProject.credits.map((credit, idx) => (
                      <div key={idx} className="flex gap-4">
                        <input type="text" defaultValue={credit.role} className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs outline-none" placeholder="Role" />
                        <input type="text" defaultValue={credit.name} className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs outline-none" placeholder="Name" />
                        <button className="p-2 text-white/20 hover:text-red-500">✕</button>
                      </div>
                    ))}
                    <button className="text-[10px] uppercase font-bold text-[var(--color-accent)] mt-2 hover:underline">+ Add Credit</button>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-white/10 bg-white/5 flex items-center justify-between">
                <button 
                  onClick={() => {
                    const projectJson = JSON.stringify(selectedProject, null, 2);
                    const blob = new Blob([projectJson], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `${selectedProject.slug}.json`;
                    link.click();
                  }}
                  className="px-6 py-3 bg-white/5 border border-white/20 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  📥 Export JSON
                </button>
                <div className="flex gap-4">
                  <button onClick={handleClose} className="px-6 py-3 text-white/40 text-xs font-bold uppercase tracking-widest hover:text-white transition-all">Cancel</button>
                  <button className="px-8 py-3 bg-[var(--color-accent)] text-black text-xs font-bold uppercase tracking-widest rounded-xl hover:opacity-90 transition-all shadow-lg shadow-[var(--color-accent)]/20">
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
