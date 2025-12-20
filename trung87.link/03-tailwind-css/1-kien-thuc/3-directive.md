## (Cấu trúc hệ thống)

Để Tailwind hoạt động, bạn cần khai báo nó trong file CSS đầu vào. Đây là "lệnh triệu tập" các thư viện mã nguồn của Tailwind.

```css

/_ style.css _/
@tailwind base; /_ Reset CSS mặc định của trình duyệt _/
@tailwind components; /_ Cho phép bạn tạo các class dùng chung như .btn, .card _/
@tailwind utilities; /_ Nạp toàn bộ các lớp tiện ích như flex, pt-4, text-center _/

/_ Kỹ năng nâng cao: Gom nhóm các class quá dài _/
.btn-primary {
@apply bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition;
}
```
