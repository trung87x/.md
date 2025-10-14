# T3-01 — Rendering vs Commit Phase

> Mục tiêu: Hiểu rõ hai giai đoạn quan trọng trong vòng đời React: **Render phase** và **Commit phase**, cách React cập nhật giao diện và tối ưu re-render.

---

## 1) Tổng quan React lifecycle (Function Component)
React chia quá trình cập nhật UI thành **2 giai đoạn chính**:

| Giai đoạn | Tên | Mục đích | Đặc điểm |
|------------|-----|-----------|-----------|
| 🧠 **Render phase** | "Chuẩn bị" | Gọi function component, tạo Virtual DOM mới | Có thể chạy **nhiều lần** (không side-effect) |
| ⚙️ **Commit phase** | "Thực thi" | So sánh (diff) và cập nhật DOM thật | Chạy **1 lần duy nhất** mỗi update |

---

## 2) Render Phase chi tiết
- React gọi function component → sinh ra Virtual DOM mới (cấu trúc mô tả UI).
- React so sánh (reconcile) với Virtual DOM cũ.
- Tạo danh sách thay đổi (mutation list) nhưng **chưa chạm DOM**.

### ❗ Lưu ý:
- Không nên gọi API, thay đổi DOM, hoặc `setState` trong render → vì render có thể **bị chạy lại bất kỳ lúc nào**.
- React 18 có thể **render lại nhiều lần** (trong Strict Mode) để kiểm tra tính “an toàn”.

```jsx
function Counter({ count }) {
  console.log("Render phase"); // 🧠 chạy nhiều lần
  return <div>{count}</div>;
}
```

---

## 3) Commit Phase chi tiết
- React thực hiện các thay đổi DOM thật (mount/update/unmount).
- Gọi các lifecycle hooks tương ứng:
  - `useLayoutEffect` → chạy **trước khi paint**.
  - `useEffect` → chạy **sau khi paint**.

```jsx
function Demo() {
  React.useLayoutEffect(() => console.log("layout effect"));
  React.useEffect(() => console.log("effect"));
  return <div>Hello</div>;
}
```
Console log:  
```
Render phase
layout effect
effect
```

---

## 4) Vòng đời chi tiết (Functional Component)

```
Mount lần đầu:
→ Render phase (gọi function)
→ Commit (DOM mount)
→ useLayoutEffect
→ Paint
→ useEffect

Update:
→ Render phase (function chạy lại)
→ Commit (DOM diff + patch)
→ Cleanup effect cũ
→ useLayoutEffect mới
→ Paint
→ useEffect mới
```

---

## 5) React Fiber & Concurrent Rendering
- Từ React 18, **render phase** có thể tạm dừng, bỏ qua, hoặc chạy lại → giúp React xử lý UI **concurrent**.
- `useTransition`, `useDeferredValue` giúp kiểm soát ưu tiên giữa render nhanh/chậm.

---

## 6) Checklist
- [ ] Render phase: không side-effect, chỉ return UI.
- [ ] Commit phase: chạy effect, thao tác DOM thật.
- [ ] `useLayoutEffect`: trước paint (đồng bộ layout).
- [ ] `useEffect`: sau paint (asynchronous).
- [ ] React 18 có thể render lại → tránh side-effect trong render.

---

## 7) Bài tập
1. Tạo component log `"Render"`, `"Layout"`, `"Effect"` để quan sát thứ tự.
2. Thêm nút `setCount` để thấy render chạy lại bao nhiêu lần trong Strict Mode.
3. Giải thích vì sao render chạy 2 lần nhưng DOM chỉ cập nhật 1 lần.