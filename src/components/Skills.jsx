import React from 'react';
import { Code2, Layers, Cpu, Cloud, Database, Check } from 'lucide-react';
import { profileData } from '../data/profileData';

const categoryIcons = {
  "Ngôn ngữ & Nền tảng": Code2,
  "Frameworks AI & ML": Layers,
  "Mô hình & Kiến trúc": Cpu,
  "MLOps & Cloud": Cloud,
  "Vector DB & Dữ liệu": Database,
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-slate-950/70 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-violet-500/10 text-violet-400 text-xs font-semibold uppercase tracking-wider">
            Năng lực chuyên môn
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Kỹ năng & Công nghệ AI cốt lõi
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Bộ công cụ và công nghệ tôi sử dụng hàng ngày để nghiên cứu, phát triển và vận hành các mô hình Trí tuệ Nhân tạo.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(profileData.skills).map(([category, items], idx) => {
            const Icon = categoryIcons[category] || Code2;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 transition-all glow-card"
              >
                <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                  <div className="p-2.5 rounded-lg bg-violet-950/50 text-violet-400 border border-violet-800/40">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-100 text-base">
                    {category}
                  </h3>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {items.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 text-xs font-medium border border-slate-700/60 transition-colors"
                    >
                      <Check className="w-3 h-3 text-cyan-400" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlighted Banner */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm font-mono text-slate-400">
            💡 Luôn chủ động cập nhật các nghiên cứu mới nhất từ <span className="text-cyan-400">ArXiv</span>, cộng đồng <span className="text-cyan-400">Hugging Face</span> và các framework mã nguồn mở.
          </p>
        </div>

      </div>
    </section>
  );
}

