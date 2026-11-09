import React from 'react';
import { ArrowUp, Cloud } from 'lucide-react';
import { profileData } from '../data/profileData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-900 py-10 text-zinc-400 bg-zinc-950/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Identity */}
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-300">
              HQ
            </div>
            <span className="text-xs text-zinc-400 font-mono">
              {profileData.personal.fullName} • AI Engineer Portfolio
            </span>
          </div>

          {/* Cloud Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400">
            <Cloud className="w-3.5 h-3.5 text-sky-400" />
            <span>Deployed on Microsoft Azure</span>
          </div>

          {/* Copyright & Back to Top */}
          <div className="flex items-center gap-4 text-xs text-zinc-500">
            <span>© {currentYear}</span>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors flex items-center gap-1 text-[11px] font-mono"
              aria-label="Back to top"
            >
              <span>Lên đầu trang</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}
