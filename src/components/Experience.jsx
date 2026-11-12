import React from 'react';
import { Calendar, Briefcase, Building2 } from 'lucide-react';
import { profileData } from '../data/profileData';

export default function Experience() {
  return (
    <section id="experience" className="scroll-reveal py-20 sm:py-28 relative border-t border-zinc-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            Hành trình nghề nghiệp
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Kinh nghiệm làm việc
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-400">
            Quá trình cống hiến và phát triển giải pháp AI tại các tổ chức công nghệ.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l border-zinc-800 ml-4 sm:ml-8 space-y-10">
          {profileData.experiences.map((exp, index) => (
            <div key={index} className="relative pl-6 sm:pl-8 group">
              {/* Dot on spine */}
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-950 border-2 border-sky-400 group-hover:scale-125 group-hover:bg-sky-400 transition-all duration-200" />

              {/* Experience Card */}
              <div className="bento-card p-6 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pb-1">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-sky-300 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium mt-0.5">
                      <Building2 className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800/80 text-xs font-mono text-zinc-300 self-start sm:self-auto">
                    <Calendar className="w-3 h-3 text-sky-400" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pt-1">
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
