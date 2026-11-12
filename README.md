# AI Engineer Portfolio Website

Website cá nhân dành cho **Kỹ sư AI / Machine Learning (AI & ML Engineer)**, có thể triển khai trên **Microsoft Azure Static Web Apps** hoặc **Azure App Service**.

---

## Công nghệ sử dụng

- **Frontend:** React 18, Vite
- **Styling:** Tailwind CSS (Dark Mode & Cyberpunk AI Glow effects)
- **Icons:** Lucide Icons & Custom SVGs
- **Deployment Platforms:** Microsoft Azure Static Web Apps, Azure App Service
- **CI/CD:** GitHub Actions (tự động build & deploy)

---

## Hướng dẫn chạy thử ở môi trường Local

1. Cài đặt các thư viện (nếu chưa cài):
   ```bash
   npm install
   ```

2. Khởi chạy máy chủ phát triển (Dev server):
   ```bash
   npm run dev
   ```
   Mở trình duyệt tại: `http://localhost:5173`

3. Kiểm tra build bản phát hành (Production build):
   ```bash
   npm run build
   npm run preview
   ```

---

## Cách chỉnh sửa thông tin cá nhân của bạn

Mọi thông tin cá nhân, tiểu sử, kỹ năng, dự án và liên kết mạng xã hội được lưu trữ tập trung tại một file duy nhất: **`src/data/profileData.js`**

Bạn chỉ cần mở file này và chỉnh sửa:
- `personal`: Họ tên, chức danh, email, liên kết GitHub, LinkedIn, ảnh đại diện, CV.
- `stats`: Số năm kinh nghiệm, số lượng mô hình AI đã triển khai...
- `pillars`: 4 lĩnh vực chuyên môn chính.
- `skills`: Danh sách các kỹ năng AI, Frameworks, MLOps, Vector DB.
- `projects`: Các dự án AI tiêu biểu, số liệu đánh giá (metrics), link demo & code.
- `experiences`: Quá trình làm việc / học tập.

---

## Hướng dẫn Deploy lên Microsoft Azure

### Bước 1: Đẩy mã nguồn lên GitHub
1. Truy cập [GitHub](https://github.com) và tạo một repository mới (ví dụ: `my-ai-portfolio`).
2. Liên kết thư mục dự án với GitHub repo:
   ```bash
   git remote add origin https://github.com/<tai-khoan-github-cua-ban>/my-ai-portfolio.git
   git branch -M main
   git push -u origin main
   ```

### Bước 2: Tạo Azure Static Web App trên Azure Portal
1. Đăng nhập vào [Microsoft Azure Portal](https://portal.azure.com/).
2. Trên thanh tìm kiếm ở đầu trang, gõ **Static Web Apps** và chọn dịch vụ này.
3. Nhấn **+ Create** (Tạo mới).
4. Điền các thông tin:
   - **Subscription:** Chọn gói thuê bao Azure của bạn (Free Trial hoặc Pay-As-You-Go).
   - **Resource Group:** Nhấn *Create new*, đặt tên (ví dụ: `rg-personal-website`).
   - **Name:** Đặt tên cho ứng dụng (ví dụ: `my-ai-portfolio`).
   - **Plan type:** Chọn **Free** (Miễn phí vĩnh viễn, gồm SSL tự động và băng thông toàn cầu).
   - **Region:** Chọn khu vực gần Việt Nam (ví dụ: `East Asia` hoặc `Southeast Asia`).
   - **Deployment details:** Chọn **GitHub**.
   - Nhấn **Sign in with GitHub** và cấp quyền cho Azure.
   - Chọn **Organization**, **Repository** (`my-ai-portfolio`) và **Branch** (`main`).
5. **Build Details (Cấu hình build):**
   - **Build Presets:** Chọn **Custom**.
   - **App location:** `/`
   - **Api location:** để trống.
   - **Output location:** `dist`
6. Nhấn **Review + create**, sau đó nhấn **Create**.

### Bước 3: Hoàn tất & Tự động Deploy
- Azure sẽ tự động tạo một file GitHub Actions workflow (`.github/workflows/...`) trong repo của bạn và kích hoạt build.
- Đợi khoảng 1 - 2 phút, vào mục **Overview** của Static Web App trên Azure Portal.
- Bạn sẽ thấy đường dẫn **URL** dạng: `https://<random-name>.azurestaticapps.net`. Nhấp vào để xem website trực tiếp trên Internet!
- Về sau, mỗi khi bạn chỉnh sửa file `src/data/profileData.js` và `git push` lên GitHub, Azure sẽ tự động cập nhật website chỉ trong vòng 1 phút!

### Deploy lên Azure Web App (App Service, Windows)

Workflow `.github/workflows/azure-webapps-node.yml` build ứng dụng bằng Node.js/Vite và deploy thư mục `dist` lên App Service. File `public/web.config` cấu hình IIS trả về `index.html` cho các URL của React SPA.

1. Tạo Azure Web App và chọn **Windows** làm hệ điều hành.
2. Trong GitHub repository, mở **Settings → Secrets and variables → Actions**:
   - Thêm repository variable `AZURE_WEBAPP_NAME` với tên Web App trên Azure.
   - Tải **Publish profile** từ trang Overview của Web App rồi thêm toàn bộ nội dung thành repository secret `AZURE_WEBAPP_PUBLISH_PROFILE`.
3. Push lên nhánh `main` để chạy build và deploy tự động.
