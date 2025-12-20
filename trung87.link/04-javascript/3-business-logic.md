# Ứng dụng 3: Logic nghiệp vụ (Business Logic)

```html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Business Logic App</title>
  </head>
  <body class="bg-gray-50 p-6">
    <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-white p-6 rounded-xl shadow-sm border">
        <h2 class="text-xl font-bold mb-4">Giỏ hàng & Bộ lọc</h2>
        <input
          type="text"
          id="filterInput"
          placeholder="Tìm tên sản phẩm..."
          class="w-full p-2 border rounded mb-4"
        />

        <div id="productContainer" class="space-y-3 mb-4"></div>

        <div class="border-top pt-4">
          <p class="text-lg font-bold text-red-600">
            Tổng cộng: <span id="totalPrice">0</span>đ
          </p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm border">
        <h2 class="text-xl font-bold mb-4">Xác thực dữ liệu</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium">Email khách hàng:</label>
            <input
              type="text"
              id="emailInput"
              class="w-full p-2 border rounded mt-1"
            />
            <p id="emailError" class="text-xs text-red-500 mt-1 hidden">
              Email không hợp lệ!
            </p>
          </div>
          <button
            id="checkoutBtn"
            class="w-full bg-blue-600 text-white py-2 rounded font-bold"
          >
            Thanh toán
          </button>
        </div>
      </div>
    </div>

    <script>
      // 1. Dữ liệu gốc
      const products = [
        { id: 1, name: "Iphone 15", price: 25000000 },
        { id: 2, name: "Macbook M3", price: 35000000 },
        { id: 3, name: "Airpods Pro", price: 5000000 },
      ];

      const productContainer = document.getElementById("productContainer");
      const totalPriceEl = document.getElementById("totalPrice");
      const filterInput = document.getElementById("filterInput");

      // 2. Logic Hiển thị & Tính toán
      function render(data) {
        productContainer.innerHTML = data
          .map(
            (p) => `
                <div class="flex justify-between p-2 bg-gray-50 rounded">
                    <span>${p.name}</span>
                    <span class="font-mono">${p.price.toLocaleString()}đ</span>
                </div>
            `
          )
          .join("");

        const total = data.reduce((sum, p) => sum + p.price, 0);
        totalPriceEl.textContent = total.toLocaleString();
      }

      // 3. Logic Lọc (Filter)
      filterInput.addEventListener("input", (e) => {
        const keyword = e.target.value.toLowerCase();
        const filtered = products.filter((p) =>
          p.name.toLowerCase().includes(keyword)
        );
        render(filtered);
      });

      // 4. Logic Kiểm tra Email (Regex Validation)
      const emailInput = document.getElementById("emailInput");
      const emailError = document.getElementById("emailError");

      emailInput.addEventListener("blur", () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
          emailError.classList.remove("hidden");
        } else {
          emailError.classList.add("hidden");
        }
      });

      // Khởi tạo trang
      render(products);
    </script>
  </body>
</html>
```

---

**Bạn đã hoàn thành các ứng dụng cốt lõi của HTML/CSS/JS. Bạn có muốn tôi hỗ trợ thêm phần nào khác không?**
