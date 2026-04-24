import { create } from 'zustand';

interface AppState {
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
  cursorVariant: 'default' | 'hover' | 'text' | 'hidden';
  setCursorVariant: (v: 'default' | 'hover' | 'text' | 'hidden') => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (v: boolean) => void;
  toggleMenu: () => void;
  activeFilter: string;
  setActiveFilter: (v: string) => void;
  activeRole: string;
  setActiveRole: (v: string) => void;
  scrollProgress: number;
  setScrollProgress: (v: number) => void;
}

export const useStore = create<AppState>((set) => ({
  isLoading: true,
  setIsLoading: (v) => set({ isLoading: v }),
  cursorVariant: 'default',
  setCursorVariant: (v) => set({ cursorVariant: v }),
  isMenuOpen: false,
  setIsMenuOpen: (v) => set({ isMenuOpen: v }),
  toggleMenu: () => set((s) => ({ isMenuOpen: !s.isMenuOpen })),
  activeFilter: 'all',
  setActiveFilter: (v) => set({ activeFilter: v }),
  activeRole: 'assistant',
  setActiveRole: (v) => set({ activeRole: v }),
  scrollProgress: 0,
  setScrollProgress: (v) => set({ scrollProgress: v }),
}));
