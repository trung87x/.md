# Ứng dụng 2: Thiết kế đáp ứng (Responsive Design)

```html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Responsive Design Example</title>
    <style>
      /* 1. Mobile First (Giao diện mặc định cho điện thoại) */
      body {
        font-family: sans-serif;
        margin: 0;
        background-color: #f4f4f4;
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
      }

      .box {
        background-color: coral;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
      }

      /* 2. Tablet (Màn hình từ 768px trở lên) */
      @media (min-width: 768px) {
        body {
          flex-direction: row;
          background-color: lightblue;
        }
        .box {
          flex: 1;
          height: 200px;
        }
      }

      /* 3. Desktop / 4K (Màn hình từ 1200px trở lên) */
      @media (min-width: 1200px) {
        body {
          background-color: lightgreen;
          padding: 50px;
        }
        .box {
          height: 300px;
          font-size: 2rem;
        }
      }
    </style>
  </head>
  <body>
    <div class="box">Khối 1</div>
    <div class="box">Khối 2</div>
    <div class="box">Khối 3</div>
  </body>
</html>
```

---

**Bạn có muốn tôi cung cấp mã nguồn cho "Ứng dụng 3: Tương tác người dùng với JavaScript (User Interaction)" không?**
