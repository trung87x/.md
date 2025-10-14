# T2-08 — useLayoutEffect vs useEffect (thời điểm chạy & tình huống dùng)

> Mục tiêu: Phân biệt **thời điểm chạy** của `useEffect` và `useLayoutEffect`, biết khi nào cần **đo/kê lại layout**, tránh **flicker** và lỗi SSR.

---

## 1) Thời điểm chạy
- `useEffect`: chạy **sau khi trình duyệt vẽ (paint)**. Không chặn hiển thị → thích hợp cho **side-effect không ảnh hưởng layout** (fetch, log, event, subscriptions, timers…).
- `useLayoutEffect`: chạy **ngay sau commit** nhưng **trước khi paint**. Có thể **đo layout** (DOM measurements) và **đồng bộ** thay đổi kiểu `style`/`scroll` để tránh nhấp nháy.

```
Render → Commit → (useLayoutEffect) → Paint → (useEffect)
```

> Trong **Strict Mode dev**, cả hai đều có thể mount/unmount lại để phát hiện side-effect.

---

## 2) Khi nào dùng useLayoutEffect?
- Cần **đo kích thước/ vị trí**: `getBoundingClientRect`, `scrollWidth/Height`, `offsetTop`…
- Cần **điều chỉnh DOM đồng bộ** trước khi người dùng thấy: đặt `scrollTop`, tính toán `transform`, `focus()` không giật.
- Cần **đồng bộ** với kết quả đo: tính lại vị trí tooltip/popover, masonry grid, autosize textarea.

```jsx
function Tooltip({ anchorId }) {
  const ref = React.useRef(null);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });

  React.useLayoutEffect(() => {
    const anchor = document.getElementById(anchorId);
    if (!anchor || !ref.current) return;
    const r1 = anchor.getBoundingClientRect();
    const r2 = ref.current.getBoundingClientRect();
    setPos({ x: r1.left + r1.width / 2 - r2.width / 2, y: r1.bottom + 8 });
  }, [anchorId]);

  return <div ref={ref} style={{ position: "fixed", left: pos.x, top: pos.y }}>Tooltip</div>;
}
```

---

## 3) Khi **không** cần useLayoutEffect
- Không đo/điều chỉnh layout → dùng `useEffect` cho nhẹ.
- Công việc **I/O**: fetch, WebSocket, timers, event listener → `useEffect`.
- Nếu chỉ muốn “chạy sau render” nhưng không phụ thuộc layout → `useEffect`.

---

## 4) SSR & cảnh báo
- Trên **server**, không có DOM → `useLayoutEffect` sẽ cảnh báo khi render SSR. Khắc phục:
  - Dùng điều kiện: `typeof window !== "undefined"` trước khi dùng layout logic.
  - Hoặc viết **`useIsomorphicLayoutEffect`**:
```jsx
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;
```
- Tránh làm công việc **nặng** trong `useLayoutEffect` vì nó chặn paint → có thể khiến UI giật/đơ.

---

## 5) Migration tips
- Bắt đầu với `useEffect`. **Chỉ nâng cấp** lên `useLayoutEffect` khi có lý do: đo/điều chỉnh layout đồng bộ.
- Kiểm tra flicker bằng mắt & DevTools Performance tab.

---

## 6) Mini demo (UMD)
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  </head>
  <body>
    <div id="app"></div>
    <script type="text/babel">
      function Box({ useLayout }) {
        const ref = React.useRef(null);
        React[useLayout ? "useLayoutEffect" : "useEffect"](() => {
          // đo và đổi kích thước đồng bộ
          const r = ref.current.getBoundingClientRect();
          ref.current.style.height = r.width + "px";
        }, []);
        return <div ref={ref} style={{ width: 120, background: "#ddd" }}>Box</div>;
      }
      function App() {
        const [layout, setLayout] = React.useState(false);
        return (
          <div>
            <label>
              <input type="checkbox" checked={layout} onChange={e => setLayout(e.target.checked)} />
              Dùng useLayoutEffect
            </label>
            <Box useLayout={layout} />
          </div>
        );
      }
      ReactDOM.createRoot(document.getElementById("app")).render(<App />);
    </script>
  </body>
</html>
```

---

## 7) Checklist
- [ ] Cần đo/điều chỉnh layout trước khi hiển thị → `useLayoutEffect`.
- [ ] Mọi việc khác (I/O, log, timers, event, subscriptions) → `useEffect`.
- [ ] Cẩn thận với SSR (dùng isomorphic layout effect khi cần).
- [ ] Đừng chặn paint bằng công việc nặng trong `useLayoutEffect`.

---

## 8) Bài tập
1. Viết component autosize textarea: đo `scrollHeight` bằng `useLayoutEffect` để set `style.height` tránh giật.
2. Tooltip bám theo phần tử khi resize/scroll: đo lại bằng `useLayoutEffect` và sự kiện `resize/scroll` (thêm cleanup).
3. So sánh flicker khi dùng `useEffect` vs `useLayoutEffect` trong ví dụ đổi height bên trên.