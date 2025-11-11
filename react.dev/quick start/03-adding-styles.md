# 🧩 React Quick Start – Adding Styles

## 🎨 Thêm style trong React

### 🌿 1. className
- Dùng `className` thay cho `class`
```jsx
<img className="avatar" />
```
- CSS riêng:
```css
.avatar {
  border-radius: 50%;
  border: 2px solid #ccc;
}
```

### 🧱 2. Inline style
- Dùng cú pháp object JS: `style={{}}`
```jsx
<img
  style={{
    width: 120,
    height: 120,
    borderRadius: '50%'
  }}
/>
```
📌 Viết key theo **camelCase** (`backgroundColor`, `fontSize`)

### 🧩 3. Cách tổ chức CSS
- Dự án nhỏ → file `.css` đơn giản
- Dự án lớn → tách thành nhiều module
- Có thể dùng thư viện: **Tailwind**, **CSS Modules**, **Styled Components**

### 🚀 4. Kết hợp logic + style
```jsx
const isOnline = true;

return (
  <div
    className={isOnline ? "online" : "offline"}
    style={{ color: isOnline ? "green" : "gray" }}
  >
    User status
  </div>
);
```

### 🧠 5. Ghi nhớ nhanh
✅ `className` = class trong JSX  
✅ `style={{}}` = object JS, key camelCase  
✅ Có thể kết hợp logic để đổi style  
✅ React **không ép cách quản lý CSS**  
✅ Chỉ là **JS điều khiển giao diện**

### 📌 Sơ đồ tư duy
```
🎨 Adding Styles
 ┣ 🌿 className
 ┣ 🧱 Inline style
 ┣ 🧩 Tổ chức CSS
 ┣ 🚀 Kết hợp logic
 ┗ 🧠 Ghi nhớ nhanh
```
