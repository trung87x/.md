## (Định vị phần tử)

Kỹ năng: Đặt các phần tử vào vị trí đặc biệt như Menu dính ở đỉnh trang (Fixed) hoặc nút Chat nằm cố định ở góc màn hình.

```html
<style>
  .header {
    position: sticky;
    top: 0;
    background: white;
    z-index: 100; /* Luôn nằm trên các phần tử khác khi cuộn */
  }

  .floating-chat {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #007bff;
    color: white;
    padding: 15px;
    border-radius: 50%;
  }
</style>

<header class="header">Menu điều hướng (Sticky)</header>
<div class="floating-chat">💬</div>
```
