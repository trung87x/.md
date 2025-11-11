# 🧩 React Quick Start – Displaying Data

## 💡 Hiển thị dữ liệu trong JSX

### 🌿 1. Dùng {} để nhúng JavaScript
```jsx
<h1>{user.name}</h1>
```
- `{}` cho phép viết **biểu thức JS** trong JSX
- Không dùng được câu lệnh (`if`, `for`), chỉ dùng **biểu thức trả giá trị**

### 🧱 2. Truyền dữ liệu vào thuộc tính
```jsx
<img
  className="avatar"
  src={user.imageUrl}
  alt={"Photo of " + user.name}
/>
```
- `className="avatar"` → chuỗi cố định  
- `src={user.imageUrl}` → lấy giá trị từ biến JS

### 🧩 3. Kết hợp logic + dữ liệu
```jsx
const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90
};

export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
    </>
  );
}
```
📌 `style={{}}` là **object JS**, có thể dùng biến để điều chỉnh giao diện.

### 🚀 4. Biểu thức JS trong JSX
Có thể dùng:
- Toán học: `{price * quantity}`  
- Chuỗi: `{user.name + "!"}`  
- Logic: `{isLoggedIn && "Welcome back!"}`  
- Gọi hàm: `{formatDate(date)}`

### 🧠 5. Ghi nhớ nhanh
✅ `{}` = chèn giá trị JS vào JSX  
✅ Chỉ nhận **biểu thức**, không nhận **câu lệnh**  
✅ Dùng `{}` cả trong **thuộc tính**  
✅ Kết hợp dữ liệu và style dễ dàng  
✅ JSX = giao diện điều khiển bằng dữ liệu

### 📌 Sơ đồ tư duy
```
💡 Displaying Data
 ┣ 🌿 Nhúng {}
 ┣ 🧱 Thuộc tính JSX
 ┣ 🧩 Logic + Dữ liệu
 ┣ 🚀 Biểu thức trong JSX
 ┗ 🧠 Ghi nhớ nhanh
```
