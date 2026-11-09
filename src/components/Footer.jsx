import React from 'react';
import { Bot, Cloud, Heart } from 'lucide-react';
import { profileData } from '../data/profileData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo & Info */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center text-white">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">
                {profileData.personal.fullName}
              </div>
              <div className="text-xs text-slate-500 font-mono">
                AI & Machine Learning Engineer Portfolio
              </div>
            </div>
          </div>

          {/* Azure Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
            <Cloud className="w-4 h-4 text-cyan-400" />
            <span>Deployed on Microsoft Azure</span>
          </div>

          {/* Copyright */}
          <div className="text-xs text-slate-500 text-center md:text-right">
            © {currentYear} {profileData.personal.fullName}. Mọi quyền được bảo lưu.
          </div>

        </div>
      </div>
    </footer>
  );
}

