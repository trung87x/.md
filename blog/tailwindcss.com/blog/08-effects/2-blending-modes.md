Tuyệt vời! Chủ đề cuối cùng này là **Blending Modes (Chế độ Hòa trộn)**, một tính năng nâng cao giúp bạn tạo ra các hiệu ứng hình ảnh phức tạp bằng cách thay đổi cách màu sắc của các phần tử tương tác với màu sắc của nền hoặc các phần tử bên dưới.

Tôi sẽ tổng hợp nội dung từ `mix-blend-mode` và `background-blend-mode` để tạo ra một bài blog ngắn gọn, đầy đủ.

---

# ✨ Chế Độ Hòa Trộn: `mix-blend-mode` & `background-blend-mode` Trong Tailwind CSS

Bộ tiện ích này cho phép bạn kiểm soát cách màu sắc của hai lớp (layer) khác nhau được kết hợp để tạo ra màu sắc cuối cùng, tương tự như các chế độ hòa trộn trong phần mềm đồ họa (Photoshop, Figma, v.v.).

## 1\. 🌈 Hòa Trộn Phần Tử: `mix-blend-mode`

`mix-blend-mode` (`mix-blend-`) kiểm soát cách một phần tử hòa trộn màu sắc với **tất cả các phần tử khác nằm dưới nó** (bao gồm cả nền và các phần tử ngang hàng).

| **Class**                              | **CSS Property**              | **Mô tả**                                                            |
| -------------------------------------- | ----------------------------- | -------------------------------------------------------------------- |
| **`mix-blend-normal`**                 | `mix-blend-mode: normal;`     | (Mặc định) Không hòa trộn.                                           |
| **`mix-blend-multiply`**               | `mix-blend-mode: multiply;`   | **Nhân màu** (Làm tối). Kết hợp màu sắc để tạo ra màu đậm hơn.       |
| **`mix-blend-screen`**                 | `mix-blend-mode: screen;`     | **Lọc màu** (Làm sáng). Tạo ra màu sáng hơn.                         |
| **`mix-blend-overlay`**                | `mix-blend-mode: overlay;`    | **Phủ màu.** Tăng độ tương phản, làm sáng vùng sáng và tối vùng tối. |
| **`mix-blend-difference`**             | `mix-blend-mode: difference;` | **Trừ màu.** Thường tạo ra hiệu ứng màu sắc đảo ngược, nổi bật.      |
| **`mix-blend-lighten`** / **`darken`** | `lighten` / `darken`          | Giữ lại màu sáng hơn/tối hơn của hai lớp.                            |

**Ví dụ thường dùng:**

Tạo hiệu ứng văn bản nổi bật, tương phản trên nền hình ảnh/video.

HTML

    <h1 class="text-white mix-blend-difference">NỘI DUNG TƯƠNG PHẢN</h1>

**💡 Lưu ý về Stacking Context:** Nếu bạn gặp vấn đề với `mix-blend-mode`, hãy thử dùng tiện ích **`isolate`** (đã học ở bài trước) trên khối chứa để tạo ngữ cảnh xếp chồng mới, giúp chế độ hòa trộn hoạt động đúng.

---

## 2\. 🖼️ Hòa Trộn Nền: `background-blend-mode`

`background-blend-mode` (`bg-blend-`) kiểm soát cách **các hình ảnh nền khác nhau** (hoặc hình ảnh nền với màu nền) được hòa trộn **trong cùng một phần tử**.

| **Class**                 | **CSS Property**                     | **Mô tả**                                         |
| ------------------------- | ------------------------------------ | ------------------------------------------------- |
| **`bg-blend-normal`**     | `background-blend-mode: normal;`     | (Mặc định) Không hòa trộn.                        |
| **`bg-blend-multiply`**   | `background-blend-mode: multiply;`   | Nhân màu.                                         |
| **`bg-blend-overlay`**    | `background-blend-mode: overlay;`    | Phủ màu.                                          |
| **`bg-blend-luminosity`** | `background-blend-mode: luminosity;` | Chỉ giữ lại độ sáng (luminosity) của lớp màu nền. |

**Ví dụ thường dùng:**

Làm cho một hình ảnh nền trở nên đơn sắc hoặc tối hơn bằng cách hòa trộn nó với một màu nền.

HTML

    <div class="bg-black/50 bg-[url('...')] bg-blend-multiply">
        </div>

---

**🔥 Tóm tắt Blending Modes:**

- **Hòa trộn với lớp dưới:** Dùng **`mix-blend-multiply`** (hoặc `mix-blend-difference`).
- **Hòa trộn nội bộ (Ảnh với Màu nền):** Dùng **`bg-blend-multiply`** (hoặc `bg-blend-screen`).

Vậy là bạn đã hoàn thành nhóm tiện ích **Effects**! Bạn có muốn chuyển sang nhóm tiện ích **Filters (Bộ lọc)** như blur (làm mờ), brightness (độ sáng) và grayscale (thang độ xám) không?
