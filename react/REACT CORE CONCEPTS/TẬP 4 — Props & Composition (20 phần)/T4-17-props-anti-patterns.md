# T4-17 — Props Anti‑Patterns

> Mục tiêu: Nhận diện và tránh các **anti‑pattern về props**: mơ hồ, hai chiều, lẫn lộn controlled/uncontrolled, object literal gây re-render, prop explosion…

---

## 1) Props mơ hồ / đa nghĩa
```jsx
// ❌ Không rõ ý đồ
<Input data={x} flag={true} />
// ✅ Rõ ràng vai trò
<Input value={x} onChange={setX} readOnly />
```
**Nguyên tắc đặt tên:**  
- Giá trị: `value`, `defaultValue`, `checked`.  
- Hành động: `onChange`, `onOpenChange`.  
- Trạng thái: `disabled`, `readOnly`, `invalid`.

---

## 2) Trộn controlled & uncontrolled
```jsx
// ❌ Dùng cả value và defaultValue
<input value={v} defaultValue="A" />
// ✅ Chọn một
<input value={v} onChange={...} />
<input defaultValue="A" />
```

---

## 3) Prop hai chiều mập mờ
```jsx
// ❌ setValue và value nằm ở hai nơi xa nhau không có contract
<Dialog open={open} setOpen={setOpen} />
// ✅ Một contract chuẩn
<Dialog open={open} onOpenChange={setOpen} />
```

---

## 4) Prop explosion (quá nhiều prop)
- Nhồi 20+ prop vào một component đa năng → khó dùng & bảo trì.
- **Giải pháp**: chia nhỏ component (compound/slots), hoặc nhóm config vào một prop có cấu trúc.

```jsx
// ✅ Gom nhóm có chủ đích
<Table columns={[...]} data={rows} pagination={{ page, pageSize, onChange }} />
```

---

## 5) Object/array/function literal trong JSX
```jsx
// ❌ tạo tham chiếu mới → con `React.memo` vẫn render
<Chart options={{ smooth: true }} onPointClick={(p)=>...} />
// ✅ ổn định tham chiếu
const options = useMemo(() => ({ smooth: true }), []);
const onPointClick = useCallback((p)=>{/*...*/}, []);
<Chart options={options} onPointClick={onPointClick} />
```

---

## 6) Prop kiểu “magic”/ẩn ý
- Truyền string enum không tài liệu: `"xl"`, `"ghost"`, `"pro"`…  
- **Giải pháp**: dùng **union type** (TS) và docs rõ ràng.

---

## 7) Mutate props trong con
```jsx
// ❌ Thay đổi object prop → side-effect ngầm
function Panel({ config }) { config.title = "New"; }
```
→ Props phải **read‑only**; clone nếu cần biến đổi.

---

## 8) Mini demo (UMD)
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
    const Chart = React.memo(function Chart({ options }) {
      console.log("Chart render"); return <pre>{JSON.stringify(options)}</pre>;
    });
    function App(){
      const stable = React.useMemo(()=>({ smooth:true }), []);
      const unstable = { smooth:true };
      return (<div>
        <h4>Stable</h4><Chart options={stable} />
        <h4>Unstable</h4><Chart options={unstable} />
      </div>);
    }
    ReactDOM.createRoot(document.getElementById("app")).render(<App/>);
  </script>
</body>
</html>
```

---

## 9) Checklist
- [ ] Tên prop rõ vai trò; không “data/flag” chung chung.
- [ ] Không trộn controlled vs uncontrolled.
- [ ] Một nguồn sự thật: `onXChange` thay vì setter tự do.
- [ ] Ổn định object/array/function props.
- [ ] Chia nhỏ component/slots tránh prop explosion.

---

## 10) Bài tập
1. Refactor component có 18 props thành compound + slots.
2. Biến `Dialog({ open, setOpen })` thành `onOpenChange` và cập nhật nơi dùng.
3. Chứng minh ảnh hưởng literal props đến `React.memo` con.