# ⚙️ ĐẠO HỌC JAVASCRIPT  
*Một cách nhìn triết học về ngôn ngữ của hành động và nhân quả.*

---

## 🧩 1️⃣ function → Đạo
> “Đạo” là gốc — hiểu function là hiểu bản chất của JavaScript.  
> Function sinh ra để tạo hành động, để định nghĩa dòng chảy.

```js
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("Trung"));
```
➡️ Đây là **Đạo** — đơn giản, thuần khiết, xác định rõ *đầu vào – đầu ra*.  
Không cần phức tạp, chỉ cần có *trật tự và mục đích*.

---

## 📜 2️⃣ pure function → Đạo lý
> “Đạo lý” là sống đúng bản chất — không tạo side effect, không làm rối thế giới ngoài mình.

```js
function add(a, b) {
  return a + b; // Không làm thay đổi gì ngoài phạm vi của nó
}
```
👉 Một **pure function** không làm thay đổi biến bên ngoài,  
chỉ làm việc trong phạm vi của mình — như người hiểu đạo lý:  
**“Giữ tâm trong sáng, không nhiễu loạn thế gian.”**

---

## 🌱 3️⃣ immutability → Nhân quả
> “Nhân quả” trong code: bạn thay đổi dữ liệu, dữ liệu thay đổi lại bạn.  
> Nếu không kiểm soát, “quả” sẽ sai.

```js
const user = { name: "Trung", age: 25 };

// ❌ Sai đạo: trực tiếp thay đổi
// user.age = 26;

// ✅ Đúng đạo: tạo bản sao, giữ nguyên nhân gốc
const updatedUser = { ...user, age: 26 };

console.log(user.age); // 25
console.log(updatedUser.age); // 26
```
👉 **Immutability** là hiểu luật nhân quả:  
mọi thay đổi phải có *ý thức* và *trách nhiệm*.  
Không làm hỏng “nhân gốc” — để kết quả được trong sáng.

---

## 💫 4️⃣ composition → Thiện nghiệp
> “Thiện nghiệp” là tạo nên điều tốt bằng cách kết hợp những phần nhỏ lại một cách hài hòa.  
> Trong JS, đó là **composition** — hợp nhiều function nhỏ thành logic lớn, sạch và đẹp.

```js
const toUpper = str => str.toUpperCase();
const exclaim = str => `${str}!`;
const greet = name => `Hello, ${name}`;

const excitedGreet = name => exclaim(toUpper(greet(name)));

console.log(excitedGreet("world")); // HELLO, WORLD!
```
👉 Đây là **Thiện nghiệp**:  
từng hàm nhỏ đều “thuần thiện”, không side effect,  
khi kết hợp lại, tạo nên *một kết quả đẹp, trọn vẹn, an lành*.

---

## 🌿 Tóm tắt Đạo học JavaScript

| Tầng | JavaScript concept | Triết lý | Ví dụ | Ý nghĩa |
|------|--------------------|-----------|--------|----------|
| 🧩 **Đạo** | `function` | Hành động có mục đích | `function greet(name)` | Đặt nền tảng cho logic. |
| 📜 **Đạo lý** | `pure function` | Không làm rối thế giới ngoài mình | `return a + b;` | Giữ sự trong sáng trong code. |
| 🌱 **Nhân quả** | `immutability` | Mọi thay đổi đều có hệ quả | `{ ...obj }` | Giữ “nhân” để “quả” đúng. |
| 💎 **Thiện nghiệp** | `composition` | Hợp tác tạo ra cái đẹp | `exclaim(toUpper(...))` | Sự hòa hợp giữa các hàm thuần. |

---

> “Functions are thoughts.  
> Pure functions are wisdom.  
> Immutability is karma.  
> Composition is harmony.” ✨  
