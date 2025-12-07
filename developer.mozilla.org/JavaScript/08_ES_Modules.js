/* =========================================
   FILE: 08_ES_Modules.js
   Mô tả: Hệ thống Module (Import/Export) hiện đại
   Lưu ý: Module cần chạy qua server (http/https), không chạy trực tiếp file://
   ========================================= */

// GIẢ LẬP: Các đoạn code dưới đây thường nằm ở các file riêng biệt (ví dụ: math.js, main.js).

// 1. Exporting (Xuất tính năng ra khỏi file)
// --------------------------------------------------
// File: ./modules/math.js

// a. Named Exports (Xuất có tên):
// Có thể xuất nhiều biến, hàm, hoặc class từ một module.
export const PI = 3.14159;
export function add(a, b) {
  return a + b;
}

// b. Default Export (Xuất mặc định):
// Mỗi file chỉ được có MỘT default export. Thường dùng cho tính năng chính của file.
export default function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

// c. Export List (Gom nhóm xuất ở cuối file):
const name = "MathLib";
function subtract(a, b) {
  return a - b;
}

export { name, subtract };

// 2. Importing (Nhập tính năng vào file khác)
// --------------------------------------------------
// File: main.js

// a. Import Named Exports (Phải dùng đúng tên trong ngoặc nhọn {}):
import { PI, add } from "./modules/math.js"; // [1]

// b. Import Default Export (Không dùng ngoặc nhọn, có thể đặt tên tùy ý):
import randomizer from "./modules/math.js"; // [2]

// c. Renaming (Đổi tên khi import để tránh trùng lặp):
// Dùng từ khóa 'as'.
import { add as sum, subtract as sub } from "./modules/math.js"; // [3]
// console.log(sum(10, 5));

// d. Module Object (Nhập tất cả thành một đối tượng):
// Gom toàn bộ exports vào một namespace để code gọn hơn.
import * as MathTools from "./modules/math.js"; // [4]
// Sử dụng: MathTools.PI, MathTools.add(1, 2), MathTools.default()

// 3. Dynamic Imports (Nhập module động)
// --------------------------------------------------
// Thay vì import tĩnh ở đầu file, ta tải module khi cần (lazy-loading) để tối ưu hiệu suất.
// Hàm import() trả về một Promise.

const btn = document.querySelector(".calc-btn");
if (btn) {
  btn.addEventListener("click", () => {
    // Chỉ tải module square.js khi người dùng click
    import("./modules/square.js")
      .then((Module) => {
        const sq = new Module.Square(10);
        sq.draw();
      })
      .catch((err) => console.error("Lỗi tải module:", err));
  }); // [5]
}

// 4. Aggregating Modules (Gom nhóm/Xuất lại)
// --------------------------------------------------
// File: ./modules/shapes.js
// Kỹ thuật này giúp tạo một file "cổng" (entry point) chung cho nhiều module con.

// Import từ circle.js rồi export ngay lập tức ra ngoài,
// file hiện tại không truy cập được biến Circle.
export { Circle } from "./modules/circle.js"; // [6]
export { Square } from "./modules/square.js";
export * from "./modules/utils.js"; // Xuất lại tất cả từ utils

// 5. Top-level Await (Await ở cấp cao nhất)
// --------------------------------------------------
// Cho phép dùng 'await' ngay bên ngoài hàm async.
// Module sẽ "đợi" cho đến khi Promise giải quyết xong mới chạy tiếp code phụ thuộc.

// File: ./modules/colors.js
/*
const response = await fetch("../data/colors.json"); // [7]
const colors = await response.json();
export default colors;
*/

// Khi import module này, JS sẽ đợi fetch xong.
// import colors from "./modules/colors.js";

// 6. Cách nhúng vào HTML
// --------------------------------------------------
// Bắt buộc phải thêm type="module".
/*
<script type="module" src="main.js"></script>

<!-- Code trong module tự động chạy ở 'strict mode' và có scope riêng -->
<script type="module">
    import { PI } from "./modules/math.js";
    console.log(PI);
</script>
*/
