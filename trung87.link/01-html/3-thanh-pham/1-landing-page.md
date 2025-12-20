Đây là trang dùng để chuyển đổi khách hàng. Nó phải có cấu trúc rõ ràng và các nút kêu gọi hành động (CTA).

```html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Landing Page Bán Hàng | Chuẩn SEO</title>
    <style>
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: sans-serif;
      }
      .hero {
        background: #f4f4f4;
        padding: 60px 20px;
        text-align: center;
      }
      .cta-button {
        background: #ff4757;
        color: white;
        padding: 15px 30px;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
        display: inline-block;
        margin-top: 20px;
      }
      @media (max-width: 600px) {
        .hero h1 {
          font-size: 1.5rem;
        }
      }
    </style>
  </head>
  <body>
    <header>
      <nav style="padding: 20px; background: white;">
        <strong>BRAND LOGO</strong>
      </nav>
    </header>
    <main>
      <section class="hero">
        <h1>Giải Pháp Lập Trình Cho Doanh Nghiệp</h1>
        <p>Biến ý tưởng của bạn thành sản phẩm thực tế chỉ trong 30 ngày.</p>
        <a href="#order" class="cta-button">NHẬN TƯ VẤN NGAY</a>
      </section>
    </main>
  </body>
</html>
```
