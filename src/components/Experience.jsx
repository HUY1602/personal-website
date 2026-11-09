import React from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import { profileData } from '../data/profileData';

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-slate-950/70 relative border-t border-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            Hành trình nghề nghiệp
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Kinh nghiệm làm việc
          </h2>
          <p className="text-slate-400 text-base">
            Quá trình cống hiến và phát triển qua các dự án Trí tuệ Nhân tạo thực tế.
          </p>
        </div>

        {/* Timeline */}
        <div className="mt-16 relative border-l border-slate-800 ml-4 sm:ml-8 space-y-12">
          {profileData.experiences.map((exp, index) => (
            <div key={index} className="relative pl-8 sm:pl-10 group">
              {/* Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 group-hover:scale-125 group-hover:bg-cyan-400 transition-all duration-200" />

              {/* Card */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pb-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <div className="text-sm font-medium text-slate-400 mb-3">
                  {exp.company}
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

