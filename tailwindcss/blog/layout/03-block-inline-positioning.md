# 🚀 Tổng Hợp Các Thuộc Tính Layout Cơ Bản trong Tailwind CSS

Đây là hướng dẫn chi tiết về các thuộc tính CSS quan trọng nhất để xây dựng bố cục (Layout) trong Tailwind CSS, bao gồm `display`, Flexbox, Grid và Positioning.

---

## 🧱 I. Thuộc Tính `display`: Linh Hoạt Hóa Phần Tử

Thuộc tính `display` quyết định cách phần tử chiếm không gian và tương tác với luồng tài liệu.

| Thuộc Tính CSS           | Lớp Tailwind CSS | Chức Năng                                                  | Ví Dụ Ứng Dụng                                                                   |
| :----------------------- | :--------------- | :--------------------------------------------------------- | :------------------------------------------------------------------------------- |
| `display: block;`        | `block`          | Chiếm toàn bộ chiều rộng, luôn bắt đầu dòng mới.           | `<div class="block bg-blue-200">Khối A</div>`                                    |
| `display: inline;`       | `inline`         | Chỉ chiếm không gian cần thiết, không xuống dòng.          | `<span class="inline bg-red-200">Nội tuyến</span>`                               |
| `display: inline-block;` | `inline-block`   | Vừa nằm cùng dòng, vừa có thể đặt `w-` và `h-`.            | `<a class="inline-block w-32 h-10 bg-green-200">Link</a>`                        |
| `display: flex;`         | `flex`           | Kích hoạt mô hình Flexbox.                                 | `<div class="flex justify-center">...</div>`                                     |
| `display: grid;`         | `grid`           | Kích hoạt mô hình Grid.                                    | `<div class="grid grid-cols-3">...</div>`                                        |
| `display: flow-root;`    | `flow-root`      | Tạo BFC, ngăn chặn margin sụp đổ và chứa float.            | `<div class="flow-root p-2 bg-gray-100"><div class="float-left">...</div></div>` |
| `display: contents;`     | `contents`       | Khiến phần tử chứa biến mất, chỉ hiển thị các phần tử con. | `<ul class="flex"> <li class="contents"><a>Item</a></li> </ul>`                  |
| `display: none;`         | `hidden`         | Ẩn hoàn toàn phần tử, loại bỏ khỏi luồng.                  | `<div class="hidden">Không hiển thị</div>`                                       |

---

## 🏗️ II. Flexbox (Linh Hoạt Một Chiều)

Sắp xếp nội dung dọc theo một trục (hàng hoặc cột).

### Ví dụ Tổng Hợp Flexbox

```html
<div
  class="flex flex-col md:flex-row justify-between items-center p-4 bg-gray-100"
>
  <div class="w-20 h-10 bg-red-400">1</div>
  <div class="w-20 h-10 bg-green-400">2</div>
  <div class="w-20 h-10 bg-blue-400">3</div>
</div>
```

### 2.1. Hướng và Ngắt Dòng

| Thuộc Tính CSS            | Lớp Tailwind CSS | Chức Năng                        |
| :------------------------ | :--------------- | :------------------------------- |
| `flex-direction: row;`    | `flex-row`       | Sắp xếp theo hàng (mặc định).    |
| `flex-direction: column;` | `flex-col`       | Sắp xếp theo cột.                |
| `flex-wrap: wrap;`        | `flex-wrap`      | Cho phép các phần tử xuống dòng. |

### 2.2. Căn Chỉnh Trên Main Axis (`justify-content`)

| Thuộc Tính CSS                    | Lớp Tailwind CSS  | Chức Năng                                    |
| :-------------------------------- | :---------------- | :------------------------------------------- |
| `justify-content: center;`        | `justify-center`  | Căn giữa trục chính.                         |
| `justify-content: space-between;` | `justify-between` | Phân phối không gian đều giữa các phần tử.   |
| `justify-content: space-evenly;`  | `justify-evenly`  | Phân phối không gian đều giữa và xung quanh. |
| `justify-content: start;`         | `justify-start`   | Dồn về đầu trục chính.                       |
| `justify-content: end;`           | `justify-end`     | Dồn về cuối trục chính.                      |

### 2.3. Căn Chỉnh Trên Cross Axis (`align-items`)

