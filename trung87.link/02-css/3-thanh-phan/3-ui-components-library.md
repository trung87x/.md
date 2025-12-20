## (Bộ công cụ "hái ra tiền")

Thay vì mỗi dự án mỗi viết lại code, bạn hãy xây dựng một thư viện các thành phần (Component) dùng chung. Điều này giúp bạn làm dự án cho khách hàng nhanh gấp 3 lần.

```html
<style>
  /* Base Button */
  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    transition: 0.3s;
  }
  .btn--primary {
    background: #007bff;
    color: white;
  }
  .btn--primary:hover {
    background: #0056b3;
    transform: translateY(-2px);
  }

  /* Modern Card */
  .card-ui {
    width: 300px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    background: #fff;
  }
  .card-ui__img {
    height: 180px;
    background: #ddd;
  }
  .card-ui__body {
    padding: 15px;
  }
</style>

<div class="card-ui">
  <div class="card-ui__img"></div>
  <div class="card-ui__body">
    <h4>Khóa học HTML/CSS Pro</h4>
    <button class="btn btn--primary">Đăng ký ngay</button>
  </div>
</div>
```
