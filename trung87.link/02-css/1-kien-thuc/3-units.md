## (Đơn vị linh hoạt cho Responsive)

Bài toán: Bạn muốn trang web tự co giãn đẹp mắt trên cả iPhone và màn hình Desktop 24 inch. Đừng dùng mỗi px.

```html
<style>
  html {
    font-size: 16px;
  } /* Gốc */

  .container {
    width: 90%; /* Chiếm 90% chiều rộng màn hình bất kể thiết bị */
    max-width: 1200px; /* Nhưng không bao giờ vượt quá 1200px trên máy tính */
  }

  .text {
    font-size: 1.25rem; /* = 1.25 x 16px = 20px. Dễ dàng scale toàn bộ web */
    margin-bottom: 5vh; /* Cách đáy 5% chiều cao màn hình hiển thị */
  }
</style>

<div class="container">
  <p class="text">Giao diện của tôi linh hoạt trên mọi thiết bị.</p>
</div>
```