| Thuộc Tính CSS          | Lớp Tailwind CSS | Chức Năng                                         |
| :---------------------- | :--------------- | :------------------------------------------------ |
| `align-items: center;`  | `items-center`   | Căn giữa trục phụ.                                |
| `align-items: start;`   | `items-start`    | Dồn về đầu trục phụ.                              |
| `align-items: stretch;` | `items-stretch`  | Kéo giãn phần tử để lấp đầy container (mặc định). |

---

## 📊 III. Grid (Linh Hoạt Hai Chiều)

Mô hình bố cục hai chiều (hàng và cột).

### Ví dụ Tổng Hợp Grid

```html
<div class="grid grid-cols-4 gap-4 p-4 bg-yellow-100">
  <div class="bg-red-400 col-span-2 h-10">Header (2 cột)</div>
  <div class="bg-green-400 h-10">Sidebar</div>
  <div class="bg-blue-400 h-10">Item</div>
  <div class="bg-purple-400 h-20 row-span-2">Main (2 hàng)</div>
  <div class="bg-indigo-400 h-10">Item</div>
  <div class="bg-pink-400 h-10">Item</div>
</div>
```

### 3.1. Thiết Lập Grid Container

| Thuộc Tính CSS                           | Lớp Tailwind CSS | Chức Năng                                 |
| :--------------------------------------- | :--------------- | :---------------------------------------- |
| `display: grid;`                         | `grid`           | Bật Grid.                                 |
| `grid-template-columns: repeat(N, 1fr);` | `grid-cols-N`    | Định nghĩa N cột có chiều rộng bằng nhau. |
| `grid-gap: X;`                           | `gap-X`          | Khoảng cách giữa các ô.                   |

### 3.2. Đặt Phần Tử Trong Grid

| Thuộc Tính CSS          | Lớp Tailwind CSS | Chức Năng                      |
| :---------------------- | :--------------- | :----------------------------- |
| `grid-column: span 2;`  | `col-span-2`     | Phần tử chiếm 2 cột.           |
| `grid-row: span 3;`     | `row-span-3`     | Phần tử chiếm 3 hàng.          |
| `grid-column-start: 2;` | `col-start-2`    | Bắt đầu tại đường lưới thứ 2.  |
| `grid-column-end: 4;`   | `col-end-4`      | Kết thúc tại đường lưới thứ 4. |

---
## 🌊 IV. Kiểm Soát Dòng Chảy & Xếp Chồng (Flow & Stacking)

Các thuộc tính hỗ trợ kiểm soát luồng văn bản và thứ tự hiển thị.

## 4.1. Float & Clear (Dòng chảy văn bản)

Mặc dù Flexbox và Grid đã thay thế `float` trong việc chia cột, nhưng `float` vẫn rất hữu ích khi bạn muốn văn bản bao quanh một hình ảnh (như trong báo chí).

```html
<div class="bg-white p-4">
  <img
    class="**float-left** mr-4 w-24 h-24 rounded bg-blue-300"
    src="..."
    alt="Ảnh minh họa"
  />

  <p>
    Đây là đoạn văn bản sẽ bao quanh hình ảnh bên trái. Thuộc tính float giúp
    tạo ra hiệu ứng tạp chí cổ điển rất tự nhiên. Khi văn bản dài hơn ảnh, nó sẽ
    tự động tràn xuống dưới ảnh.
  </p>

  <div class="**clear-both** mt-4 pt-4 border-t">
    Nội dung này đã được clear, nó sẽ nằm hoàn toàn bên dưới ảnh.
  </div>
</div>
```

---

### 4.2. Isolation (Ngữ cảnh xếp chồng)

Thuộc tính `isolation: isolate` cực kỳ hữu ích khi bạn sử dụng `z-index` và `mix-blend-mode`. Nó giúp ngăn các phần tử con tương tác hoặc bị ảnh hưởng bởi thứ tự xếp chồng của các phần tử bên ngoài container cha.

```html
<div class="**isolate** relative z-10 bg-gray-100 p-10">
  <div class="absolute top-0 left-0 z-50 w-20 h-20 bg-red-500">Con (z-50)</div>

  <p>
    Nhờ class **isolate**, "Con (z-50)" chỉ so sánh thứ tự với các anh em trong
    khối này, chứ không đè lên các menu hay popup ở bên ngoài khối cha này.
  </p>
</div>
```
