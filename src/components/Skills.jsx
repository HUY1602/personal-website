import React, { useState } from 'react';
import { Code2, Layers, Cpu, Cloud, Database, Sparkles, Check } from 'lucide-react';
import { profileData } from '../data/profileData';

const categoryIcons = {
  "Ngôn ngữ & Nền tảng": Code2,
  "Frameworks AI & ML": Layers,
  "Mô hình & Kiến trúc": Cpu,
  "MLOps & Cloud": Cloud,
  "Vector DB & Dữ liệu": Database,
};

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Object.keys(profileData.skills)];

  const filteredCategories = selectedCategory === 'All'
    ? Object.entries(profileData.skills)
    : Object.entries(profileData.skills).filter(([cat]) => cat === selectedCategory);

  return (
    <section id="skills" className="scroll-reveal py-20 sm:py-28 relative border-t border-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
              Công nghệ & Nền tảng
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Bộ công cụ công nghệ lõi
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-400">
              Các framework, thư viện và hạ tầng đám mây được sử dụng hàng ngày để nghiên cứu và vận hành hệ thống AI.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-zinc-900/80 border border-zinc-800/80 max-w-full overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-zinc-800 text-white shadow-sm font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                }`}
              >
                {cat === 'All' ? 'Tất cả' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCategories.map(([category, items], idx) => {
            const Icon = categoryIcons[category] || Code2;
            return (
              <div
                key={idx}
                className="bento-card p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 pb-4 border-b border-zinc-800/80">
                    <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-sky-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-semibold text-white text-sm tracking-tight">
                      {category}
                    </h3>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {items.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-mono border border-zinc-800 transition-colors"
                      >
                        <span className="w-1 h-1 rounded-full bg-sky-400"></span>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note Footer */}
        <div className="mt-10 p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>Chủ động nghiên cứu và cập nhật liên tục các bài báo ArXiv, thư viện Hugging Face và chuẩn MLOps mới nhất.</span>
          </div>
        </div>

      </div>
    </section>
  );
}
