# Ứng dụng 1: Dàn trang hiện đại (Layout Master)

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modern Layout Master</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: sans-serif; padding: 20px; gap: 20px; display: flex; flex-direction: column; }

        /* 1. FLEXBOX: Căn chỉnh hàng/cột thông minh */
        .flex-nav {
            display: flex;
            justify-content: space-between; /* Đẩy các phần tử ra 2 đầu */
            align-items: center;            /* Căn giữa theo chiều dọc */
            background: #333;
            color: white;
            padding: 15px;
        }
        .flex-nav ul {
            display: flex;
            list-style: none;
            gap: 20px; /* Khoảng cách giữa các item */
        }

        /* 2. CSS GRID: Bố cục Dashboard/Trang báo phức tạp */
        .grid-dashboard {
            display: grid;
            grid-template-columns: 250px 1fr 300px; /* 3 cột */
            grid-template-rows: auto 1fr;           /* 2 hàng */
            gap: 15px;
            height: 500px;
        }

        .grid-dashboard div {
            border: 2px solid #007bff;
            padding: 20px;
            background: #e7f3ff;
        }

        .header { grid-column: 1 / span 3; } /* Trải dài qua 3 cột */
        .sidebar { grid-row: 2 / 3; }
        .main-content { grid-row: 2 / 3; }
        .extra-info { grid-row: 2 / 3; }

    </style>
</head>
<body>

    <nav class="flex-nav">
        <div class="logo">LOGO</div>
        <ul>
            <li>Trang chủ</li>
            <li>Sản phẩm</li>
            <li>Liên hệ</li>
        </ul>
        <button>Đăng nhập</button>
    </nav>

    <section class="grid-dashboard">
        <div class="header">Dashboard Header (Grid-column: span 3)</div>
        <div class="sidebar">Sidebar (Cột 1)</div>
        <div class="main-content">Main Content (Cột 2)</div>
        <div class="extra-info">Extra Info (Cột 3)</div>
    </section>

</body>
</html>

```

---

**Bạn có muốn tôi cung cấp mã nguồn cho "Ứng dụng 2: Hiệu ứng chuyển động (Transform & Animation)" không?**