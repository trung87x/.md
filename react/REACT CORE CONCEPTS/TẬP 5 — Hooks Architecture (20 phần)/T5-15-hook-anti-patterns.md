# T5-15 — Hook Anti‑Patterns

> Mục tiêu: Nhận diện & tránh các **anti‑pattern** khi viết hook: vi phạm Rules of Hooks, god hook, deps sai, memory leak, API mơ hồ, và premature optimization.

---

## 1) Vi phạm Rules of Hooks
```jsx
// ❌ gọi hook trong if
if (cond) { const [s] = useState(0); }
// ✅ luôn gọi ở top-level
const [s] = useState(0);
```
- Đổi **thứ tự gọi** giữa render gây lỗi khó bắt.

---

## 2) God hook (làm quá nhiều)
- Gộp fetch + event + timer + socket trong 1 hook → khó test và tái dùng.
- ✅ **Tách** theo tài nguyên: `useFetch`, `useEventListener`, `useInterval`, … rồi **compose**.

---

## 3) Deps sai / thiếu memo
- `useEffect`/`useCallback`/`useMemo` thiếu deps → **stale**.
- Đưa **object literal** vào deps → loop.
```jsx
useEffect(() => { doX(); }, [ { a:1 } ]); // ❌
const cfg = useMemo(() => ({ a:1 }), []);
useEffect(() => { doX(); }, [cfg]);       // ✅
```

---

## 4) Memory leak / cleanup thiếu
- Quên `clearInterval`, `removeEventListener`, `abort()` fetch, `disconnect()` observer.
- ✅ Luôn trả **cleanup** từ effect; dùng **AbortController** cho fetch.

---

## 5) API hook mơ hồ
- Không rõ **input/output/side‑effect** → người dùng hook đoán mò.
- ✅ Viết **contract**, đặt tên có nghĩa, ném **lỗi rõ ràng** khi dùng sai phạm vi Provider.

---

## 6) Hook trả object **không ổn định**
- Mỗi render trả object mới → downstream re-render.
- ✅ `useMemo` cho object, `useCallback` cho hàm.

---

## 7) Premature optimization
- Memo khắp nơi trước khi đo → code rối, lợi ích ít.
- ✅ Dùng Profiler/measure trước rồi tối ưu **điểm nóng**.

---

## 8) Coupling môi trường
- Hook tự `import` service singleton → khó test.
- ✅ DI qua **props/context** (T4‑15), cho phép mock.

---

## 9) Checklist
- [ ] Top‑level calls; không trong nhánh.
- [ ] Cleanup đầy đủ cho mọi tài nguyên.
- [ ] Deps chuẩn; tránh literal trong deps.
- [ ] Đầu ra ổn định (memo/callback).
- [ ] API rõ ràng; tách nhỏ; đo trước tối ưu.