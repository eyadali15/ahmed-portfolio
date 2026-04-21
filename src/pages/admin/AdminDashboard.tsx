import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Projects', value: projects.length, icon: '🎬', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
    { label: 'Categories', value: [...new Set(projects.map(p => p.category))].length, icon: '🏷️', color: 'bg-purple-500/10 text-purple-500 border-purple-500/20' },
    { label: 'Platform Status', value: 'Online', icon: '🌐', color: 'bg-green-500/10 text-green-500 border-green-500/20' },
  ];

  const recentProjects = [...projects].slice(0, 5);

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Welcome */}
      <section>
        <h2 className="text-3xl font-bold tracking-tight mb-2">Welcome back, Ahmed (Cloudflare Mode) 🚀</h2>
        <p className="text-white/40 text-sm">You are now running on Cloudflare. Netlify has been removed.</p>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`p-6 rounded-2xl border ${stat.color} flex items-center justify-between`}
          >
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-60 mb-2">{stat.label}</p>
              <h3 className="text-3xl font-bold">{stat.value}</h3>
            </div>
            <div className="text-3xl">{stat.icon}</div>
          </motion.div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Projects */}
        <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold tracking-tight">Recent Projects</h3>
            <Link to="/admin/projects" className="text-xs font-bold text-[var(--color-accent)] uppercase tracking-wider hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.slug} className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-xl transition-all border border-transparent hover:border-white/10">
                <div className="w-12 h-12 bg-white/10 rounded-lg overflow-hidden flex-shrink-0">
                  {project.thumbnail ? (
                    <img src={project.thumbnail} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs opacity-40">🎬</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold truncate">{project.title}</h4>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">{project.category} · {project.client}</p>
                </div>
                <button className="text-[10px] uppercase font-bold text-white/40 hover:text-white transition-colors">Edit</button>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold tracking-tight mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-accent)]/5 transition-all group">
                <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">➕</span>
                <span className="text-xs font-bold uppercase tracking-widest text-white/60 group-hover:text-white">New Project</span>
              </button>
              <button className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-accent)]/5 transition-all group">
                <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">🖼️</span>
                <span className="text-xs font-bold uppercase tracking-widest text-white/60 group-hover:text-white">Media Library</span>
              </button>
              <button className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-accent)]/5 transition-all group">
                <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">📝</span>
                <span className="text-xs font-bold uppercase tracking-widest text-white/60 group-hover:text-white">Edit About</span>
              </button>
              <button className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-accent)]/5 transition-all group">
                <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">📧</span>
                <span className="text-xs font-bold uppercase tracking-widest text-white/60 group-hover:text-white">Contact Info</span>
              </button>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-[var(--color-accent)] to-[#40c9ff] rounded-2xl p-6 text-black">
            <h3 className="font-black text-xl mb-2 uppercase tracking-tighter italic">Pro Tip</h3>
            <p className="text-xs font-bold opacity-80 leading-relaxed">
              Use high-quality Vimeo links for the best video playback performance on your portfolio.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
