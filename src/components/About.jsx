import React from 'react';
import { Sparkles, Cpu, Server, Database, Cloud, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { profileData } from '../data/profileData';

const iconMap = {
  Sparkles: Sparkles,
  Cpu: Cpu,
  Server: Server,
  Database: Database,
};

export default function About() {
  return (
    <section id="about" className="scroll-reveal py-20 sm:py-28 relative border-t border-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
            Về bản thân & Triết lý
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Đưa mô hình AI từ nghiên cứu vào sản phẩm thực tế.
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Bento Card 1: Detailed Bio (8 cols on lg) */}
          <div className="md:col-span-7 lg:col-span-7 bento-card p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-mono text-sky-400 uppercase tracking-wider font-semibold">
                Kinh nghiệm & Hướng tiếp cận
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Tập trung vào hiệu năng, độ chính xác và tính ổn định.
              </h3>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed whitespace-pre-line">
                {profileData.personal.detailedBio}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Chuẩn hóa MLOps
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Tối ưu chi phí Cloud GPU
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Bảo mật dữ liệu doanh nghiệp
              </span>
            </div>
          </div>

          {/* Bento Card 2: Quick Highlights (5 cols on lg) */}
          <div className="md:col-span-5 lg:col-span-5 bento-card p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-semibold">
                Tiêu chuẩn kỹ thuật
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-2 tracking-tight">
                Quy trình phát triển AI
              </h3>
              
              <div className="mt-5 space-y-3.5">
                {[
                  { title: 'Dữ liệu sạch & Vector Indexing', desc: 'Xây dựng pipeline làm sạch và phân mảnh dữ liệu chuẩn xác' },
                  { title: 'Fine-tuning & Lượng tử hóa', desc: 'Áp dụng LoRA/QLoRA để tối ưu chi phí hạ tầng' },
                  { title: 'Đánh giá & Benchmark (Eval)', desc: 'Kiểm thử liên tục nhằm triệt tiêu hiện tượng ảo giác (hallucination)' },
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                    <div className="text-xs font-semibold text-zinc-200">{item.title}</div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
              <span>Đạt chuẩn Production</span>
              <ShieldCheck className="w-4 h-4 text-sky-400" />
            </div>
          </div>

          {/* Bento Row: 4 Pillars of Expertise */}
          <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
            {profileData.pillars.map((pillar, idx) => {
              const IconComp = iconMap[pillar.icon] || Sparkles;
              return (
                <div
                  key={idx}
                  className="bento-card p-5 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-sky-400 group-hover:text-white group-hover:border-sky-500/50 transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h4 className="mt-4 text-base font-semibold text-white tracking-tight">
                      {pillar.title}
                    </h4>
                    <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bento Card: Azure Specialty Banner */}
          <div className="md:col-span-12 bento-card p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-sky-400">
                <Cloud className="w-4 h-4" />
                <span>Microsoft Azure Cloud Specialist</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Kiến trúc giải pháp đám mây tối ưu cho AI & Machine Learning
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Tối ưu hóa chi phí hạ tầng inference và training qua Azure OpenAI Service, Azure Machine Learning Studio, Container Apps và quản trị triển khai tự động CI/CD.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 text-xs font-medium transition-colors"
              >
                <span>Thảo luận giải pháp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
