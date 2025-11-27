## 🏞 IV. Hình ảnh & Đa phương tiện (Media)



Phần này giúp bạn kiểm soát cách hình ảnh hoặc video hiển thị bên trong khung chứa của nó, tránh việc hình bị méo hoặc bị cắt sai vị trí.

| Thuộc tính | Lớp Tailwind CSS | Chức năng chính | Ghi chú |
| :--- | :--- | :--- | :--- |
| **`object-fit`** | `object-cover`, `object-contain`, `object-fill`... | Quy định cách hình ảnh/video được điều chỉnh để khớp với container của nó (ví dụ: `cover`, `contain`). | Rất cần thiết cho hình ảnh trong các card để tránh bị méo hình. |
| **`object-position`** | `object-center`, `object-top`, `object-left-bottom`... | Xác định điểm neo (anchor point) của hình ảnh/video trong container khi nó bị cắt (`object-fit: cover`). | Giúp chỉnh tâm điểm của ảnh (ví dụ: muốn lấy khuôn mặt ở phía trên thay vì giữa ảnh). |

### Ví dụ minh họa

```html
<div class="flex gap-4">
  
  <div class="w-40 h-40 bg-gray-200">
    <p class="text-sm mb-1">Object Cover</p>
    <img src="..." class="w-full h-full **object-cover** rounded" alt="Cover">
  </div>

  <div class="w-40 h-40 bg-gray-200">
    <p class="text-sm mb-1">Object Contain</p>
    <img src="..." class="w-full h-full **object-contain** rounded" alt="Contain">
  </div>

  <div class="w-40 h-40 bg-gray-200">
    <p class="text-sm mb-1">Cover + Top</p>
    <img src="..." class="w-full h-full **object-cover object-top** rounded" alt="Focus Top">
  </div>

</div>