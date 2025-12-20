## Flexbox & Grid

Kỹ năng: Dùng Flexbox cho các thành phần đơn giản (menu, căn giữa) và Grid cho cấu trúc tổng thể phức tạp (dàn trang báo, danh sách sản phẩm).

```html
<style>
  /* CSS Grid: Chia cột cho danh sách sản phẩm */
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }

  /* Flexbox: Căn chỉnh nội dung bên trong mỗi card */
  .product-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid #ddd;
    padding: 15px;
  }
</style>

<div class="product-grid">
  <div class="product-card">
    <h3>Sản phẩm 1</h3>
    <button>Mua ngay</button>
  </div>
  <div class="product-card">
    <h3>Sản phẩm 2 có mô tả dài hơn</h3>
    <button>Mua ngay</button>
  </div>
</div>
```
