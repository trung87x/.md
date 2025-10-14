# 4 — Closure Function (Hàm bao đóng) cho React Dev

> Mục tiêu: hiểu **closure** chuẩn JS và **cách nó tương tác với vòng đời render của React 18** để tránh lỗi “stale closure”. Có ví dụ chạy ngay (CDN + Babel), checklist, và mẫu khắc phục thường gặp.

---

## 0) TL;DR (nhanh gọn)

- **Closure**: hàm “_nhớ_” được các biến ở phạm vi lúc **nó được tạo ra** (không phải lúc nó được gọi).
- Trong **React function component**, **mỗi lần render** tạo ra **một phiên bản mới** của các hàm → chúng “nhớ” **snapshot state/props** của **render đó**.
- Lỗi thường gặp: **stale closure** khi dùng timer, async, event listener… → hàm dùng **state cũ**.
- Cách sửa:
  1. Dùng **functional update**: `setX(prev => ...)`
  2. Đặt logic vào **useEffect** (đúng dependency) + **cleanup**
  3. Lưu giá trị **mới nhất vào `useRef`** và đọc từ `ref.current` trong callback dài sống (timer, socket).
  4. Memo handler với **useCallback** đúng `deps` (khi truyền xuống con/memo).

---

## 1) Closure là gì? (cơ bản JS)

