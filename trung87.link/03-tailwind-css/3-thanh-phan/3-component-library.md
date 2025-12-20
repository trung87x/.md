## (Kho báu cá nhân)

Đây là cách bạn tối ưu hóa lợi nhuận. Bạn xây dựng sẵn một bộ các thành phần (Buttons, Modals, Cards) chuẩn UI/UX để "ráp" vào bất kỳ dự án nào sau này.

```html
<div
  class="group relative bg-white border rounded-2xl p-4 transition-all hover:shadow-xl"
>
  <div class="aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
    <img
      src="product.jpg"
      alt=""
      class="h-full w-full object-cover group-hover:scale-105 transition-transform"
    />
  </div>
  <div class="mt-4 flex justify-between">
    <div>
      <h3 class="text-sm text-gray-700">Nike Air Max</h3>
      <p class="mt-1 text-lg font-medium text-gray-900">$120</p>
    </div>
    <button
      class="opacity-0 group-hover:opacity-100 bg-black text-white p-2 rounded-full transition-opacity"
    >
      🛒
    </button>
  </div>
</div>
```
