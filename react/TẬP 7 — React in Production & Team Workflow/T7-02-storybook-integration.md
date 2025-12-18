# T7-02 — Storybook Integration

> 🧩 Storybook giúp bạn xem, test và chia sẻ component React trong môi trường tách biệt.

---

## 🎯 Mục tiêu
- Cài và cấu hình Storybook trong dự án React/Vite.
- Viết story cho từng component trong design-system.
- Thêm addon: controls, docs, dark mode.

---

## ⚙️ Cài đặt

```bash
# Với Vite project
npx storybook@latest init
npm run storybook
```

---

## 📄 Ví dụ: Button.stories.jsx

```jsx
import { Button } from "../Button";

export default {
  title: "DesignSystem/Button",
  component: Button,
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};

export const Primary = (args) => <Button {...args}>Primary</Button>;
Primary.args = { variant: "primary", size: "md" };

export const Secondary = (args) => <Button {...args}>Secondary</Button>;
```

---

## 🔧 Addon đề xuất

| Addon | Công dụng |
|-------|------------|
| `@storybook/addon-controls` | Chỉnh props trực tiếp trong UI. |
| `@storybook/addon-docs` | Tạo tài liệu tự động. |
| `storybook-dark-mode` | Xem preview ở dark/light mode. |

---

## 🧠 Mẹo
- Tạo story cho từng **state** (hover, disabled, loading).  
- Kết hợp với CI/CD (Chromatic, Vercel preview).  
- Dùng Storybook làm tài liệu nội bộ cho team thiết kế.

---

## ✅ Kết luận
Storybook là công cụ “nhìn thấy được” kiến trúc component của bạn — cực kỳ hữu ích khi build design system hoặc kiểm thử UI theo trạng thái.
