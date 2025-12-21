# Ứng dụng 1: Xây dựng UI Component cực nhanh

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind UI Components</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-8">

    <nav class="flex items-center justify-between bg-white p-4 shadow-md rounded-lg mb-10">
        <div class="text-xl font-bold text-blue-600">BrandLogo</div>
        <div class="space-x-6 hidden md:flex">
            <a href="#" class="text-gray-600 hover:text-blue-500 transition">Trang chủ</a>
            <a href="#" class="text-gray-600 hover:text-blue-500 transition">Sản phẩm</a>
            <a href="#" class="text-gray-600 hover:text-blue-500 transition">Liên hệ</a>
        </div>
        <button class="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600">Bắt đầu</button>
    </nav>

    <div class="max-w-sm bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <img class="w-full h-48 object-cover" src="https://via.placeholder.com/400x300" alt="Sản phẩm">
        <div class="p-5">
            <span class="text-xs font-semibold text-blue-500 uppercase tracking-wide">Mới nhất</span>
            <h2 class="mt-2 text-xl font-bold text-gray-800">Tên Sản Phẩm Premium</h2>
            <p class="mt-3 text-gray-600 text-sm leading-relaxed">
                Mô tả ngắn gọn về tính năng và lợi ích của sản phẩm. Được thiết kế tối ưu cho trải nghiệm người dùng.
            </p>
            <div class="mt-5 flex items-center justify-between">
                <span class="text-2xl font-bold text-gray-900">$99.00</span>
                <button class="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700">Thêm vào giỏ</button>
            </div>
        </div>
    </div>

</body>
</html>

```

---

**Bạn có muốn tôi cung cấp mã nguồn cho "Ứng dụng 2: Tùy biến Design System (Theming)" với các biến CSS không?**