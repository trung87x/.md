# T2-10 — Stale Effect & Ref Pattern

> Mục tiêu: Nhận diện **stale effect** (effect chạy với dữ liệu cũ) và dùng **ref pattern** để đọc “giá trị mới nhất” mà **không** ép effect chạy lại hoặc gây deps rối.

---

## 1) Stale effect là gì?
Khi callback của effect/handler **đóng** (close over) các biến tại *thời điểm tạo nó*, về sau biến đổi nhưng callback **vẫn dùng bản cũ**.

### Ví dụ lỗi
```jsx
function Timer() {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => {
      // ❌ stale: 'count' bị chụp cố định
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []); // deps rỗng
  return <div>{count}</div>;
}
```

**Cách đúng:** dùng **functional update** hoặc **ref pattern**.

```jsx
// Functional update
setCount((prev) => prev + 1);
```

---

## 2) Ref pattern “giá trị mới nhất”
Khi bạn cần đọc **giá trị cập nhật mới nhất** trong các callback ổn định (socket, interval, event), dùng `useRef` làm container.

```jsx
function useLatest(value) {
  const ref = React.useRef(value);
  React.useEffect(() => { ref.current = value; }, [value]);
  return ref;
}
```

```jsx
function TimerSafe() {
  const [count, setCount] = React.useState(0);
  const latest = useLatest(count);

  React.useEffect(() => {
    const id = setInterval(() => {
      // đọc bản mới nhất mà không cần đưa 'count' vào deps
      setCount(latest.current + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [latest]); // 'latest' là ref ổn định → deps có/không đều ok
  return <div>{count}</div>;
}
```

> Pattern này hữu ích khi **khó** (hoặc không nên) đưa tất cả phụ thuộc vào deps của effect, ví dụ: socket message handler tái sử dụng.

---

## 3) Stale với handlers + React.memo
- Nếu truyền **inline handler** cho component con đã `React.memo`, con sẽ re-render do **tham chiếu mới** mỗi lần.
- Dùng `useCallback` + `useLatest` để vừa **ổn định handler**, vừa **truy cập dữ liệu mới nhất**.

```jsx
function useEvent(fn) {
  const ref = React.useRef(fn);
  React.useLayoutEffect(() => { ref.current = fn; });
  return React.useCallback((...args) => ref.current(...args), []);
}
```
> `useEvent` (pattern phổ biến): tạo handler **ổn định** nhưng luôn gọi hàm mới nhất bên trong.

---

## 4) Khi nào dùng ref pattern, khi nào dùng deps?
- Nếu effect **thật sự phụ thuộc** vào biến và cần chạy lại khi biến đổi → **đưa vào deps**.
- Nếu chỉ cần **đọc snapshot mới nhất** bên trong callback dài hạn (interval/socket) mà **không muốn** re-subscribe → **ref pattern**.
- Nếu cập nhật state **dựa trên state trước** → **functional update** là đơn giản nhất.

---

## 5) Các lỗi hay gặp & cách sửa
| Vấn đề | Triệu chứng | Cách sửa |
|---|---|---|
| Dùng giá trị chụp cũ trong interval | Count không tăng đúng | Dùng functional update hoặc `useLatest` |
| Handler inline làm con re-render | `React.memo` không hiệu lực | `useCallback`, cân nhắc `useEvent` |
| Đưa deps thiếu | Logic chạy với dữ liệu cũ | Bật ESLint hooks, bổ sung deps |
| Lạm dụng `[JSON.stringify(obj)]` | Tốn kém & không ổn | Ổn định dữ liệu bằng `useMemo` hoặc refactor |

---

## 6) Mini demo (UMD)
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
    function useLatest(v) {
      const ref = React.useRef(v);
      React.useEffect(() => { ref.current = v; }, [v]);
      return ref;
    }

    function App() {
      const [delay, setDelay] = React.useState(1000);
      const [tick, setTick] = React.useState(0);
      const latestDelay = useLatest(delay);

      React.useEffect(() => {
        const id = setInterval(() => setTick((t) => t + 1), latestDelay.current);
        return () => clearInterval(id);
      }, [latestDelay]); // không cần đổi interval mỗi khi 'delay' đổi

      return (
        <div>
          <div>Tick: {tick}</div>
          <input type="range" min="200" max="2000" step="100"
                 value={delay} onChange={(e) => setDelay(+e.target.value)} />
          <div>Delay: {delay}ms</div>
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById("app")).render(<App />);
  </script>
</body>
</html>
```

---

## 7) Checklist
- [ ] Nghi ngờ stale? Kiểm tra deps + xem có cần functional update.
- [ ] Callback dài hạn (interval/socket/event) → cân nhắc **ref pattern / useEvent**.
- [ ] Muốn ổn định handler + luôn dùng logic mới nhất → `useEvent`.
- [ ] Tránh stringify deps; ổn định dữ liệu bằng memo.

---

## 8) Bài tập
1. Viết `useLatest` và thay vào 2 nơi: interval + socket message handler.
2. Viết `useEvent` và chứng minh `Child` (bọc `React.memo`) không render lại khi state khác đổi.
3. Chuyển trường hợp stale ở `setInterval(count + 1)` sang functional update.