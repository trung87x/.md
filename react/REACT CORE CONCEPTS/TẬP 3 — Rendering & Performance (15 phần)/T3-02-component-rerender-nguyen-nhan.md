# T3-02 — Component Re-render: Nguyên Nhân

> Mục tiêu: Hiểu khi nào React **re-render** component và cách tránh render lại không cần thiết.

---

## 1) Khi nào component render lại?
React function component sẽ **chạy lại (render)** khi:
1. **State thay đổi** (`setState` hoặc `dispatch` reducer).
2. **Props thay đổi** (từ cha truyền xuống).
3. **Context thay đổi** (đọc giá trị từ `useContext()`).
4. **Cha re-render** → con không được memo hóa cũng re-render theo.

```jsx
function Child({ count }) {
  console.log("Child render");
  return <div>Count: {count}</div>;
}

function Parent() {
  const [n, setN] = React.useState(0);
  console.log("Parent render");
  return (
    <>
      <button onClick={() => setN(n + 1)}>Add</button>
      <Child count={n} />
    </>
  );
}
```
Cả Parent và Child đều render lại vì `Parent` re-render → `Child` được gọi lại.

---

## 2) Render không đồng nghĩa với cập nhật DOM
- Mỗi lần render, React tạo Virtual DOM mới.  
- Nếu nội dung giống nhau → **shallow diff** thấy không đổi → **DOM thật không cập nhật**.

```jsx
<div>Count: 1</div> // so với Virtual DOM trước
```
Nếu giống → React **bỏ qua mutation**, rất tối ưu.

---

## 3) Prop thay đổi shallow (tham chiếu mới)
```jsx
function Child({ obj }) {
  console.log("Child render");
  return <pre>{JSON.stringify(obj)}</pre>;
}

function Parent() {
  const [n, setN] = React.useState(0);
  const info = { n }; // ❌ luôn tạo object mới
  return (
    <>
      <button onClick={() => setN(n + 1)}>Add</button>
      <Child obj={info} />
    </>
  );
}
```
➡ `Child` luôn render lại vì `info` là object mới mỗi lần.

**Giải pháp:** memo hóa object bằng `useMemo`.
```jsx
const info = React.useMemo(() => ({ n }), [n]);
```

---

## 4) Cha re-render không nhất thiết con re-render
Dùng `React.memo` để “bọc” component con → React so sánh **props cũ/mới (shallow)**, nếu giống → bỏ qua render.

```jsx
const Child = React.memo(function Child({ count }) {
  console.log("Child render");
  return <div>Count: {count}</div>;
});
```

---

## 5) Context khiến render dây chuyền
Bất kỳ component nào **đọc Context** sẽ re-render khi **value** thay đổi, **dù chỉ 1 field**.
- Dùng **context split** (chia nhỏ context).
- Dùng **selector hook** (vd: `useContextSelector`) hoặc `memo` con.

---

## 6) Checklist
- [ ] State thay đổi → re-render.
- [ ] Props thay đổi (theo **shallow compare**) → re-render.
- [ ] Context thay đổi → tất cả subscriber render lại.
- [ ] Cha re-render → con không memo → bị render theo.
- [ ] Render ≠ DOM update (React diff kiểm tra).

---

## 7) Bài tập
1. Tạo `Parent` + `Child`, log render count → xem khi nào `Child` re-render.
2. Dùng `React.memo` và `useMemo` để chặn render không cần thiết.
3. Dùng Context chia nhỏ và kiểm tra component nào render lại.