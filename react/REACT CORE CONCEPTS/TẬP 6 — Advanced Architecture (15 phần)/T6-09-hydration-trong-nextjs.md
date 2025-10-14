# T6-09 — Hydration trong Next.js

> Mục tiêu: Hiểu quá trình **hydrate** trong Next.js (App Router), giải quyết **mismatch** giữa server và client, và tối ưu **partial/streaming**.

---

## 1) Khái niệm
- **Hydration**: Client gắn event handlers & khôi phục state lên HTML SSR.
- **Mismatch** xảy ra khi HTML server **khác** render client (do time/random/locale…).

---

## 2) Server/Client Components (App Router)
- `app/` mặc định **Server Components**.  
- Khi cần browser APIs/state, dùng **Client Component**: file bắt đầu bằng `"use client"`.

```tsx
// app/search/SearchBox.tsx
"use client";
export default function SearchBox(){ /* useState, useEffect ... */ }
```

- **Tối ưu**: giữ `Server Components` cho phần tĩnh/nặng; chỉ chuyển **UI tương tác** sang client.

---

## 3) Tránh mismatch
- Không render **giá trị phụ thuộc thời gian** trực tiếp trên server (Date.now, Math.random).  
- Dùng **`use client`** + effect để cập nhật sau mount, hoặc render skeleton.

---

## 4) Streaming & Suspense
- Next.js hỗ trợ **Streaming SSR** với `Suspense`.  
- Từng phần (`<Suspense>`) stream dần dần → TTFB nhanh, UI hiển thị từng bước.

---

## 5) Data Fetching (App Router)
- `fetch` trong Server Component tự động **cache** & **revalidate** (`force-cache`, `no-store`, `revalidate`).  
- Client Component dùng **SWR/React Query**.

---

## 6) Mini note: dynamic route & caching
- Route có `generateStaticParams` để SSG đa số trang; phần còn lại dùng ISR.  
- Cấu hình `revalidate` ở **layout/page**.

---

## 7) Checklist
- [ ] Ưu tiên Server Components cho phần tĩnh/nặng.  
- [ ] Client Components chỉ khi cần tương tác/state.  
- [ ] Tránh mismatch; defer giá trị không ổn định qua effect.  
- [ ] Dùng Suspense/Streaming đúng chỗ; cấu hình revalidate hợp lý.

---

## 8) Bài tập
1. Tạo trang `app/users/[id]` SSG + ISR, và panel `SearchBox` client.  
2. Tạo mismatch cố ý (Date.now) rồi sửa theo best practice.