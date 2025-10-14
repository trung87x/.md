# T7-05 — React Production Checklist

> 🧾 Danh sách kiểm tra quan trọng trước khi đưa ứng dụng React vào production.

---

## ✅ 1. Build & Optimize
- [ ] Dùng `npm run build` → thư mục `/dist` hoặc `/build`.
- [ ] Bật `NODE_ENV=production` để React tự tối ưu.
- [ ] Bật tree-shaking (Vite, Webpack).
- [ ] Kiểm tra bundle size (vite-bundle-visualizer).

---

## ⚡ 2. Performance
- [ ] Dùng `React.memo`, `useCallback`, `useMemo` cho component nặng.
- [ ] Lazy import các route / page.
- [ ] SSR/ISR (Next.js) nếu cần SEO.
- [ ] Prefetch data trước khi render.

---

## 🎨 3. UI & UX
- [ ] Tối ưu font, image, icon (SVG inline hoặc CDN).
- [ ] Thêm skeleton/loading state cho UX mượt.
- [ ] Kiểm tra dark mode, responsive layout.

---

## 🔒 4. Security
- [ ] Escape HTML trong user input.
- [ ] Dùng HTTPS, CSP, Helmet (nếu có backend).
- [ ] Ẩn secret key bằng `.env`.

---

## 🧪 5. Testing & Monitoring
- [ ] 100% test critical component.
- [ ] Lint & format tự động (`eslint`, `prettier`).
- [ ] Theo dõi error bằng Sentry, LogRocket.

---

## 🚀 6. Deployment
- [ ] CI/CD chạy ổn định (GitHub Actions).
- [ ] Preview URL hoạt động trên Vercel.
- [ ] Cấu hình cache headers cho static assets.

---

## 🧩 7. Documentation
- [ ] Có `README.md` với hướng dẫn cài, chạy, build.
- [ ] Mỗi custom hook / component có mô tả rõ ràng.
- [ ] Có changelog hoặc version tag.

---

## ✅ Tổng kết
> Một ứng dụng React chuyên nghiệp không chỉ “chạy được” — mà còn **tối ưu, bảo mật, dễ test, và dễ mở rộng**.  
> Checklist này là công cụ quan trọng cho mọi dự án production.
