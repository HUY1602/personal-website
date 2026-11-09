import React from 'react';
import { ExternalLink, FolderGit2 } from 'lucide-react';
import { GithubIcon } from './Icons';
import { profileData } from '../data/profileData';

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            Dự án & Nghiên cứu
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Các dự án AI tiêu biểu
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Một số giải pháp AI thực tiễn từ Generative AI, RAG, Computer Vision đến tối ưu hóa mô hình suy luận.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {profileData.projects.map((project, index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 p-6 glow-card group"
            >
              <div>
                {/* Category & Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-medium text-cyan-400 px-2.5 py-1 rounded-md bg-cyan-950/60 border border-cyan-800/40">
                    {project.category}
                  </span>
                  <FolderGit2 className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </div>

                {/* Title */}
                <h3 className="mt-4 text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="mt-2.5 text-sm text-slate-400 leading-relaxed">
                  {project.description}
                </p>

                {/* Key Metric Highlight */}
                {project.metrics && (
                  <div className="mt-4 p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 flex items-center gap-2 text-xs font-medium text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>{project.metrics}</span>
                  </div>
                )}

                {/* Tech Tags */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800/70 text-slate-300 border border-slate-700/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  Source Code
                </a>
                {project.demo && project.demo !== '#' && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Trải nghiệm Demo
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
