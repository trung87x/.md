# 📐 Kiểm Soát Tỷ Lệ Khung Hình Dễ Dàng Với `aspect-ratio` trong Tailwind CSS

###

Chào các Tailwind fan! Hôm nay chúng ta sẽ tìm hiểu về bộ tiện ích **`aspect-ratio`**, công cụ giúp bạn dễ dàng kiểm soát tỷ lệ khung hình (aspect ratio) của các phần tử (như ảnh, video) mà không cần viết CSS phức tạp.

## 🚀 Tổng Quan Nhanh

###

| **Class**            | **Style**                | **Mô tả**                                  |
| -------------------- | ------------------------ | ------------------------------------------ |
| **`aspect-<ratio>`** | `aspect-ratio: <ratio>;` | Đặt tỷ lệ tùy chỉnh (ví dụ: `aspect-3/2`). |
| **`aspect-square`**  | `aspect-ratio: 1 / 1;`   | Khung hình vuông.                          |
| **`aspect-video`**   | `aspect-ratio: 16 / 9;`  | Tỷ lệ video tiêu chuẩn.                    |
| **`aspect-auto`**    | `aspect-ratio: auto;`    | Dùng tỷ lệ mặc định của phần tử.           |

## 💡 Các Ví Dụ Cơ Bản

### 1\. Tỷ Lệ Tùy Chỉnh (Cơ bản nhất)

###

Sử dụng `aspect-<width>/<height>` để đặt một tỷ lệ cụ thể.

    <img class="aspect-3/2 object-cover w-full" src="/img/villas.jpg" />

### 2\. Dành cho Video

###

Sử dụng `aspect-video` cho tỷ lệ 16:9 phổ biến, rất tiện cho `<iframe>` hoặc video.

    <iframe class="aspect-video w-full" src="https://www.youtube.com/embed/..." />

### 3\. Giá Trị Tùy Chỉnh (Custom Values)

###

Dùng cú pháp **`aspect-[<value>]`** để sử dụng mọi giá trị CSS hợp lệ, bao gồm cả `calc()`:

    <img class="aspect-[calc(4*3+1)/3] w-full" src="/img/villas.jpg" />

    <img class="aspect-(--my-aspect-ratio) w-full" src="/img/villas.jpg" />

## 🖥️ Thiết Kế Đáp Ứng (Responsive)

###

Giống như mọi tiện ích khác, bạn có thể áp dụng tỷ lệ khung hình khác nhau cho từng kích thước màn hình bằng cách thêm tiền tố:

    <iframe class="aspect-video md:aspect-square w-full" src="..." />

## 🎨 Tùy Biến Chủ Đề (Customizing Theme)

###

Nếu bạn cần sử dụng lại một tỷ lệ đặc biệt, hãy thêm vào file cấu hình theme của bạn:

    @theme {
      /* Khai báo biến theme --aspect-retro */
      --aspect-retro: 4 / 3;
    }

Sau đó, bạn có thể sử dụng class **`aspect-retro`** trong HTML:

    <iframe class="aspect-retro w-full" src="..." />

---

**🔥 Tóm tắt:** `aspect-ratio` giúp bạn cố định tỷ lệ khung hình (3/2, 16/9, 1/1,...) mà không cần dùng padding hack, làm cho việc xây dựng bố cục với hình ảnh/video trở nên **sạch sẽ và dễ bảo trì hơn**.
