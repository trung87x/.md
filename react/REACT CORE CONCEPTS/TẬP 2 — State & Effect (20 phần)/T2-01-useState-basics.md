# Tập 2 · Phần 1 — useState Cơ Bản & Functional Update

> Mục tiêu: nắm vững `useState` (khai báo, cập nhật), **batching**, **functional update** (tránh stale), và các lưu ý khi render lại.

---

## 0) TL;DR

- `const [state, setState] = useState(initial)` tạo **state cục bộ** cho function component.  
- React **batch** nhiều setState trong 1 event → render lại **một lần**.  
- Cập nhật dựa trên giá trị trước đó → **luôn dùng** `setState(prev => next(prev))`.  
- Không mutate trực tiếp object/array — tạo **bản sao mới** (immutable update).

---

## 1️⃣ API cơ bản

```jsx
const [count, setCount] = useState(0);

function inc() {
  setCount(count + 1); // OK trong event sync
}
```

- Khởi tạo lần đầu bằng `initial` (chỉ chạy khi mount).  
- Gọi `setCount` sẽ **đánh dấu** component cần re-render.

---

## 2️⃣ Batching (gom setState)

```jsx
function addTwo() {
  setCount(c => c + 1);
  setCount(c => c + 1); // ✅ kết quả +2
}
```
> Với **functional update**, thứ tự an toàn trong batching.

---

## 3️⃣ Functional Update — tránh stale

```jsx
// ❌ Sai: có thể dùng snapshot cũ khi callback sống lâu
setCount(count + 1);

// ✅ Đúng: luôn dựa trên giá trị mới nhất
setCount(prev => prev + 1);
```

- Bắt buộc dùng khi cập nhật bên trong **timer/listener/async**.

---

## 4️⃣ Không mutate trực tiếp

```jsx
// ❌ Sai
state.items.push(newItem);
setState(state);

// ✅ Đúng
setState(prev => ({ ...prev, items: [...prev.items, newItem] }));
```

---

## 5️⃣ Demo HTML chạy ngay (CDN + Babel)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>useState Basics</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; padding: 20px; }
      button { margin-right: 8px; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
      const { useState, useEffect } = React;

      function App() {
        const [count, setCount] = useState(0);

        // Timer để minh họa functional update
        useEffect(() => {
          const id = setInterval(() => setCount(c => c + 1), 1000);
          return () => clearInterval(id);
        }, []);

        const addTwo = () => {
          setCount(c => c + 1);
          setCount(c => c + 1);
        };

        return (
          <div>
            <h2>Tập 2 · Phần 1 — useState Cơ Bản</h2>
            <p>Count: {count}</p>
            <button onClick={() => setCount(0)}>Reset</button>
            <button onClick={addTwo}>+2 (batching)</button>
          </div>
        );
      }

      ReactDOM.createRoot(document.getElementById("root")).render(<App />);
    </script>
  </body>
</html>
```

---

## 6️⃣ Checklist

- [x] Dùng `prev =>` khi phụ thuộc state cũ.  
- [x] Không mutate — dùng copy mới.  
- [x] Batching giúp gộp nhiều setState.  
- [x] Hiểu render lại: React so sánh `JSX` → commit.  
- [x] Timer/listener/async → functional update.
