import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', path: '/portfolio-control', icon: '📊' },
    { label: 'Projects', path: '/portfolio-control/projects', icon: '🎬' },
    { label: 'Pages', path: '/portfolio-control/pages', icon: '📄' },
    { label: 'Settings', path: '/portfolio-control/settings', icon: '⚙️' },
  ];

  const handleLogout = () => {
    // Simple logout logic
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-[var(--color-accent)] rounded flex items-center justify-center text-black font-bold">A</div>
            <div>
              <div className="text-sm font-bold tracking-tight">Ahmed Portfolio</div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest">Admin Control</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-white/10 text-white' 
                    : 'text-white/40 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
                {isActive && (
                  <motion.div 
                    layoutId="adminNavActive" 
                    className="ml-auto w-1 h-4 bg-[var(--color-accent)] rounded-full" 
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-400/10 transition-all"
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-[#0a0a0a]/50 backdrop-blur-md">
          <h1 className="text-sm font-bold tracking-widest uppercase text-white/60">
            {navItems.find(n => n.path === location.pathname)?.label || 'Admin'}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-green-500 font-bold uppercase tracking-wider">System Online</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
