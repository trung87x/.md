# T5-11 — Custom Hook: Performance Hook

> Mục tiêu: Viết **performance hooks** để ổn định tham chiếu, giảm tính toán lặp lại, hạn chế re-render, và xử lý tác vụ nặng (filter/sort/list lớn).

---

## 1) Nguyên tắc chung
- **Ổn định đầu ra**: `useCallback` cho hàm, `useMemo` cho giá trị nặng.
- **Tách nhỏ**: hook hiệu năng chỉ nên làm **một nhiệm vụ** (debounce, throttle, memo selector…).
- **Tránh literal props**: không trả object mới vô cớ.
- **Đo lường** trước/sau bằng **React Profiler**.

---

## 2) `useDebouncedValue` (trì hoãn giá trị)
```tsx
export function useDebouncedValue<T>(value: T, delay = 300) {
  const [v, setV] = React.useState(value);
  React.useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return v;
}
```

---

## 3) `useThrottle` (giới hạn tần suất)
```tsx
export function useThrottle<T>(value: T, ms = 200) {
  const [v, setV] = React.useState(value);
  const last = React.useRef(0);
  React.useEffect(() => {
    const now = Date.now();
    if (now - last.current >= ms) {
      setV(value);
      last.current = now;
    } else {
      const id = setTimeout(() => { setV(value); last.current = Date.now(); }, ms - (now - last.current));
      return () => clearTimeout(id);
    }
  }, [value, ms]);
  return v;
}
```

---

## 4) `useMemoSelector` (selector có deps)
```tsx
export function useMemoSelector<S, R>(source: S, select: (s: S) => R, deps: React.DependencyList) {
  const selected = React.useMemo(() => select(source), deps);
  return selected;
}
```
- Khi `source` lớn nhưng UI chỉ cần một phần.

---

## 5) `useStableCallback` (callback ổn định + state tươi)
```tsx
export function useLatest<T>(v: T) {
  const ref = React.useRef(v);
  React.useEffect(() => { ref.current = v; }, [v]);
  return ref;
}
export function useStableCallback<T extends (...a: any[]) => any>(fn: T): T {
  const ref = useLatest(fn);
  // @ts-ignore
  return React.useCallback(((...a) => ref.current(...a)) as T, [ref]);
}
```

---

## 6) Danh sách lớn: `useVirtualList` (ý tưởng)
- Render **cửa sổ** phần tử nhìn thấy, không render toàn bộ.
- Dùng `IntersectionObserver`/`ResizeObserver` hoặc thư viện (react-virtual).

```tsx
// Pseudo: giả định itemHeight cố định
export function useVirtualList<T>(items: T[], itemHeight: number, viewportHeight: number) {
  const visibleCount = Math.ceil(viewportHeight / itemHeight) + 2; // buffer
  const [start, setStart] = React.useState(0);
  const end = start + visibleCount;
  const offsetY = start * itemHeight;
  const totalHeight = items.length * itemHeight;
  const slice = items.slice(start, end);
  return { slice, offsetY, totalHeight, setStart };
}
```

---

## 7) `useTransition` & `useDeferredValue` (phối hợp)
- Dùng khi filter/sort nặng trên list: defer giá trị nhập, mark transition cho cập nhật không gấp (xem T5‑06).

---

## 8) Anti‑patterns
- Dùng **memo** bừa bãi → phức tạp, khó đọc, lợi ích ít.
- Tối ưu micro trước khi đo lường macro.
- Re-render cascade do callback/object mới → **ổn định tham chiếu**.

---

## 9) Mini demo (UMD)
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
  function useDebouncedValue(value, delay=300){
    const [v, setV] = React.useState(value);
    React.useEffect(()=>{ const id=setTimeout(()=>setV(value), delay); return ()=>clearTimeout(id); }, [value, delay]);
    return v;
  }
  function App(){
    const [q, setQ] = React.useState("");
    const dq = useDebouncedValue(q, 400);
    const list = React.useMemo(()=>Array.from({length:4000}, (_,i)=>"Item "+i), []);
    const results = React.useMemo(()=>list.filter(x=>x.toLowerCase().includes(dq.toLowerCase())), [list, dq]);
    return (<div>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search 4k items"/>
      <div>Found: {results.length}</div>
    </div>);
  }
  ReactDOM.createRoot(document.getElementById('app')).render(<App/>);
</script>
</body>
</html>
```

---

## 10) Checklist
- [ ] Ổn định tham chiếu đầu ra (callback/memo).
- [ ] Debounce/throttle cho nhập liệu & scroll.
- [ ] Virtual hoá danh sách lớn.
- [ ] Dùng deferred/transition cho cập nhật không gấp.
- [ ] Đo lường bằng Profiler; xóa tối ưu không cần thiết.

---

## 11) Bài tập
1. Áp dụng `useDebouncedValue` vào ô tìm kiếm 10k item; đo render.  
2. Viết `useThrottle` cho sự kiện scroll; tạo thanh “Back to Top”.  
3. Tạo hook `useVirtualList` đơn giản và hiển thị 50k item.