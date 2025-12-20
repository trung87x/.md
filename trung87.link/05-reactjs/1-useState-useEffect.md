# Ứng dụng 1: Quản lý trạng thái với Hooks (useState, useEffect)

```jsx
import React, { useState, useEffect } from "react";

const UserDashboard = () => {
  // 1. useState: Ghi nhớ dữ liệu người dùng nhập và trạng thái UI
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. useEffect: Tự động chạy khi Component được hiển thị (tải dữ liệu)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Giả lập gọi API lấy danh sách bài viết
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=5"
      );
      const result = await response.json();
      setData(result);
      setLoading(false);
    };

    fetchData();
  }, []); // [] đảm bảo chỉ chạy 1 lần duy nhất khi mở trang

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Dashboard</h1>

      {/* Xử lý Input với useState */}
      <input
        type="text"
        placeholder="Tìm kiếm bài viết..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "10px", width: "300px", marginBottom: "20px" }}
      />

      {/* Hiển thị trạng thái Loading */}
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <ul>
          {data
            .filter((item) => item.title.includes(searchTerm))
            .map((item) => (
              <li key={item.id} style={{ marginBottom: "10px" }}>
                <strong>{item.title}</strong>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default UserDashboard;
```

---

### Các lưu ý quan trọng:

- **`useState`**: Dùng để lưu trữ dữ liệu có thể thay đổi trên giao diện (biến đổi trạng thái).
- **`useEffect`**: Chuyên xử lý các tác vụ bên ngoài (Side Effects) như gọi API, thiết lập bộ đếm thời gian hoặc tương tác trực tiếp với DOM.
- **Dependency Array (`[]`)**: Nếu để trống, code bên trong `useEffect` chỉ chạy một lần duy nhất khi component vừa được "sinh ra".

**Bạn có muốn tôi cung cấp mã nguồn cho "Ứng dụng 2: Chia nhỏ và Tái sử dụng (Component Architecture)" không?**
