# React Hooks & Context — Thực hành nâng cao

> Mục tiêu: Hiểu và làm chủ cơ chế **Hooks** (logic sống) và **Context** (dòng dữ liệu toàn cục).  
> Sau khi hoàn thành, bạn sẽ kiểm soát React như một hệ thống có tư duy.

---

## ⚙️ PHẦN 1 – HOOKS PRACTICE 🧠

### 1️⃣ useState — Bộ đếm nâng cao
```jsx
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Giá trị: {count}</p>
      <button onClick={() => setCount(count + 1)}>Tăng</button>
      <button onClick={() => setCount(count - 1)}>Giảm</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```
**Nhiệm vụ+:** Nếu `count > 10`, hiển thị `"Giới hạn!"`.

---

### 2️⃣ useEffect — Tác vụ phụ & cleanup
```jsx
import { useState, useEffect } from "react";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return <p>⏱️ Đã trôi: {seconds}s</p>;
}
```
**Nhiệm vụ+:** Khi `seconds > 5`, hiển thị `"Đã hết giờ!"` và dừng đồng hồ.

---

### 3️⃣ useRef — Lưu trữ & focus input
```jsx
import { useRef } from "react";

export default function FocusInput() {
  const inputRef = useRef();

  return (
    <div>
      <input ref={inputRef} placeholder="Nhập gì đó..." />
      <button onClick={() => inputRef.current.focus()}>Focus!</button>
    </div>
  );
}
```
**Nhiệm vụ+:** Thêm nút `Clear` để xoá nội dung input qua ref.

---

### 4️⃣ useMemo — Tối ưu tính toán
```jsx
import { useState, useMemo } from "react";

export default function Fibonacci() {
  const [n, setN] = useState(1);

  const fib = useMemo(() => {
    const calc = (x) => (x <= 1 ? x : calc(x - 1) + calc(x - 2));
    return calc(n);
  }, [n]);

  return (
    <div>
      <input type="number" value={n} onChange={(e) => setN(Number(e.target.value))} />
      <p>Fibonacci({n}) = {fib}</p>
    </div>
  );
}
```
**Nhiệm vụ+:** Dùng `console.time()` để đo thời gian tính toán.

---

### 5️⃣ useCallback — Giữ hàm không đổi
```jsx
import { useState, useCallback } from "react";

function Child({ onClick }) {
  console.log("Render Child");
  return <button onClick={onClick}>Nhấn con</button>;
}

export default function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Nhấn nút con");
  }, []);

  return (
    <div>
      <p>Đếm: {count}</p>
      <button onClick={() => setCount(count + 1)}>Tăng cha</button>
      <Child onClick={handleClick} />
    </div>
  );
}
```
**Nhiệm vụ+:** Dùng `React.memo(Child)` để tối ưu re-render.

---

### 6️⃣ useReducer — State phức tạp
```jsx
import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "add": return { count: state.count + 1 };
    case "sub": return { count: state.count - 1 };
    case "reset": return { count: 0 };
    default: return state;
  }
}

export default function CounterReducer() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Giá trị: {state.count}</p>
      <button onClick={() => dispatch({ type: "add" })}>+</button>
      <button onClick={() => dispatch({ type: "sub" })}>-</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}
```
**Nhiệm vụ+:** Thêm `step` cho mỗi lần tăng/giảm.

---

### 7️⃣ Custom Hook — Tách logic tái sử dụng
```jsx
import { useState, useEffect } from "react";

function useMouse() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return pos;
}

export default function MouseTracker() {
  const { x, y } = useMouse();
  return <p>🖱️ {x}, {y}</p>;
}
```
**Nhiệm vụ+:** Hiển thị thêm “Khoảng cách di chuyển tổng”.

---

## 🌐 PHẦN 2 – CONTEXT PRACTICE 🕸️

### 8️⃣ ThemeContext — Hệ thống theme toàn cục
```jsx
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const toggle = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <div className={theme === "light" ? "bg-white text-black" : "bg-black text-white"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

function Switcher() {
  const { theme, toggle } = useContext(ThemeContext);
  return <button onClick={toggle}>Đổi theme ({theme})</button>;
}

export default function App() {
  return (
    <ThemeProvider>
      <Switcher />
      <p>Nội dung trang</p>
    </ThemeProvider>
  );
}
```
**Nhiệm vụ+:** Lưu theme vào `localStorage`.

---

### 9️⃣ UserContext — Chia sẻ thông tin người dùng
```jsx
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

function LoginButton() {
  const { user, setUser } = useContext(UserContext);
  return user ? (
    <button onClick={() => setUser(null)}>Đăng xuất ({user})</button>
  ) : (
    <button onClick={() => setUser("Trung")}>Đăng nhập</button>
  );
}

function Profile() {
  const { user } = useContext(UserContext);
  return <p>{user ? `Xin chào, ${user}` : "Chưa đăng nhập"}</p>;
}

export default function App() {
  return (
    <UserProvider>
      <LoginButton />
      <Profile />
    </UserProvider>
  );
}
```
**Nhiệm vụ+:** Thêm `role` (“admin”, “user”) và hiển thị quyền.

---

## ✅ Checklist Hoàn Thành

- [ ] Biết dùng `useState`, `useEffect`, `useRef`.
- [ ] Hiểu khi nào dùng `useMemo` và `useCallback`.
- [ ] Dùng `useReducer` cho state phức tạp.
- [ ] Tạo **custom hook** tái sử dụng logic.
- [ ] Dùng `Context` để chia sẻ dữ liệu toàn app.
- [ ] Hiểu cách Hooks tạo “hơi thở” cho component.

> Khi hoàn thành bộ này, bạn chính thức kiểm soát **toàn bộ chu trình sống của React**.  
> Bước tiếp theo: **“Lifting State Up” và “Data Flow Management”.**