# T2-16 — Effect + Animation Frame (requestAnimationFrame)

> Mục tiêu: Dùng `requestAnimationFrame` (rAF) với `useEffect`/`useLayoutEffect` để làm **animation mượt**, đo đạc theo frame, và cleanup đúng.

---

## 1) rAF là gì?
- Trình duyệt gọi callback **trước mỗi frame** (60fps ≈ 16.7ms) sau khi render/paint cycle phù hợp.
- Dùng rAF để cập nhật **UI theo thời gian** (progress, scroll-follow, parallax) thay vì `setInterval`.

---

## 2) Mẫu rAF liên tục
```jsx
function useRafLoop(callback, enabled = true) {
  const cbRef = React.useRef(callback);
  React.useEffect(() => { cbRef.current = callback; }, [callback]);

  React.useEffect(() => {
    if (!enabled) return;
    let id = 0, start = performance.now();
    const tick = (t) => {
      const dt = t - start; // ms từ lần đầu
      cbRef.current({ t, dt });
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [enabled]);
}
```

```jsx
function Progress() {
  const [x, setX] = React.useState(0);
  useRafLoop(({ dt }) => setX((v) => Math.min(100, v + dt / 50)));
  return <div>Progress: {x.toFixed(0)}%</div>;
}
```

---

## 3) Mẫu rAF + layout đo đồng bộ
- Khi cần đo rồi cập nhật **trước paint**, dùng `useLayoutEffect` để tránh flicker.
```jsx
function useSmoothScrollFollow(ref) {
  React.useLayoutEffect(() => {
    let id = 0;
    const step = () => {
      const el = ref.current;
      if (el) el.style.transform = `translateY(${window.scrollY * 0.2}px)`;
      id = requestAnimationFrame(step);
    };
    id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [ref]);
}
```

---

## 4) Dừng/tiếp tục, tiết kiệm pin
- Chỉ chạy rAF khi **tab active** (`document.visibilityState === "visible"`).
- Bật/tắt theo `enabled` hoặc khi phần tử **không hiển thị** (IntersectionObserver).

```jsx
function useRafWhenVisible(callback) {
  const [active, setActive] = React.useState(document.visibilityState === "visible");
  React.useEffect(() => {
    const onVis = () => setActive(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);
  useRafLoop(callback, active);
}
```

---

## 5) Mini demo (UMD)
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
    function useRafLoop(callback, enabled = true) {
      const cbRef = React.useRef(callback);
      React.useEffect(() => { cbRef.current = callback; }, [callback]);
      React.useEffect(() => {
        if (!enabled) return;
        let id = 0, last = performance.now();
        const tick = (t) => {
          const dt = t - last; last = t;
          cbRef.current({ t, dt });
          id = requestAnimationFrame(tick);
        };
        id = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(id);
      }, [enabled]);
    }

    function Ball() {
      const ref = React.useRef(null);
      let y = 0, v = 0; // physics mini
      useRafLoop(({ dt }) => {
        v += 0.002 * dt;
        y = (y + v);
        if (y > 200) { y = 200; v *= -0.8; }
        if (ref.current) ref.current.style.transform = `translateY(${y}px)`;
      });
      return <div ref={ref} style={{ width: 40, height: 40, borderRadius: 20, background: "#4f46e5" }} />;
    }

    function App() {
      return <div style={{ height: 300, display: "grid", placeItems: "center" }}><Ball /></div>;
    }
    ReactDOM.createRoot(document.getElementById("app")).render(<App />);
  </script>
</body>
</html>
```

---

## 6) Checklist
- [ ] Dùng rAF cho cập nhật theo frame; cleanup `cancelAnimationFrame`.
- [ ] Đo/điều chỉnh layout cần thiết → cân nhắc `useLayoutEffect`.
- [ ] Tạm dừng khi tab ẩn / phần tử không hiển thị để tiết kiệm CPU.
- [ ] Tránh logic nặng trong mỗi frame; giới hạn tính toán.

---

## 7) Bài tập
1. Viết `useRafLoop` trả `fps` trung bình (tính từ `dt`).
2. Tạo progress bar “mượt” tăng dần trong 2 giây, có `Pause/Resume`.
3. Tạo effect parallax: element dịch chuyển 0.2x `scrollY`; dừng khi tab ẩn.