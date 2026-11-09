import React, { useState } from 'react';
import { ExternalLink, ArrowUpRight, FolderGit2, Sparkles, Filter } from 'lucide-react';
import { GithubIcon } from './Icons';
import { profileData } from '../data/profileData';

export default function Projects() {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Generative AI / LLM', 'Computer Vision / Edge AI', 'Model Optimization'];

  const filteredProjects = filter === 'All'
    ? profileData.projects
    : profileData.projects.filter(p => p.category.includes(filter) || filter.includes(p.category));

  return (
    <section id="projects" className="py-20 sm:py-28 relative border-t border-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
              Sản phẩm & Nghiên cứu
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Dự án AI tiêu biểu
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-400">
              Các dự án thực chiến giải quyết bài toán kinh doanh cụ thể từ Generative AI, RAG, Computer Vision đến tối ưu hóa suy luận.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-zinc-900/80 border border-zinc-800/80">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-all duration-200 ${
                  filter === cat
                    ? 'bg-zinc-800 text-white font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                }`}
              >
                {cat === 'All' ? 'Tất cả' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => {
            const isFeatured = index === 0 && filter === 'All';
            return (
              <div
                key={index}
                className={`bento-card p-6 flex flex-col justify-between group ${
                  isFeatured ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div>
                  {/* Top Bar: Category & Links */}
                  <div className="flex items-center justify-between pb-3">
                    <span className="text-[11px] font-mono text-sky-400 px-2.5 py-1 rounded-full bg-sky-950/40 border border-sky-800/40">
                      {project.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`GitHub repo for ${project.title}`}
                        className="p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-800 transition-colors"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                      {project.demo && project.demo !== '#' && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Live demo for ${project.title}`}
                          className="p-1.5 text-zinc-400 hover:text-sky-300 rounded-md hover:bg-zinc-800 transition-colors"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mt-3 text-lg sm:text-xl font-bold text-white group-hover:text-sky-300 transition-colors tracking-tight">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key Metric Badge */}
                  {project.metrics && (
                    <div className="mt-4 p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800/90 flex items-center gap-2 text-xs text-emerald-400 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>{project.metrics}</span>
                    </div>
                  )}
                </div>

                {/* Tech Tags Bottom */}
                <div className="mt-6 pt-4 border-t border-zinc-800/80 flex flex-wrap gap-1.5">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-zinc-900 text-zinc-400 border border-zinc-800/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
