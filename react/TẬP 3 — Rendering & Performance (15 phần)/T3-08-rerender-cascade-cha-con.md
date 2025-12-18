# T3-08 — Re-render Cascade (Cha–Con)

> Mục tiêu: Hiểu cách **re-render lan truyền** trong cây component (cha–con), và cách **chặn re-render không cần thiết** bằng memo hóa.

---

## 1) Khi cha re-render
Khi component cha render lại → **tất cả con** (trừ khi được memo hóa) cũng được **gọi lại**.

```jsx
function Child() {
  console.log("👶 Child render");
  return <div>Child</div>;
}

function Parent() {
  const [count, setCount] = React.useState(0);
  console.log("👨 Parent render");

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
      <Child />
    </div>
  );
}
```
Mỗi lần nhấn nút → Parent render → Child render lại dù **props không đổi**.

---

## 2) Cách chặn re-render con
### Dùng `React.memo`
```jsx
const Child = React.memo(function Child() {
  console.log("👶 Child render");
  return <div>Memoized Child</div>;
});
```
→ Khi `Parent` render nhưng props con không đổi → React **bỏ qua render con**.

---

## 3) Props thay đổi → con vẫn render
Nếu props thay đổi (dù chỉ là **object mới**) → con vẫn render.

```jsx
const Child = React.memo(function Child({ data }) {
  console.log("Child render");
  return <pre>{JSON.stringify(data)}</pre>;
});

function Parent() {
  const [count, setCount] = React.useState(0);
  const data = { n: 1 }; // ❗ mỗi render tạo object mới
  return <Child data={data} />;
}
```
➡ Con render lại mỗi lần.  
**Giải pháp:** ổn định object bằng `useMemo`:
```jsx
const data = React.useMemo(() => ({ n: 1 }), []);
```

---

## 4) Truyền callback xuống con
```jsx
const Child = React.memo(function Child({ onClick }) {
  console.log("Child render");
  return <button onClick={onClick}>Click</button>;
});

function Parent() {
  const [n, setN] = React.useState(0);
  const handle = () => setN((v) => v + 1); // ❌ hàm mới mỗi render
  return <Child onClick={handle} />;
}
```
➡ `handle` khác tham chiếu mỗi lần → `React.memo` không giúp gì.  
**Sửa:** `useCallback`.
```jsx
const handle = React.useCallback(() => setN((v) => v + 1), []);
```

---

## 5) Component con dùng Context
- Khi Context value thay đổi → **mọi consumer** của context re-render, bất kể `React.memo`.
- Giải pháp:
  - Tách Context nhỏ hơn.
  - Dùng selector pattern hoặc `use-context-selector`.

---

## 6) Phân biệt render và commit
- “Render cascade” chỉ là gọi lại function component → chưa chắc DOM thay đổi.
- Nếu props giống nhau, React bỏ qua commit.

---

## 7) Mini demo (UMD)
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
  <div id="app"></div>
  <script type="text/babel">
    const Child = React.memo(function Child() {
      console.log("Child render");
      return <div>Child component</div>;
    });

    function App() {
      const [n, setN] = React.useState(0);
      console.log("Parent render");
      return (
        <div>
          <button onClick={() => setN((v) => v + 1)}>Parent {n}</button>
          <Child />
        </div>
      );
    }
    ReactDOM.createRoot(document.getElementById("app")).render(<App />);
  </script>
</body>
</html>
```

---

## 8) Checklist
- [ ] Cha render → con render theo trừ khi được memo hóa.
- [ ] Props mới → con render, dù dữ liệu giống.
- [ ] Ổn định object/callback bằng `useMemo`/`useCallback`.
- [ ] Context update → mọi consumer render lại.
- [ ] Render cascade ≠ DOM update.

---

## 9) Bài tập
1. Tạo `Parent` + `Child` log render → thử `React.memo` và `useCallback`.
2. Dùng Context truyền theme, thử đổi theme → xem các consumer render lại.
3. Giải thích vì sao con có `React.memo` nhưng vẫn render (vì props đổi tham chiếu).