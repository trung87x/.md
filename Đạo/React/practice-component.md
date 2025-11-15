# React Components Practice — 1 File

> Mục tiêu: luyện **props**, **state**, **sự kiện**, **render danh sách** qua 7 component ngắn gọn.  
> Cách dùng: copy từng file vào dự án React (Vite/CRA). Hoặc dùng trực tiếp trong `App.jsx`.

---

## 0) Cách chạy nhanh (gợi ý)
```bash
# Nếu dùng Vite
npm create vite@latest my-react-practice -- --template react
cd my-react-practice
npm i
npm run dev
```
Trong `src/App.jsx`, import các component để test dần.

---

## 1) Greeting.jsx — props cơ bản
```jsx
function Greeting({ name }) {
  return <h2>Xin chào, {name}!</h2>;
}
export default Greeting;
```
**Dùng thử:**
```jsx
<Greeting name="Trung" />
```
**Bài tập:** nếu `name` là "Trung" thì thêm 😎, nếu là "Mai" thì thêm 🌸.

---

## 2) Button.jsx — props hiển thị
```jsx
function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}
export default Button;
```
**Dùng thử:**
```jsx
<Button label="Click tôi!" onClick={() => alert("Đã click")} />
```
**Bài tập:** thêm props `variant` = "primary" | "ghost" để đổi style.

---

## 3) Card.jsx — tách giao diện
```jsx
function Card({ title, content }) {
  return (
    <div className="border p-12 rounded-md shadow-sm">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
}
export default Card;
```
**Dùng thử:**
```jsx
<Card title="React cơ bản" content="Props, State, Render" />
```
**Bài tập:** thêm `children` để chèn nội dung tuỳ ý.

---

## 4) Counter.jsx — state & sự kiện
```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Giá trị: {count}</p>
      <button onClick={() => setCount(count + 1)}>Tăng</button>
    </div>
  );
}
export default Counter;
```
**Bài tập:** thêm nút **Giảm** và **Đặt lại**.

---

## 5) ToggleText.jsx — điều kiện render
```jsx
import { useState } from "react";

function ToggleText() {
  const [visible, setVisible] = useState(true);
  return (
    <div>
      <button onClick={() => setVisible(!visible)}>
        {visible ? "Ẩn" : "Hiện"}
      </button>
      {visible && <p>Xin chào React!</p>}
    </div>
  );
}
export default ToggleText;
```
**Bài tập:** đổi nút thành công tắc: “👁️ Hiện/Ẩn”.

---

## 6) TodoList.jsx — danh sách + input
```jsx
import { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState(["Học React", "Uống cà phê"]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo]);
      setNewTodo("");
    }
  };

  return (
    <div>
      <h3>Việc cần làm:</h3>
      <ul>
        {todos.map((todo, i) => (
          <li key={i}>{todo}</li>
        ))}
      </ul>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Thêm việc..."
      />
      <button onClick={addTodo}>Thêm</button>
    </div>
  );
}
export default TodoList;
```
**Bài tập:** thêm nút xóa từng việc; Enter để thêm.

---

## 7) ColorBox.jsx — state + style inline
```jsx
import { useState } from "react";

function ColorBox() {
  const [color, setColor] = useState("gray");

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <div
        style={{
          width: 100,
          height: 100,
          backgroundColor: color,
          borderRadius: 8,
        }}
      />
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setColor("blue")}>Xanh</button>
        <button onClick={() => setColor("red")}>Đỏ</button>
        <button onClick={() => setColor("green")}>Xanh lá</button>
      </div>
    </div>
  );
}
export default ColorBox;
```
**Bài tập:** thêm ô nhập màu tự do (`#ff00ff`).

---

## 8) App.jsx — ví dụ ghép nhanh
```jsx
import Greeting from "./Greeting";
import Button from "./Button";
import Card from "./Card";
import Counter from "./Counter";
import ToggleText from "./ToggleText";
import TodoList from "./TodoList";
import ColorBox from "./ColorBox";

export default function App() {
  return (
    <div style={{ padding: 16, display: "grid", gap: 16 }}>
      <Greeting name="Trung" />

      <Button label="Nút demo" onClick={() => console.log("clicked")} />

      <Card title="Thẻ thông tin" content="Nội dung thẻ" />

      <Counter />

      <ToggleText />

      <TodoList />

      <ColorBox />
    </div>
  );
}
```
**Gợi ý:** Test từng component một; bật ESLint/Prettier để code sạch.

---

## Checklist tự đánh giá
- [ ] Đọc hiểu dữ liệu đi qua **props**.
- [ ] Quản lý **state** (khởi tạo, cập nhật, reset).
- [ ] Bắt **sự kiện** `onClick`, `onChange`, `onKeyDown`.
- [ ] Render **điều kiện** và **danh sách** (key đúng).
- [ ] Tách component nhỏ – dễ tái sử dụng.

> Khi xong bộ này, hãy luyện tiếp: **Form có validation**, **fetch API (fake)**, **lift state up**.