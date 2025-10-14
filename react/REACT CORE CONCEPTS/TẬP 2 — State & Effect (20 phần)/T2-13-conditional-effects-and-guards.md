# T2-13 — Effect chạy điều kiện & Guard Logic

> Mục tiêu: Viết `useEffect` chỉ chạy **khi đủ điều kiện**, tránh side-effect thừa; dùng **guard logic** rõ ràng, dễ kiểm soát.

---

## 1) Guard ngay đầu effect
```jsx
useEffect(() => {
  if (!enabled) return;        // ❗ guard
  if (!userId) return;         // ❗ guard
  // chạy khi đủ điều kiện
  // ...
}, [enabled, userId]);
```
- Giảm nguy cơ **loop** do setState không cần thiết.
- Dễ đọc: điều kiện bật/tắt rõ ràng.

---

## 2) Điều kiện theo trạng thái (state machine mini)
```jsx
function Loader({ url }) {
  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'done' | 'error'
  const [data, setData] = useState(null);

  useEffect(() => {
    if (status !== "loading") return; // chỉ chạy khi bật
    let alive = true;
    (async () => {
      try {
        const r = await fetch(url);
        const j = await r.json();
        if (alive) { setData(j); setStatus("done"); }
      } catch {
        if (alive) setStatus("error");
      }
    })();
    return () => { alive = false; };
  }, [status, url]);

  // nơi khác kích hoạt:
  // onClick={() => setStatus("loading")}
}
```
> Tách **trạng thái điều khiển** (`status`) khỏi **dữ liệu** giúp logic rõ ràng.

---

## 3) Điều kiện theo quyền/role & cấu hình
```jsx
useEffect(() => {
  if (!config.featureX) return;
  // init feature X
}, [config.featureX]);
```

---

## 4) Chỉ chạy một lần khi *đáp ứng* điều kiện
```jsx
const ranRef = useRef(false);
useEffect(() => {
  if (!ready || ranRef.current) return;
  ranRef.current = true;
  // run-once khi 'ready' chuyển từ false->true
}, [ready]);
```

---

## 5) Điều kiện phức tạp → tách thành biến “derived”
```jsx
const canLoad = useMemo(() => enabled && userId && token, [enabled, userId, token]);
useEffect(() => {
  if (!canLoad) return;
  // ...
}, [canLoad]);
```

---

## 6) Shortcut với custom hooks
```jsx
function useConditionalEffect(enabled, fn, deps) {
  useEffect(() => {
    if (!enabled) return;
    return fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ...deps]);
}

// dùng
useConditionalEffect(online, () => {
  const id = setInterval(ping, 5000);
  return () => clearInterval(id);
}, [ping]);
```

---

## 7) Anti-patterns tránh
- Dùng `enabled` nhưng vẫn setState trong nhánh `else` → vẫn gây render thừa.
- Guard mơ hồ (ví dụ `if (!x) return` nhưng `x` có thể là `0` hợp lệ).
- Điều kiện nằm **sau** setState trong effect.

---

## 8) Checklist
- [ ] Guard ở **đầu effect** và sớm thoát.
- [ ] Điều kiện phức tạp → tính **derived boolean** rồi đưa làm 1 deps.
- [ ] Run-once khi điều kiện chuyển trạng thái → dùng **ref flag**.
- [ ] Có cleanup trong nhánh đã chạy.

---

## 9) Bài tập
1. Tạo `useAutoSave` chỉ hoạt động khi `dirty === true && online === true` (debounce 1s).
2. Viết `useOnVisibleEffect` (IntersectionObserver): effect chạy khi element visible; cleanup đúng.
3. Nâng cấp ví dụ Loader thành state machine 4 trạng thái; thêm nút Retry.