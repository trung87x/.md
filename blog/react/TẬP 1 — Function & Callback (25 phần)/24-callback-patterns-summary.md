# 24 — Callback Patterns Summary (React)

> Mục tiêu: tổng hợp toàn bộ **callback patterns** trong React — từ cơ bản đến nâng cao — với code mẫu ngắn gọn, bảng so sánh và best practices.

---

## 0) TL;DR

Callback = hàm được **truyền vào một hàm khác**, React dùng ở **mọi nơi**: event, props, hook, ref.  
Hiểu callback là **hiểu React render flow + data flow (Cha → Con → Hook)**.

---

## 1️⃣ Callback Patterns (tổng hợp)

| Loại | Ví dụ | Ghi chú |
|------|--------|--------|
| **Inline callback** | `<button onClick={() => alert('Hi')} />` | Ngắn, dễ viết, nhưng tạo hàm mới mỗi render |
| **Named callback** | `onClick={handleClick}` | Ổn định, tách biệt logic |
| **Props callback** | `<Child onSave={saveFn} />` | Cha truyền hàm xuống con |
| **Hook callback** | `useEffect(() => {...}, [deps])` | Hàm chạy khi deps đổi |
| **Memo callback** | `useCallback(fn, [deps])` | Giữ ref ổn định giữa render |
| **Ref callback** | `ref={el => console.log(el)}` | Chạy khi DOM mount/unmount |
| **Closure callback** | `setState(prev => prev + 1)` | Nhớ biến an toàn |
| **Stable callback (Ref)** | `useRef` giữ hàm mới nhất | Tránh stale closure |
| **Async callback** | `onSubmit={async () => {...}}` | Dùng Promise, cần cleanup |
| **Event callback** | `onClick`, `onChange`, `onKeyDown` | Synthetic event React |
| **Factory callback** | `makeHandler(id)` | Tạo closure theo tham số |
| **Custom hook callback** | `useAsync(fn)` | Đóng gói logic tái sử dụng |

---

## 2️⃣ Callback Lifecycle trong React

```
Render → Commit → Event/Effect → Re-render
```
- Callback được **định nghĩa lại mỗi render** (trừ khi dùng `useCallback`).  
- React luôn tạo **closure mới** theo state hiện tại → “snapshot render”.  
- Khi closure bị stale → fix bằng `prev =>`, `ref`, hoặc `useEvent`.

---

## 3️⃣ Callback Composition (Ghép callback)

```jsx
function Button({ onClick }) {
  const handle = (e) => {
    console.log("Inner click");
    onClick?.(e); // gọi callback từ cha
  };
  return <button onClick={handle}>Click</button>;
}
```

> **Pattern “compose”**: con chạy logic riêng rồi gọi hàm cha.  
> Giúp **chia trách nhiệm** giữa component và parent.

---

## 4️⃣ Callback trong List & Factory

```jsx
const makeHandler = (id) => () => console.log("Clicked", id);

function List({ items }) {
  return items.map(i => (
    <button key={i.id} onClick={makeHandler(i.id)}>{i.name}</button>
  ));
}
```

✅ Closure giữ id đúng mỗi item.  
❌ Inline trong map gây render nhiều nếu list lớn → dùng memo.

---

## 5️⃣ Hook Callback Chain

| Hook | Callback dùng cho | Ghi chú |
|------|------------------|---------|
| `useEffect(fn, deps)` | side-effect | cleanup trả về function |
| `useCallback(fn, deps)` | giữ ref ổn định | dùng với con memo |
| `useMemo(fn, deps)` | memo giá trị | không dành cho side-effect |
| `useRef()` | giữ giá trị ổn định | không gây re-render |
| `useEvent(fn)` | (Canary) closure mới nhất | thay thế useRef pattern |

---

## 6️⃣ Demo HTML chạy ngay (CDN + Babel)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Callback Patterns Summary</title>
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
      const { useState, useCallback } = React;

      function Child({ onAlert }) {
        return <button onClick={onAlert}>Click Child</button>;
      }

      function App() {
        const [count, setCount] = useState(0);

        const handleClick = useCallback(() => {
          alert("Parent handled! Count=" + count);
        }, [count]);

        return (
          <div>
            <h2>24 — Callback Patterns Summary</h2>
            <div className="card">
              <button onClick={() => setCount(p => p + 1)}>Increase ({count})</button>
            </div>
            <div className="card">
              <Child onAlert={handleClick} />
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

## 7️⃣ Checklist ghi nhớ

- [x] Callback xuất hiện ở event, props, hook, ref.  
- [x] Closure nhớ snapshot → tránh stale bằng prev/ref/useEvent.  
- [x] Dùng `useCallback` khi prop truyền xuống con memo.  
- [x] Cleanup chuẩn trong effect async.  
- [x] Compose callback để tách trách nhiệm logic.

---

## 8️⃣ Đọc thêm
- React Docs — Events, Hooks, Memoization  
- Dan Abramov — *Making React Effects less reactive*  
- Kent C. Dodds — React Patterns (callback section)
