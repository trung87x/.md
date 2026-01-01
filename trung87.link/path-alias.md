Để thay thế đường dẫn "loằng ngoằng" `../../../` bằng cách chuyên nghiệp hơn mà vẫn đảm bảo **F12 (Go to Definition)** hoạt động mượt mà, bạn hãy thực hiện theo 2 bước sau:

### Bước 1: Thay đổi dòng code Import

Bạn chuyển sang dùng **Path Alias** (Biệt danh đường dẫn) với ký tự `@`:

```javascript
// Trước đây:
// import PreviewWrapper from "../../../components/PreviewWrapper";

// Bây giờ (Sạch sẽ và chuyên nghiệp):
import PreviewWrapper from "@/components/PreviewWrapper";
```

---

### Bước 2: Cấu hình để "Kích hoạt" F12

Như đã thảo luận, VS Code cần được "mớm" thông tin thì mới hiểu `@/` là gì. Bạn hãy tạo một file tên là **`jsconfig.json`** nằm ở **thư mục gốc** của dự án (cùng cấp với file `package.json`) và dán nội dung này vào:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

> **Lưu ý:** Cấu hình trên giả định rằng thư mục `components` của bạn nằm bên trong thư mục `src`.

---

### Bước 3: Đảm bảo Dự án vẫn chạy (Dành cho Vite)

Nếu bạn đang dùng **Vite** (công cụ phổ biến nhất hiện nay cho React), bạn cần báo cho Vite biết cách xử lý dấu `@` khi biên dịch.

Mở file **`vite.config.js`** và cập nhật phần `resolve`:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Thêm dòng này

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Thiết lập @ trỏ đến thư mục src
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

---

### Tại sao bạn nên làm việc này ngay bây giờ?

1. **Code cực kỳ gọn:** Dù component nằm sâu 5-7 lớp thư mục (như cái UI Kit bạn đang làm), bạn vẫn chỉ cần bắt đầu bằng `@/components/...`.
2. **Không sợ lỗi khi di chuyển file:** Nếu bạn di chuyển file đang viết sang thư mục khác, bạn không cần phải đếm lại số lượng dấu `../` nữa.
3. **F12 hoạt động hoàn hảo:** Sau khi có file `jsconfig.json`, VS Code sẽ hiểu `@/` là lối tắt, bạn nhấn F12 sẽ nhảy thẳng đến file `PreviewWrapper.jsx`.

**Bạn đã tạo file `jsconfig.json` chưa? Nếu có lỗi gì khi F12 sau khi cấu hình, hãy cho tôi biết nhé!**
