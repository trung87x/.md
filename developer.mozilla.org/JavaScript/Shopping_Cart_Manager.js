/* ============================================================
   FILE: Shopping_Cart_Manager.js
   DỰ ÁN: Mini Shopping Cart Manager
   MÔ TẢ: Tổng hợp cú pháp ES6+ (Arrow Fn, Array Methods, 
          Destructuring, Template Literals, Modules...)
   ============================================================ */

// 1. [Objects] & [Object.freeze]
// Tạo đối tượng cấu hình và "đóng băng" để không ai sửa được
const CONFIG = Object.freeze({
  taxRate: 0.1, // Thuế 10%
  currency: "USD",
  shopName: "TechStore",
});

// 2. [Arrays] & [Objects]
// Danh sách sản phẩm (Database giả lập)
const products = [
  { id: 1, name: "Laptop Gaming", price: 1500, stock: 5 },
  { id: 2, name: "Mechanical Keyboard", price: 100, stock: 0 }, // Hết hàng
  { id: 3, name: "Wireless Mouse", price: 50, stock: 20 },
  { id: 4, name: "Monitor 4K", price: 400, stock: 3 },
];

/* ============================================================
   HELPER FUNCTIONS (Hàm tiện ích)
   ============================================================ */

// 3. [Arrow Functions] & [Template Literals] & [Default Parameters]
// Hàm format tiền tệ (Arrow function ngắn gọn)
const formatMoney = (amount, symbol = CONFIG.currency) => {
  return `${amount.toLocaleString()} ${symbol}`;
};

// 4. [Ternary Operator] (Toán tử ba ngôi)
// Kiểm tra trạng thái hàng tồn kho
const getStatus = (stock) => (stock > 0 ? "Còn hàng" : "Hết hàng");

/* ============================================================
   MAIN LOGIC (Xử lý chính)
   ============================================================ */

// 5. [Functions] & [Rest Parameters]
// Hàm xử lý giỏ hàng, chấp nhận vô số ID sản phẩm đầu vào
function processCart(customerName, ...productIds) {
  console.log(`\n🛒 Đang xử lý giỏ hàng cho: ${customerName}`);

  // 6. [Array Methods] - .filter(), .map()
  // Lọc ra các sản phẩm tồn tại trong kho dựa trên list ID khách chọn
  const cartItems = productIds
    .map((pid) => products.find((p) => p.id === pid)) // Tìm object sản phẩm từ ID [1]
    .filter((item) => item !== undefined); // Loại bỏ ID không hợp lệ [2]

  if (cartItems.length === 0) {
    console.log("Giỏ hàng trống hoặc mã sản phẩm không hợp lệ.");
    return;
  }

  // 7. [Array Methods] - .reduce()
  // Tính tổng tiền hàng [3]
  const subTotal = cartItems.reduce((total, item) => total + item.price, 0);

  // Tính thuế và tổng cộng
  const tax = subTotal * CONFIG.taxRate;
  const grandTotal = subTotal + tax;

  // 8. [Destructuring] & [Renaming]
  // In chi tiết hóa đơn
  console.log("--- CHI TIẾT HÓA ĐƠN ---");

  cartItems.forEach((item, index) => {
    // Phân rã đối tượng item, đổi tên 'name' thành 'prodName' [4]
    const { name: prodName, price, stock } = item;

    // Sử dụng Ternary Operator lồng trong Template Literal [5]
    console.log(
      `${index + 1}. ${prodName} - ${formatMoney(price)} [${
        stock > 0 ? "OK" : "Pre-order"
      }]`
    );
  });

  console.log("------------------------");
  console.log(`Tạm tính:  ${formatMoney(subTotal)}`);
  console.log(`Thuế (10%): ${formatMoney(tax)}`);
  console.log(`TỔNG CỘNG: ${formatMoney(grandTotal)}`);
}

/* ============================================================
   ADVANCED USE (Nâng cao)
   ============================================================ */

// 9. [Object Methods] - Object.entries()
// Tạo báo cáo tồn kho nhanh
const generateReport = () => {
  console.log(`\n📊 Báo cáo tồn kho ${CONFIG.shopName}:`);

  // Duyệt qua mảng products
  for (const { name, stock } of products) {
    // Destructuring ngay trong vòng lặp [6]
    const status = getStatus(stock);
    console.log(`- ${name}: ${status} (${stock})`);
  }
};

// 10. [Modules] (Mô phỏng Export)
// Nếu đây là module, ta sẽ dùng cú pháp export [7]
const App = {
  processCart,
  generateReport,
  products,
};

// Giả lập export default (comment lại vì chạy file đơn lẻ)
// export default App;

/* ============================================================
   RUN (Chạy thử)
   ============================================================ */

// Khách hàng mua: Laptop (id:1), Chuột (id:3), và một mã sai (id:99)
App.processCart("Nguyen Van A", 1, 3, 99);

// In báo cáo
App.generateReport();

/* ============================================================
Giải thích các thành phần trong "Dự án nhỏ" này:
1. Objects & Object.freeze: CONFIG được dùng để chứa các hằng số. Object.freeze đảm bảo rằng không đoạn code nào bên dưới có thể vô tình thay đổi thuế suất hoặc tên shop.
2. Array & Objects: products là một mảng chứa các đối tượng, mô phỏng cơ sở dữ liệu. Mảng này cho phép dùng các phương thức mạnh mẽ như .map, .filter.
3. Arrow Functions & Default Params: Hàm formatMoney dùng cú pháp mũi tên => ngắn gọn và tham số mặc định symbol = 'USD' nếu người dùng không truyền đơn vị tiền tệ.
4. Ternary Operator: Hàm getStatus dùng stock > 0 ? ... : ... thay cho if/else dài dòng để trả về chuỗi trạng thái.
5. Rest Parameters: Hàm processCart dùng ...productIds để nhận vào bất kỳ số lượng ID sản phẩm nào (1, 2, hay 10 món đều được) và gom chúng thành một mảng thực thụ.
6. Array Methods:
    ◦ .find(): Tìm sản phẩm cụ thể theo ID.
    ◦ .filter(): Loại bỏ các sản phẩm undefined (do nhập sai ID).
    ◦ .reduce(): Cộng dồn giá tiền để ra tổng phụ (subTotal).
    ◦ .forEach(): Duyệt để in ra danh sách.
7. Destructuring & Renaming: Trong vòng lặp forEach, dòng const { name: prodName, price } = item; giúp bóc tách dữ liệu ra khỏi object item và đổi tên biến name thành prodName để tránh trùng lặp hoặc làm code rõ nghĩa hơn.
8. Template Literals: Dùng dấu backticks (`) để tạo chuỗi in ra console, cho phép chèn biến ${variable} và biểu thức ${stock > 0 ? ...} ngay trong chuỗi.
9. Modules Simulation: Đối tượng App ở cuối file mô phỏng cách một module sẽ export các chức năng công khai ra bên ngoài trong khi ẩn các biến nội bộ khác (nếu có).
   ============================================================ */
