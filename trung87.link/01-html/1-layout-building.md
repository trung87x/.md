# Ứng dụng 1: Cấu trúc hóa giao diện (Layout Building)

```html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <title>Wireframe Layout</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
      }
      header,
      nav,
      main,
      aside,
      footer {
        border: 2px solid #333;
        padding: 20px;
        margin: 5px;
        text-align: center;
      }
      .container {
        display: flex;
        min-height: 300px;
      }
      aside {
        flex: 1;
      }
      main {
        flex: 3;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>HEADER (Logo, Search)</h1>
      <nav>NAV (Menu điều hướng)</nav>
    </header>

    <div class="container">
      <aside>
        <h2>SIDEBAR</h2>
      </aside>

      <main>
        <h2>MAIN CONTENT</h2>
      </main>
    </div>

    <footer>
      <p>FOOTER (Copyright, Social Media)</p>
    </footer>
  </body>
</html>
```

---

**Bạn có muốn tôi cung cấp tiếp mã nguồn cho "Ứng dụng 2: Định dạng kiểu dáng (CSS)" không?**
