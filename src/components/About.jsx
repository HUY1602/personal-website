import React from 'react';
import { Sparkles, Cpu, Server, Database, CheckCircle, Award } from 'lucide-react';
import { profileData } from '../data/profileData';

const iconMap = {
  Sparkles: Sparkles,
  Cpu: Cpu,
  Server: Server,
  Database: Database,
};

export default function About() {
  return (
    <section id="about" className="py-24 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            Về bản thân
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Đam mê biến dữ liệu thành <br />
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Sức mạnh Trí tuệ Nhân tạo thực tế
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed whitespace-pre-line">
            {profileData.personal.detailedBio}
          </p>
        </div>

        {/* 4 Core Pillars */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {profileData.pillars.map((pillar, index) => {
            const IconComponent = iconMap[pillar.icon] || Sparkles;
            return (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between glow-card"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-800/50 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300 shadow-lg shadow-cyan-950/40">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center gap-2 text-xs font-mono text-cyan-400/90">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Sẵn sàng ứng dụng</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cloud & Microsoft Azure Focus Card */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/30 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold">
              <Award className="w-5 h-5 text-cyan-400" />
              <span>Chuyên môn Đám mây & AI trên Microsoft Azure</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white">
              Tối ưu chi phí và hiệu năng cho giải pháp AI Doanh nghiệp
            </h4>
            <p className="text-sm text-slate-400 max-w-2xl">
              Tận dụng sức mạnh từ Azure OpenAI Service, Azure Machine Learning, Azure Cognitive Search và kiến trúc Azure Static Web Apps để triển khai các mô hình AI có tính sẵn sàng cao, bảo mật và mở rộng linh hoạt.
            </p>
          </div>
          <div className="shrink-0">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm border border-slate-700 transition-colors"
            >
              Trao đổi giải pháp AI
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

