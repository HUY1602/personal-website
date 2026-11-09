import React, { useState } from 'react';
import { ArrowRight, Copy, Check, Sparkles, MapPin, Layers, Server, Activity, ArrowUpRight, Cpu } from 'lucide-react';
import { profileData } from '../data/profileData';

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('rag'); // 'rag' | 'mlops'
  const [selectedNode, setSelectedNode] = useState(0);

  const copyEmail = () => {
    navigator.clipboard.writeText(profileData.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const ragNodes = [
    { name: '1. User Query & Docs', detail: 'Văn bản PDF, Word, SQL và câu hỏi người dùng', tag: 'Input' },
    { name: '2. Hybrid Retrieval', detail: 'Kết hợp Dense (Qdrant Vector) + Sparse (BM25)', tag: 'Search' },
    { name: '3. Cross-Encoder Reranker', detail: 'Tối ưu lại độ phù hợp top-k ngữ cảnh trước khi vào LLM', tag: 'Filter' },
    { name: '4. Azure OpenAI / Llama 3', detail: 'Suy luận câu trả lời chính xác, giảm hallucination tới 85%', tag: 'LLM' },
  ];

  const mlopsNodes = [
    { name: '1. Model Weights', detail: 'Meta-Llama-3-8B hoặc Vision Transformer đã fine-tune', tag: 'Model' },
    { name: '2. Quantization (AWQ/4-bit)', detail: 'Lượng tử hóa giảm 65% VRAM GPU mà giữ nguyên chất lượng', tag: 'Opt' },
    { name: '3. vLLM Engine & PagedAttention', detail: 'Quản lý bộ nhớ KV-Cache tối ưu, đạt 145+ tokens/giây', tag: 'Serving' },
    { name: '4. Azure Container Apps', detail: 'Triển khai tự động co giãn với giám sát MLflow & Azure Monitor', tag: 'Cloud' },
  ];

  const currentNodes = activeTab === 'rag' ? ragNodes : mlopsNodes;

  return (
    <section className="relative pt-28 sm:pt-36 pb-20 md:pb-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Profile Intro with Avatar & Badges */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative shrink-0">
            <img
              src={profileData.personal.avatar}
              alt={profileData.personal.fullName}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border border-zinc-700/80 shadow-md ring-2 ring-sky-500/20"
            />
            <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-zinc-950"></span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-medium text-zinc-300">
              <span>{profileData.personal.badge}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/50 border border-zinc-800/60 text-xs text-zinc-400 font-mono">
              <MapPin className="w-3.5 h-3.5 text-zinc-400" />
              <span>{profileData.personal.location}</span>
            </div>
          </div>
        </div>

        {/* Hero Grid: Intro Left, Interactive Architecture Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
                Xây dựng hệ thống <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300">
                  AI thực tiễn & hiệu quả.
                </span>
              </h1>
              <p className="text-lg sm:text-xl font-medium text-zinc-300">
                {profileData.personal.fullName} — <span className="text-sky-400">{profileData.personal.roleTitle}</span>
              </p>
            </div>

            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-xl">
              {profileData.personal.shortBio}
            </p>

            {/* CTA Group */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-zinc-950 font-semibold text-sm hover:bg-zinc-200 transition-all duration-200 shadow-sm hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Xem dự án tiêu biểu</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-sm font-medium transition-all duration-200"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Đã sao chép Email</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-zinc-400" />
                    <span>Sao chép Email</span>
                  </>
                )}
              </button>

              <a
                href="#about"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-zinc-400 hover:text-zinc-200 text-sm font-medium transition-colors"
              >
                <span>Hồ sơ chi tiết</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Quick Tech Tag Cluster */}
            <div className="pt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs text-zinc-400 font-mono mr-1">Chuyên môn:</span>
              {['Azure OpenAI', 'LangChain', 'vLLM', 'PyTorch', 'Qdrant', 'Docker'].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive System Architecture Card */}
          <div className="lg:col-span-5">
            <div className="bento-card p-5 sm:p-6 space-y-4 shadow-2xl shadow-black/60">
              
              {/* Card Header & Tabs */}
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse"></div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    Kiến trúc AI thực tế
                  </span>
                </div>

                <div className="flex p-0.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-mono">
                  <button
                    onClick={() => { setActiveTab('rag'); setSelectedNode(0); }}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      activeTab === 'rag' ? 'bg-zinc-800 text-white font-medium shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    RAG Pipeline
                  </button>
                  <button
                    onClick={() => { setActiveTab('mlops'); setSelectedNode(0); }}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      activeTab === 'mlops' ? 'bg-zinc-800 text-white font-medium shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    MLOps & Serving
                  </button>
                </div>
              </div>

              {/* Architecture Node Sequence */}
              <div className="space-y-2">
                {currentNodes.map((node, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedNode(idx)}
                    className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all duration-200 ${
                      selectedNode === idx
                        ? 'bg-zinc-800/90 border-sky-500/40 shadow-sm'
                        : 'bg-zinc-900/40 border-zinc-800/60 hover:bg-zinc-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className={`font-medium ${selectedNode === idx ? 'text-white' : 'text-zinc-300'}`}>
                        {node.name}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/50">
                        {node.tag}
                      </span>
                    </div>
                    {selectedNode === idx && (
                      <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed font-sans">
                        {node.detail}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Status Indicator Bar */}
              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400 font-mono">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <Activity className="w-3.5 h-3.5" />
                  <span>P95 Latency: {activeTab === 'rag' ? '42ms' : '18ms'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sky-400">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>{activeTab === 'rag' ? 'Hallucination: -85%' : 'Throughput: 145 tok/s'}</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Minimalist Metrics Strip */}
        <div className="mt-16 pt-8 border-t border-zinc-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {profileData.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/60 hover:border-zinc-700/80 transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {stat.value}
              </div>
              <div className="mt-1 text-xs sm:text-sm text-zinc-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
