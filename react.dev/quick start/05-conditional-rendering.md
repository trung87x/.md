# 🧩 React Quick Start – Conditional Rendering

## ⚖️ Điều kiện hiển thị trong React

### 🌿 1. Khái niệm
- React **không có cú pháp riêng** cho điều kiện.
- Dùng **logic JavaScript**: `if`, `? :`, `&&` trong JSX.

### 🧱 2. Dùng if...else ngoài JSX
```jsx
let content;
if (isLoggedIn) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />;
}

return <div>{content}</div>;
```

### 🧩 3. Toán tử 3 ngôi ? :
```jsx
<div>
  {isLoggedIn ? <AdminPanel /> : <LoginForm />}
</div>
```
📌 Gọn hơn, dễ dùng trong JSX.

### 🚀 4. Toán tử && khi không cần else
```jsx
<div>
  {isLoggedIn && <AdminPanel />}
</div>
```
- Nếu `isLoggedIn` là **true** → hiển thị AdminPanel  
- Nếu **false** → không render gì cả

### 💡 5. Dùng điều kiện trong thuộc tính
```jsx
<img
  className={isActive ? "active" : "inactive"}
  alt={isOnline && "Online user"}
/>
```

### 🧠 6. Ghi nhớ nhanh
✅ React dùng logic JS, không cú pháp riêng  
✅ `if` ngoài JSX, `? :` và `&&` trong JSX  
✅ Có thể dùng điều kiện trong thuộc tính  
✅ Luôn đảm bảo trả về **1 JSX hợp lệ**  

### 📌 Sơ đồ tư duy
```
⚖️ Conditional Rendering
 ┣ 🌿 Khái niệm
 ┣ 🧱 if...else
 ┣ 🧩 Toán tử ? :
 ┣ 🚀 Toán tử &&
 ┣ 💡 Trong thuộc tính
 ┗ 🧠 Ghi nhớ nhanh
```
