# T2-20 — State–Effect Cheatsheet (Pro Recap)

> Mục tiêu: Tóm tắt **công thức thực chiến** cho state & effect: chọn đúng hook, tránh lỗi phổ biến, checklist triển khai.

---

## 1) Chọn hook nào?
| Nhu cầu | Hook |
|---|---|
| Giá trị biến đổi đơn giản | `useState` |
| Logic cập nhật phức tạp / nhiều actions | `useReducer` |
| Dữ liệu suy diễn từ props/state | `useMemo` |
| Handler ổn định (truyền xuống con) | `useCallback` |
| Side‑effect I/O (fetch, event, timer, subs) | `useEffect` |
| Đo/điều chỉnh layout trước paint | `useLayoutEffect` |
| Chèn CSS trước layout (lib CSS‑in‑JS) | `useInsertionEffect` |
| Expose API imperative cho cha | `useImperativeHandle` |
| Giá trị mutable không trigger render | `useRef` |

---

## 2) Mẫu chuẩn cho **effect I/O**
```jsx
useEffect(() => {
  const ac = new AbortController();
  (async () => {
    try {
      const r = await fetch(url, { signal: ac.signal });
      setData(await r.json());
    } catch (e) {
      if (e.name !== "AbortError") setError(e);
    }
  })();
  return () => ac.abort();
}, [url]);
```

---

## 3) Deps chính xác (nhớ 4 chữ “**đủ & đúng**”)
- Mọi **nguồn dữ liệu** dùng trong callback → đưa vào deps.
- Ổn định object/array/function bằng `useMemo`/`useCallback`.
- Cần đọc **giá trị mới nhất** trong callback dài hạn → `useRef`/`useLatest` (T2‑10).
- Bật **ESLint `exhaustive-deps`**.

---

## 4) Batching & setState
- React **batch** setState trong events/effects → nhiều `setX` trong 1 tick chỉ render 1 lần.
- Cập nhật dựa trên state trước → `setX((prev) => ...)`.
- Tránh setState “phản chiếu” props (hai nguồn sự thật).

---

## 5) Guard & điều kiện
```jsx
useEffect(() => {
  if (!ready) return;
  // ...
}, [ready]);
```
- Điều kiện phức tạp → `useMemo` thành boolean rồi làm deps (T2‑13).
- Run‑once khi điều kiện chuyển trạng thái → ref flag.

---

## 6) Layout vs Passive effect
- **Đo/ghi trực tiếp DOM** → `useLayoutEffect` để tránh flicker.
- I/O, log → `useEffect`.

---

## 7) Công thức event listener an toàn
```jsx
function useWindowEvent(type, handler) {
  const saved = useRef(handler);
  useEffect(() => { saved.current = handler; }, [handler]);
  useEffect(() => {
    const fn = (e) => saved.current(e);
    window.addEventListener(type, fn);
    return () => window.removeEventListener(type, fn);
  }, [type]);
}
```

---

## 8) Anti‑patterns cần nhớ (đừng làm)
- Derived state bằng effect, `async` trực tiếp trên effect, `JSON.stringify` deps, effect khổng lồ “làm tất cả”, setState không guard, không cleanup, đo layout trong `useEffect`… (xem T2‑19).

---

## 9) Flow chẩn đoán nhanh bug effect
1) Log deps/cleanup để thấy vòng đời.  
2) Kiểm tra literal/refs trong deps.  
3) Nếu có setState trong effect → có cần guard? derived?  
4) Race? Dùng Abort/requestId.  
5) StrictMode double‑invoke: đảm bảo idempotent.

---

## 10) Checklist xuất bản PR
- [ ] Hooks đúng vai trò; tách effect theo mục đích.
- [ ] Deps đủ & đúng; không dùng stringify.
- [ ] Có cleanup timer/subscription/fetch.
- [ ] Guard điều kiện rõ ràng, không loop.
- [ ] Có test/UMD demo nếu logic phức tạp.
- [ ] Ghi chú SSR nếu có `useLayoutEffect`/DOM access.

---

## 11) Snippets “dắt túi”
```jsx
// useLatest
function useLatest(v) {
  const r = useRef(v);
  useEffect(() => { r.current = v; }, [v]);
  return r;
}

// isomorphic layout effect
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
```

---

## 12) Lộ trình ôn tập (gợi ý)
1→4: `useState`/`useReducer` nền tảng  
5→8: `useEffect`/`LayoutEffect`/deps chuẩn  
9→12: insertion/layout/order/debug  
13→16: guard/async/events/rAF  
17→18: imperative/custom hooks  
19→20: anti‑patterns + cheatsheet tổng kết

> Chúc bạn “thuần thục state–effect” và viết React **mượt, sạch, dễ debug** ✨