# Ứng dụng 1: DOM Manipulation (Điều khiển HTML/CSS)

```html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.tailwindcss.com"></script>
    <title>DOM Manipulation JS</title>
  </head>
  <body class="bg-gray-100 p-10 space-y-10">
    <section>
      <button id="menuBtn" class="bg-blue-600 text-white px-6 py-2 rounded">
        Mở Menu
      </button>
      <div id="menuBox" class="hidden mt-4 p-4 bg-white shadow-lg w-64 rounded">
        <p>Đây là nội dung Menu!</p>
      </div>
    </section>

    <section>
      <input
        type="text"
        id="searchInput"
        placeholder="Nhập tên..."
        class="p-2 border rounded w-full max-w-sm"
      />
      <p class="mt-2 text-gray-600">
        Bạn đang nhập:
        <span id="output" class="font-bold text-red-500">...</span>
      </p>
    </section>

    <div
      id="navbar"
      class="fixed top-0 left-0 w-full p-4 transition-all duration-300 text-center font-bold"
    >
      Thanh Header (Cuộn xuống để đổi màu)
    </div>

    <div class="h-[2000px]"></div>
    <script>
      // --- Xử lý Click ---
      const menuBtn = document.getElementById("menuBtn");
      const menuBox = document.getElementById("menuBox");

      menuBtn.addEventListener("click", () => {
        menuBox.classList.toggle("hidden");
        menuBtn.textContent = menuBox.classList.contains("hidden")
          ? "Mở Menu"
          : "Đóng Menu";
      });

      // --- Xử lý Type (Input) ---
      const searchInput = document.getElementById("searchInput");
      const output = document.getElementById("output");

      searchInput.addEventListener("input", (e) => {
        output.textContent = e.target.value || "...";
      });

      // --- Xử lý Scroll ---
      const navbar = document.getElementById("navbar");

      window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
          navbar.classList.add("bg-white", "shadow-md", "text-blue-600");
        } else {
          navbar.classList.remove("bg-white", "shadow-md", "text-blue-600");
        }
      });
    </script>
  </body>
</html>
```

---

**Bạn có muốn tôi cung cấp mã nguồn cho "Ứng dụng 2: Làm việc với API (Data Fetching)" không?**
