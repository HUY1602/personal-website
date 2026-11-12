import React, { useState } from 'react';
import { Mail, MapPin, Send, Check, Copy, MessageSquare, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { profileData } from '../data/profileData';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="scroll-reveal py-20 sm:py-28 relative border-t border-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Kết nối & Hợp tác
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Bạn có ý tưởng hoặc bài toán AI cần giải quyết?
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-400">
            Tôi luôn sẵn sàng trao đổi về các dự án ứng dụng LLM, RAG, thị giác máy tính hoặc tối ưu hạ tầng đám mây.
          </p>
        </div>

        {/* Bento Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card with Copy button */}
            <div className="bento-card p-6 space-y-4">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-semibold">
                Liên hệ trực tiếp
              </span>
              
              <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                <div className="flex items-center gap-3 overflow-hidden">
                  <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                  <span className="text-xs sm:text-sm text-zinc-200 font-mono truncate">
                    {profileData.personal.email}
                  </span>
                </div>
                
                <button
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium flex items-center gap-1.5 transition-colors shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Đã chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Chép</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-zinc-400 font-mono pt-1">
                <MapPin className="w-4 h-4 text-zinc-500" />
                <span>{profileData.personal.location}</span>
              </div>
            </div>

            {/* Social Links Card */}
            <div className="bento-card p-6 space-y-3">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-semibold">
                Mạng xã hội & Mã nguồn
              </span>
              
              <div className="grid grid-cols-2 gap-3 pt-1">
                <a
                  href={profileData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-300 hover:text-white transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <GithubIcon className="w-4 h-4" />
                    GitHub
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                </a>

                <a
                  href={profileData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-300 hover:text-white transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <LinkedinIcon className="w-4 h-4" />
                    LinkedIn
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                </a>
              </div>
            </div>

            {/* Response Time Note */}
            <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/50 flex items-center gap-3 text-xs text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
              <span>Thời gian phản hồi thông thường: dưới 24 giờ.</span>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bento-card p-6 sm:p-8">
              <h3 className="text-lg font-bold text-white tracking-tight mb-2">
                Gửi lời nhắn nhanh
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mb-6">
                Để lại thông tin và yêu cầu của bạn, tôi sẽ liên hệ lại sớm nhất.
              </p>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-900/50 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-semibold text-emerald-300">
                    Cảm ơn bạn đã liên hệ!
                  </h4>
                  <p className="text-xs text-zinc-400">
                    Lời nhắn đã được ghi nhận. Tôi sẽ phản hồi qua email {formData.email || 'của bạn'} trong thời gian sớm nhất.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-zinc-400">
                        Họ & Tên
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Nguyễn Văn A"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-sky-500/80 focus:ring-1 focus:ring-sky-500/80 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-zinc-400">
                        Email liên hệ
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ban@doanhnghiep.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-sky-500/80 focus:ring-1 focus:ring-sky-500/80 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-400">
                      Nội dung trao đổi
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Mô tả tóm tắt về bài toán AI hoặc cơ hội hợp tác..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-sky-500/80 focus:ring-1 focus:ring-sky-500/80 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.99]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Gửi tin nhắn</span>
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
