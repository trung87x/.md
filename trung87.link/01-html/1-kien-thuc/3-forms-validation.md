Kỹ năng cần đạt: Biết cách dùng các kiểu dữ liệu (type) và ràng buộc dữ liệu (required, minlength) ngay từ phía khách hàng.

```html
<form action="/gui-du-lieu" method="POST">
  <label for="user-email">Email đăng ký:</label>
  <input type="email" id="user-email" required placeholder="nhap@email.com" />

  <label for="pass">Mật khẩu:</label>
  <input type="password" id="pass" minlength="8" required />

  <button type="submit">Đăng ký ngay</button>
</form>
```
