import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check against the environment variable set in Cloudflare
    const adminPass = import.meta.env.VITE_ADMIN_PASSWORD || 'ahmed2026';
    
    if (password === adminPass) {
      localStorage.setItem('admin_auth', 'true');
      navigate('/admin');
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 font-sans">
      <div className="film-grain opacity-20" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[var(--color-accent)] rounded-2xl flex items-center justify-center text-black font-black text-2xl mx-auto mb-6 shadow-lg shadow-[var(--color-accent)]/20">
            A
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-2 italic">Portfolio Control</h1>
          <p className="text-white/40 text-xs uppercase tracking-[0.3em]">Authorized Personnel Only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Access Key</label>
              {error && <span className="text-[10px] text-red-500 font-bold uppercase animate-pulse">Invalid Key</span>}
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full bg-white/5 border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-4 text-white outline-none focus:border-[var(--color-accent)] transition-all text-center tracking-[0.5em]`}
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] py-5 rounded-2xl hover:bg-[var(--color-accent)] transition-all shadow-xl active:scale-[0.98]"
          >
            Authenticate
          </button>
        </form>

        <p className="mt-12 text-center text-[10px] text-white/20 uppercase tracking-widest">
          &copy; 2026 AHMED ABUZENADA &mdash; CLOUDFLARE MODE
        </p>
      </motion.div>
    </div>
  );
}
