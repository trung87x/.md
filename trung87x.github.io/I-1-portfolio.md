# 📄 I-1: Portfolio Website (Vanilla + Tailwind CDN)

---

## I-1-1. Khởi tạo dự án

Ứng dụng khởi tạo bằng **Vite + vanilla JS**, sử dụng **Tailwind v4
CDN**.

### Lệnh khởi tạo

```bash
npm create vite@latest trung87x.github.io -- --template vanilla
cd trung87x.github.io
npm i
```

### Cấu trúc thư mục tối thiểu

    /index.html
    /src/style.css
    /src/main.js
    /public/favicon.svg

### /index.html (rút gọn)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Portfolio</title>
    <link rel="stylesheet" href="./src/style.css" />
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  </head>
  <body class="bg-gray-50 text-gray-900">
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

---

## I-1-2. Cấu trúc trang

Trang gồm 6 phần chính:

1.  **Header**: thanh điều hướng với tên + menu.
2.  **Hero**: section nổi bật giới thiệu bản thân.
3.  **About**: thông tin ngắn gọn.
4.  **Projects**: danh sách dự án (grid responsive).
5.  **Contact**: email liên hệ.
6.  **Footer**: thông tin bản quyền.

---

## I-1-3. Yêu cầu UI

- **Header**: `bg-white shadow p-6 flex justify-between`.
- **Hero**: `bg-blue-600 text-white text-center py-16`.
- **About**: `container mx-auto py-16 px-4`.
- **Projects**: `grid md:grid-cols-2 lg:grid-cols-3 gap-6`.
- **Contact**: `bg-gray-100 py-16 text-center`.
- **Footer**: `bg-gray-900 text-gray-300 py-4 text-center`.

---

## I-1-4. Responsive

- **Menu**: `flex space-x-4` → khoảng cách đều.
- **Projects**:
  - Mobile (mặc định): 1 cột
  - Tablet ≥768px: 2 cột
  - Desktop ≥1024px: 3 cột
- **Hero section**: text căn giữa, `py-16`.
- **Container**: `mx-auto` giữ nội dung gọn trong khung.

---

## I-1-5. Nội dung mẫu

### Header

```html
<header class="bg-white shadow p-6">
  <nav class="container mx-auto flex justify-between">
    <h1 class="text-2xl font-bold">Đinh Quang Trung</h1>
    <ul class="flex space-x-4">
      <li><a href="#about">Giới thiệu</a></li>
      <li><a href="#projects">Dự án</a></li>
      <li><a href="#contact">Liên hệ</a></li>
    </ul>
  </nav>
</header>
```

### Hero

```html
<section class="text-center py-16 bg-blue-600 text-white">
  <h2 class="text-4xl font-bold mb-2">Xin chào 👋 Tôi là Developer</h2>
  <p>Xây dựng web hiện đại với HTML, CSS, JS, Tailwind.</p>
</section>
```

### Projects

```html
<section id="projects" class="container mx-auto py-16 px-4">
  <h3 class="text-2xl font-semibold mb-8">Dự án</h3>
  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    <article class="bg-white shadow p-4 rounded">
      <h4 class="font-bold">Portfolio Website</h4>
      <p class="text-gray-600">Trang web giới thiệu cá nhân.</p>
    </article>
    <article class="bg-white shadow p-4 rounded">
      <h4 class="font-bold">Todo App</h4>
      <p class="text-gray-600">Ứng dụng quản lý công việc.</p>
    </article>
    <article class="bg-white shadow p-4 rounded">
      <h4 class="font-bold">Blog cá nhân</h4>
      <p class="text-gray-600">Viết bài, chia sẻ kiến thức.</p>
    </article>
  </div>
</section>
```

---

## I-1-6. JS mở rộng

File `/src/main.js` để thêm hành vi:

```js
// Ví dụ: Dark mode toggle
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.createElement("button");
  btn.textContent = "🌙 Dark Mode";
  btn.className =
    "fixed bottom-4 right-4 px-3 py-2 rounded bg-gray-800 text-white";
  document.body.appendChild(btn);

  btn.onclick = () => {
    document.documentElement.classList.toggle("dark");
  };
});
```

---

## I-1-7. Cải tiến Accessibility

- Thêm `aria-label` cho `<nav>`.
- Thêm `id="main"` vào `<main>` để hỗ trợ skip link.
- Link trong footer nên có `rel="noopener noreferrer"` nếu mở tab mới.

---

## I-1-8. Build & Deploy

- Chạy local:

  ```bash
  npm run dev
  ```

- Build static:

  ```bash
  npm run build
  npm run preview
  ```

- Deploy GitHub Pages hoặc Vercel.
