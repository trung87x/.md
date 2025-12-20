## (Kiểm soát không gian)

Bài toán: Bạn tạo một nút bấm hoặc một khung nội dung, nhưng nó cứ bị tràn hoặc to hơn dự kiến. Bạn cần làm chủ cách tính kích thước.

```html
<style>
  .box {
    /* Quan trọng nhất: Giúp kích thước bao gồm cả padding/border */
    box-sizing: border-box;

    width: 300px;
    padding: 20px;
    border: 5px solid #2c3e50;
    margin: 30px; /* Khoảng cách với các phần tử xung quanh */
    background-color: #ecf0f1;
  }
</style>

<div class="box">Kích thước tổng của tôi luôn là 300px nhờ box-sizing!</div>
```
