# Ứng dụng 3: State Management (Trạng thái giao diện)

```html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      // Cấu hình để hỗ trợ dark mode qua class
      tailwind.config = { darkMode: "class" };
    </script>
    <title>State Management UI</title>
  </head>
  <body
    class="bg-gray-100 dark:bg-gray-900 transition-colors duration-500 flex flex-col items-center justify-center min-height-screen p-10"
  >
    <div
      class="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-transparent dark:border-gray-700"
    >
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Điều khiển trạng thái
      </h2>

      <input
        type="text"
        placeholder="Click vào tôi để thấy focus..."
        class="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none 
                      focus:ring-4 focus:ring-blue-400 focus:border-blue-500 
                      transition-all mb-6"
      />

      <button
        class="w-full bg-blue-500 text-white font-bold py-3 rounded-lg
                       hover:bg-blue-600 hover:shadow-lg 
                       active:scale-95 active:bg-blue-700 
                       transition-all duration-150 mb-4"
      >
        Nút Tương Tác
      </button>

      <hr class="my-6 border-gray-200 dark:border-gray-700" />

      <button
        onclick="document.documentElement.classList.toggle('dark')"
        class="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 rounded-md font-medium"
      >
        Toggle Dark Mode
      </button>
    </div>
  </body>
</html>
```

---

**Bạn có muốn tôi cung cấp mã nguồn cho "Ứng dụng 1 của JavaScript: DOM Manipulation (Thao tác giao diện)" không?**
