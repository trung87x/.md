Tuyệt vời\! Chủ đề **Borders (Đường viền)** là một nhóm tiện ích thiết yếu, giúp bạn tạo đường viền, bo góc và định hình các phần tử.

Tôi sẽ tổng hợp nội dung từ các tiện ích bạn cung cấp để tạo ra một bài blog ngắn gọn, đầy đủ về cách kiểm soát đường viền trong Tailwind CSS.

---

# 🖼️ Định Hình Phần Tử: Kiểm Soát Đường Viền (Borders) Trong Tailwind CSS

Bộ tiện ích này giúp bạn kiểm soát bốn khía cạnh chính của đường viền: **độ dày**, **màu sắc**, **kiểu dáng** và **bo góc**.

## 1\. 📏 Độ Dày Đường Viền: `border-width`

`border-width` (`border-`) xác định độ dày của đường viền. Bạn có thể đặt độ dày đồng nhất cho tất cả các cạnh hoặc riêng lẻ cho từng cạnh.

| Class            | CSS Property                    | Mô tả                                          |
| :--------------- | :------------------------------ | :--------------------------------------------- |
| **`border`**     | `border-width: 1px;`            | Đường viền mặc định (1px) cho tất cả các cạnh. |
| **`border-2`**   | `border-width: 2px;`            | Đường viền 2px.                                |
| **`border-t-4`** | `border-top-width: 4px;`        | Đường viền 4px chỉ ở **cạnh trên**.            |
| **`border-x-0`** | `border-left/right-width: 0px;` | **Loại bỏ** đường viền trên trục ngang.        |

**Ví dụ:**

```html
<div class="border border-gray-700">...</div>
```

---

## 2\. 🌈 Màu Sắc Đường Viền: `border-color`

`border-color` (`border-`) xác định màu sắc của đường viền, sử dụng thang màu mặc định của Tailwind CSS.

| Class                    | CSS Property                 | Mô tả                                           |
| :----------------------- | :--------------------------- | :---------------------------------------------- |
| **`border-blue-500`**    | `border-color: #3b82f6;`     | Màu xanh lam độ đậm 500.                        |
| **`border-t-red-500`**   | `border-top-color: #ef4444;` | Chỉ đặt màu đỏ cho **cạnh trên**.               |
| **`border-transparent`** | `border-color: transparent;` | Đường viền trong suốt (thường dùng để giữ chỗ). |

**Ví dụ:**

```html
<div class="border-2 border-orange-500 border-b-black">...</div>
```

---

## 3\. 〰️ Kiểu Dáng Đường Viền: `border-style`

`border-style` (`border-`) xác định kiểu dáng của đường viền (rắn, nét đứt, nét chấm...).

| Class               | CSS Property            | Mô tả                                         |
| :------------------ | :---------------------- | :-------------------------------------------- |
| **`border-solid`**  | `border-style: solid;`  | Đường viền **đặc** (rắn). (Thường dùng nhất). |
| **`border-dashed`** | `border-style: dashed;` | Đường viền **nét đứt**.                       |
| `border-dotted`     | `border-style: dotted;` | Đường viền **chấm chấm**.                     |
| `border-double`     | `border-style: double;` | Đường viền **kép**.                           |
| `border-none`       | `border-style: none;`   | **Loại bỏ** kiểu dáng đường viền.             |

**Lưu ý:** Nếu bạn không đặt kiểu, đường viền sẽ không hiển thị ngay cả khi bạn đặt độ dày và màu sắc. `border` (1px) mặc định kiểu là `solid`.

---

## 4\. 📐 Bo Góc: `border-radius`

`border-radius` (`rounded-`) kiểm soát độ bo tròn của các góc. Tailwind cung cấp thang đo dễ sử dụng, từ nhỏ đến hình tròn hoàn hảo.

| Class                | CSS Property                             | Mô tả                                                                     |
| :------------------- | :--------------------------------------- | :------------------------------------------------------------------------ |
| **`rounded`**        | `border-radius: 0.25rem;`                | Bo góc **mặc định** (nhỏ).                                                |
| **`rounded-lg`**     | `border-radius: 0.5rem;`                 | Bo góc **lớn hơn**.                                                       |
| **`rounded-full`**   | `border-radius: 9999px;`                 | Tạo thành hình **tròn hoàn hảo** (khi chiều rộng và chiều cao bằng nhau). |
| **`rounded-t-xl`**   | `border-top-left/right-radius: 0.75rem;` | Chỉ bo góc **trên** (trái và phải).                                       |
| **`rounded-bl-3xl`** | `border-bottom-left-radius: 1.5rem;`     | Chỉ bo góc **dưới bên trái**.                                             |

**Ví dụ:**

```html
<div class="rounded-xl border-2 border-purple-500 p-4">...</div>
```

---

**🔥 Tóm tắt Borders:**

1.  **Đường viền Cơ bản:** Dùng **`border`** (1px solid) + **`border-color`** (ví dụ: `border-gray-400`).
2.  **Bo góc Tròn:** Dùng **`rounded-full`** (hình tròn) hoặc **`rounded-lg`** (bo góc).
3.  **Làm nổi bật cạnh:** Dùng **`border-b-4`** (đường viền dày ở cạnh dưới) + **`border-solid`**.

Bạn có muốn chuyển sang nhóm tiện ích **Effects (Hiệu ứng)** như shadow (bóng), opacity (độ mờ) và blend mode (chế độ hòa trộn) không?
