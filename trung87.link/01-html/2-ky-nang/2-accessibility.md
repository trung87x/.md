## Nút bấm chuẩn quốc tế

Bài toán: Bạn dùng một Icon (hình ảnh) để làm nút đóng cửa sổ. Người khiếm thị sẽ không biết đó là nút gì nếu bạn không dùng ARIA.

```html
<div onclick="close()"><img src="close-icon.png" /></div>

<button aria-label="Đóng cửa sổ quảng cáo" onclick="close()">
  <span aria-hidden="true">&times;</span>
</button>
```
