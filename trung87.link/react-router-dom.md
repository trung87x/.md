Để quản lý hàng trăm trang mà không phải viết hàng trăm dòng code `Route` thủ công, bạn cần chuyển từ cách làm "thủ công" sang "tự động hóa".

Dưới đây là quy trình từ cơ bản đến tối ưu nhất cho project của bạn:

### Bước 1: Cài đặt (Bắt buộc)

Mở terminal và chạy lệnh:

```bash
npm install react-router-dom

```

---

### Bước 2: Cách làm cho số lượng trang ít (Thủ công)

Nếu bạn chỉ có vài trang chính (Home, About, Contact), hãy viết trực tiếp trong `App.jsx`:

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

### Bước 3: Cách tối ưu cho hàng trăm trang (Tự động hóa)

Khi bạn có hàng trăm component trong các thư mục như `marketing/sections/heroes/`, đừng tạo Route cho từng file. Hãy dùng 2 kỹ thuật sau:

#### Kỹ thuật 1: Route Động (Dynamic Routing)

Nếu các trang có cấu trúc giống nhau (chỉ khác nội dung), hãy dùng 1 file template duy nhất.

```jsx
// App.jsx
// Chỉ cần 1 dòng duy nhất cho tất cả các loại section (heroes, faq, footers...)
<Route path="/marketing/:category" element={<SectionGallery />} />
```

Trong file `SectionGallery.jsx`, bạn dùng `useParams` để lấy tên thư mục (ví dụ: `heroes`) và tự động hiển thị các component bên trong.

#### Kỹ thuật 2: Tự động quét thư mục (Vite Magic)

Đây là cách "xịn" nhất. Bạn dùng tính năng `import.meta.glob` của Vite để tự động đăng ký mọi file `.jsx` trong thư mục `pages` thành một Route.

```jsx
// src/routes/autoRoutes.jsx
const modules = import.meta.glob("../pages/**/*.jsx"); // Quét toàn bộ file trong pages

const routes = Object.keys(modules).map((path) => {
  const name = path.replace("../pages/", "").replace(".jsx", "");
  return {
    path: name === "index" ? "/" : `/${name.toLowerCase()}`,
    component: modules[path],
  };
});
```

---

### Bước 4: Tối ưu hiệu năng với Lazy Loading (Bắt buộc khi có 100+ trang)

Nếu bạn load 100 trang cùng lúc, trang web sẽ rất nặng. Hãy dùng `React.lazy` để khi người dùng nhấn vào trang nào thì trình duyệt mới tải code của trang đó.

```jsx
import React, { Suspense, lazy } from "react";

// Tự động load trang khi cần thiết
const DynamicPage = lazy(() => import("./pages/marketing/sections/heroes"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Đang tải...</div>}>
        <Routes>
          <Route path="/marketing/heroes" element={<DynamicPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

---

### Tóm lại:

1. **Ít trang:** Viết `Route` thủ công trong `App.jsx`.
2. **Nhiều trang giống nhau:** Dùng Route động `:category` để dùng chung 1 template.
3. **Hàng trăm trang khác nhau:** Dùng `import.meta.glob` để Vite tự động tạo Route theo tên file.
4. **Luôn dùng `Suspense` và `lazy`:** Để web chạy nhanh, không bị lag khi có quá nhiều trang.

**Bạn có muốn mình gửi đoạn code hoàn chỉnh để "quét sạch" thư mục `marketing/sections/` và tự động tạo Menu điều hướng không?**
