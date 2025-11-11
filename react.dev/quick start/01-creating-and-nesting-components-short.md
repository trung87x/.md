# 🧩 React Quick Start – Creating & Nesting Components

## 🧠 React Components

### 🌿 1. Khái niệm
- “Mảnh UI có logic riêng + giao diện riêng”
- Là **hàm JavaScript** → `return JSX`
- Dễ tái sử dụng, lồng ghép được

### 🧱 2. Cấu trúc một Component
```jsx
function MyButton() {
  return (
    <button>I'm a button</button>
  );
}
```
📌 Gồm:
- `function` → tạo component  
- `return()` → trả về JSX  
- JSX = markup (HTML) + logic (JS)

### 🧩 3. Lồng Component
```jsx
export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
```
- Component có thể chứa component khác  
- Tên viết hoa để React biết đó là component, không phải thẻ HTML  
  `<MyButton /> ≠ <button>`

### 🚀 4. Export / Import
- `export default` → component chính trong file  
- `import MyApp from './App'`

### 🧠 5. Ghi nhớ nhanh
✅ 1 component = function + JSX  
✅ JSX có 1 thẻ cha bao quanh  
✅ Tên component viết hoa  
✅ Component có thể lồng trong component khác  

### 📌 Gợi ý trình bày
```
🧠 React Components
 ┣ 🌿 Khái niệm
 ┣ 🧱 Cấu trúc
 ┣ 🧩 Lồng component
 ┣ 🚀 Export / Import
 ┗ 🧠 Ghi nhớ nhanh
```
