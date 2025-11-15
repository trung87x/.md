# 🎨 ĐẠO HỌC TAILWIND  
*Một cách nhìn triết học về ngôn ngữ của giản lược và hài hòa.*

---

## 🧩 1️⃣ Utility Class → ĐẠO
> “Đạo” là gốc — mỗi class nhỏ là một hành động có ý nghĩa.  
> Không rườm rà, không ẩn giấu — rõ ràng như ánh sáng.

```html
<div class="p-4 bg-blue-500 text-white rounded-lg">
  Utility là Đạo — đơn giản mà hiệu quả.
</div>
```
➡️ Mỗi class là một “ý niệm nhỏ”: `p-4` là khoảng cách, `bg-blue-500` là sắc thái, `rounded-lg` là biên độ.  
Tất cả cùng nhau tạo nên **sự hài hòa trong trật tự**, không cần CSS riêng.

> “Biết Đạo là biết đủ.  
> Mỗi class là một hơi thở, không thừa không thiếu.”  

---

## 📜 2️⃣ @apply → ĐẠO LÝ
> “Đạo lý” là hiểu bản chất — gom điều hợp lý để giữ tinh giản.  
> Khi hiểu sâu utility, bạn biết lúc nào nên gom lại cho gọn.

```css
/* style.css */
.btn-primary {
  @apply px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700;
}
```

```html
<button class="btn-primary">Bấm vào Đạo</button>
```
➡️ @apply là **hiểu đạo lý của utility**: gom không phải để phức tạp hơn,  
mà để **trật tự và dễ đọc hơn**.  

> “Hiểu đạo là biết gom vừa đủ,  
> gom sai là chấp vào hình tướng.”  

---

## 🌱 3️⃣ Theme Config → NHÂN QUẢ
> “Nhân quả” là quy luật — gieo giá trị trong `tailwind.config.js`,  
> gặt sự nhất quán trong toàn bộ dự án.

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        karma: "#d97706",
      },
    },
  },
};
```

```html
<div class="bg-karma text-white p-3">Gieo karma, gặt quả đẹp 😄</div>
```
➡️ Khi bạn **gieo nhân đúng (theme có quy luật)**,  
màu sắc, spacing, font đều **tự nhiên đồng bộ** – không còn “mạnh ai nấy style”.

> “Gieo trong config, gặt trong layout.  
> Thiết kế có nhân, giao diện có quả.”  

---

## 💫 4️⃣ Variant (hover:, dark:, sm:) → THIỆN NGHIỆP
> “Thiện nghiệp” là phản ứng thuận duyên —  
> khi UI biết lắng nghe hoàn cảnh mà tự biến đổi.

```html
<button class="bg-green-500 hover:bg-green-600 dark:bg-green-800 sm:px-8 px-4 py-2 text-white rounded">
  Thuận duyên mà chuyển
</button>
```
➡️ Mỗi variant là một “duyên”: hover → cảm xúc; dark → hoàn cảnh; sm → bối cảnh thiết bị.  
Code của bạn **trở nên có tâm**, biết *khi nào nên thay đổi, khi nào nên tĩnh lặng.*

> “Thuận duyên thì biến, nghịch duyên thì an.  
> CSS không cần cứng, chỉ cần thuận.”  

---

## 🌿 Tóm gọn ĐẠO HỌC TAILWIND

| Tầng | Concept | Triết lý | Ví dụ |
|------|----------|-----------|--------|
| 🧩 **Đạo** | Utility class | Đơn giản, rõ ràng, vô vi nhi vô bất vi | `bg-blue-500 p-4 rounded` |
| 📜 **Đạo lý** | `@apply` | Gom điều hợp lý, không lạm dụng | `.btn-primary { @apply ... }` |
| 🌱 **Nhân quả** | Theme config | Gieo giá trị, gặt sự nhất quán | `extend.colors.karma` |
| 💫 **Thiện nghiệp** | Variants | Thuận duyên mà phản ứng | `hover:, dark:, sm:` |

---

> “Tailwind là Đạo của giản lược.  
> Không thêm, không bớt — chỉ còn lại sự trong sáng.” ✨  
