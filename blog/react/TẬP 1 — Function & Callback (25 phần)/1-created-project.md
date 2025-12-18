# Create Project (React 18) — Hướng dẫn nhanh

> Mục tiêu: chạy **Hello React** trong 3 cách phổ biến.  
> Bạn chọn **một** trong 3 cách bên dưới (A/B/C). Đừng trộn lẫn.

---

## 📁 Cấu trúc thư mục đề xuất

```
my-react-play/
├─ index.html
├─ src/
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ style.css
└─ package.json        (chỉ dùng ở C — Vite)
```

> File `style.css` là tùy chọn, tạo nếu cần.

---

## ✅ A) **CDN + Babel in-browser** (dành cho demo nhanh)

**Ưu**: Nhanh, 1 file HTML cũng chạy.  
**Nhược**: Chậm hơn, không thích hợp cho production.

**index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>React CDN + Babel</title>
    <link rel="stylesheet" href="src/style.css" />
    <!-- React UMD + Babel (biên dịch JSX trên trình duyệt) -->
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>

    <!-- Cách 1: viết JSX ngay trong HTML -->
    <script type="text/babel">
      function App() {
        return (
          <div className="App">
            <h1>Hello React.</h1>
            <h2>Start editing to see some magic happen!</h2>
          </div>
        );
      }
      const root = ReactDOM.createRoot(document.getElementById("root"));
      root.render(<App />);
      console.log("Hello console");
    </script>

    <!-- Cách 2: tách file (tuỳ chọn) -->
    <!-- <script type="text/babel" data-type="module" src="src/index.jsx"></script> -->
  </body>
</html>
```

> Nếu tách file, mỗi file JSX bạn **phải** dùng `type="text/babel"` (hoặc cấu hình `@babel/standalone` nâng cao).  
> **Không** dùng `import React from 'react'` khi bạn đang xài bản UMD (React/ReactDOM đã có sẵn ở global).

---

## ✅ B) **ES Modules qua CDN ESM** (không cần bundler, vẫn dùng `import`)

**Ưu**: Viết `import` chuẩn; không cần cài đặt.  
**Nhược**: Nhiều request mạng; vẫn không tối ưu như bundler.

**index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>React ESM CDN</title>
    <link rel="stylesheet" href="src/style.css" />
  </head>
  <body>
    <div id="root"></div>

    <!-- Dùng ESM CDN (esm.sh hoặc unpkg + ?module) -->
    <script type="module">
      import React from "https://esm.sh/react@18";
      import { createRoot } from "https://esm.sh/react-dom@18/client";
      import App from "./src/App.jsx";

      createRoot(document.getElementById("root")).render(
        React.createElement(App)
      );
      console.log("Hello console");
    </script>
  </body>
</html>
```

**src/App.jsx**

```jsx
export default function App() {
  return (
    <div className="App">
      <h1>Hello React.</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
```

> Lưu ý:
>
> - File JSX **được import** từ `<script type="module">` nên trình duyệt **không tự hiểu JSX**.  
>   Bạn có 2 cách:
>   1. Đổi `.jsx` → `.js` và **không dùng JSX**: dùng `React.createElement`.
>   2. Dùng dịch vụ ESM hỗ trợ JSX (vd: `https://esm.sh/react@18?dev&jsx=automatic`) hoặc precompile.
> - Cách an toàn: viết `App.js` dạng `createElement` nếu không dùng bundler.

**Biến thể “không JSX” cho chắc ăn**

**src/App.js**

```js
export default function App() {
  return React.createElement(
    "div",
    { className: "App" },
    React.createElement("h1", null, "Hello React."),
    React.createElement("h2", null, "Start editing to see some magic happen!")
  );
}
```

Và ở `index.html` thay import `./src/App.jsx` thành `./src/App.js`.

---

## ✅ C) **Vite (Khuyến nghị)**

**Ưu**: Nhanh, hỗ trợ JSX/TSX, HMR, build production.  
**Nhược**: Cần cài Node.js.

**B1. Tạo dự án** (Node 18+)

```bash
npm create vite@latest my-react-play -- --template react
cd my-react-play
npm install
npm run dev
```

**B2. Sửa file theo mẫu của bạn**

**src/App.jsx**

```jsx
export function App() {
  return (
    <div className="App">
      <h1>Hello React.</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

export default App;
```

**src/main.jsx** (tương đương `src/index.jsx` của bạn)

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import "./style.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

**package.json** (script chính)

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## 🧩 MẪU `style.css` (tùy chọn)

```css
html,
body,
#root {
  height: 100%;
  margin: 0;
}
body {
  font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
}
.App {
  padding: 24px;
}
h1 {
  margin: 0 0 8px;
  font-size: 28px;
}
h2 {
  margin: 0;
  font-weight: 500;
  color: #555;
}
```

---

## 🛠️ Sửa **snippet của bạn** (tránh trộn lẫn)

Bạn đang dùng **CDN UMD** _và_ `import` trong `src/index.jsx` → **mâu thuẫn**. Hãy chọn **một** trong hai:

### Cách sửa theo **A — CDN + Babel**

- Giữ 3 CDN script (React, ReactDOM, Babel).
- **Bỏ** `import` trong `src/index.jsx`. Dùng `<script type="text/babel">` ngay trong HTML (hoặc mỗi file đều `type="text/babel"`).

### Cách sửa theo **B — ESM**

- **Bỏ** Babel & UMD. Dùng `<script type="module">` và import từ `https://esm.sh/…`.
- Nếu không cấu hình JSX, hãy viết `App.js` dạng `createElement`.

### Cách sửa theo **C — Vite (khuyên dùng)**

- Dùng lệnh `npm create vite@latest`, rồi đặt code `App.jsx` và `main.jsx` như phần C.

---

## 🧯 Lỗi hay gặp

1. **“Unexpected token `<` / JSX không hiểu”**  
   → Bạn đang chạy JSX mà **không có Babel/bundler**. Dùng **A** (Babel) hoặc **C** (Vite).

2. **“Failed to load module / MIME type text/html”**  
   → Đường dẫn `import` sai (dẫn tới HTML thay vì JS). Kiểm tra lại **đúng file và đuôi**.

3. **React 18: dùng `createRoot` thay vì `ReactDOM.render`**  
   → Chuẩn: `const root = ReactDOM.createRoot(el); root.render(<App />)`.

4. **Cross-origin khi mở file trực tiếp (file://)**  
   → Chạy bằng server dev (Vite) hoặc `npx serve`, `python -m http.server`, v.v.

---

## 📌 TL;DR — Bản đúng tối thiểu theo **Vite**

- `index.html` trỏ tới `/src/main.jsx` với `type="module"`
- `src/main.jsx` import React, ReactDOM, App và render **createRoot**
- `src/App.jsx` trả về JSX như bạn viết

Bạn chỉ cần chạy:

```bash
npm create vite@latest my-react-play -- --template react
cd my-react-play && npm i && npm run dev
```
