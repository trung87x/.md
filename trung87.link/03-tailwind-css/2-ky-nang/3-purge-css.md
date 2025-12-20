## (Purge/Content Scanning)

Kỹ năng: Tailwind chứa hàng nghìn class, nhưng bạn chỉ dùng khoảng 5%. Bạn phải biết cách cấu hình để nó tự động "vứt bỏ" 95% class thừa, giúp web load nhanh như chớp.

```js
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,js}", // Tailwind sẽ quét tất cả file này
  ],
  // Những class không tìm thấy trong các file trên sẽ bị loại bỏ hoàn toàn
  theme: {
    extend: {},
  },
  plugins: [],
};
```
