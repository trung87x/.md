# Tập 2 · Phần 6 — useEffect Cơ Bản (Mount → Update → Unmount)

> Mục tiêu: nắm vòng đời `useEffect`: chạy **sau render**, cleanup **trước** effect kế tiếp/unmount; viết effect **idempotent**, đặt **deps đúng**, và hiểu khác biệt với `useLayoutEffect`.

---

## 0) TL;DR
- `useEffect(fn, [deps])` chạy **sau khi DOM commit**.  
- Trả về **cleanup** để gỡ timer/listener/subscription.  
- `[]` → chạy 1 lần khi mount; `[a,b]` → chạy khi `a` hoặc `b` đổi.  
- Không dùng `useEffect` cho **tính toán thuần** (dùng render/memo).

---

## 1️⃣ Chu kỳ chạy
1) **Render** với JSX mới → **Commit** vào DOM.  
2) React gọi **effect**.  
3) Khi deps đổi/unmount: gọi **cleanup** cũ → gọi effect mới.

```jsx
useEffect(() => {
  const id = setInterval(...);
  return () => clearInterval(id); // cleanup
}, [deps]);
```

---

## 2️⃣ Phân loại deps
- **Không deps (`[]`)**: chạy **1 lần** khi mount (và cleanup khi unmount).  
- **Có deps**: chạy mỗi khi **bất kỳ** dep nào đổi.  
- **Không truyền deps**: chạy **mỗi render** (hiếm khi cần).

---

## 3️⃣ Idempotent effect (an toàn với Strict Mode)
- Viết effect sao cho **setup/cleanup** có thể lặp lại mà **không lỗi**.  
- Tránh đặt logic **thay đổi state vô điều kiện** bên trong effect.

---

## 4️⃣ Demo HTML chạy ngay (CDN + Babel)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>T2-06 — useEffect Basics</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; padding: 20px; }
      .card { padding: 12px; border: 1px solid #ddd; border-radius: 10px; margin-bottom: 12px; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
      const { useState, useEffect } = React;

      function EffectDemo() {
        const [n, setN] = useState(0);

        useEffect(() => {
          const id = setInterval(() => setN(p => p + 1), 1000);
          console.log("Effect setup");
          return () => {
            clearInterval(id);
            console.log("Effect cleanup");
          };
        }, []);

        useEffect(() => {
          console.log("Effect with deps: n =", n);
        }, [n]);

        return <div>Timer: {n}s</div>;
      }

      function App() {
        const [show, setShow] = useState(true);
        return (
          <div>
            <h2>T2-06 — useEffect Cơ Bản</h2>
            <button onClick={() => setShow(s => !s)}>{show ? "Unmount" : "Mount"}</button>
            <div className="card">{show && <EffectDemo />}</div>
          </div>
        );
      }

      ReactDOM.createRoot(document.getElementById("root")).render(<App />);
    </script>
  </body>
</html>
```

---

## 5️⃣ Checklist
- [x] Effect chạy sau commit; cleanup trước effect mới/unmount.  
- [x] Đặt deps chính xác; tránh thiếu deps gây **stale**.  
- [x] Không lạm dụng effect cho tính toán thuần.  
- [x] Viết effect **idempotent** (an toàn trong Strict Mode).  
- [x] Cleanup timer/listener/subscription chuẩn.
