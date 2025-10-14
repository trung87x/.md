# T6-15 — React Architecture Cheatsheet

> Mục tiêu: Bảng **cheatsheet** tổng hợp toàn bộ Tập 6 để tra cứu nhanh khi thiết kế kiến trúc & tối ưu.

---

## 1) Concurrent & Suspense
- `startTransition` cho cập nhật **không gấp**.  
- `useDeferredValue` khi **đọc giá trị tốn kém**.  
- `Suspense` cho loading, **ErrorBoundary** cho lỗi.  
- SSR/Streaming/ISR: chọn chiến lược theo **SEO & dữ liệu**.

---

## 2) State & Store
- State UI cục bộ → `useState`/`useReducer`.  
- Global nhỏ → Context **split value/actions**.  
- Nguồn ngoài React → `useSyncExternalStore` + **selector** + persist/sync.

---

## 3) Re-render boundaries
- Co‑locate state; tách high/low churn.  
- `React.memo`, props ổn định, **list virtualized**.  
- Tránh object literal props/deps.

---

## 4) Module boundaries
- **Feature-first** folders, public API `index.ts`.  
- DI services; không import xuyên nội bộ.  
- Lint cấm cycle & boundary breaches.

---

## 5) Performance process
- Đo trước (Profiler, INP), tối ưu **điểm nóng**.  
- Bundle split theo route/intent; prefetch khi cần.  
- Web Worker cho tính toán nặng.

---

## 6) Testing & CI/CD
- Unit (hooks/utils) → Integration (RTL) → E2E (Playwright).  
- CI: lint/type/test + preview; Changesets for release.  
- Monitoring lỗi & performance sau release.

---

## 7) Snippets nhanh
```ts
// Stable callback + latest state
function useStableCallback<T extends (...a:any[])=>any>(fn:T):T{
  const r=React.useRef(fn); React.useEffect(()=>{r.current=fn},[fn]);
  // @ts-ignore
  return React.useCallback(((...a)=>r.current(...a)) as T, []);
}

// Virtual list offset
const start = Math.floor(scrollTop/rowHeight);
const visible = Math.ceil(height/rowHeight)+2;
const offsetY = start*rowHeight;
```

---

## 8) Checklist review PR kiến trúc
- [ ] Route/panel nặng có **lazy** + fallback.  
- [ ] State ngoài React dùng **selector**; persist/sync an toàn.  
- [ ] Context split; props/handlers ổn định.  
- [ ] Virtualization cho list lớn.  
- [ ] Feature-first; DI services; không breach boundary.  
- [ ] CI + monitoring đầy đủ.

---

## 9) Bài tập tổng kết
1. Áp dụng toàn bộ vào mini‑app (list lớn + search + auth store + SSR).  
2. Viết ARCHITECTURE.md giải thích quyết định thiết kế.  
3. Dựng CI + preview + release và báo cáo performance sau deploy.