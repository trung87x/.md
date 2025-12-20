## (Xây dựng thần tốc)

hay vì đau đầu nghĩ tên class như .product-card-container-v2, bạn sử dụng các lớp tiện ích có sẵn để định dạng trực tiếp.

So sánh sự khác biệt:

CSS thuần: Viết HTML → Đặt tên class → Sang file CSS viết thuộc tính.

Tailwind: Viết trực tiếp vào HTML.

```html
<div
  class="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 hover:shadow-2xl transition-shadow"
>
  <div class="text-indigo-600 font-bold text-xl">Tailwind CSS</div>
  <p class="text-slate-500 mt-2">Giúp bạn tạo thành phẩm nhanh gấp 5 lần!</p>
  <button
    class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
  >
    Bắt đầu ngay
  </button>
</div>
```
