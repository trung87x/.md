# 🔄 CSS Transforms (Biến đổi Hình học 2D & 3D)

> Nhóm thuộc tính **TRANSFORMS** cho phép bạn thay đổi hình dạng, kích thước và vị trí của phần tử mà không ảnh hưởng đến luồng layout. Đây là phương pháp tạo chuyển động tối ưu hiệu suất nhất trong CSS.

---

## 1. Biến đổi Cốt Lõi (Core 2D/3D Transforms)

| **Thuộc tính**         | **Chức năng chính**                                               | **Ghi chú / Mẹo**                                                                                     |
| :--------------------- | :---------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| **`transform`**        | Áp dụng một hoặc nhiều hàm biến đổi (xoay, co giãn, dịch chuyển). | Thuộc tính rút gọn. Nên dùng `transform` cho các hiệu ứng hover thay vì `width/height` để tối ưu GPU. |
| **`transform-origin`** | Đặt điểm neo mà tại đó phép biến đổi diễn ra.                     | Mặc định là `center`. Đặt là `top left` để xoay từ góc trên bên trái.                                 |
| **`translate`**        | **Dịch chuyển** vị trí (X, Y, Z).                                 | `translate(-50%, -50%)` là thần chú căn giữa tuyệt đối.                                               |
| **`rotate`**           | **Xoay** phần tử (theo X, Y, Z).                                  | `rotate(45deg)` xoay 45 độ trên mặt phẳng 2D.                                                         |
| **`scale`**            | **Co giãn** kích thước.                                           | `scale(1.1)` làm phần tử to hơn 10% khi hover.                                                        |
| **`skew`**             | **Nghiêng** phần tử.                                              | Thường dùng để tạo hiệu ứng hình học trừu tượng.                                                      |

---

## 2. Kiểm Soát Không Gian 3D (Perspective & Style)

Các thuộc tính này cần thiết khi bạn muốn tạo hiệu ứng lật thẻ (card flip) hoặc các vật thể 3D.

| **Thuộc tính**            | **Chức năng chính**                                                      | **Ghi chú / Mẹo**                                                                                                                         |
| :------------------------ | :----------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| **`perspective`**         | Đặt **độ sâu (phối cảnh)** cho không gian 3D.                            | Phải áp dụng cho phần tử **cha**. Giá trị càng nhỏ thì phối cảnh càng rõ (tạo hiệu ứng 3D mạnh).                                          |
| **`perspective-origin`**  | Đặt **điểm nhìn** của người quan sát trong không gian 3D.                | Mặc định là `center`. Thay đổi để tạo góc nhìn từ trên xuống hoặc từ bên cạnh.                                                            |
| **`transform-style`**     | Xác định cách các phần tử con được đặt trong không gian 3D.              | Cần đặt `preserve-3d` trên phần tử **cha** để các phần tử con (ví dụ: mặt trước/sau của thẻ) được hiển thị chính xác trong không gian 3D. |
| **`backface-visibility`** | Quyết định có hiển thị mặt sau của phần tử khi nó quay 180 độ hay không. | **Cần thiết cho hiệu ứng lật thẻ.** Đặt `hidden` để che mặt sau của thẻ khi nó quay ra khỏi tầm nhìn.                                     |

---

## 💡 Mẹo nhỏ (Pro Tips)

### 1. Hiệu ứng Lật Thẻ 3D (Card Flip)

Để tạo hiệu ứng lật thẻ, bạn cần:

1.  **Cha:** `perspective` và `transform-style: preserve-3d`.
2.  **Con (Mặt trước/sau):** `backface-visibility: hidden`.
3.  **Hoạt ảnh:** Dùng `transform: rotateY(180deg)` để lật.

### 2. Ưu tiên Transform

Luôn dùng `transform: translate()` để di chuyển phần tử thay vì thay đổi thuộc tính `top/left/margin` vì `transform` được xử lý bởi **GPU**, giúp chuyển động mượt mà hơn.
