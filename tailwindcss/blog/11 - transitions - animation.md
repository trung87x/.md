# 🚀 CSS Transitions & Animation

> Nhóm thuộc tính này là nền tảng để tạo ra các chuyển động mượt mà (Transitions) và các hoạt ảnh tự động, nhiều bước (Animation), giúp giao diện người dùng trở nên hiện đại và sinh động hơn.

---

## 1. Transitions (Chuyển đổi mượt mà)

**Transitions** dùng để xác định cách thức một thay đổi CSS diễn ra theo thời gian (ví dụ: khi hover).

| **Thuộc tính**                   | **Chức năng chính**                                                                    | **Ghi chú / Mẹo**                                                                        |
| :------------------------------- | :------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------- |
| **`transition-property`**        | Thuộc tính CSS nào sẽ được áp dụng chuyển đổi.                                         | Nên chỉ định rõ (`opacity`, `transform`) thay vì dùng `all` để tối ưu hiệu suất.         |
| **`transition-duration`**        | Thời gian mà hiệu ứng chuyển đổi diễn ra.                                              | Đơn vị: `s` (giây) hoặc `ms` (mili giây). Ví dụ: `0.3s`.                                 |
| **`transition-timing-function`** | Đường cong tốc độ (cách tốc độ thay đổi từ đầu đến cuối).                              | <br> `ease` (mặc định), `linear`, `ease-in`, `ease-out`.                                 |
| **`transition-delay`**           | Khoảng thời gian chờ trước khi chuyển đổi bắt đầu.                                     |                                                                                          |
| **`transition-behavior`**        | (Ít phổ biến) Định nghĩa cách các thuộc tính bị ngắt hoặc thay đổi hành vi chuyển đổi. | Thường được dùng để đảm bảo tính nhất quán của chuyển đổi trong các môi trường phức tạp. |

---

## 2. Animation (Hoạt ảnh tự động)

**Animation** là thuộc tính rút gọn dùng để liên kết phần tử với một chuỗi chuyển động phức tạp (`@keyframes`) mà nó sẽ tự động chạy.

| **Thuộc tính**  | **Chức năng chính**                                             | **Ghi chú / Mẹo**                                                              |
| :-------------- | :-------------------------------------------------------------- | :----------------------------------------------------------------------------- |
| **`animation`** | **Thuộc tính rút gọn** liên kết đến `@keyframes` đã định nghĩa. | Bao gồm tất cả các thành phần: tên, thời gian, độ trễ, số lần lặp, hướng, v.v. |

---

## 💡 Mẹo nhỏ (Pro Tips)

### 1. Phân biệt Transition và Animation

| **Đặc điểm**      | **Transition**                                             | **Animation**                                      |
| :---------------- | :--------------------------------------------------------- | :------------------------------------------------- |
| **Kích hoạt**     | Do sự kiện **thay đổi trạng thái** (`:hover`, thêm class). | **Tự động chạy** khi trang tải.                    |
| **Tính phức tạp** | 2 trạng thái (A -> B).                                     | Nhiều trạng thái trung gian (`0%`, `50%`, `100%`). |

### 2. Tối ưu Hiệu suất

Để có hiệu ứng chuyển động mượt mà nhất (sử dụng GPU), bạn nên giới hạn chuyển đổi chỉ trên hai thuộc tính:

1.  **`opacity`**
2.  **`transform`** (dùng `scale`, `translate`, `rotate` thay vì thay đổi trực tiếp `width`, `height`, `top`, hay `left`).
