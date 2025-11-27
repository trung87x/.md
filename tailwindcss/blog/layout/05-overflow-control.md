## 🌊 V. Kiểm Soát Tràn (Overflow Control)



Phần này quản lý cách hiển thị nội dung khi nó vượt quá kích thước (chiều rộng hoặc chiều cao) của phần tử chứa nó.

| Thuộc tính | Lớp Tailwind CSS | Chức năng chính | Ghi chú |
| :--- | :--- | :--- | :--- |
| **`overflow`** | `overflow-auto`, `overflow-hidden`, `overflow-scroll`, `overflow-visible` | Xử lý nội dung bị tràn ra khỏi kích thước phần tử (ví dụ: `scroll`, `hidden`, `auto`). | **`hidden`**: Cắt bỏ phần thừa.<br>**`auto`**: Chỉ hiện thanh cuộn khi nội dung quá dài. |
| **`overscroll-behavior`** | `overscroll-auto`, `overscroll-contain`, `overscroll-none` | Điều chỉnh hành vi của trình duyệt khi cuộn đến cuối một phần tử có thể cuộn. | **Cực kỳ quan trọng**: Ngăn cuộn nền (background) khi đang cuộn bên trong một hộp thoại (modal) hoặc sidebar. |

### Ví dụ minh họa

```html
<div class="h-32 w-64 bg-white border **overflow-y-auto** p-2">
  <p>
    Nội dung dài... Nếu văn bản này vượt quá chiều cao 32 (h-32), 
    thanh cuộn dọc sẽ xuất hiện.
  </p>
</div>

<div class="fixed right-0 top-0 h-full w-64 bg-gray-100 **overflow-y-auto overscroll-contain**">
  <div class="p-4">
    Menu Sidebar nội dung dài. 
    Khi cuộn hết sidebar này, trang web chính phía sau sẽ KHÔNG bị cuộn theo.
  </div>
  <div class="h-[2000px]"></div> 
</div>