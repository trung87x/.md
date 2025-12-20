## (Quy tắc đặt tên BEM)

Bài toán: Viết code sao cho 6 tháng sau đọc lại vẫn hiểu khối này là gì, không bị chồng chéo CSS.

```html
<style>
  .card {
    border: 1px solid #ccc;
  } /* Block */
  .card__title {
    font-size: 20px;
  } /* Element con của Card */
  .card__button {
    padding: 10px;
  } /* Element con của Card */
  .card__button--primary {
    background: blue;
  } /* Modifier: biến thể màu xanh */
  .card__button--danger {
    background: red;
  } /* Modifier: biến thể màu đỏ */
</style>

<div class="card">
  <h2 class="card__title">Tiêu đề bài viết</h2>
  <button class="card__button card__button--primary">Đọc thêm</button>
</div>
```
