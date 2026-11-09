import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { profileData } from '../data/profileData';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Giới thiệu', href: '#about' },
    { name: 'Kỹ năng', href: '#skills' },
    { name: 'Dự án', href: '#projects' },
    { name: 'Kinh nghiệm', href: '#experience' },
    { name: 'Liên hệ', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 sm:top-4 inset-x-0 z-50 px-3 sm:px-6 pointer-events-none">
      <div
        className={`max-w-5xl mx-auto rounded-none sm:rounded-full pointer-events-auto transition-all duration-300 border ${
          scrolled
            ? 'bg-zinc-950/85 backdrop-blur-xl border-zinc-800/80 shadow-xl shadow-black/30 py-2.5 px-4 sm:px-6'
            : 'bg-zinc-950/60 backdrop-blur-md border-zinc-800/50 py-3 px-4 sm:px-6'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-zinc-950 font-bold text-xs tracking-wider shadow-sm transition-transform duration-300 group-hover:scale-105">
              HQ
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-zinc-100 text-sm tracking-tight group-hover:text-sky-300 transition-colors">
                {profileData.personal.fullName}
              </span>
              <span className="text-[11px] text-zinc-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                AI Engineer
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-900/60 p-1 rounded-full border border-zinc-800/60">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1 text-xs font-medium text-zinc-300 hover:text-white rounded-full hover:bg-zinc-800/80 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <a
              href={profileData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-full transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={profileData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-full transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-zinc-950 bg-white hover:bg-zinc-200 rounded-full shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Kết nối</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-zinc-800/80 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900/80 rounded-lg"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 flex items-center justify-between border-t border-zinc-800/60 mt-2 px-1">
              <div className="flex gap-2">
                <a
                  href={profileData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-zinc-400 hover:text-white"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={profileData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-zinc-400 hover:text-white"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-1.5 text-xs font-medium text-zinc-950 bg-white rounded-full"
              >
                Liên hệ trực tiếp
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
