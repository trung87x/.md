# Ứng dụng 3: Chuyển động & Trải nghiệm (Animations & Effects)

```html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Animations & Effects</title>
    <style>
      body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        gap: 50px;
        background-color: #f0f0f0;
      }

      /* 1. HOVER & TRANSITION: Chuyển cảnh mượt mà */
      .btn-hover {
        padding: 15px 30px;
        font-size: 18px;
        background-color: #3498db;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 5px;
        /* Hiệu ứng chuyển đổi trong 0.3 giây */
        transition: all 0.3s ease;
      }

      .btn-hover:hover {
        background-color: #2ecc71;
        transform: translateY(-5px); /* Nhích lên trên */
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
      }

      /* 2. KEYFRAMES: Hoạt ảnh liên tục (Loading Spinner) */
      .spinner {
        width: 50px;
        height: 50px;
        border: 5px solid #ddd;
        border-top: 5px solid #e74c3c;
        border-radius: 50%;
        /* Tên animation - Thời gian - Kiểu chạy - Lặp vô hạn */
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      /* 3. KEYFRAMES: Hiệu ứng xuất hiện (Fade In) */
      .fade-box {
        width: 100px;
        height: 100px;
        background-color: #9b59b6;
        animation: fadeIn 2s ease-in-out forwards;
      }

      @keyframes fadeIn {
        0% {
          opacity: 0;
          transform: scale(0.5);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
    </style>
  </head>
  <body>
    <button class="btn-hover">Hover Me!</button>

    <div class="spinner"></div>

    <div class="fade-box"></div>
  </body>
</html>
```

---

**Bạn có muốn tôi cung cấp mã nguồn cho "Ứng dụng 1 của JavaScript: Xử lý sự kiện (Event Handling)" không?**
