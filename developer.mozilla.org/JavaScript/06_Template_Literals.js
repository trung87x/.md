/* =========================================
   FILE: 06_Template_Literals.js
   Mô tả: Chuỗi mẫu, Nội suy biến và Tagged Templates
   ========================================= */

// 1. Cú pháp cơ bản & Chuỗi đa dòng (Multi-line strings)
// --------------------------------------------------
// Template literals sử dụng dấu backtick (`) thay vì dấu ngoặc đơn hoặc kép [1].
// Nó cho phép tạo chuỗi nhiều dòng mà không cần ký tự xuống dòng \n [2].

const greeting = `Xin chào,
Đây là một chuỗi
nằm trên nhiều dòng.`;

console.log(greeting);
/* Output:
Xin chào,
Đây là một chuỗi
nằm trên nhiều dòng.
*/

// 2. Nội suy chuỗi (String Interpolation)
// --------------------------------------------------
// Sử dụng cú pháp ${expression} để chèn biến hoặc biểu thức vào chuỗi [3].
// Cách này dễ đọc hơn nhiều so với toán tử cộng chuỗi (+) truyền thống [4].

const a = 5;
const b = 10;

// Cách cũ:
// console.log("Fifteen is " + (a + b) + " and\nnot " + (2 * a + b) + ".");

// Cách dùng Template Literal:
console.log(`Fifteen is ${a + b} and not ${2 * a + b}.`); // [5]
// Output: "Fifteen is 15 and not 20."

// 3. Lồng nhau (Nesting Templates)
// --------------------------------------------------
// Bạn có thể lồng một template literal bên trong một placeholder ${} của template khác.
// Rất hữu ích cho logic điều kiện phức tạp (như toán tử ba ngôi) [6].

const isLargeScreen = () => true;
const item = { isCollapsed: true };

const classes = `header ${
  isLargeScreen() ? "" : `icon-${item.isCollapsed ? "expander" : "collapser"}`
}`;
// Nếu màn hình lớn -> "header "
// Nếu màn hình nhỏ và collapsed -> "header icon-expander"

// 4. Tagged Templates (Mẫu được gắn thẻ - Nâng cao)
// --------------------------------------------------
// Cho phép bạn phân tích chuỗi mẫu bằng một hàm tùy chỉnh (Tag function) [7].
// Hàm này nhận vào các đoạn chuỗi tĩnh và các giá trị nội suy.

const person = "Mike";
const age = 28;

function myTag(strings, personExp, ageExp) {
  // strings: Mảng các đoạn văn bản tĩnh ["That ", " is a ", "."]
  // personExp: Giá trị của ${person} ("Mike")
  // ageExp: Giá trị của ${age} (28)

  const str0 = strings; // "That "
  const str1 = strings[8]; // " is a "
  const str2 = strings[9]; // "."

  const ageStr = ageExp < 100 ? "youngster" : "centenarian";

  // Bạn có thể trả về bất cứ thứ gì, không nhất thiết là chuỗi
  return `${str0}${personExp}${str1}${ageStr}${str2}`;
}

// Lưu ý: Không có dấu ngoặc đơn () sau tên hàm myTag
const output = myTag`That ${person} is a ${age}.`;
console.log(output); // "That Mike is a youngster." [10]

// 5. Chuỗi thô (Raw Strings)
// --------------------------------------------------
// String.raw giúp lấy chuỗi nguyên bản, bỏ qua việc xử lý ký tự thoát (escape sequences) như \n hay \t [11].
// Thường dùng để viết đường dẫn file Windows hoặc biểu thức Regular Expression.

const filePath = String.raw`C:\Development\profile\aboutme.html`;
console.log(filePath);
// Output: C:\Development\profile\aboutme.html (Dấu \ được giữ nguyên)

// Nếu không dùng String.raw, bạn phải escape dấu gạch chéo: "C:\\Development..."

// 6. Escaping (Ký tự thoát)
// --------------------------------------------------
// Để hiển thị dấu backtick hoặc dấu $ trong chuỗi mẫu, dùng dấu gạch chéo ngược \ [12].

const code = `Sử dụng \`backticks\` để tạo chuỗi và \${variable} để chèn biến.`;
console.log(code);
// Output: Sử dụng `backticks` để tạo chuỗi và ${variable} để chèn biến.
