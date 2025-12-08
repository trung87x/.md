/* =========================================
   FILE: 04_Arrays_and_Array_Methods.js
   Mô tả: Làm việc với Mảng, các phương thức xử lý và tính bất biến (Immutability)
   ========================================= */

// 1. Tạo và Truy cập Mảng (Creation & Access)
// --------------------------------------------------
// Cách phổ biến: Array Literal
const fruits = ["Apple", "Banana"];

// Cách ít dùng: Constructor
const numbers = new Array(1, 2, 3);

// Tạo từ chuỗi (String.split)
const fruitString = "Mango, Cherry";
const fruitArray = fruitString.split(", "); // ["Mango", "Cherry"]

// Truy cập phần tử
console.log(fruits); // "Apple" (Index bắt đầu từ 0)
console.log(fruits.at(-1)); // "Banana" (Phương thức .at() cho phép dùng số âm để lấy từ cuối)

// 2. Thay đổi độ dài (Length & Truncation)
// --------------------------------------------------
// Thuộc tính .length không chỉ để đọc mà còn có thể ghi.
const resizeMe = [1 - 5];
resizeMe.length = 2;
console.log(resizeMe); // [1, 2] -> Cắt bớt mảng
// resizeMe.length = 5; -> [1, 2, empty × 3] -> Tạo ra các "empty slots" (mảng thưa)

// 3. Stack & Queue Methods (Mutating - Thay đổi mảng gốc)
// --------------------------------------------------
const stack = ["A", "B"];

// Push: Thêm vào cuối -> Trả về độ dài mới
stack.push("C"); // ["A", "B", "C"]

// Pop: Lấy ra từ cuối -> Trả về phần tử đã lấy
const last = stack.pop(); // "C"

// Unshift: Thêm vào đầu
stack.unshift("Start"); // ["Start", "A", "B"]

// Shift: Lấy ra từ đầu
const first = stack.shift(); // "Start"

// 4. Cắt và Ghép (Slice & Splice)
// --------------------------------------------------

// slice(start, end): Tạo bản sao nông (Shallow copy) một phần mảng.
// KHÔNG thay đổi mảng gốc.
const colors = ["Red", "Green", "Blue", "Yellow"];
const subColors = colors.slice(1, 3); // ["Green", "Blue"]

// splice(start, deleteCount, item...): Thêm/Xóa phần tử tại vị trí bất kỳ.
// CÓ thay đổi mảng gốc.
const myData = ["One", "Two", "Three"];
// Từ index 1, xóa 1 phần tử, chèn "New" vào
myData.splice(1, 1, "New");
console.log(myData); // ["One", "New", "Three"]

// 5. Phương thức Lặp và Chuyển đổi (Iteration & Transformation)
// --------------------------------------------------
const values = [1 - 5];

// forEach: Chạy hàm cho mỗi phần tử (không trả về giá trị)
values.forEach((num, index) => {
  // console.log(`Index ${index}: ${num}`);
});

// map: Tạo mảng MỚI bằng cách biến đổi từng phần tử
const doubled = values.map((x) => x * 2); // [2, 4, 6-8]

// filter: Tạo mảng MỚI chứa các phần tử thỏa mãn điều kiện
const evens = values.filter((x) => x % 2 === 0); // [2, 4]

// reduce: Gom mảng thành một giá trị duy nhất (từ trái qua phải)
const sum = values.reduce((acc, curr) => acc + curr, 0); // 15

// 6. Tìm kiếm (Searching)
// --------------------------------------------------
const inventory = [
  { name: "apples", quantity: 2 },
  { name: "bananas", quantity: 0 },
  { name: "cherries", quantity: 5 },
];

// find: Trả về phần tử đầu tiên thỏa mãn điều kiện
const result = inventory.find((fruit) => fruit.name === "cherries");
// { name: "cherries", quantity: 5 }

// findIndex: Trả về chỉ số (index)
const index = inventory.findIndex((fruit) => fruit.name === "bananas"); // 1

// includes: Kiểm tra sự tồn tại (trả về true/false) - Dùng cho giá trị nguyên thủy
const hasBlue = colors.includes("Blue"); // true

// 7. Modern Immutable Methods (ES2023 - Sao chép và thay đổi)
// --------------------------------------------------
// Các phương thức này trả về mảng mới thay vì sửa mảng cũ.

const sequence = [1 - 3];

// toSorted(): Bản sao đã sắp xếp
const sorted = sequence.toSorted();
console.log(sequence); // [1-3] (Vẫn giữ nguyên)
console.log(sorted); // [1-3]

// toReversed(): Bản sao đã đảo ngược
const reversed = sequence.toReversed(); // [1-3]

// with(index, value): Bản sao với 1 phần tử bị thay thế
const updated = sequence.with(1, 99); // [2, 3, 9]

// 8. Sao chép mảng (Copying)
// --------------------------------------------------
// Lưu ý: Các phương thức này chỉ là Shallow Copy (Sao chép nông).

// Spread Syntax (...)
const copy1 = [...sequence];

// Array.from()
const copy2 = Array.from(sequence);

// slice() không tham số
const copy3 = sequence.slice();

// Deep Copy (Sao chép sâu)
// const deepCopy = JSON.parse(JSON.stringify(complexArray));
// Hoặc dùng structuredClone(complexArray);
