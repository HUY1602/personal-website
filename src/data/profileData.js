export const profileData = {
  // THÔNG TIN CÁ NHÂN (Bạn có thể thay đổi các thông tin bên dưới theo thông tin của bạn)
  personal: {
    fullName: "Huy Quang", // Thay bằng họ tên của bạn (VD: Nguyễn Minh Quân)
    roleTitle: "AI & Machine Learning Engineer",
    badge: "Sẵn sàng cho các cơ hội hợp tác & dự án mới",
    shortBio: "Xây dựng các hệ thống Trí tuệ Nhân tạo thông minh, giải pháp LLM/RAG tối ưu và kiến trúc MLOps đưa mô hình AI từ ý tưởng vào sản phẩm thực tế.",
    detailedBio: `Xin chào! Tôi là một Kỹ sư AI với niềm đam mê sâu sắc trong việc ứng dụng Machine Learning và Deep Learning để giải quyết các bài toán kinh doanh phức tạp.
    
Thế mạnh cốt lõi của tôi xoay quanh việc phát triển các giải pháp Generative AI, tối ưu hóa các Mô hình Ngôn ngữ Lớn (LLMs), xây dựng hệ thống Retrieval-Augmented Generation (RAG) hiệu năng cao và triển khai hạ tầng MLOps trên nền tảng đám mây (đặc biệt là Microsoft Azure).`,
    location: "Hà Nội, Việt Nam",
    email: "mqhuy1602@gmail.com",
    github: "https://github.com/HUY1602",
    linkedin: "https://linkedin.com",
    avatar: "/avatar.jpg", // Tự động load ảnh từ thư mục public/avatar.jpg
    resumeUrl: "#", // Link tải CV file PDF nếu có
  },

  // THỐNG KÊ NHANH
  stats: [
    { label: "Năm kinh nghiệm", value: "3+" },
    { label: "Mô hình AI Triển khai", value: "15+" },
    { label: "Độ chính xác trung bình", value: "95%+" },
    { label: "Thời gian phản hồi Inference", value: "<120ms" },
  ],

  // CÁC LĨNH VỰC TRỌNG TÂM
  pillars: [
    {
      title: "Generative AI & LLMs",
      description: "Phát triển hệ thống RAG doanh nghiệp, fine-tuning mô hình (LoRA/QLoRA), đánh giá an toàn và prompt engineering nâng cao.",
      icon: "Sparkles",
    },
    {
      title: "Computer Vision & Deep Learning",
      description: "Huấn luyện các mô hình thị giác máy tính nhận diện vật thể, phân loại hình ảnh và phân đoạn đối tượng thời gian thực.",
      icon: "Cpu",
    },
    {
      title: "MLOps & Cloud Infrastructure",
      description: "Xây dựng pipeline tự động hóa CI/CD cho mô hình, quản trị vòng đời ML (MLflow), container hóa (Docker) và phục vụ inference trên Microsoft Azure.",
      icon: "Server",
    },
    {
      title: "Data Engineering & APIs",
      description: "Xử lý dữ liệu lớn, xây dựng kho Vector Database (Milvus, Qdrant, Chroma) và phát triển các API hiệu năng cao với FastAPI.",
      icon: "Database",
    },
  ],

  // KỸ NĂNG CÔNG NGHỆ CHI TIẾT
  skills: {
    "Ngôn ngữ & Nền tảng": ["Python", "C++", "SQL", "TypeScript / JavaScript", "Bash"],
    "Frameworks AI & ML": ["PyTorch", "TensorFlow", "Hugging Face", "LangChain", "LlamaIndex", "Scikit-Learn"],
    "Mô hình & Kiến trúc": ["LLMs (GPT-4, Llama 3, Claude)", "Vision Transformers (ViT)", "YOLOv8/v10", "Diffusion Models", "RAG / GraphRAG"],
    "MLOps & Cloud": ["Microsoft Azure AI Studio", "Azure Machine Learning", "MLflow", "Docker", "Kubernetes", "vLLM / Triton"],
    "Vector DB & Dữ liệu": ["Qdrant", "ChromaDB", "Pinecone", "PostgreSQL (pgvector)", "Redis", "Pandas", "Polars"],
  },

  // DỰ ÁN TIÊU BIỂU
  projects: [
    {
      title: "Enterprise RAG Intelligence System",
      category: "Generative AI / LLM",
      description: "Hệ thống hỏi đáp văn bản nội bộ đa định dạng (PDF, Docx, SQL) với kiến trúc Hybrid Search (Dense + Sparse) và Reranker, giảm tỷ lệ hallucination tới 85%.",
      tags: ["Python", "LangChain", "Qdrant", "Azure OpenAI", "FastAPI"],
      metrics: "Giảm thời gian tra cứu từ 45 phút xuống dưới 5 giây",
      github: "https://github.com",
      demo: "https://azure.microsoft.com",
    },
    {
      title: "Real-time Industrial Defect Detection",
      category: "Computer Vision / Edge AI",
      description: "Hệ thống thị giác máy tính nhận diện lỗi vi mạch điện tử với mô hình YOLO tối ưu hóa qua ONNX & TensorRT, đạt tốc độ 60 FPS trên máy trạm cục bộ.",
      tags: ["PyTorch", "OpenCV", "TensorRT", "FastAPI", "Docker"],
      metrics: "Độ chính xác F1-Score: 98.4%",
      github: "https://github.com",
      demo: "#",
    },
    {
      title: "Domain-specific LLM Fine-Tuning & Quantization",
      category: "Model Optimization",
      description: "Fine-tune mô hình Llama 3 8B trên tập dữ liệu chuyên ngành tài chính bằng kỹ thuật QLoRA, lượng tử hóa 4-bit giúp tiết kiệm 65% chi phí VRAM GPU khi inference.",
      tags: ["Hugging Face", "PEFT", "Unsloth", "vLLM", "DeepSpeed"],
      metrics: "Tiết kiệm 65% chi phí GPU",
      github: "https://github.com",
      demo: "#",
    },
  ],

  // KINH NGHIỆM LÀM VIỆC / HÀNH TRÌNH
  experiences: [
    {
      role: "Senior AI Engineer",
      company: "AI Technology Corp",
      period: "2024 - Hiện tại",
      description: "Chịu trách nhiệm kiến trúc và phát triển hệ thống trợ lý ảo AI cho khách hàng doanh nghiệp; thiết lập quy trình MLOps trên Microsoft Azure.",
    },
    {
      role: "Machine Learning Engineer",
      company: "Data Solutions Lab",
      period: "2022 - 2024",
      description: "Huấn luyện các mô hình Computer Vision và Natural Language Processing; xây dựng API phân tích dữ liệu phục vụ hơn 500.000 người dùng.",
    },
  ],
};

