# T2-12 — Multiple Effects & Ordering

> Mục tiêu: Hiểu **thứ tự chạy/cleanup** của nhiều effect trong **cùng một component** và **giữa các component**, để viết side-effect **không phụ thuộc thứ tự**.

---

## 1) Thứ tự trong **cùng một component**
- **Mount/Update**:
  - `useLayoutEffect` chạy **theo thứ tự định nghĩa** (trên xuống) **trước khi paint**.
  - `useEffect` chạy **theo thứ tự định nghĩa** **sau khi paint**.
- **Cleanup**:
  - Trước khi chạy effect mới, React gọi **cleanup của effect cũ**.
  - Cleanups trong cùng component chạy theo **thứ tự ngược lại** so với khi đăng ký (từ dưới lên).

```jsx
function Demo() {
  useEffect(() => { console.log("E1"); return () => console.log("C1"); }, []);
  useEffect(() => { console.log("E2"); return () => console.log("C2"); }, []);
  // Mount:  E1 → E2
  // Unmount/Cleanup phase: C2 → C1
}
```

> **Quy tắc:** Không dựa vào việc “E2 sẽ luôn chạy sau E1” để phối hợp dữ liệu. Thay vào đó, hãy dùng **state/props chuẩn** hoặc **context**.

---

## 2) Giữa **các component**
- Thứ tự giữa parent/child có thể khác nhau tuỳ bước **mount/update/unmount** và tối ưu nội bộ. **Đừng giả định** parent luôn trước child hay ngược lại.
- Hãy viết effect **độc lập**, chỉ dựa vào **dữ liệu đầu vào** (props/state/context), không dựa vào thời điểm effect của component khác.

---

## 3) Phân chia nhiều effect: vì sao tốt?
- **Tách mối quan tâm**: mỗi effect cho một mục đích (event, fetch, timer…). Dễ đọc & test hơn.
- **Deps rõ ràng**: mỗi effect có deps nhỏ gọn, hạn chế loop.
- **Cleanup chính xác**: mỗi tài nguyên dọn dẹp riêng.

```jsx
function Player({ src }) {
  // fetch metadata
  useEffect(() => { /* ... */ }, [src]);

  // keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => e.code === "Space" && toggle();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  // progress timer
  useEffect(() => {
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tick]);
}
```

---

## 4) Phối hợp effect với layout
- Đo/điều chỉnh DOM → `useLayoutEffect` riêng.
- I/O → `useEffect` riêng.
- Không trộn cả đo layout & fetch vào một effect.

---

## 5) Mẫu “điều kiện chạy” (guard logic)
```jsx
useEffect(() => {
  if (!enabled) return;  // guard
  const ac = new AbortController();
  (async () => {
    const res = await fetch(url, { signal: ac.signal });
    setData(await res.json());
  })();
  return () => ac.abort();
}, [enabled, url]);
```

---

## 6) Anti-patterns cần tránh
- Một effect “làm tất cả mọi thứ” → deps phình to, dễ loop.
- Dựa vào **thứ tự** giữa hai effect để truyền dữ liệu.
- Dùng effect để tính **derived data** (nên `useMemo`).

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
    function Demo() {
      React.useLayoutEffect(() => {
        console.log("LE1");
        return () => console.log("LC1");
      }, []);
      React.useLayoutEffect(() => {
        console.log("LE2");
        return () => console.log("LC2");
      }, []);

      React.useEffect(() => {
        console.log("E1");
        return () => console.log("C1");
      }, []);
      React.useEffect(() => {
        console.log("E2");
        return () => console.log("C2");
      }, []);

      return <div>Check console order</div>;
    }
    ReactDOM.createRoot(document.getElementById("app")).render(<Demo />);
  </script>
</body>
</html>
```

---

## 8) Checklist
- [ ] Mỗi mục đích → một effect riêng.
- [ ] Không dựa vào thứ tự giữa các component/effect.
- [ ] Cleanup chạy trước effect mới và theo thứ tự ngược trong cùng component.
- [ ] Dùng layout effect cho đo/điều chỉnh DOM; passive effect cho I/O.

---

## 9) Bài tập
1. Tách một effect “all-in-one” thành 3 effect: fetch, event, timer (mỗi cái deps riêng).
2. Thử log order của 2 `useLayoutEffect` và 2 `useEffect` trong cùng component; quan sát cleanup lúc unmount.
3. Viết ghi chú mô tả vì sao **không nên** truyền dữ liệu giữa 2 effect bằng side-effect thứ tự chạy.