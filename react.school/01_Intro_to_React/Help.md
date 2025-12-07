### Bước 1: **Cơ Bản về JavaScript (HTML/CSS)**

- **Không thể bỏ qua:** Bạn phải hiểu vững các kiến thức JavaScript cơ bản: `const`, `let`, `function`, `array.map()`, `if/else`, toán tử 3 ngôi (`? :`), Spread Operator (`...`).
- **Tầm quan trọng:** Toàn bộ logic trong React được viết bằng JavaScript (và được nhúng vào HTML/CSS qua JSX).

### Bước 2: **JSX và Components**

- **Tạo một Component:** Bắt đầu bằng việc chỉ tạo một file `.js` và viết một function Component đơn giản chỉ trả về một thẻ `<h1>` tĩnh.
- **Hiển thị:** Đảm bảo bạn có thể hiển thị Component đó trên màn hình.

### Bước 3: **Props và Dữ liệu Tĩnh**

- **Component Cha & Con:** Tạo hai Component. Component Cha gọi Component Con và truyền một giá trị **tĩnh** (ví dụ: một chuỗi `name`) xuống Component Con thông qua Props.

### Bước 4: **State (useState)**

- **Thêm State:** Thay vì dữ liệu tĩnh, hãy thêm `useState` (ví dụ: một biến đếm `count` bắt đầu từ 0) vào Component Cha.
- **Thêm Event:** Thêm một nút bấm và một hàm `handleClick` để tăng biến `count` lên 1 bằng cách gọi `setCount(count + 1)`.

### Bước 5: **Rendering Lists**

- **Sử dụng `.map()`:** Tạo một mảng dữ liệu (như `initialTreasures` của bạn), và sử dụng `.map()` để hiển thị danh sách các Component Con (như `TreasureItem`). **Luôn nhớ** thêm thuộc tính `key`.
