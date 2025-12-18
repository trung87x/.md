# 🚀 Phần 1: Nguyên Lý Cơ Bản Cần Lĩnh Ngộ (The Core Principles)

Đây là **"trái tim" của React**, những khái niệm nền tảng mà bạn cần nắm vững để tư duy đúng theo lối React (**Thinking in React**).

---

## 1\. 🏗️ Component (Thành phần)

- **Component** là **khối xây dựng cơ bản** của Giao diện Người dùng (UI). Trong React, component là các **hàm JavaScript** trả về các thẻ mô tả giao diện (**markup**, tức là JSX).
- **Nguyên tắc quan trọng (Thuần khiết):** Component phải là **hàm thuần khiết (pure function)**. Nghĩa là với cùng một đầu vào (**Props**), nó luôn trả về cùng một kết quả **JSX** và **không** làm thay đổi các biến số bên ngoài.

---

## 2\. 📝 JSX (Cú pháp Mở rộng)

- **JSX** là nơi **logic hiển thị** và **markup** (giống HTML) cùng tồn tại.
- JSX trông giống HTML nhưng thực chất là **JavaScript** và **nghiêm ngặt hơn** (ví dụ: phải đóng tất cả thẻ, phải trả về một thẻ cha duy nhất).
- Bạn dùng **ngoặc nhọn `{}`** để mở "cửa sổ" chèn **logic JavaScript** (biến, biểu thức, lời gọi hàm) vào trong JSX.

---

## 3\. 💾 Props và State (Dữ liệu)

### 🔸 Props (Properties)

- Là cách **truyền dữ liệu từ cha xuống con**.
- Props là **bất biến** (**read-only snapshots**) – bạn **không thể thay đổi** chúng trực tiếp bên trong component con. Chúng là dữ liệu đầu vào ổn định.

### 🔹 State (Trạng thái)

- Là **"bộ nhớ" riêng** của component.
- Khác với biến thường, khi **State thay đổi**, React sẽ **tự động kích hoạt việc render lại** để cập nhật giao diện.
- State hoạt động như một **bản chụp (snapshot)** tại thời điểm render hiện tại.

---

## 4\. 🔄 Render và Commit (Quy trình hiển thị)

- **Hiểu quy trình hiển thị:**

  1.  React kích hoạt **Render** (gọi Component của bạn).
  2.  Component chạy và trả về một cây JSX mới (Virtual DOM).
  3.  **Commit** (Áp dụng thay đổi): React so sánh cây JSX mới với cây cũ và chỉ thay đổi những phần tử DOM thực sự khác biệt trên trình duyệt.

---

## 5\. 🎣 Hooks (Các Hàm Móc Nối)

- **Hooks** là các **hàm đặc biệt** (bắt đầu bằng `use`) giúp bạn **móc nối** vào các tính năng cốt lõi của React:

  - `useState`: Để thêm bộ nhớ (State) vào component hàm.
  - `useEffect`: Để xử lý các tác vụ phụ (Side Effects).

- Bạn cũng có thể tự viết **Custom Hooks** (ví dụ: `useFetchData`, `useDarkMode`) để **tái sử dụng logic** trạng thái giữa các component mà không cần lặp lại code.

---

## 6\. 🚪 Escape Hatches (Lối Thoát Hiểm)

Đây là các công cụ dành cho việc tương tác với thế giới bên ngoài React:

- **Effects (`useEffect`):**

  - Dùng để **đồng bộ hóa component với hệ thống bên ngoài** (như server, DOM trình duyệt, các thư viện không phải React).
  - **Lưu ý:** Đây **không phải** là nơi chính để xử lý các sự kiện người dùng (user events), mà là nơi để xử lý các tác vụ phụ sau khi render.

- **Refs (`useRef`):**

  - Dùng để **lưu trữ thông tin** **không** kích hoạt render lại khi nó thay đổi (ví dụ: ID của timeout, giá trị trước đó của State).
  - Cũng dùng để lấy **tham chiếu trực tiếp** đến một phần tử DOM (ví dụ: để focus vào input).

---

# 🌐 Phần 2: Các Hình Thức Tồn Tại và Dự Án Lớn của React

