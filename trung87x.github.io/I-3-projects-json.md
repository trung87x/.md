# 📄 I-3: Projects JSON (load động)

---

## I-3-1. Mục tiêu

- Thay vì hard-code dự án trong HTML/JS, chuyển danh sách sang file JSON.
- Sử dụng **fetch** để nạp dữ liệu từ `/src/data/projects.json`.
- Render grid project tự động, dễ bảo trì, mở rộng.

---

## I-3-2. Cấu trúc file

```
/src/data/projects.json   ← NEW
/src/views/projects.js    ← cập nhật để fetch JSON
```

---

## I-3-3. File dữ liệu `/src/data/projects.json`

```json
[
  {
    "title": "Portfolio Website",
    "desc": "Trang web giới thiệu cá nhân.",
    "link": "https://trung87x.github.io/portfolio",
    "tags": ["personal", "frontend"]
  },
  {
    "title": "Todo App",
    "desc": "Ứng dụng quản lý công việc.",
    "link": "https://trung87x.github.io/todo",
    "tags": ["app", "productivity"]
  },
  {
    "title": "Blog cá nhân",
    "desc": "Viết bài, chia sẻ kiến thức.",
    "link": "https://trung87x.github.io/blog",
    "tags": ["blog", "sharing"]
  }
]
```

---

## I-3-4. View Projects `/src/views/projects.js`

```js
// /src/views/projects.js
import projects from "../data/projects.json";

export async function ProjectsView() {
  // const res = await fetch("/src/data/projects.json");
  // const projects = await res.json();

  return `
  <section class="container mx-auto py-16 px-4">
    <h2 class="text-3xl font-bold mb-6">Dự án</h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${projects
        .map(
          (p) => `
        <article class="bg-white shadow p-4 rounded">
          <h4 class="font-bold">${p.title}</h4>
          <p class="text-gray-600">${p.desc}</p>
          ${
            p.link
              ? `<a href="${p.link}" target="_blank" rel="noopener noreferrer"
                   class="inline-block mt-2 text-blue-600 underline text-sm">Xem chi tiết</a>`
              : ""
          }
          ${
            p.tags && p.tags.length
              ? `<p class="text-xs text-gray-500 mt-1">#${p.tags.join(
                  " #"
                )}</p>`
              : ""
          }
        </article>`
        )
        .join("")}
    </div>
  </section>`;
}
```

---

## I-3-5. Ưu điểm

- Dễ mở rộng: chỉ cần thêm JSON, không chỉnh code.
- Dữ liệu có thể tái sử dụng cho blog, CV, API.
- Có thể tách `projects.json` ra `/public/` nếu muốn cache CDN.

---

## I-3-6. Mở rộng

- **Filter** theo tag (frontend, app, blog).
- **Sort** theo ngày cập nhật (thêm `date` trong JSON).
- **Lazy loading** nếu danh sách dài.
- Sau này có thể chuyển sang fetch từ **API** (Sanity, Strapi, Notion).

---
