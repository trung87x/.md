/* =========================================
   FILE: 05_Destructuring.js
   Mô tả: Cú pháp phân rã (Destructuring assignment) cho Arrays và Objects
   ========================================= */

// 1. Array Destructuring (Phân rã Mảng)
// --------------------------------------------------

// a. Gán biến cơ bản
const foo = ["one", "two", "three"];
const [red, yellow, green] = foo;
console.log(red); // "one" [1]

// b. Bỏ qua phần tử (Skipping items)
// Có thể bỏ qua các giá trị không cần thiết bằng dấu phẩy.
function f() {
  return [2 - 4];
}
const [a, , b] = f();
console.log(a, b); // 1, 3 [5]

// c. Hoán đổi biến (Swapping variables)
// Không cần biến tạm thời (temporary variable).
let x = 1;
let y = 3;
[x, y] = [y, x];
console.log(x); // 3 [6]

// d. Rest syntax (Phần còn lại)
// Gom các phần tử còn thừa vào một mảng mới.
const [head, ...tail] = [2 - 4, 7];
console.log(tail); // [3, 4, 7] [8]

// 2. Object Destructuring (Phân rã Đối tượng)
// --------------------------------------------------

const user = {
  id: 42,
  isVerified: true,
  fullName: {
    firstName: "Jane",
    lastName: "Doe",
  },
};

// a. Gán cơ bản
const { id, isVerified } = user;
console.log(id); // 42 [9]

// b. Đổi tên biến (Renaming)
// Cú pháp: { tên_thuộc_tính: tên_biến_mới }
const o = { p: 42, q: true };
const { p: fooNum, q: barBool } = o;
console.log(fooNum); // 42 [10]

// c. Giá trị mặc định (Default values)
// Dùng khi thuộc tính không tồn tại hoặc là undefined.
const { missingProp = "default value" } = o;
// Kết hợp đổi tên và gán mặc định:
const { a: aa = 10 } = { a: undefined }; // aa = 10 [10]

// d. Nested Destructuring (Phân rã lồng nhau)
const {
  fullName: { firstName },
} = user;
console.log(firstName); // "Jane" [11]

// 3. Advanced Patterns (Các mẫu nâng cao)
// --------------------------------------------------

// a. Phân rã tham số hàm (Function Parameter Destructuring)
// Rất phổ biến khi làm việc với object cấu hình hoặc React props.
function drawChart({
  size = "big",
  coords = { x: 0, y: 0 },
  radius = 25,
} = {}) {
  console.log(size, coords, radius);
}
// Gọi hàm không cần truyền đủ tham số, hoặc không truyền gì (nhờ = {} ở cuối)
drawChart({ radius: 30 });
[12];

// b. Computed Property Names (Tên thuộc tính động)
const key = "z";
const { [key]: value } = { z: "bar" };
console.log(value); // "bar" [13]

// c. Assignment without declaration (Gán không khai báo)
// Lưu ý: Phải bao quanh bằng ngoặc đơn () nếu không dùng từ khóa let/const,
// vì JS sẽ hiểu nhầm {} là block code.
let u, v;
({ u, v } = { u: 1, v: 2 });
[14];

// d. Unpacking from Regex (Lấy kết quả từ biểu thức chính quy)
const parsedURL = /^(\w+):\/\/([^/]+)\/(.*)$/.exec(
  "https://developer.mozilla.org/en-US"
);
const [, protocol, fullHost] = parsedURL;
console.log(protocol); // "https" [15]

// 4. Những lưu ý quan trọng (Gotchas)
// --------------------------------------------------

// Rest property trong Object destructuring (tạo object mới từ phần còn lại)
const { a: valA, ...others } = { a: 1, b: 2, c: 3 };
console.log(others); // { b: 2, c: 3 } [1]

// Không thể destructure null hoặc undefined (sẽ báo lỗi TypeError)
// const { _ } = null; // TypeError [16]