Phần này mô tả cách React được sử dụng trong thực tế, từ những hệ thống lớn đến các dự án mẫu kinh điển.

---

## 1\. ⚙️ Các "Cỗ Máy" Full-stack (Full-stack Frameworks)

Đây là những **"thành phẩm lớn"** nhất trong hệ sinh thái. Thay vì chỉ là một thư viện UI, chúng là những hệ thống hoàn chỉnh giúp bạn xây dựng ứng dụng quy mô sản xuất.

- **Next.js (App Router):**

  - Đây là một **"dự án lớn" tiêu biểu**.
  - Tận dụng tối đa kiến trúc của React để cung cấp một giải pháp toàn diện bao gồm định tuyến (**routing**), tối ưu hóa hiệu năng, và tích hợp các tính năng tiên tiến như **Server Components**.

- **React Router (v7):**

  - Trước đây chỉ là thư viện điều hướng, nay đã phát triển thành một framework full-stack đầy đủ khi kết hợp với Vite.
  - Hỗ trợ quản lý dữ liệu và định tuyến nâng cao.

- **Expo:**

  - Đây là **"hình thức" React dành cho di động** (mobile).
  - Là một framework khổng lồ giúp bạn viết code React nhưng xuất ra ứng dụng **Native** thực sự cho **Android**, **iOS** và cả **Web**, với hệ sinh thái API riêng để truy cập phần cứng điện thoại.

---

## 2\. 🧱 Các Hình thức Kiến trúc Ứng dụng (Architectural Forms)

React biến hóa thành nhiều dạng **"cơ thể"** khác nhau tùy thuộc vào nơi nó sống và cách nó được render. Đây là các hình thức tồn tại của React:

- **Single-Page Applications (SPA):**

  - Hình thức cổ điển. Ứng dụng tải một trang HTML duy nhất, và React đảm nhận việc cập nhật **nội dung động** ngay trên trình duyệt khi người dùng tương tác.

- **Server-Side Rendering (SSR) & Streaming:**

  - React chạy trên **máy chủ (server)**, tạo ra HTML và gửi về trình duyệt để hiển thị nội dung **nhanh hơn**.
  - Sau đó, nó **"bơm" sự tương tác** vào (quá trình **hydration**).

- **Static Site Generation (SSG):**

  - React chạy tại thời điểm **build** (đóng gói) để tạo ra các **file HTML tĩnh** vĩnh viễn.
  - Dạng này rất nhanh và nhẹ, thường dùng cho các trang nội dung ít thay đổi (blog, tài liệu).

- **React Server Components (RSC):**

  - Hình thức mới nhất và tiên tiến nhất.
  - Cho phép **trộn lẫn** các component chỉ chạy trên **server** (để truy cập database trực tiếp) và các component chạy trên **client** (để tương tác) trong cùng một cây ứng dụng.

---

## 3\. 🦠 Hình thức "Ký sinh" (Integration / Add-on)

React không nhất thiết phải chiếm toàn bộ dự án. Nó có một hình thức tồn tại là **"nhúng"** vào các dự án đã có sẵn (như các web cũ viết bằng Rails, PHP, hay Django).

- **Subroute Interactivity:**

  - Bạn có thể dùng React chỉ để quản lý **một phần nhỏ** của trang web (ví dụ: một widget chat, một biểu đồ tương tác) hoặc một nhóm trang con cụ thể.
  - Phần còn lại của web vẫn dùng công nghệ cũ. Đây là cách React được sử dụng tại Meta (Facebook) trong nhiều năm.

---

## 4\. 📚 Các "Dự án mẫu" Kinh điển (Canonical Examples)

Trong tài liệu React, có những **"thành phẩm" nhỏ** nhưng đại diện cho tư duy xây dựng dự án thực tế:

- **Tic-Tac-Toe (Game Caro):**

  - Một dự án hoàn chỉnh minh họa cách quản lý **lịch sử nước đi** (**Time Travel**), tính toán người thắng cuộc và trạng thái trò chơi.

- **Filterable Product Table (Bảng quản lý sản phẩm):**

  - Dự án đại diện cho các ứng dụng quản lý dữ liệu (**Dashboard**).
  - Minh họa tư duy **chia nhỏ UI** và quản lý **dòng dữ liệu một chiều**.
