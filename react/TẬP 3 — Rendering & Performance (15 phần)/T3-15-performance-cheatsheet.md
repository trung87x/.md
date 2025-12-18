# T3-15 — Performance Cheatsheet

> Mục tiêu: Tổng hợp **các công thức tối ưu hiệu năng** thường dùng trong React — nhanh, gọn, tra cứu khi code review/PR.

---

## 1) Khi nào component render?
- State đổi, props đổi, context đổi, cha render (con không memo).
- Render ≠ DOM update (diff có thể bỏ qua patch).

---

## 2) Tối ưu re-render (nhanh gọn)
- Bọc con ít đổi bằng **`React.memo`**.
- Ổn định **object/array/function** bằng **`useMemo`/`useCallback`**.
- **Colocation state** — đặt state gần nơi dùng.
- **Split context** + memo hóa **provider value**.
- **Virtualize** danh sách lớn.
- Input lag → **`useDeferredValue`**, cập nhật không gấp → **`useTransition`**.
- Debounce/throttle sự kiện dày đặc.

---

## 3) Key & reconciliation
- Dùng **key ổn định** (id), tránh `key=index` khi có reorder.
- Đổi **type** node → unmount/mount (mất state/effect).

---

## 4) Effect hygiene
- I/O → `useEffect`; đo/điều chỉnh layout → `useLayoutEffect`.
- **Cleanup** timer/subscription/fetch (AbortController).
- Đúng **deps** (bật ESLint hooks); tránh `JSON.stringify` deps.
- Tránh derived state bằng effect → dùng `useMemo`.

---

## 5) Code splitting
- `React.lazy(() => import(...))` + `<Suspense>` + Error Boundary.
- Preload/prefetch khi có tín hiệu ý định.
- Không chia vụn quá mức; giữ module đi cùng trong 1 chunk.

---

## 6) DevTools & đo lường
- **React DevTools Profiler**: Flamegraph, Ranked, Why did this render.
- **Profiler API**: theo dõi `actualDuration`/`baseDuration`.
- Lặp: đo → tối ưu → đo lại.

---

## 7) Snippets “bỏ túi”
```jsx
// memo object
const options = useMemo(() => ({ dense, rounded }), [dense, rounded]);

// memo callback
const onPick = useCallback((id) => select(id), [select]);

// isomorphic layout effect
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// deferred input
const deferred = useDeferredValue(query);
```

---

## 8) Checklist PR
- [ ] Có `React.memo` đúng chỗ cho các khối ít đổi?
- [ ] Đã ổn định object/array/function props?
- [ ] Context đã split/memo value?
- [ ] List lớn đã virtualize?
- [ ] Input lag đã xử lý với deferred/transition?
- [ ] Effect có cleanup & deps chuẩn?
- [ ] Có đo lường trước/sau bằng Profiler?

---

## 9) Bài tập
1. Tạo README “Perf playbook” cho repo của bạn dựa trên cheatsheet này.
2. Áp dụng 3 tối ưu lớn cho một màn hình thật và đo kết quả.
3. Viết tài liệu hướng dẫn onboard dev mới về tối ưu re-render.