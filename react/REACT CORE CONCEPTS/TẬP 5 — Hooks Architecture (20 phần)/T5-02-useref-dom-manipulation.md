# T5-02 — useRef & DOM Manipulation

> Mục tiêu: Làm chủ **`useRef`**: lưu **tham chiếu mutable**, truy cập **DOM node**, giữ **giá trị ổn định** qua render (không trigger render), và dùng với **imperative API**.

---

## 1) `useRef` lưu gì?
- `const ref = useRef(initial)` trả `{ current: initial }`.  
- `ref.current` thay đổi **không làm re-render**.  
- Dùng để giữ **DOM node**, **timer id**, **giá trị trước đó**, **flag mutable**.

```jsx
const idRef = React.useRef(null);
React.useEffect(()=>{
  idRef.current = setInterval(() => console.log("tick"), 1000);
  return () => clearInterval(idRef.current);
},[]);
```

---

## 2) Truy cập DOM node
```jsx
function FocusInput() {
  const inputRef = React.useRef(null);
  return (
    <>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current?.focus()}>Focus</button>
    </>
  );
}
```

- Với component của bạn, dùng **`forwardRef`** để truyền ref từ ngoài vào trong.

```jsx
const Input = React.forwardRef(function Input(props, ref){
  return <input ref={ref} {...props} />;
});
```

---

## 3) Lưu giá trị ổn định qua render
```jsx
function useLatest(value){
  const ref = React.useRef(value);
  React.useEffect(() => { ref.current = value; }, [value]);
  return ref;
}
```

- Hữu ích cho callback async/long‑living muốn đọc **giá trị mới nhất** mà không đổi deps.

---

## 4) Imperative Handle (xem chi tiết Tập 2 — phần 17)
- Kết hợp `forwardRef` + `useImperativeHandle` để expose **API có kiểm soát**.

```jsx
const Input = React.forwardRef(function Input(props, ref){
  const innerRef = React.useRef(null);
  React.useImperativeHandle(ref, () => ({
    focus: () => innerRef.current?.focus(),
    clear: () => (innerRef.current.value = "")
  }));
  return <input ref={innerRef} {...props}/>;
});
```

---

## 5) DOM measurement: `useLayoutEffect` + ref
- Đo kích thước/đặt scroll **ngay trước paint** để tránh nháy.

```jsx
function MeasureBox() {
  const ref = React.useRef(null);
  const [rect, setRect] = React.useState(null);
  React.useLayoutEffect(() => {
    setRect(ref.current.getBoundingClientRect());
  }, []);
  return <div ref={ref} style={{height:120, background:"#eee"}}>{rect && rect.width}px</div>;
}
```

---

## 6) Anti‑patterns
- Dùng ref để **đi vòng** state (tự mutate DOM thay vì data → UI).  
- Gắn ref vào **mảng động** mà không quản lý key ổn định.  
- Lạm dụng `useRef` thay cho state khi **UI cần phản ánh** giá trị (nên dùng state).

---

## 7) Mini demo (UMD)
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
<div id="app"></div>
<script type="text/babel">
  const Input = React.forwardRef(function Input(props, ref){
    const innerRef = React.useRef(null);
    React.useImperativeHandle(ref, ()=>({ focus:()=>innerRef.current.focus(), clear:()=>innerRef.current.value="" }));
    return <input ref={innerRef} {...props}/>;
  });
  function App(){
    const ref = React.useRef();
    return (<div>
      <Input ref={ref} placeholder="Imperative handle" />
      <button onClick={()=>ref.current.focus()}>Focus</button>
      <button onClick={()=>ref.current.clear()}>Clear</button>
    </div>);
  }
  ReactDOM.createRoot(document.getElementById('app')).render(<App/>);
</script>
</body>
</html>
```

---

## 8) Checklist
- [ ] `useRef` giữ giá trị/DOM mà **không gây render**.  
- [ ] Truyền ref bằng `forwardRef`; expose API bằng `useImperativeHandle`.  
- [ ] Đo/đặt layout với `useLayoutEffect`.  
- [ ] Dùng `useLatest` khi cần đọc giá trị mới nhất trong callback dài hạn.

---

## 9) Bài tập
1. Tạo `Input` có API `focus()` và `clear()` qua imperative handle.  
2. Viết `usePrevious(value)` dùng ref để lưu giá trị render trước.  
3. Demo đo kích thước phần tử khi mount bằng `useLayoutEffect`.