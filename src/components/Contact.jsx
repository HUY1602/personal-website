import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { profileData } from '../data/profileData';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Trao đổi dự án AI',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            Kết nối & Hợp tác
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Bạn có ý tưởng hoặc dự án AI cần phát triển?
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Hãy để lại tin nhắn hoặc liên hệ trực tiếp qua email để chúng ta cùng thảo luận về các giải pháp tối ưu.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
                Thông tin liên hệ trực tiếp
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-slate-800 text-cyan-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Email</div>
                    <a
                      href={`mailto:${profileData.personal.email}`}
                      className="text-white hover:text-cyan-400 font-medium transition-colors"
                    >
                      {profileData.personal.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-slate-800 text-cyan-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Địa điểm</div>
                    <div className="text-white font-medium">
                      {profileData.personal.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-slate-800">
                <div className="text-xs text-slate-400 font-medium mb-3">Mạng xã hội & Mã nguồn</div>
                <div className="flex gap-3">
                  <a
                    href={profileData.personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
                  >
                    <GithubIcon className="w-4 h-4 text-cyan-400" />
                    GitHub
                  </a>
                  <a
                    href={profileData.personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
                  >
                    <LinkedinIcon className="w-4 h-4 text-cyan-400" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Azure Note Card */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-blue-950/40 to-cyan-950/40 border border-cyan-800/30 text-xs text-slate-300 space-y-1">
              <span className="font-semibold text-cyan-300">☁️ Sẵn sàng triển khai trên Microsoft Azure</span>
              <p className="text-slate-400">
                Trang web này được xây dựng tương thích tối đa để triển khai liên tục qua Azure Static Web Apps.
              </p>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 glow-card">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Tin nhắn đã được gửi thành công!</h3>
                  <p className="text-sm text-slate-400 max-w-md mx-auto">
                    Cảm ơn bạn đã liên hệ. Tôi sẽ phản hồi lại bạn qua email sớm nhất có thể.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: 'Trao đổi dự án AI', message: '' });
                    }}
                    className="mt-4 px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium transition-colors"
                  >
                    Gửi tin nhắn khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-lg font-bold text-white mb-2">Gửi tin nhắn trực tiếp</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Họ và tên *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Nguyễn Văn A"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Địa chỉ Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="email@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Chủ đề thảo luận
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                    >
                      <option value="Trao đổi dự án AI">Tư vấn / Phát triển dự án AI</option>
                      <option value="Xây dựng hệ thống RAG">Triển khai RAG & LLM cho Doanh nghiệp</option>
                      <option value="Cơ hội việc làm">Cơ hội việc làm / Hợp tác</option>
                      <option value="Khác">Chủ đề khác</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Nội dung tin nhắn *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Mô tả ngắn gọn về nhu cầu hoặc nội dung bạn muốn trao đổi..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/20 transition-all hover:shadow-cyan-500/35"
                  >
                    <Send className="w-4 h-4" />
                    Gửi tin nhắn
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
