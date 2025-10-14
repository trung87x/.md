# T7-01 — Design System với Tailwind UI & React

> 🧱 Xây dựng Design System thống nhất giúp ứng dụng React có giao diện nhất quán, dễ mở rộng, và dễ bảo trì.

---

## 🎯 Mục tiêu
- Hiểu nguyên tắc “Design Token → Component → Pattern”.
- Biết cách tổ chức thư mục design-system trong dự án React.
- Dùng Tailwind UI để tạo và tái sử dụng component có variant.

---

## 🧩 Cấu trúc thư mục đề xuất

```
src/
├── design-system/
│   ├── tokens.css         # màu, font, spacing
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   └── Card.jsx
│   └── index.js
```

---

## 🧱 Ví dụ: Button Component

```jsx
// src/design-system/components/Button.jsx
import clsx from "clsx";

export function Button({ variant = "primary", size = "md", children, ...props }) {
  const base = "rounded font-semibold focus:outline-none focus:ring-2";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-400",
  };
  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };
  return (
    <button className={clsx(base, variants[variant], sizes[size])} {...props}>
      {children}
    </button>
  );
}
```

---

## 🎨 Design Token (ví dụ)

```css
:root {
  --color-primary: #2563eb;
  --radius: 0.5rem;
  --space-md: 1rem;
}
```

---

## 📘 Ghi nhớ
| Nguyên tắc | Ý nghĩa |
|-------------|---------|
| **Token trước, UI sau** | Đặt biến màu, font, spacing trước khi code component. |
| **Atomic & Composable** | Mỗi component nhỏ gọn và tái sử dụng được. |
| **Dark Mode** | Tailwind hỗ trợ `dark:` prefix rất mạnh. |

---

## ✅ Kết luận
Design System giúp bạn và nhóm dev có ngôn ngữ giao diện thống nhất.  
➡️ Tiếp theo: **Storybook Integration** để trực quan hóa component này.
