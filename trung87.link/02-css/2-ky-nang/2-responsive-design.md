## (Media Queries)

Kỹ năng: Thay đổi giao diện dựa trên kích thước màn hình. Đây là kỹ năng "hái ra tiền" vì khách hàng luôn yêu cầu web chạy tốt trên mobile.

```css
/* Giao diện mặc định cho Mobile (Mobile First) */
.sidebar {
  width: 100%;
  display: none;
} /* Khi màn hình lớn hơn 768px (Tablet/PC) */
@media (min-width: 768px) {
  .sidebar {
    display: block;
    width: 250px;
    float: left;
  }
  .main-content {
    margin-left: 270px;
  }
}
```
