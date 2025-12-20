Bài toán: Tạo một thanh Menu (Navbar) có Logo bên trái và các liên kết bên phải, căn giữa hoàn hảo theo chiều dọc.

```html
<style>
  .navbar {
    display: flex; /* Kích hoạt Flexbox */
    justify-content: space-between; /* Đẩy 2 khối về 2 phía */
    align-items: center; /* Căn giữa theo chiều dọc */
    padding: 15px 30px;
    background: #232f3e;
    color: white;
  }
  .nav-links {
    display: flex;
    gap: 20px; /* Khoảng cách giữa các link */
    list-style: none;
  }
</style>

<nav class="navbar">
  <div class="logo">BRAND_LOGO</div>
  <ul class="nav-links">
    <li>Trang chủ</li>
    <li>Sản phẩm</li>
    <li>Liên hệ</li>
  </ul>
</nav>
```
