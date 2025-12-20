# Ứng dụng 2: Responsive "Inline" (Thiết kế đáp ứng ngay tại chỗ)

```html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Responsive Inline</title>
  </head>
  <body class="bg-gray-200 p-6">
    <div class="flex flex-wrap -m-2">
      <div class="w-full md:w-1/2 lg:w-1/3 p-2">
        <div class="bg-white p-6 rounded-lg shadow text-center">
          <p class="font-bold">Khối 1</p>
          <p class="text-sm text-gray-500 md:text-blue-500 lg:text-red-500">
            (Màu chữ thay đổi theo màn hình)
          </p>
        </div>
      </div>

      <div class="w-full md:w-1/2 lg:w-1/3 p-2">
        <div class="bg-white p-6 rounded-lg shadow text-center font-bold">
          Khối 2
        </div>
      </div>

      <div class="w-full md:w-full lg:w-1/3 p-2">
        <div class="bg-white p-6 rounded-lg shadow text-center font-bold">
          Khối 3
        </div>
      </div>
    </div>
  </body>
</html>
```

---

**Bạn có muốn tôi cung cấp mã nguồn cho "Ứng dụng 3: Dark Mode & Tùy biến Theme (Customization)" không?**
