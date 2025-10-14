# 3 — Nested Function (Hàm lồng nhau) cho React Dev

> Mục tiêu: hiểu **Nested Function** (hàm được định nghĩa bên trong hàm khác), vai trò của nó trong JavaScript & React — đặc biệt trong event handler, closure, và scope chain.

---

## 1️⃣ Khái niệm cơ bản

**Nested Function** = Hàm nằm _bên trong_ một hàm khác.  
→ Có thể **truy cập biến** của hàm cha nhờ **scope chain**.

```js
function outer() {
  const outerVar = "🌍 Outer";

  function inner() {
    console.log("Inner thấy:", outerVar);
  }

  inner(); // gọi trong cha
}

outer();
```

🧠 **Giải thích:**

- `inner()` _được định nghĩa bên trong_ `outer()`, nên nó _thừa hưởng phạm vi (scope)_ của `outer()`.
- Đây là **nền tảng của closure**.

---

## 2️⃣ Nested Function = nền tảng của Closure

```js
function makeCounter() {
  let count = 0;

  function increase() {
    count++;
    console.log(count);
  }

  return increase;
}

const counter = makeCounter();
counter(); // 1
counter(); // 2
```

🧠 **Giải thích:**

- `increase()` “nhớ” biến `count` trong `makeCounter()` → **closure**.
- Sau khi `makeCounter()` chạy xong, `count` vẫn tồn tại trong bộ nhớ vì `increase` còn tham chiếu tới nó.

---

## 3️⃣ Nested Function trong React

Trong React, **mỗi function component** là một hàm, nên **bạn hoàn toàn có thể định nghĩa hàm con bên trong**.

```jsx
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    alert("Form đã được gửi!");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Nhập nội dung..." />
      <button type="submit">Gửi</button>
    </form>
  );
}
```

🧩 `handleSubmit` là **Nested Function** trong `Form` — nó chỉ tồn tại trong phạm vi của component `Form`.

---

## 4️⃣ Lợi ích & đặc điểm

| ✅ Ưu điểm                                                     | ⚠️ Hạn chế                                                                      |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| - Giúp mã gọn, dễ đọc, tránh “rò rỉ” hàm ra global.            | - Bị tạo lại mỗi lần component render.                                          |
| - Có thể truy cập state/props của component cha (nhờ closure). | - Nếu truyền xuống con mà không memo hóa, có thể gây re-render không cần thiết. |

---

## 5️⃣ Ví dụ minh họa (demo HTML + Babel)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nested Function Demo</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>

    <script type="text/babel">
      function App() {
        const [name, setName] = React.useState("");

        // 🧩 Nested function
        function handleSubmit(e) {
          e.preventDefault();

          // 🧩 Nested function bên trong event handler
          function showResult() {
            alert(`Xin chào, ${name}!`);
          }

          showResult(); // gọi hàm lồng bên trong
        }

        return (
          <form onSubmit={handleSubmit} style={{ padding: 20 }}>
            <h2>Nested Function Demo</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên của bạn..."
            />
            <button type="submit">Gửi</button>
          </form>
        );
      }

      const root = ReactDOM.createRoot(document.getElementById("root"));
      root.render(<App />);
    </script>
  </body>
</html>
```

---

## 6️⃣ Nested Function + Closure trong React

```jsx
function Counter() {
  const [count, setCount] = React.useState(0);

  // Hàm cha
  function increaseBy(step) {
    // Hàm lồng bên trong (closure)
    function doIncrease() {
      setCount((prev) => prev + step);
    }
    doIncrease();
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Count: {count}</h2>
      <button onClick={() => increaseBy(1)}>+1</button>
      <button onClick={() => increaseBy(5)}>+5</button>
    </div>
  );
}
```

🧠 **Phân tích:**

- `doIncrease()` là nested function của `increaseBy()`.
- Nó “nhớ” giá trị `step` nhờ **closure**.
- Mỗi lần gọi `increaseBy()`, `doIncrease()` hoạt động với `step` hiện tại.

---

## 7️⃣ Khi nào nên / không nên dùng

### ✅ Nên dùng

- Khi cần **tách logic nhỏ** trong 1 hàm để dễ đọc.
- Khi hàm con chỉ phục vụ riêng hàm cha hoặc component hiện tại.
- Khi cần closure (nhớ giá trị tạm, state, props).

### ⚠️ Không nên

- Khi hàm con **truyền xuống nhiều component con** → tách ra và dùng `useCallback` để tối ưu re-render.
- Khi cần tái sử dụng ở nhiều nơi → nên tách ra file riêng hoặc định nghĩa ngoài component.

---

## 8️⃣ Nested Function + useEffect cleanup

```jsx
React.useEffect(() => {
  // Hàm lồng bên trong để dọn dẹp
  function setupTimer() {
    const id = setInterval(() => console.log("Tick"), 1000);
    return () => clearInterval(id); // cleanup nested
  }

  const cleanup = setupTimer();
  return cleanup;
}, []);
```

🧠 **Giải thích:**

- `setupTimer` là nested function được gọi trong effect.
- Nó trả về 1 hàm khác (cũng là nested function) dùng cho cleanup.

---

## 9️⃣ Tổng kết nhanh

| Ý                         | Ví dụ                                                             |
| ------------------------- | ----------------------------------------------------------------- |
| ✅ Định nghĩa             | Hàm trong hàm khác.                                               |
| ✅ Truy cập biến cha      | Nhờ **scope chain**.                                              |
| ✅ Gốc của closure        | “Nhớ” biến của cha sau khi cha kết thúc.                          |
| ✅ Dùng nhiều trong React | Event handler, effect, callback, setState.                        |
| ⚠️ Cẩn thận               | Re-render sẽ tạo lại hàm → chỉ tối ưu khi cần bằng `useCallback`. |

---

## 🔟 Thực hành nhanh (console)

```js
function outer() {
  let x = 1;
  function inner() {
    x++;
    console.log("inner:", x);
  }
  return inner;
}

const fn = outer();
fn(); // inner: 2
fn(); // inner: 3
```

> 🧠 Đây là closure điển hình: `inner` là **nested function** “nhớ” biến `x` dù `outer()` đã kết thúc.

---

## ✅ Checklist ghi nhớ

- [x] Nested function truy cập được biến cha (scope chain).
- [x] Có thể trả về từ hàm cha để tạo closure.
- [x] Trong React, nên dùng cho logic ngắn, tránh rò rỉ global.
- [x] Nếu truyền xuống component con, cân nhắc `useCallback`.
- [x] Mỗi render tạo lại nested function → bình thường, trừ khi tối ưu performance.

---

## 📚 Đọc thêm

- MDN — Function scope and nested functions
- React Docs — Effects, Closures and React render cycle
- Kyle Simpson — _You Don’t Know JS Yet_ (Scope & Closures)
