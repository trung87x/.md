# 🎨 ĐẠO HỌC CSS  
*Một cách nhìn triết học về ngôn ngữ của hình và khí.*

---

## 🧩 1️⃣ Cascading → ĐẠO
> “Đạo” là dòng chảy — CSS sinh ra từ ý niệm *cascade*,  
> nơi mọi quy tắc hòa vào nhau theo thứ tự tự nhiên.

```css
body {
  color: black;
}

p {
  color: blue;
}
```
```html
<p>Đạo là sự chảy của ưu tiên và ảnh hưởng.</p>
```
➡️ Màu **xanh** hiển thị vì *quy luật cascade*.  
CSS dạy ta: **mọi thứ có thứ tự, có mức độ, có ảnh hưởng.**

> “Đạo không ép, chỉ chảy.  
> Ai thuận dòng thì sáng, ai nghịch dòng thì rối.”  

---

## 📜 2️⃣ Specificity → ĐẠO LÝ
> “Đạo lý” là hiểu *vì sao cái này thắng cái kia*.  
> Không phải mạnh nhất thắng, mà là *đúng vị trí, đúng tầng.*

```css
p {
  color: blue;
}

.container p {
  color: red;
}
```
➡️ **Specificity** dạy rằng:  
quy tắc không phải chỉ đúng — nó còn phải *đúng nơi, đúng tầm*.  

> “Đạo lý là hiểu sức nặng của mỗi lời.”  
> Một selector càng cụ thể, lời nói càng có trọng lượng.  

---

## 🌱 3️⃣ Inheritance → NHÂN QUẢ
> “Nhân quả” trong CSS là **kế thừa** —  
> cha sinh con, con nhận màu, font, khí.  
> Nhưng nếu con cố thay đổi, quả sẽ khác.

```css
body {
  font-family: "Serif";
  color: black;
}

article {
  color: green;
}
```
```html
<article>
  <p>Tôi nhận font từ cha, nhưng tự chọn màu của mình.</p>
</article>
```
➡️ CSS **inheritance** là minh chứng của nhân quả:  
Cái gì “nên nhận” thì nhận, cái gì “nên thay” thì thay.  

> “Không phải tất cả đều kế thừa,  
> mà là biết khi nào nên giữ, khi nào nên buông.”  

---

## 💫 4️⃣ Responsive & Variables → THIỆN NGHIỆP
> “Thiện nghiệp” là thích ứng — CSS giúp giao diện **hòa hợp với mọi cảnh duyên**.  
> Dù thiết bị, màu nền, hay theme có đổi, trang vẫn giữ được tâm sáng.

```css
:root {
  --main-color: #1e90ff;
}

@media (max-width: 640px) {
  body {
    background-color: var(--main-color);
  }
}
```
➡️ CSS **biết lắng nghe** – không cố định, mà linh hoạt.  
Như con người biết tùy duyên, mà không đánh mất bản chất.

> “Thiện nghiệp là phản ứng đúng mà không dao động.  
> CSS đẹp khi nó tự nhiên.”  

---

## 🌿 Tóm tắt ĐẠO HỌC CSS

| Tầng | Concept | Triết lý | Ví dụ |
|------|----------|-----------|--------|
| 🧩 **Đạo** | Cascading | Dòng chảy ưu tiên tự nhiên | `p { color }` |
| 📜 **Đạo lý** | Specificity | Sức nặng của vị trí | `.container p` |
| 🌱 **Nhân quả** | Inheritance | Gieo trong cha, gặt ở con | `color`, `font-family` |
| 💫 **Thiện nghiệp** | Responsive / Variables | Thuận duyên mà biến hóa | `@media`, `--var()` |

---

> “CSS là nghệ thuật của cân bằng.  
> Không cứng – không mềm,  
> không ép – không thả.  
> Nó là Đạo của hình và khí.” ✨  
