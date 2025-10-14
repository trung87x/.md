# T6-12 — Performance Bottleneck Tracing

> Mục tiêu: Truy vết **điểm nghẽn hiệu năng**: render thừa, tính toán nặng, bundle to, I/O chậm; dùng Profiler, Lighthouse/INP, Web Vitals, và flamegraph JS runtime.

---

## 1) Chuỗi đo lường
- **Render cost**: React Profiler (commit time, flamegraph).  
- **Tương tác**: Web Vitals (**INP**, FID), Performance panel.  
- **Network**: Coverage & waterfall (Chrome DevTools).  
- **Bundle**: Source map explorer, `vite-bundle-visualizer`.

---

## 2) Checklists theo lớp
**UI/React:**
- Re-render cascade? Context rộng? Object literal props?  
- List lớn thiếu virtualization? Selector không tối ưu?

**JS compute:**
- Tính toán nặng trong render? Thiếu memo?  
- Có thể **Web Worker**?

**Network/data:**
- Nhiều request nối tiếp? Thiếu cache/Suspense/ISR?  
- Payload quá lớn?

**Bundle:**
- Nhiều lib nặng không cần? Tree‑shaking kém?  
- Chưa code split route/panel?

---

## 3) Kỹ thuật trace
- Đặt **markers** bằng `performance.mark`/`measure`.  
- Dùng `console.time()` quanh đoạn nghi ngờ.  
- So sánh **trước/sau** (A/B) thay đổi.

---

## 4) Quy trình chuẩn
1) **Reproduce** trên profile realistic (throttle CPU/Network).  
2) **Record** Profiler + Performance panel.  
3) **Isolate**: tắt tính năng/route để khoanh vùng.  
4) **Fix** theo ưu tiên ảnh hưởng người dùng (INP/LCP).  
5) **Verify** lại số đo, viết **post‑mortem**.

---

## 5) Tool tham khảo
- React DevTools Profiler, why-did-you-render.  
- Lighthouse, Web Vitals, Sentry Performance.  
- Source map explorer / Bundle visualizer.

---

## 6) Bài tập
1. Dựng trang list 10k item, trace INP với/không virtualization.  
2. Đo thời gian filter trước/sau `useDeferredValue`.  
3. Tạo báo cáo ngắn nêu 3 nguyên nhân chính và cách khắc phục.