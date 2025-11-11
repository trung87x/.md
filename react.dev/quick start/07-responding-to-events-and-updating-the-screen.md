# 🧩 React Quick Start – Responding to Events & Updating the Screen

## ⚡ Sự kiện & Trạng thái (Event + State)

### 🌿 1. Xử lý sự kiện
```jsx
function MyButton() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```
📌 `onClick={handleClick}` → truyền hàm (không gọi trực tiếp).  
React sẽ tự gọi khi người dùng tương tác.

### 🧱 2. Thêm state vào component
```jsx
import { useState } from 'react';

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}
```
📌 `useState()` trả về `[biến, hàm cập nhật]`  
Mỗi lần `setCount()` → React render lại component.

### 🚀 3. Nhiều component = state riêng biệt
```jsx
export default function MyApp() {
  return (
    <div>
      <h1>Counters that update separately</h1>
      <MyButton />
      <MyButton />
    </div>
  );
}
```
- Mỗi `MyButton` có state độc lập.  
- React tự quản lý “bộ nhớ tạm” cho từng component.

### 🧩 4. Chia sẻ state giữa component (Lifting state up)
```jsx
import { useState } from 'react';

export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}

function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}
```
📌 Truyền state + hàm qua `props` để **chia sẻ dữ liệu**.

### 💡 5. Ghi nhớ nhanh
✅ `onClick` = truyền hàm, không gọi trực tiếp  
✅ `useState()` = tạo state nội bộ  
✅ Cập nhật state → React render lại  
✅ Mỗi component có state riêng  
✅ Dùng props để chia sẻ state (lifting state up)

### 📌 Sơ đồ tư duy
```
⚡ Event & State
 ┣ 🌿 Xử lý sự kiện
 ┣ 🧱 Thêm state
 ┣ 🚀 Nhiều component
 ┣ 🧩 Chia sẻ state
 ┗ 💡 Ghi nhớ nhanh
```
