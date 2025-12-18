# T3-03 — Props & State Change Trigger

> Mục tiêu: Hiểu **điều kiện kích hoạt re-render** từ props/state, quy tắc so sánh của React, batching và các bẫy thường gặp.

---

## 1) State thay đổi khi nào?
- Gọi `setState(next)` sẽ **so sánh `Object.is(next, current)`**.  
  - Nếu **khác** → component **re-render**.  
  - Nếu **giống** → **không re-render** component đó (nhưng parent/anh em có thể render vì lý do khác).
- Nên ưu tiên **functional update** khi phụ thuộc state trước:  
```jsx
setCount((prev) => prev + 1);
```

### Ví dụ
```jsx
const [user, setUser] = useState({ name: "A" });
setUser({ name: "A" }); // ❗ Khác tham chiếu → re-render (dù dữ liệu "có vẻ" giống)
setUser(user);          // ❌ Cùng tham chiếu → không render
```

> React **không deep-compare** state/props, chỉ **so sánh tham chiếu** (shallow via `Object.is`).

---

## 2) Props thay đổi khi nào?
- Component con re-render khi **bất kỳ prop nào khác tham chiếu** so với lần trước.
- **Object/Array/Function literal** tạo mới sẽ khiến props khác tham chiếu → con render lại.
- Dùng `useMemo`/`useCallback` để giữ tham chiếu **ổn định** khi cần.

```jsx
const options = useMemo(() => ({ size, theme }), [size, theme]);
const onSave = useCallback(() => save(form), [form]);
<Child options={options} onSave={onSave} />
```

---

## 3) Context trigger
- `useContext(SomeContext)` sẽ re-render khi **`value`** của provider **thay đổi tham chiếu**.
- Tránh đặt **object lớn** làm value thay đổi liên tục; tách context nhỏ, hoặc memo hoá `value`.

```jsx
const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);
<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
```

---

## 4) Batching & thời điểm cập nhật
- React **batch** nhiều `setState` trong cùng một tick (sự kiện, effect) → render 1 lần.
- Ngoài event loop của React (vd: setTimeout, Promise then…), React 18 **cũng batch tự động**.
```jsx
setA(1); setB(2); // một lần render
await Promise.resolve();
setC(3); setD(4); // React 18: vẫn batch
```

---

## 5) Bailout & cascade
- Nếu **component A** không thay đổi props/state → React **bail out** (bỏ qua render A).  
  Nhưng nếu **parent** render lại, **A vẫn được gọi** trừ khi **A** được bọc `React.memo`.  
- `React.memo` so sánh **shallow** props để quyết định có gọi lại component hay không.

---

## 6) Những bẫy phổ biến
- `setState(x)` nhiều lần với **cùng giá trị** → chỉ render khi giá trị **thực sự đổi**.  
- Dùng `index` làm `key` trong list → dẫn đến **nhầm identity** (xem T3-04).  
- Truyền **handlers inline** vào con `React.memo` → con vẫn render mỗi lần (khác tham chiếu).

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
      const Child = React.memo(function Child({ obj }) {
        console.log("Child render");
        return <pre>{JSON.stringify(obj)}</pre>;
      });
      function App() {
        const [n, setN] = React.useState(0);
        const sameRef = React.useMemo(() => ({ n }), [n]);
        const newRef  = { n }; // luôn mới
        return (
          <div>
            <button onClick={() => setN((x) => x + 1)}>+1</button>
            <h4>Memo props (ổn định):</h4>
            <Child obj={sameRef} />
            <h4>Literal props (luôn mới):</h4>
            <Child obj={newRef} />
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
- [ ] State/props đổi theo `Object.is` → mới render.
- [ ] Ổn định object/array/function khi truyền xuống con.
- [ ] Context: memo hoá `value` để tránh render dây chuyền.
- [ ] Tận dụng batching; ưu tiên functional update.

---

## 9) Bài tập
1. Tạo `Parent` → `Child` bọc `React.memo`, thử truyền props là object: literal vs `useMemo`.
2. Viết `ThemeProvider` memo hóa `value`, đo số lần render của consumer.
3. Chứng minh `setState` về **cùng giá trị** không khiến re-render.