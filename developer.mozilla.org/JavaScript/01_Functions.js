/* =========================================
   FILE: Functions.js
   Mô tả: Tổng hợp các kiến thức cốt lõi về Hàm
   ========================================= */

// 1. Function Declaration (Khai báo hàm)
// --------------------------------------------------
// Đặc điểm: Được "hoisting" (có thể gọi trước khi định nghĩa) [1, 2].
function square(number) {
  return number * number;
}
console.log(square(5)); // Output: 25

// 2. Function Expression (Biểu thức hàm)
// --------------------------------------------------
// Đặc điểm: Không được hoisting. Thường gán cho biến const/let [3].
const factorial = function fac(n) {
  // Hàm này có tên là 'fac' để gọi đệ quy bên trong [3, 4]
  return n < 2 ? 1 : n * fac(n - 1);
};
console.log(factorial(3)); // Output: 6

// 3. Arrow Functions (Hàm mũi tên - ES6)
// --------------------------------------------------
// Cú pháp ngắn gọn, không có 'this' riêng, luôn là anonymous [5, 6].

// Ví dụ ngắn gọn (Implicit return):
const add = (a, b) => a + b;

// Ví dụ xử lý 'this' (Lexical scoping):
// Arrow function rất hữu ích trong callback như setInterval vì nó giữ nguyên ngữ cảnh 'this' của cha [6, 7].
function Person() {
  this.age = 0;
  setInterval(() => {
    this.age++; // 'this' ở đây vẫn trỏ vào đối tượng Person
    // console.log(this.age);
  }, 1000);
}

// 4. Tham số hàm (Parameters)
// --------------------------------------------------

// Default Parameters (Tham số mặc định):
// Nếu b không được truyền hoặc là undefined, b sẽ bằng 1 [8].
function multiply(a, b = 1) {
  return a * b;
}

// Rest Parameters (Tham số còn lại):
// Gom các tham số dư thừa vào một mảng thật sự (không phải array-like object) [8].
function sumAll(multiplier, ...theArgs) {
  return theArgs.map((x) => multiplier * x);
}
// sumAll(2, 1, 2, 3) -> [9-11]

// 5. Advanced Concepts (Nâng cao)
// --------------------------------------------------

// Closure (Bao đóng):
// Hàm con 'ghi nhớ' biến của hàm cha ngay cả khi hàm cha đã chạy xong [12, 13].
const createPet = function (name) {
  return {
    getName: function () {
      return name;
    }, // Vẫn truy cập được 'name'
    setName: function (newName) {
      name = newName;
    },
  };
};
const myPet = createPet("Vivie");
console.log(myPet.getName()); // "Vivie" [13]

// IIFE (Hàm thực thi ngay lập tức):
// Giúp tạo scope riêng, tránh ô nhiễm biến toàn cục [14].
(function () {
  const secretCode = "SECRET";
  console.log("IIFE chạy ngay lập tức, code bí mật là: " + secretCode);
})();

// 6. Export (Module hóa)
// --------------------------------------------------
// Xuất các hàm để file khác (như main.js) có thể import [15, 16].
export { square, factorial, add, Person, createPet };
