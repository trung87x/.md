# Ứng dụng 2: Truyền tải dữ liệu qua Form (Data Handling)

```html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <title>Form Đăng Ký</title>
    <style>
      body {
        font-family: sans-serif;
        display: flex;
        justify-content: center;
        padding: 50px;
      }
      form {
        border: 1px solid #ccc;
        padding: 20px;
        border-radius: 8px;
        width: 300px;
      }
      div {
        margin-bottom: 15px;
      }
      label {
        display: block;
        margin-bottom: 5px;
      }
      input {
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
      }
      button {
        width: 100%;
        padding: 10px;
        background-color: #007bff;
        color: white;
        border: none;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <form action="/submit-server" method="POST">
      <h2>Đăng Ký</h2>

      <div>
        <label for="user">Tên đăng nhập:</label>
        <input type="text" id="user" name="username" required />
      </div>

      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required />
      </div>

      <div>
        <label for="pass">Mật khẩu:</label>
        <input type="password" id="pass" name="password" required />
      </div>

      <button type="submit">Gửi dữ liệu</button>
    </form>
  </body>
</html>
```

---

**Bạn có muốn tôi cung cấp tiếp mã nguồn cho "Ứng dụng 3: Tích hợp đa phương tiện (Media Integration)" không?**
