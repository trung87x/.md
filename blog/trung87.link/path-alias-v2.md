Để chuyển từ việc dùng thẻ `<link>` sang dùng lệnh `import` (đúng chuẩn Vite), bạn cần sử dụng một kỹ thuật của Vite gọi là **Query Suffixes** (`?inline`).

Dưới đây là cách sửa file của bạn để vừa gọn, vừa chuyên nghiệp, lại không lo lỗi đường dẫn khi build:

### 1. Cách sửa code

Bạn hãy thay đổi phần đầu file và biến `head` như sau:

```jsx
// 1. Import nội dung file CSS dưới dạng chuỗi (string) bằng ?inline
import styleContent from "@/styles/style-guide.css?inline";

const PreviewWrapper = ({ children }) => {
  const head = (
    <>
      {/* 2. Đưa nội dung CSS trực tiếp vào thẻ <style> */}
      <style>{styleContent}</style>

      {/* 3. Với Tailwind CDN, bạn vẫn nên để thẻ script để nó xử lý runtime trong iframe */}
      <script src="https://cdn.tailwindcss.com"></script>
    </>
  );

  return <Frame head={head}>{children}</Frame>;
};
```

---

### 2. Tại sao làm cách này lại tốt hơn?

1. **F12 hoạt động hoàn hảo:** Vì bạn dùng `import ... from "@/..."`, bạn có thể nhấn **F12** hoặc **Ctrl + Click** vào đường dẫn để nhảy thẳng đến file CSS.
2. **Vite quản lý tốt hơn:** Khi bạn chạy `npm run build`, Vite sẽ tự động tối ưu hóa đoạn CSS này. Bạn không lo việc file `/src/styles/style-guide.css` bị mất hay sai đường dẫn trên server thật.
3. **Tốc độ:** CSS được "bơm" trực tiếp vào Iframe ngay khi component render, không cần trình duyệt phải gửi thêm một yêu cầu HTTP để tải file `.css` về nữa.

### 3. Lưu ý về Tailwind

Dòng `<script src="https://cdn.tailwindcss.com"></script>` trong Iframe là cách **nhanh nhất** để Tailwind hoạt động bên trong đó.

- **Nếu bạn muốn dùng Tailwind "xịn" (đã build sẵn):** Bạn có thể import file CSS chính của dự án (file có chứa `@tailwind base;...`) bằng cách `?inline` tương tự như trên.
- **Tuy nhiên:** Dùng CDN trong `PreviewWrapper` cho UI Kit thường là lựa chọn thông minh vì nó giúp bạn render các class mới mà không cần đợi Vite compile lại toàn bộ CSS.

---

### Một mẹo nhỏ cho bạn:

Nếu bạn thấy Iframe bị mất màu nền hoặc font chữ không giống bên ngoài, đó là vì Iframe không kế thừa các class từ thẻ `<body>` của trang chính. Bạn có thể thêm class vào thẻ div bao ngoài `children`:

```jsx
<Frame head={head}>
  <div className="bg-white text-gray-900 antialiased">{children}</div>
</Frame>
```

Bạn có gặp khó khăn gì khi import file CSS có dung lượng lớn bằng cách này không? Nếu file quá lớn, tôi sẽ hướng dẫn bạn cách dùng `Blob URL` để tối ưu hiệu năng hơn.
