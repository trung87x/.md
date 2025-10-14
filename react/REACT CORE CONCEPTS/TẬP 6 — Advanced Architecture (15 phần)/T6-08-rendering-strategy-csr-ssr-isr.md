# T6-08 — Rendering Strategy: CSR / SSR / ISR

> Mục tiêu: Chọn **chiến lược render** phù hợp: **CSR** (Client-Side Rendering), **SSR** (Server-Side Rendering), **ISR** (Incremental Static Regeneration).

---

## 1) CSR
- Render toàn bộ trên client (SPA).  
- **Ưu**: đơn giản, CDN thân thiện, tương tác nhanh sau lần đầu.  
- **Nhược**: SEO yếu (nếu bot yếu), **TTFB thấp** nhưng **TTI** có thể muộn.

---

## 2) SSR
- Server render HTML cho request, client **hydrate** tiếp.  
- **Ưu**: TTFB tốt, SEO mạnh.  
- **Nhược**: server tốn tài nguyên, cần **caching**.

---

## 3) SSG & ISR
- **SSG**: build ra HTML tĩnh tại build-time.  
- **ISR**: build tĩnh + **revalidate** theo thời gian (`revalidate: 60s`), phục vụ như static và cập nhật nền.

---

## 4) Lựa chọn theo use case
| Tiêu chí | CSR | SSR | ISR |
|---|---|---|---|
| Nội dung động theo user | ⭐⭐⭐ | ⭐⭐⭐ | ⭐ |
| SEO & social preview | ⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| Tải máy chủ | ⭐⭐⭐ | ⭐ | ⭐⭐⭐ |
| Dữ liệu đổi không liên tục | ⭐ | ⭐⭐ | ⭐⭐⭐ |

---

## 5) Cache & edge
- Kết hợp **CDN/edge compute** để giảm latency.  
- Với SSR, áp dụng **Full-page cache**/**ESI**/**Segment cache**.

---

## 6) Checklist
- [ ] Chọn chiến lược theo **SEO**, **độ động dữ liệu**, **chi phí server**.  
- [ ] Với SSR/ISR: thiết kế **cache key** & **revalidate**.  
- [ ] Đảm bảo **hydration** mượt sau SSR.  
- [ ] Theo dõi **TTFB/TTI/INP**.

---

## 7) Bài tập
1. Đề xuất chiến lược cho blog có trang bài viết (ít đổi) + trang Dashboard cá nhân (động).  
2. Vẽ sơ đồ cache edge cho SSR và mô tả invalidation.