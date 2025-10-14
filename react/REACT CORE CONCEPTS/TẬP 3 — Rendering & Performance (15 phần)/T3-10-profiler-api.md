# T3-10 — Profiler API (Đo thời gian render)

> Mục tiêu: Dùng **`<Profiler>`** để đo **thời gian commit** của cây component, xác định nút nghẽn, và đưa ra tối ưu đúng chỗ.

---

## 1) `<Profiler>` là gì?
- Component đặc biệt của React cho phép **đo lường** thời gian **render/commit** của **cây con**.
- Nhận prop `onRender` callback với nhiều thông tin đo.

```jsx
<Profiler id="SearchScreen" onRender={onRender}>
  <SearchScreen />
</Profiler>
```

---

## 2) API `onRender`
```ts
type OnRenderCallback = (
  id: string,                // id của Profiler
  phase: "mount" | "update", // pha đo: mount hay update
  actualDuration: number,    // thời gian render subtree lần này
  baseDuration: number,      // ước lượng render tối ưu nếu không memo hóa
  startTime: number,         // thời điểm bắt đầu render
  commitTime: number,        // thời điểm commit
  interactions: Set<any>,    // tương tác liên quan (transition)
) => void;
```

---

## 3) Ví dụ đo lường
```jsx
function onRender(
  id, phase, actualDuration, baseDuration, startTime, commitTime
) {
  console.table({ id, phase, actualDuration, baseDuration, startTime, commitTime });
}
function App() {
  return (
    <React.Profiler id="App" onRender={onRender}>
      <Main />
    </React.Profiler>
  );
}
```

- **`actualDuration`**: thời gian **thực tế** để render subtree.
- **`baseDuration`**: tổng thời gian render **nếu mọi component không được memo** (ước lượng “worst-case”).

---

## 4) Kết hợp Profiler với tối ưu
- Sau khi bọc Profiler, thử:
  - Bọc component nặng bằng `React.memo`.
  - Memo hóa props (`useMemo`/`useCallback`).
  - Colocation state.
  - Virtualize list.
- So sánh **actualDuration** trước/sau.

---

## 5) Mini demo (UMD)
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
    function onRender(id, phase, actualDuration, baseDuration, startTime, commitTime) {
      console.log({ id, phase, actualDuration, baseDuration, startTime, commitTime });
    }
    function Heavy({ n }) {
      const items = Array.from({ length: n }, (_, i) => i*i*i);
      return <ul>{items.map(i => <li key={i}>{i}</li>)}</ul>;
    }
    function App() {
      const [n, setN] = React.useState(500);
      return (
        <React.Profiler id="HeavyList" onRender={onRender}>
          <button onClick={() => setN(v => v + 200)}>Grow {n}</button>
          <Heavy n={n} />
        </React.Profiler>
      );
    }
    ReactDOM.createRoot(document.getElementById("app")).render(<App />);
  </script>
</body>
</html>
```

---

## 6) Checklist
- [ ] Dùng `<Profiler>` quanh subtree nghi ngờ chậm.
- [ ] Ghi nhận `actualDuration`/`baseDuration` để định hướng tối ưu.
- [ ] Thử memo hóa, colocation, virtualize và đo lại.
- [ ] Tránh bọc quá nhiều Profiler lồng nhau (nhiễu dữ liệu).

---

## 7) Bài tập
1. Bọc Profiler quanh list lớn và ghi log `actualDuration` khi tăng kích thước.
2. Áp dụng `React.memo` và `useMemo` → đo lại, ghi nhận chênh lệch.
3. So sánh `baseDuration` trước/sau colocation state.