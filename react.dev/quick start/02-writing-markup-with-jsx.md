# 🧩 React Quick Start – Writing Markup with JSX

## 🧠 JSX (JavaScript XML)

### 🌿 1. Khái niệm
- Cú pháp cho phép viết **HTML trong JavaScript**
- Giúp UI logic + markup nằm cùng nhau
- Mọi công cụ React đều hỗ trợ JSX mặc định

### 🧱 2. Quy tắc JSX
✅ JSX **phải có 1 thẻ cha bao quanh**
```jsx
function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>Hello there.<br />How do you do?</p>
    </>
  );
}
```
✅ Mọi thẻ phải **đóng đầy đủ** (`<br />`, `<img />`)  
✅ Dùng **className** thay cho `class`

### 🎨 3. Thêm style
```jsx
<img className="avatar" />
```
📌 Trong CSS:
```css
.avatar {
  border-radius: 50%;
}
```
Hoặc style trực tiếp:
```jsx
<img style={{ width: 100, height: 100 }} />
```

### 🧩 4. Hiển thị dữ liệu trong JSX
- Dùng `{}` để nhúng biến / biểu thức JS  
```jsx
<h1>{user.name}</h1>
<img src={user.imageUrl} alt={"Photo of " + user.name} />
```
- Có thể dùng logic JS bên trong `{}`  
  → `{user.age + " tuổi"}` hoặc `{items.length > 0 && "Có sản phẩm"}`

### 🧠 5. Ghi nhớ nhanh
✅ JSX = HTML + JS logic  
✅ Phải có **1 thẻ cha**  
✅ Dùng `{}` để nhúng giá trị JS  
✅ `className` và `style={{}}` thay cho `class` & `style` HTML  
✅ JSX chỉ là **cú pháp tiện lợi**, React sẽ biên dịch về `React.createElement()`

### 📌 Sơ đồ tư duy
```
🧠 JSX
 ┣ 🌿 Khái niệm
 ┣ 🧱 Quy tắc
 ┣ 🎨 Style
 ┣ 🧩 Hiển thị dữ liệu
 ┗ 🧠 Ghi nhớ nhanh
```
