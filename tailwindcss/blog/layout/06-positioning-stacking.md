## 📌 VI. Vị Trí Tuyệt Đối & Thứ Tự (Positioning & Stacking)

Nhóm thuộc tính này giúp bạn kiểm soát vị trí chính xác của phần tử (bất chấp luồng tài liệu thông thường) và thứ tự xếp chồng (lớp nào nằm trên lớp nào).

| Thuộc Tính CSS                   | Lớp Tailwind CSS                                    | Chức Năng Chính                                  | Ghi Chú                                                    |
| :------------------------------- | :-------------------------------------------------- | :----------------------------------------------- | :--------------------------------------------------------- |
| `position`                       | `static`, `fixed`, `absolute`, `relative`, `sticky` | Đặt phương thức định vị cho phần tử.             | `relative` thường dùng làm "neo" cho `absolute`.           |
| `top`, `right`, `bottom`, `left` | `top-{n}`, `right-{n}`, `bottom-{n}`, `left-{n}`    | Xác định toạ độ cụ thể (khoảng cách so với mốc). | Chỉ hoạt động khi `position` khác `static`.                |
| `visibility`                     | `visible`, `invisible`                              | Ẩn hoặc hiện phần tử.                            | **invisible**: Ẩn nhưng **vẫn chiếm chỗ** (khác `hidden`). |
| `z-index`                        | `z-{n}` (vd: `z-0`, `z-10`, `z-50`)                 | Đặt thứ tự xếp chồng (trục Z).                   | Số càng cao càng nằm trên.                                 |

---

### 6.1. Các Loại Positioning Phổ Biến

Hiểu rõ `position` là chìa khóa để làm các thành phần UI phức tạp.

| Lớp Tailwind   | Ý Nghĩa         | Hành Vi                                                                                                                               |
| :------------- | :-------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| **`static`**   | Tĩnh (Mặc định) | Nằm theo thứ tự bình thường của văn bản. `top/left/z-index` vô tác dụng.                                                              |
| **`relative`** | Tương đối       | Nằm ở vị trí bình thường, nhưng cho phép dùng `top/left` để dịch chuyển nhẹ. **Quan trọng:** Làm khung tham chiếu cho con `absolute`. |
| **`absolute`** | Tuyệt đối       | Thoát khỏi luồng văn bản. Nằm đè lên các phần tử khác. Vị trí dựa vào cha gần nhất có `relative`.                                     |
| **`fixed`**    | Cố định         | Dính chặt vào màn hình (viewport), không cuộn theo trang (ví dụ: nút Chat, Header).                                                   |
| **`sticky`**   | Dính            | Lúc đầu như `relative`, khi cuộn qua nó thì dính lại như `fixed`.                                                                     |

#### Ví dụ: Nút thông báo (Absolute trong Relative)

```html
<button class="**relative** p-4 bg-blue-500 text-white rounded">
  Hộp thư đến
  <span
    class="**absolute -top-2 -right-2** flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs"
  >
    3
  </span>
</button>
```

---

### 6.2. Thứ Tự Xếp Chồng (Z-Index)

Khi các phần tử đè lên nhau (do dùng `absolute`, `fixed` hoặc `margin` âm), `z-index` quyết định ai nằm trên.

- Tailwind cung cấp các mốc chuẩn: `z-0`, `z-10`, `z-20`, `z-30`, `z-40`, `z-50`, và `z-auto`.

#### Ví dụ: Modal (Cửa sổ bật lên)

```html
<div class="fixed inset-0 bg-black/50 **z-40**"></div>

<div
  class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded **z-50**"
>
  Đây là Modal quan trọng!
</div>
```

---

### 6.3. Visibility vs Display

Sự khác biệt tế nhị nhưng quan trọng giữa việc "ẩn đi".

- **`hidden` (`display: none`)**: Phần tử biến mất hoàn toàn, bố cục xung quanh lấp vào chỗ trống đó.
- **`invisible` (`visibility: hidden`)**: Phần tử trở nên trong suốt, nhưng **vẫn giữ nguyên khoảng trống** của nó.

#### Ví dụ So Sánh

```html
<div class="flex space-x-4">
  <div class="bg-red-500 p-4">Khối 1</div>
  <div class="bg-green-500 p-4 **invisible**">Khối 2 (Tàng hình)</div>
  <div class="bg-blue-500 p-4">Khối 3</div>
</div>
```
