# 🧩 React Quick Start – Rendering Lists

## 📋 Hiển thị danh sách trong React

### 🌿 1. Khái niệm
- React dùng **các hàm mảng JS** (như `.map()`) để tạo nhiều phần tử JSX.
- Mỗi phần tử cần có **key duy nhất** để React theo dõi thay đổi.

### 🧱 2. Ví dụ cơ bản
```jsx
const products = [
  { title: 'Cabbage', id: 1 },
  { title: 'Garlic', id: 2 },
  { title: 'Apple', id: 3 },
];

export default function ShoppingList() {
  const listItems = products.map(product =>
    <li key={product.id}>{product.title}</li>
  );

  return <ul>{listItems}</ul>;
}
```

### 🧩 3. Key là gì?
- `key` giúp React **biết phần tử nào thay đổi, thêm, hoặc xóa**.
- Key nên lấy từ **dữ liệu thực tế** (id từ DB, không nên dùng index).

### 🚀 4. Kết hợp logic trong danh sách
```jsx
const products = [
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3 },
];

const listItems = products.map(product =>
  <li
    key={product.id}
    style={{ color: product.isFruit ? 'magenta' : 'darkgreen' }}
  >
    {product.title}
  </li>
);

return <ul>{listItems}</ul>;
```

### 💡 5. Lưu ý
✅ Dùng `.map()` để tạo JSX động  
✅ Mỗi item cần `key` duy nhất  
✅ Có thể kết hợp điều kiện, style, logic JS  
✅ React chỉ re-render phần tử có key thay đổi

### 📌 Sơ đồ tư duy
```
📋 Rendering Lists
 ┣ 🌿 Khái niệm
 ┣ 🧱 Ví dụ cơ bản
 ┣ 🧩 Key là gì?
 ┣ 🚀 Logic trong danh sách
 ┗ 💡 Ghi nhớ nhanh
```
