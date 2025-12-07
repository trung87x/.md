/* =========================================
   FILE: Arrow_functions.js
   Mô tả: Cú pháp, tính năng và giới hạn của Arrow Function (ES6)
   ========================================= */

// 1. Cú pháp cơ bản (Basic Syntax)
// --------------------------------------------------

// Nếu hàm chỉ có một tham số, có thể bỏ ngoặc đơn () [1].
const double = (n) => n * 2;

// Nếu hàm chỉ có một biểu thức trả về, có thể bỏ từ khóa 'return' và ngoặc nhọn {} (Implicit return) [1], [2].
const add = (a, b) => a + b;

// Nếu có nhiều dòng lệnh, BẮT BUỘC phải dùng ngoặc nhọn {} và từ khóa 'return' [2].
const complexCalc = (a, b) => {
  const sum = a + b;
  return sum * 2;
};

// Hàm không có tham số cần cặp ngoặc đơn trống () [3].
const sayHello = () => "Hello World";

// 2. Trả về Object Literal (Returning Object Literals)
// --------------------------------------------------

// CẢNH BÁO: Không thể viết n => { key: n } vì JS hiểu {} là block code chứ không phải object [4].
// GIẢI PHÁP: Bọc object trong ngoặc đơn () [5].
const createItem = (id, name) => ({ id: id, name: name });
console.log(createItem(1, "Sách"));

// 3. Từ khóa 'this' (Lexical 'this') - TÍNH NĂNG QUAN TRỌNG NHẤT
// --------------------------------------------------
// Arrow functions KHÔNG có 'this' riêng. Nó lấy 'this' từ phạm vi bao quanh (lexical scoping) [6], [7].

function Person() {
  this.age = 0;

  // Ví dụ dùng hàm thường: 'this' sẽ bị sai (trỏ về global hoặc undefined) khi setInterval chạy
  /* 
    setInterval(function() {
        this.age++; // Lỗi hoặc không hoạt động như ý muốn
    }, 1000); 
    */

  // Ví dụ dùng Arrow Function: 'this' được giữ nguyên là đối tượng Person [8], [7].
  setInterval(() => {
    this.age++;
    // console.log(this.age); // Hoạt động tốt
  }, 1000);
}

// 4. Không có 'arguments' Object
// --------------------------------------------------
// Arrow functions không có biến 'arguments' [6], [9].
// GIẢI PHÁP: Sử dụng Rest parameters (...args) để thay thế [10].

const sumAll = (...args) => {
  // args là một mảng thực sự, có thể dùng .reduce(), .map()
  return args.reduce((total, current) => total + current, 0);
};
console.log(sumAll(1, 2, 3, 4)); // Output: 10

// 5. Sử dụng thực tế với Mảng (Array Methods)
// --------------------------------------------------
// Arrow functions giúp code xử lý mảng gọn hơn rất nhiều [11], [12].

const materials = ["Hydrogen", "Helium", "Lithium", "Beryllium"];

// Cách viết cũ:
// const lengths = materials.map(function(material) { return material.length; });

// Cách viết Arrow Function:
const lengths = materials.map((material) => material.length);
console.log(lengths); // [13-16]

// 6. Những hạn chế (Limitations) - KHÔNG NÊN DÙNG KHI NÀO?
// --------------------------------------------------

// KHÔNG dùng làm phương thức (method) của Object nếu cần truy cập 'this' của object đó [5].
const obj = {
  i: 10,
  // Sai: Arrow function sẽ lấy 'this' từ global scope, không phải 'obj'
  b: () => console.log(this.i, this),
  // Đúng: Dùng hàm thông thường hoặc cú pháp method shorthand
  c() {
    console.log(this.i, this);
  },
};

// KHÔNG thể dùng làm Constructor (không có 'new') [6], [10].
const Foo = () => {};
// const bar = new Foo(); // Sẽ báo lỗi TypeError: Foo is not a constructor

// KHÔNG có thuộc tính 'prototype' [10].
console.log(Foo.prototype); // undefined

// 'call', 'apply', 'bind' KHÔNG thay đổi được 'this' của Arrow Function [17].
const adder = (a) => a + this.num; // giả sử 'this' là global
const context = { num: 10 };
// adder.call(context, 1) vẫn sẽ không nhận 'num' từ context.
