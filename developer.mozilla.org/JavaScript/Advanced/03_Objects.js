/* =========================================
   FILE: 03_Objects.js
   Mô tả: Làm việc với Object, Destructuring và Prototypes
   ========================================= */

// 1. Tạo đối tượng (Creating Objects)
// --------------------------------------------------
// Cách phổ biến nhất: Object Initializer (Literal syntax) [1]
const user = {
  name: "Alice",
  age: 25,
  isAdmin: true,
};

// Sử dụng Constructor (ít dùng hơn cho object đơn giản) [2]
const o1 = new Object();
const o2 = new Object(true); // Tạo object wrapper cho Boolean

// 2. Object Destructuring (Phân rã đối tượng)
// --------------------------------------------------
// Cú pháp giúp "bóc tách" thuộc tính ra thành biến riêng biệt [3].

const config = {
  host: "localhost",
  port: 8080,
  timeout: 5000,
};

// a. Cơ bản & Đổi tên biến (Renaming) [4]
// Lấy 'host' gán vào biến 'serverHost', lấy 'port' giữ nguyên tên.
const { host: serverHost, port } = config;
console.log(serverHost); // "localhost"

// b. Giá trị mặc định (Default values) [5], [4]
// Nếu thuộc tính không tồn tại hoặc là undefined, dùng giá trị mặc định.
const { protocol = "http" } = config;

// c. Rest properties (Lấy phần còn lại) [6], [7]
// Gom các thuộc tính chưa được bóc tách vào một object mới.
const { timeout, ...connectionInfo } = config;
console.log(connectionInfo); // { host: "localhost", port: 8080 }

// 3. Static Methods (Phương thức tĩnh quan trọng)
// --------------------------------------------------

const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

// Object.assign(): Sao chép thuộc tính từ source sang target [8].
// Lưu ý: b bị ghi đè bởi source.
const merged = Object.assign(target, source);
// merged: { a: 1, b: 4, c: 5 }

// Object.keys(), Object.values(), Object.entries() [9], [10]
// Trả về mảng các key, value hoặc cặp [key, value].
console.log(Object.keys(merged)); // ["a", "b", "c"]
console.log(Object.entries(merged)); // [["a", 1], ["b", 4], ["c", 5]]

// Object.freeze(): "Đóng băng" đối tượng [9].
// Không thể thêm, sửa, hoặc xóa thuộc tính.
Object.freeze(merged);
// merged.a = 99; // Lỗi (trong strict mode) hoặc không có tác dụng.

// Object.is(): So sánh giá trị chính xác hơn === [10].
// Đặc biệt đúng với NaN và +0/-0.
console.log(Object.is(NaN, NaN)); // true (trong khi NaN === NaN là false)

// 4. Null-prototype Objects (Đối tượng không có prototype)
// --------------------------------------------------
// Tạo object không kế thừa từ Object.prototype để tránh xung đột tên phương thức [11].
// Rất hữu ích khi dùng object làm Map/Dictionary đơn giản.

const normalObj = {};
const safeMap = Object.create(null); // [12]

// Vấn đề với object thường: Xung đột với các từ khóa có sẵn như "toString"
// normalObj["toString"] = "conflict"; // Có thể gây lỗi khi gọi hàm hệ thống

// Object.create(null) không có toString, valueOf, hasOwnProperty...
console.log(safeMap.toString); // undefined (An toàn để lưu key tên là "toString")

// Ví dụ thực tế từ MDN [13], [14]:
const ages = Object.create(null, {
  alice: { value: 18, enumerable: true },
  bob: { value: 27, enumerable: true },
});

function getAge(name) {
  return ages[name];
}
// Nếu dùng object thường, getAge("toString") sẽ trả về mã hàm.
// Với null-prototype, nó trả về undefined đúng như mong đợi.
console.log(getAge("toString")); // undefined

// 5. Kiểm tra thuộc tính (Modern check)
// --------------------------------------------------
// Thay vì dùng obj.hasOwnProperty('prop') (có thể bị lỗi nếu obj là null-prototype),
// hãy dùng Object.hasOwn() (ES2022) [15], [10].

if (Object.hasOwn(ages, "alice")) {
  console.log("Alice is present");
}
