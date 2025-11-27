##

Các tiện ích này nằm trong nhóm **Layout** của Tailwind CSS và dùng để kiểm soát tỷ lệ khung hình của một phần tử.

### I. Layout Cố Định cho Hình Ảnh (`<img>`)

##

Sử dụng `aspect-<ratio>` để đặt bố cục hình ảnh theo tỷ lệ nhất định.

| Layout Class        | Tỷ lệ             | Ví dụ Áp dụng                                                                                                                |
| ------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **`aspect-3/2`**    | Tỷ lệ 3/2         | `<img class="aspect-3/2 object-cover ..." src="https://images.unsplash.com/photo-1486671736870-2f695ecdf813?q=80&w=1974" />` |
| **`aspect-square`** | Tỷ lệ 1/1 (Vuông) | `aspect-ratio: 1 / 1;`                                                                                                       |
| **`aspect-auto`**   | Tỷ lệ mặc định    | `aspect-ratio: auto;`                                                                                                        |

### II. Layout Chuẩn cho Video và Khung Nhúng (`<iframe>`)

##

Sử dụng `aspect-video` để thiết lập bố cục 16 / 9, lý tưởng cho video.

    <!-- Thiết lập Layout 16/9 cho iframe/video -->
    <iframe class="aspect-video ..." src="https://www.youtube.com/embed/GyXBRxK-5L0?si=LKK8Z71qqSYvz6D5"></iframe>

### III. Layout Nâng Cao và Tùy Chỉnh

##

Sử dụng cú pháp tùy ý để kiểm soát bố cục linh hoạt hơn cho `<img>` hoặc `<iframe>`.

| Loại Layout                | Cú pháp                      | Ví dụ Áp dụng                                                           |
| -------------------------- | ---------------------------- | ----------------------------------------------------------------------- |
| **Layout bằng Phép tính**  | `aspect-[<value>]`           | `<img class="aspect-[calc(4*3+1)/3] ..." src="/img/villas.jpg" />`      |
| **Layout bằng Biến CSS**   | `aspect-(<custom-property>)` | `<img class="aspect-(--my-aspect-ratio) ..." src="/img/villas.jpg" />`  |
| **Layout Đáp ứng**         | `md:aspect-square`           | `<iframe class="aspect-video md:aspect-square ..." src="..."></iframe>` |
| **Layout Tùy chỉnh Theme** | `aspect-retro` (ví dụ)       | `<iframe class="aspect-retro" src="..."></iframe>`                      |

_(Việc tùy chỉnh theme cần khai báo biến `--aspect-retro : 4 / 3 ;` trong `@theme`)_.
