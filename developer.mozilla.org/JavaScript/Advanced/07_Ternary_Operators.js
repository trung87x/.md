/* =========================================
   FILE: 07_Ternary_Operators.js
   Mô tả: Toán tử ba ngôi (Conditional Operator) - Thay thế ngắn gọn cho if...else
   ========================================= */

// 1. Cú pháp cơ bản (Basic Syntax)
// --------------------------------------------------
// Cú pháp: condition ? exprIfTrue : exprIfFalse
// Đây là toán tử duy nhất trong JavaScript nhận 3 toán hạng [1].

const age = 26;

// Cách dùng if...else truyền thống:
let beverageIf;
if (age >= 21) {
  beverageIf = "Beer";
} else {
  beverageIf = "Juice";
}

// Cách dùng Toán tử ba ngôi:
const beverage = age >= 21 ? "Beer" : "Juice";
console.log(beverage); // "Beer" [2]

// 2. Xử lý giá trị Null/Undefined (Handling Null Values)
// --------------------------------------------------
// Rất hữu ích để kiểm tra dữ liệu đầu vào có tồn tại hay không trước khi truy cập thuộc tính.
// Các giá trị "falsy" bao gồm: false, 0, "", null, undefined, NaN [3].

const greeting = (person) => {
  // Nếu person tồn tại (truthy), lấy person.name, ngược lại dùng "stranger"
  const name = person ? person.name : "stranger";
  return `Howdy, ${name}`;
};

console.log(greeting({ name: "Alice" })); // "Howdy, Alice"
console.log(greeting(null)); // "Howdy, stranger" [2]

// 3. Chuỗi điều kiện (Conditional Chains)
// --------------------------------------------------
// Toán tử ba ngôi có tính kết hợp phải (right-associative), cho phép nối chuỗi
// để mô phỏng cấu trúc if ... else if ... else if ... else [2], [4].

function getTicketPrice(isMember, isStudent) {
  return isMember
    ? "$2.00" // Nếu là thành viên
    : isStudent
    ? "$5.00" // Nếu không phải thành viên nhưng là sinh viên
    : "$10.00"; // Nếu không phải cả hai
}

console.log(getTicketPrice(true, false)); // "$2.00"
console.log(getTicketPrice(false, true)); // "$5.00"
console.log(getTicketPrice(false, false)); // "$10.00"

// Tương đương với:
/*
if (isMember) {
  return "$2.00";
} else if (isStudent) {
  return "$5.00";
} else {
  return "$10.00";
}
*/

// 4. Sử dụng trong Template Literals
// --------------------------------------------------
// Vì toán tử ba ngôi là một "biểu thức" (expression), nó có thể nằm gọn trong ${...},
// điều mà câu lệnh if...else không làm được.

const isLoggedIn = true;
const message = `Welcome, ${isLoggedIn ? "User" : "Guest"}!`;
console.log(message); // "Welcome, User!"
