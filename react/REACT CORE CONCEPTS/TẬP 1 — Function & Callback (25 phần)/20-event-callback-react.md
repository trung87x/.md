# 20 — React Event System & Event Callback

> Mục tiêu: hiểu **Synthetic Event** của React, cơ chế **capture vs bubble**, thay đổi về **event pooling**, và **cách viết event callback chuẩn** (preventDefault, stopPropagation, delegation). Có demo CDN + Babel.

---

## 0) TL;DR

- React dùng **SyntheticEvent** bọc event gốc của trình duyệt để **tương thích** và **tối ưu hiệu năng** (không còn pooling kể từ React 17+).  
- **Pha sự kiện**: `capture` (đi xuống) → `target` → `bubble` (đi lên).  
- Viết handler: `onClick`, `onChange`, `onKeyDown`…; dùng `e.preventDefault()`, `e.stopPropagation()` khi cần.  
- React gắn handler **ở pha bubble** theo mặc định (`onClick` ~ bubble). Muốn capture: dùng `onClickCapture`.  
- Tối ưu: handler **gọn**, cẩn thận inline quá dài; đo đạc trước khi tối ưu.

---

## 1️⃣ SyntheticEvent là gì?

- Là lớp bọc event native giúp API **đồng nhất** giữa trình duyệt.  
- Từ React 17, **không còn “event pooling”** → bạn **có thể dùng `event` bất kỳ lúc nào** trong async callback.  
- Trường hợp cần event gốc: `e.nativeEvent`.

```jsx
function LinkLike(e) {
  e.preventDefault(); // chặn điều hướng
  console.log(e.type, e.currentTarget); // SyntheticEvent
  console.log(e.nativeEvent);           // Native event
}
```

---

## 2️⃣ Capture vs Bubble trong React

| Pha | Thuộc tính handler | Thứ tự |
|-----|--------------------|--------|
| **Capture** | `onClickCapture`, `onKeyDownCapture` | từ cha → con (đi xuống) |
| **Target** | phần tử bị click | — |
| **Bubble** | `onClick`, `onKeyDown` | từ con → cha (đi lên) |

- Mặc định `onClick` là **bubble**.  
- Dùng `onClickCapture` để **đón** event **trước** khi tới con.

---

## 3️⃣ Ngăn hành vi mặc định & chặn lan truyền

```jsx
function NavLink(e) {
  e.preventDefault();       // chặn điều hướng <a>
  e.stopPropagation();      // chặn bubble lên cha (nếu cần)
  // logic SPA...
}
```

> Chỉ dùng `stopPropagation()` khi **thật sự cần** — dễ gây khó debug.

---

## 4️⃣ Sự khác nhau so với DOM thuần

- React gắn handler ở **root** (event delegation) → hiệu suất tốt cho nhiều phần tử.  
- Tên prop sự kiện React **camelCase**: `onMouseEnter`, `onDoubleClick`.  
- React **hợp nhất** một số khác biệt cross‑browser.

---

## 5️⃣ Mẫu handler chuẩn trong React

```jsx
function Button({ onClick, ...props }) {
  const handle = (e) => {
    // Ví dụ: chỉ xử lý khi có modifier
    if (e.metaKey || e.ctrlKey) e.preventDefault();
    onClick?.(e);
  };
  return <button {...props} onClick={handle} />;
}
```

- Nhận `onClick` từ props để **compose behavior**.  
- Dùng toán tử optional `?.` tránh cần check null rườm rà.

---

## 6️⃣ Demo HTML chạy ngay (CDN + Babel)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React Event System Demo</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; padding: 20px; }
      .box { padding: 12px; border: 1px solid #ddd; border-radius: 10px; margin-bottom: 12px; }
      .row { display: flex; gap: 8px; }
      a { color: #2563eb; }
      code { background: #f8fafc; padding: 2px 6px; border-radius: 4px; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
      const { useState } = React;

      function Logger({ name, children, ...rest }) {
        return (
          <div className="box" {...rest}>
            <strong>{name}</strong>
            <div>{children}</div>
          </div>
        );
      }

      function App() {
        const [log, setLog] = useState([]);

        const push = (label) => setLog((l) => [...l, label]);

        return (
          <div>
            <h2>20 — React Event System</h2>

            {/* Capture vs Bubble */}
            <Logger
              name="Outer"
              onClickCapture={() => push("Outer capture")}
              onClick={() => push("Outer bubble")}
            >
              <button
                onClickCapture={() => push("Button capture")}
                onClick={() => push("Button bubble")}
              >
                Click me
              </button>
            </Logger>

            {/* preventDefault & stopPropagation */}
            <div className="box">
              <a href="https://example.com"
                 onClick={(e) => { e.preventDefault(); push("preventDefault link"); }}>
                Link with preventDefault
              </a>
              <div
                onClick={() => push("Parent bubble")}
                style={{ padding: 8, marginTop: 12, border: "1px dashed #aaa" }}
              >
                <button onClick={(e) => { e.stopPropagation(); push("Child stopPropagation"); }}>
                  Child (stopPropagation)
                </button>
              </div>
            </div>

            <div className="box">
              <strong>Log:</strong>
              <pre>{log.join("\n")}</pre>
              <button onClick={() => setLog([])}>Clear</button>
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

## 7️⃣ Checklist nhanh

- [x] Biết `capture` vs `bubble` & `on*Capture`.  
- [x] Dùng `preventDefault()`/`stopPropagation()` có chủ đích.  
- [x] Không còn pooling: event dùng được trong async.  
- [x] Compose handler qua props thay vì “cứng hoá” logic.  
- [x] Đo đạc trước khi tối ưu hoá handler.

---

## 8️⃣ Đọc thêm
- React Docs — Events, SyntheticEvent  
- MDN — Event bubbling & capturing  
- Kent C. Dodds — Stop using isLoading booleans (một ví dụ hay về event + state)
