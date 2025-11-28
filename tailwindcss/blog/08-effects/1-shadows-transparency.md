Tuyệt vời\! Chủ đề tiếp theo là **Shadows & Transparency (Đổ bóng & Độ mờ)**, một nhóm tiện ích quan trọng giúp bạn thêm chiều sâu, nhấn mạnh các phần tử và kiểm soát khả năng nhìn thấy của chúng.

Tôi sẽ tổng hợp nội dung từ các tiện ích bạn cung cấp để tạo ra một bài blog ngắn gọn, đầy đủ.

---

# 🪄 Chiều Sâu & Độ Mờ: Shadows & Transparency Trong Tailwind CSS

Bộ tiện ích này kiểm soát các hiệu ứng thị giác như bóng đổ (`shadow`, `text-shadow`) và độ mờ của phần tử (`opacity`).

## 1\. 🔲 Bóng Đổ Khối: `box-shadow`

`box-shadow` (`shadow-`) thêm bóng đổ quanh khung của phần tử. Tailwind cung cấp một thang đo bóng từ nhỏ đến rất lớn, cũng như bóng đổ bên trong (`inner`).

| Class                | CSS Property            | Mô tả                                                                        |
| :------------------- | :---------------------- | :--------------------------------------------------------------------------- |
| **`shadow-sm`**      | `box-shadow: ...`       | Bóng đổ nhỏ (nhẹ và tinh tế).                                                |
| **`shadow-xl`**      | `box-shadow: ...`       | Bóng đổ rất lớn (tạo hiệu ứng nổi bật).                                      |
| **`shadow-2xl`**     | `box-shadow: ...`       | Bóng đổ cực lớn.                                                             |
| **`shadow-none`**    | `box-shadow: none;`     | Loại bỏ bóng đổ.                                                             |
| **`shadow-inner`**   | `box-shadow: inset ...` | Bóng đổ **bên trong** (tạo cảm giác phần tử bị lõm xuống).                   |
| **`shadow-red-500`** | `box-shadow: ... red;`  | Thêm màu sắc vào bóng đổ (cần kết hợp với `shadow-lg` hoặc kích thước khác). |

**Ví dụ:**

```html
<div class="shadow-md p-6 bg-white rounded-lg">...</div>
<button class="active:shadow-inner">Nhấn</button>
```

---

## 2\. 📝 Bóng Đổ Văn Bản: `text-shadow`

`text-shadow` thêm bóng đổ cho văn bản. Tailwind CSS cung cấp các tiện ích để đặt bóng đơn giản.

| Class                     | CSS Property                  | Mô tả                                                             |
| :------------------------ | :---------------------------- | :---------------------------------------------------------------- |
| **`text-shadow-sm`**      | `text-shadow: 0 1px 2px ...`  | Bóng đổ văn bản nhỏ (thường dùng cho văn bản cần độ sắc nét cao). |
| **`text-shadow-lg`**      | `text-shadow: 0 8px 16px ...` | Bóng đổ văn bản lớn.                                              |
| **`text-shadow-none`**    | `text-shadow: none;`          | Loại bỏ bóng đổ văn bản.                                          |
| **`text-shadow-red-500`** | Màu sắc bóng đổ văn bản.      |

**Lưu ý:** `text-shadow` thường được dùng để tăng khả năng đọc của văn bản trên nền ảnh.

---

## 3\. 👻 Độ Mờ: `opacity`

`opacity` (`opacity-`) kiểm soát độ mờ của phần tử, làm cho nó trong suốt hơn hoặc mờ đục hơn. Giá trị từ 0 (hoàn toàn trong suốt) đến 100 (hoàn toàn mờ đục).

| Class             | CSS Property    | Mô tả                                       |
| :---------------- | :-------------- | :------------------------------------------ |
| **`opacity-0`**   | `opacity: 0;`   | **Hoàn toàn trong suốt** (Không nhìn thấy). |
| **`opacity-50`**  | `opacity: 0.5;` | Độ mờ 50%.                                  |
| **`opacity-100`** | `opacity: 1;`   | **Hoàn toàn mờ đục** (Mặc định).            |

**Lưu ý quan trọng:** `opacity` áp dụng cho **toàn bộ** phần tử, bao gồm cả nội dung, văn bản và các phần tử con bên trong nó.

**Ví dụ:**

```html
<p class="text-xl opacity-75">Văn bản này hơi mờ.</p>

<img class="opacity-50 hover:opacity-100 transition duration-300" src="..." />
```

---

**🔥 Tóm tắt Shadows & Transparency:**

- **Tạo chiều sâu:** Dùng **`shadow-md`** hoặc **`shadow-xl`**.
- **Hiệu ứng lõm:** Dùng **`shadow-inner`**.
- **Làm mờ/trong suốt:** Dùng **`opacity-50`** hoặc **`opacity-0`**.
- **Tăng cường chữ:** Dùng **`text-shadow-sm`** (trên nền ảnh).

Bạn có muốn chuyển sang nhóm tiện ích **Filters (Bộ lọc)** như blur (làm mờ), brightness (độ sáng) và grayscale (thang độ xám) không?
