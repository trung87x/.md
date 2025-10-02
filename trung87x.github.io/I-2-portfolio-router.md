# 📄 I-2: Thêm 3 trang (About, Projects, Contact) với Hash Router

---

## I-2-1. Mục tiêu

- Biến menu:

  ```html
  <li><a href="#about">Giới thiệu</a></li>
  <li><a href="#projects">Dự án</a></li>
  <li><a href="#contact">Liên hệ</a></li>
  ```

  thành **điều hướng SPA**: `#/about`, `#/projects`, `#/contact`.

- Không reload trang, chỉ thay đổi nội dung `<main>`.

- Có **route mặc định** (home), **404 fallback**, **active link**.

---

## I-2-2. Cấu trúc file

    /index.html
    /src/main.js
    /src/router.js         ← NEW
    /src/views/home.js     ← NEW
    /src/views/about.js    ← NEW
    /src/views/projects.js ← NEW
    /src/views/contact.js  ← NEW
    /src/style.css

---

## I-2-3. Cập nhật `index.html` (đổi href và thêm aria)

```html
<header class="bg-white shadow p-6">
  <nav class="container mx-auto flex justify-between" aria-label="Main">
    <h1 class="text-2xl font-bold">Đinh Quang Trung</h1>
    <ul class="flex space-x-4">
      <li><a class="navlink" href="#/">Trang chủ</a></li>
      <li><a class="navlink" href="#/about">Giới thiệu</a></li>
      <li><a class="navlink" href="#/projects">Dự án</a></li>
      <li><a class="navlink" href="#/contact">Liên hệ</a></li>
    </ul>
  </nav>
</header>

<main id="app-main"></main>
```

---

## I-2-4. Router đơn giản `/src/router.js`

```js
// /src/router.js
import { HomeView } from "./views/home.js";
import { AboutView } from "./views/about.js";
import { ProjectsView } from "./views/projects.js";
import { ContactView } from "./views/contact.js";

function parseHash() {
  const h = location.hash || "#/";
  const path = h.slice(1) || "/";
  return path;
}

function setActiveLink(path) {
  document.querySelectorAll(".navlink").forEach((a) => {
    const isActive = a.getAttribute("href").slice(1) === path;
    a.classList.toggle("text-blue-600", isActive);
    a.classList.toggle("font-semibold", isActive);
    a.classList.toggle("underline", isActive);
  });
}

export function initRouter() {
  const mount = document.getElementById("app-main");

  async function render() {
    const path = parseHash();
    setActiveLink(path);

    const routes = {
      "/": HomeView,
      "/about": AboutView,
      "/projects": ProjectsView,
      "/contact": ContactView,
    };

    const View = routes[path];
    if (!View) {
      mount.innerHTML = `
        <section class="container mx-auto py-16 px-4">
          <h2 class="text-2xl font-semibold mb-2">404</h2>
          <p class="text-gray-600">Trang bạn tìm không tồn tại.</p>
          <a class="text-blue-600 underline" href="#/">Quay về trang chủ</a>
        </section>`;
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    mount.innerHTML = await View();
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  window.addEventListener("hashchange", render);
  if (!location.hash) location.hash = "#/";
  render();
}
```

---

## I-2-5. Khởi tạo router trong `src/main.js`

```js
// /src/main.js
import { initRouter } from "./router.js";

document.addEventListener("DOMContentLoaded", () => {
  initRouter();
});
```

---

## I-2-6. View: Trang chủ `src/views/home.js`

```js
// /src/views/home.js
export function HomeView() {
  return `
  <!-- Hero -->
  <section class="text-center py-16 bg-blue-600 text-white">
    <h2 class="text-4xl font-bold mb-2">Xin chào 👋 Tôi là Developer</h2>
    <p>Xây dựng web hiện đại với HTML, CSS, JS, Tailwind.</p>
  </section>

  <!-- About -->
  <section class="container mx-auto py-16 px-4">
    <h3 class="text-2xl font-semibold mb-4">Giới thiệu</h3>
    <p>Tôi yêu thích lập trình web và chia sẻ kiến thức về frontend.</p>
  </section>

  <!-- Projects -->
  <section class="container mx-auto py-16 px-4">
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

  <!-- Contact -->
  <section class="bg-gray-100 py-16 text-center">
    <h3 class="text-2xl font-semibold mb-4">Liên hệ</h3>
    <p>
      Email:
      <a href="mailto:trung.dinhquang@hotmail.com" class="text-blue-600">
        trung.dinhquang@hotmail.com
      </a>
    </p>
  </section>
  `;
}
```

---

## I-2-7. View: About `src/views/about.js`

```js
// /src/views/about.js
export function AboutView() {
  return `
  <section class="container mx-auto py-16 px-4">
    <h2 class="text-3xl font-bold mb-4">Giới thiệu</h2>
    <p class="text-gray-700">
      Tôi là Trung — Frontend Developer. Tôi tập trung vào HTML, CSS, JS, Tailwind và xây dựng những UI gọn sạch, hiệu năng tốt.
    </p>
    <ul class="list-disc pl-6 mt-4 text-gray-700 space-y-2">
      <li>Yêu thích Tailwind v4 và tư duy utility-first.</li>
      <li>Quan tâm đến DX: cấu trúc dự án rõ ràng, tài liệu tốt.</li>
      <li>Thích chia sẻ kiến thức qua các demo nhỏ và blog.</li>
    </ul>
  </section>`;
}
```

---

## I-2-8. View: Projects `src/views/projects.js`

```js
// /src/views/projects.js
export function ProjectsView() {
  return `
  <section class="container mx-auto py-16 px-4">
    <h2 class="text-3xl font-bold mb-6">Dự án</h2>
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
  </section>`;
}
```

---

## I-2-9. View: Contact `src/views/contact.js`

```js
// /src/views/contact.js
export function ContactView() {
  return `
  <section class="bg-gray-100 py-16">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-3xl font-bold mb-4">Liên hệ</h2>
      <p class="mb-2">Bạn có thể email cho tôi tại:</p>
      <p>
        <a class="text-blue-600 underline" href="mailto:trung.dinhquang@hotmail.com">
          trung.dinhquang@hotmail.com
        </a>
      </p>
    </div>
  </section>`;
}
```

---

## I-2-10. Style "active link" (tùy chọn)

```css
/* /src/style.css */
.navlink {
  transition: color 0.15s ease, text-decoration-color 0.15s ease;
}
```

---

## I-2-11. Ghi chú & mở rộng

- **SEO**: SPA hash không thân thiện SEO, nhưng đủ cho portfolio cá
  nhân.
- **Projects JSON**: dời danh sách dự án sang
  `/src/data/projects.json`, fetch và render.
- **Smooth Scroll**: có thể animate scroll.

---

## I-2-12. Kiểm tra nhanh

1.  `npm run dev`
2.  Click **Trang chủ / Giới thiệu / Dự án / Liên hệ** → nội dung thay
    đổi trong `<main>` mà không reload.
3.  Link active được highlight.

---
