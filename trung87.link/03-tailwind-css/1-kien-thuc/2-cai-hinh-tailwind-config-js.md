## (Tùy biến thương hiệu)

Đây là nơi bạn thể hiện sự chuyên nghiệp. Khách hàng sẽ đưa cho bạn một bộ nhận diện thương hiệu (màu sắc, font chữ riêng). Bạn không thể dùng màu mặc định của Tailwind mà phải đưa chúng vào file cấu hình.

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        "brand-blue": "#1DA1F2", // Màu riêng của khách hàng
        "brand-dark": "#14171A",
      },
      fontFamily: {
        main: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
```
