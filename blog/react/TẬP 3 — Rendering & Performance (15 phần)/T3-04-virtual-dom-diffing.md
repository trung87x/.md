# T3-04 — Virtual DOM & Diffing

> Mục tiêu: Hiểu cơ chế **reconciliation** (so khớp Virtual DOM) của React, vai trò của **key** và các quy tắc **bảo toàn state**.

---

## 1) React reconcile thế nào?
- Mỗi render tạo một **Virtual DOM (VDOM)** mới.
- React so sánh **VDOM cũ vs VDOM mới** để tạo **patch** (mutation list) cập nhật DOM thật.
- Thuật toán heuristic **O(n)** theo **type + key** để đạt hiệu năng tốt trong thực tế.

---

## 2) Quy tắc bảo toàn state
- Nếu **type** của node **khác** → React **unmount** node cũ và **mount** node mới → **mất state** con.
- Nếu **type** giống và **key** giống → React **giữ state** và chỉ cập nhật props/children.
- **Key** là **danh tính** item trong danh sách — ảnh hưởng trực tiếp đến việc giữ state của phần tử.

```jsx
// Giữ state input theo key
items.map(item => <Row key={item.id} item={item} />)
```

---

## 3) Key trong danh sách
- **Đừng dùng index** nếu danh sách có thể **thêm/xoá/sắp xếp** → gây **nhảy state** giữa các hàng.
- Hãy dùng **id ổn định** (từ dữ liệu).  
- Nếu không có id → hãy tạo id ổn định (uuid lúc insert).

---

## 4) Ví dụ nhập liệu bị “nhảy” do key sai
```jsx
function ListBad({ items }) {
  return items.map((it, i) => <InputRow key={i} defaultValue={it.name} />);
}
```
Chèn item đầu danh sách → mọi hàng **dịch xuống** nhưng key là index → React giữ state theo **vị trí**, dẫn đến dữ liệu **dồn sai hàng**.

**Đúng:**
```jsx
function ListGood({ items }) {
  return items.map((it) => <InputRow key={it.id} defaultValue={it.name} />);
}
```

---

## 5) Diffing children
- React so khớp **theo thứ tự**; nếu thiếu key tốt, di chuyển phần tử có thể bị xem là **xoá + thêm**.
- Với key đúng, React hiểu **move** và **giữ state** phần tử.

---

## 6) Loại node & chi phí
- Thay đổi **type** (div ↔ span) → unmount/mount mới (mất effect/state).
- Thay đổi **props** đơn giản → patch tại chỗ (rẻ).
- Thay đổi **nhiều children** không có key → chi phí cao, có thể mất state.

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
    function Row({ label }) {
      const [v, setV] = React.useState(label);
      return <input value={v} onChange={e => setV(e.target.value)} />;
    }

    function Bad() {
      const [items, setItems] = React.useState([{id:1,n:"A"},{id:2,n:"B"},{id:3,n:"C"}]);
      return (
        <div>
          <button onClick={() => setItems([{id:Date.now(),n:"X"}, ...items])}>
            Add to top
          </button>
          {items.map((it, i) => <Row key={i} label={it.n} />)}
        </div>
      );
    }
    function Good() {
      const [items, setItems] = React.useState([{id:1,n:"A"},{id:2,n:"B"},{id:3,n:"C"}]);
      return (
        <div>
          <button onClick={() => setItems([{id:Date.now(),n:"X"}, ...items])}>
            Add to top
          </button>
          {items.map(it => <Row key={it.id} label={it.n} />)}
        </div>
      );
    }
    function App(){ return (<><Bad /><hr/><Good /></>) }
    ReactDOM.createRoot(document.getElementById('app')).render(<App/>);
  </script>
</body>
</html>
```

---

## 8) Checklist
- [ ] Giữ **type + key** ổn định để bảo toàn state.
- [ ] Tránh `key=index` khi có thêm/xoá/sắp xếp.
- [ ] Không đổi type bừa bãi (div ↔ section) nếu muốn giữ state/effect.
- [ ] Dựa vào diff O(n) → cung cấp key tốt để React “move” đúng.

---

## 9) Bài tập
1. Tạo list nhập liệu và chứng minh `key=index` gây “nhảy” dữ liệu khi chèn đầu danh sách.
2. Triển khai `uuid` ổn định khi thêm item, đảm bảo state mỗi hàng giữ đúng.
3. Viết giải thích vì sao **key** không dùng để truy cập item trong component (đó là prop đặc biệt cho React).