# 21 — Callback Performance trong React

> Mục tiêu: đo đạc và tối ưu **chi phí callback** (tạo hàm, đổi tham chiếu, re-render), dùng **React DevTools Profiler**, và kỹ thuật thực tế (`React.memo`, `useCallback`, `useMemo`, `key`, chunking). Có demo CDN + Babel.

---

## 0) TL;DR

- **Tạo hàm mới** mỗi render **không hẳn là vấn đề** — chỉ khi callback là **prop** của con **memo** hoặc danh sách lớn.  
- Tối ưu khi **có số liệu**: dùng **Profiler** để tìm bottleneck.  
- Công cụ: `React.memo`, `useCallback` (ổn định **hàm**), `useMemo` (ổn định **giá trị**), tránh tạo object/array mới không cần thiết.  
- Với danh sách lớn: **virtualization** / **event delegation** / **batch update**.

---

## 1️⃣ Khi nào callback gây re-render tốn kém?

| Tình huống | Vì sao tốn |
|-----------|------------|
| Truyền **callback mới** vào con `React.memo` | prop đổi tham chiếu → con render lại |
| Inline callback trong **list lớn** | Tạo rất nhiều closure mỗi render |
| Callback trỏ tới **giá trị đổi liên tục** | `useCallback` vẫn đổi theo deps |
| Tạo **object/array** làm prop | Tham chiếu mới vỡ shallow compare |

---

## 2️⃣ Đo đạc với Profiler

- Mở **React DevTools → Profiler** → “Record” khi thao tác UI.  
- Chú ý: **Commit time**, “Why did this render?”, số lần render mỗi component.  
- Tập trung vào **vùng nóng** (component render nhiều hoặc tốn thời gian).

---

## 3️⃣ Chiến lược tối ưu callback

### 3.1. Ổn định handler truyền xuống con memo
```jsx
const onRemove = React.useCallback((id) => {
  setItems(prev => prev.filter(x => x.id !== id));
}, []);
```

### 3.2. Tránh object/array props mới → `useMemo`
```jsx
const summary = React.useMemo(() => ({ total: items.length }), [items.length]);
```

### 3.3. Inline OK cho UI nhỏ; list lớn → factory + memo
```jsx
const Row = React.memo(function Row({ item, onRemove }) {
  return <li onClick={() => onRemove(item.id)}>{item.title}</li>;
});
```

### 3.4. Virtualization cho list rất lớn
- Sử dụng lib như **react-window**, **react-virtualized**.

### 3.5. Debounce/throttle để giảm callback dồn dập
- `useDebouncedCallback`, `requestAnimationFrame` cho scroll/resize.

---

## 4️⃣ Demo HTML chạy ngay (CDN + Babel)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Callback Performance Demo</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; padding: 20px; }
      .card { padding: 12px; border: 1px solid #ddd; border-radius: 10px; margin-bottom: 12px; }
      ul { padding-left: 16px; }
      .muted { color: #6b7280; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
      const { useState, useCallback, memo, useMemo } = React;

      const Row = memo(function Row({ item, onRemove }) {
        console.log("Row render", item.id);
        return (
          <li>
            {item.title}{" "}
            <button onClick={() => onRemove(item.id)}>Remove</button>
          </li>
        );
      });

      function App() {
        const [items, setItems] = useState(
          Array.from({ length: 20 }, (_, i) => ({ id: i + 1, title: "Item " + (i + 1) }))
        );
        const [tick, setTick] = useState(0);

        // Ổn định callback cho Row
        const onRemove = useCallback((id) => {
          setItems(prev => prev.filter(x => x.id !== id));
        }, []);

        // Tránh object prop mới
        const meta = useMemo(() => ({ total: items.length }), [items.length]);

        return (
          <div>
            <h2>21 — Callback Performance</h2>

            <div className="card">
              <button onClick={() => setTick(t => t + 1)}>Rerender Host ({tick})</button>
              <span className="muted"> (Row không re-render trừ khi item đổi)</span>
            </div>

            <div className="card">
              <ul>{items.map(it => <Row key={it.id} item={it} onRemove={onRemove} />)}</ul>
            </div>

            <div className="card">
              <div>Total: {meta.total}</div>
              <button onClick={() => setItems(prev => [...prev, { id: Date.now(), title: "New" }])}>
                Add Item
              </button>
            </div>
          </div>
        );
      }

      ReactDOM.createRoot(document.getElementById("root")).render(<App />);
    </script>
  </body>
</html>
```

---

## 5️⃣ Checklist tối ưu callback

- [x] Dùng **Profiler** trước khi tối ưu.  
- [x] Con `memo` nhận **callback ổn định** → `useCallback`.  
- [x] Tránh **object/array props mới** → `useMemo`.  
- [x] List lớn → `memo` + factory handler, cân nhắc **virtualization**.  
- [x] Debounce/throttle khi stream event dày (scroll, input).

---

## 6️⃣ Đọc thêm
- React Docs — Memoization & Performance  
- React DevTools Profiler Guide  
- Libraries: react-window, react-virtualized
