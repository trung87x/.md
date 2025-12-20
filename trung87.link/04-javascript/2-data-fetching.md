# Ứng dụng 2: Làm việc với API (Data Fetching)

```html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.tailwindcss.com"></script>
    <title>API Data Fetching</title>
  </head>
  <body class="bg-gray-100 p-10">
    <div class="max-w-2xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Danh sách người dùng (từ API)</h1>
        <button
          id="loadBtn"
          class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Tải dữ liệu
        </button>
      </div>

      <div id="loading" class="hidden text-center py-4">
        Đang tải dữ liệu...
      </div>

      <div id="userList" class="grid gap-4"></div>
    </div>

    <script>
      const loadBtn = document.getElementById("loadBtn");
      const userList = document.getElementById("userList");
      const loading = document.getElementById("loading");

      // Hàm lấy dữ liệu từ API
      async function fetchUsers() {
        // Hiện loading, ẩn danh sách cũ
        loading.classList.remove("hidden");
        userList.innerHTML = "";

        try {
          // Kết nối tới Server giả lập (JSONPlaceholder)
          const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
          );
          const users = await response.json();

          // Chèn dữ liệu vào HTML
          users.forEach((user) => {
            const card = `
                        <div class="bg-white p-4 rounded shadow hover:border-blue-500 border-2 border-transparent transition">
                            <h3 class="font-bold text-lg">${user.name}</h3>
                            <p class="text-gray-600">📧 ${user.email}</p>
                            <p class="text-sm text-blue-500">📍 ${user.address.city}</p>
                        </div>
                    `;
            userList.innerHTML += card;
          });
        } catch (error) {
          userList.innerHTML = `<p class="text-red-500">Lỗi: Không thể lấy dữ liệu!</p>`;
        } finally {
          loading.classList.add("hidden");
        }
      }

      // Lắng nghe sự kiện click để gọi API
      loadBtn.addEventListener("click", fetchUsers);
    </script>
  </body>
</html>
```

---

**Bạn có muốn tôi cung cấp mã nguồn cho "Ứng dụng 3: Xử lý Logic & Tính toán (Complex Logic Handling)" không?**