```js
function makeCounter() {
  let n = 0;
  return function () {
    n += 1;
    return n;
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

**Giải thích:** hàm trả về “nhớ” biến `n` của `makeCounter()` → đó là **closure**.

---

## 2) “State là snapshot” trong React

```jsx
function Demo() {
  const [count, setCount] = React.useState(0);

  function log() {
    console.log("count trong lần render này =", count);
  }

  log(); // mỗi render, giá trị log là snapshot của render đó
  // ... JSX
}
```

- Mỗi render → tạo **hàm `log` mới** → `log` “nhớ” giá trị `count` **của render hiện tại**.
- Khi state thay đổi → render lại → **không** làm đổi closure của **hàm cũ** đã gán cho timer/listener trước đó.

---

## 3) Stale closure điển hình và cách sửa

### 3.1. `setInterval` (đếm sai vì snapshot cũ)

```jsx
function BadCounter() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1); // ❌ dùng snapshot cũ
    }, 1000);
    return () => clearInterval(id);
  }, []); // effect chỉ chạy 1 lần, 'count' luôn là 0

  return <div>Count: {count}</div>;
}
```

**Sửa 1 — functional update**

```jsx
function GoodCounter() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setCount((prev) => prev + 1); // ✅ luôn lấy giá trị mới nhất
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <div>Count: {count}</div>;
}
```

**Sửa 2 — giữ “giá trị mới nhất” trong `ref`**

```jsx
function GoodCounterRef() {
  const [count, setCount] = React.useState(0);
  const latest = React.useRef(count);

  React.useEffect(() => {
    latest.current = count; // cập nhật mỗi render
  });

  React.useEffect(() => {
    const id = setInterval(() => {
      setCount(latest.current + 1); // đọc giá trị mới nhất
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <div>Count: {count}</div>;
}
```

### 3.2. Event listener ngoài React

```jsx
function BadListener() {
  const [text, setText] = React.useState("A");

  React.useEffect(() => {
    function onKey(e) {
      // ❌ luôn log snapshot 'text' của render đầu
      console.log("text =", text);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return <input value={text} onChange={(e) => setText(e.target.value)} />;
}
```

**Sửa — dùng `ref` để giữ giá trị mới nhất**

```jsx
function GoodListener() {
  const [text, setText] = React.useState("A");
  const latest = React.useRef(text);

  React.useEffect(() => {
    latest.current = text;
  });

  React.useEffect(() => {
    function onKey() {
      console.log("text =", latest.current); // ✅ luôn mới
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return <input value={text} onChange={(e) => setText(e.target.value)} />;
}
```

### 3.3. Fetch/async và cleanup

```jsx
function UserBox({ id }) {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    let cancelled = false;

    async function load() {
      const res = await fetch(`/api/users/${id}`);
      const data = await res.json();
      if (!cancelled) setUser(data); // tránh set state sau khi unmount/đổi id
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (!user) return <p>Loading...</p>;
  return <div>{user.name}</div>;
}
```

> Dùng `AbortController` cũng tốt: abort request trong cleanup.

---

## 4) useCallback và dependencies

- **`useCallback(fn, [deps...])`** trả về **cùng một tham chiếu hàm** khi `deps` không đổi. Hữu ích khi:
  - Truyền xuống **con được `React.memo`** để giảm re-render.
  - Dùng làm **dependency** cho effect khác.
- Nhưng **không** tự giải quyết stale closure nếu deps sai.

```jsx
const onSave = React.useCallback(() => {
  // dùng 'value' hiện tại → nên có 'value' trong deps
  api.save(value);
}, [value]); // ✅ deps đúng
```

> Nếu để `[]`, `onSave` sẽ luôn “nhớ” `value` ban đầu → **stale**.

---

## 5) Mẫu chuẩn xử lý “tác vụ dài sống” (timer/socket)

```jsx
function useInterval(callback, delay) {
  const saved = React.useRef(callback);

  // cập nhật ref → luôn là callback mới nhất
  React.useEffect(() => {
    saved.current = callback;
  }, [callback]);

  React.useEffect(() => {
    if (delay == null) return;
    const id = setInterval(() => saved.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}
```

Dùng:

```jsx
function Ticker() {
  const [n, setN] = React.useState(0);
  useInterval(() => setN((prev) => prev + 1), 1000);
  return <div>n = {n}</div>;
}
```

---

## 6) Demo HTML chạy ngay (CDN + Babel)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Closure & Stale Closure Demo</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
      body {
        font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
        padding: 20px;
      }
      .card {
        padding: 16px;
        border: 1px solid #ddd;
        border-radius: 10px;
        margin-bottom: 16px;
      }
      button {
        margin-right: 8px;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>

    <script type="text/babel">
      const { useState, useEffect, useRef, useCallback } = React;

      function BadCounter() {
        const [count, setCount] = useState(0);
        useEffect(() => {
          const id = setInterval(() => setCount(count + 1), 1000); // ❌ stale
          return () => clearInterval(id);
        }, []);
        return <div>BadCounter: {count}</div>;
      }

      function GoodCounter() {
        const [count, setCount] = useState(0);
        useEffect(() => {
          const id = setInterval(() => setCount((prev) => prev + 1), 1000); // ✅
          return () => clearInterval(id);
        }, []);
        return <div>GoodCounter: {count}</div>;
      }

      function GoodListener() {
        const [text, setText] = useState("A");
        const latest = useRef(text);
        useEffect(() => {
          latest.current = text;
        });
        useEffect(() => {
          const onKey = () => console.log("text =", latest.current);
          window.addEventListener("keydown", onKey);
          return () => window.removeEventListener("keydown", onKey);
        }, []);
        return (
          <div>
            <input value={text} onChange={(e) => setText(e.target.value)} />
            <small> Gõ phím bất kỳ và xem console </small>
          </div>
        );
      }

      function App() {
        return (
          <div>
            <h1>Closure & Stale Closure</h1>
            <div className="card">
              <BadCounter />
            </div>
            <div className="card">
              <GoodCounter />
            </div>
            <div className="card">
              <GoodListener />
            </div>
          </div>
        );
      }

      const root = ReactDOM.createRoot(document.getElementById("root"));
      root.render(<App />);
    </script>
  </body>
</html>
```

---

## 7) Checklist chống “stale closure”

- [ ] Timer / socket / event listener dài sống? → **ref + cập nhật ref mỗi render**.
- [ ] Cập nhật state dựa trên state cũ? → **`setX(prev => ...)`**.
- [ ] Effect phụ thuộc biến gì? → **liệt kê đầy đủ `deps`** hoặc chuyển logic sang **ref/functional update**.
- [ ] Truyền handler cho con/memo? → **`useCallback` với deps đúng**.
- [ ] Dọn dẹp đúng cách (`cleanup`) khi unmount/đổi deps.

---

## 8) Câu hỏi nhanh (FAQ)

**Q: Dùng arrow có tránh stale closure không?**  
A: Không. Arrow chỉ quyết định `this`, còn stale closure do _snapshot render_. Dùng các kỹ thuật ở mục 3/5/7.

**Q: Có nên luôn dùng `useCallback`?**  
A: Không. Chỉ khi cần giữ **tham chiếu ổn định** (memo hóa con, deps của effect).

**Q: Khi nào dùng ref thay vì deps?**  
A: Khi callback chạy **ngoài chu kỳ render** (timer, listener) và bạn **không muốn** effect chạy lại chỉ vì giá trị mới — hãy lưu **giá trị mới nhất** vào `ref`.

---

## 9) Mẫu trọn bộ: Hook `useEventLatest` (giữ giá trị mới nhất)

```jsx
export function useEventLatest(value) {
  const ref = React.useRef(value);
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref;
}

// Usage
function SearchBox() {
  const [q, setQ] = React.useState("");
  const latestQ = useEventLatest(q);

  React.useEffect(() => {
    const id = setInterval(() => {
      // luôn lấy q mới nhất
      console.log("query:", latestQ.current);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <input value={q} onChange={(e) => setQ(e.target.value)} />;
}
```

---

## 10) Kết luận

- Closure là **cốt lõi** để hiểu React function component.
- Nắm quy tắc **snapshot per render** để tránh stale closure.
- Ghi nhớ 4 công cụ: **functional update**, **deps đúng**, **ref giữ giá trị mới nhất**, **cleanup**.
