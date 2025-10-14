# T2-14 — Effect + Async (Fetch, Cancel Token)

> Mục tiêu: Viết effect bất đồng bộ **đúng cách** với `fetch`, **huỷ bỏ** khi unmount/đổi deps, tránh **race conditions**.

---

## 1) Không dùng callback `async` trực tiếp
```jsx
// ❌ Sai: callback useEffect không nên là async
useEffect(async () => { ... }, [deps]);
```
**Đúng**: tạo IIFE async bên trong, hoặc viết hàm async rồi gọi.
```jsx
useEffect(() => {
  let alive = true;
  (async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (alive) setData(data);
    } catch (e) {
      if (alive) setError(e);
    }
  })();
  return () => { alive = false; }; // cancel-by-flag
}, [url]);
```

---

## 2) AbortController (huỷ request thật sự)
```jsx
useEffect(() => {
  const ac = new AbortController();
  (async () => {
    try {
      const res = await fetch(url, { signal: ac.signal });
      setData(await res.json());
    } catch (e) {
      if (e.name !== "AbortError") setError(e);
    }
  })();
  return () => ac.abort();
}, [url]);
```

---

## 3) Tránh race condition khi deps thay đổi nhanh
- Dùng **requestId** hoặc **timestamp** để chỉ nhận kết quả của lần gọi **mới nhất**.
```jsx
useEffect(() => {
  let current = Symbol("req");
  lastReq.current = current;
  (async () => {
    const res = await fetch(buildUrl(query));
    const json = await res.json();
    if (lastReq.current === current) setList(json);
  })();
}, [query]);
```
- Hoặc dùng **AbortController** hủy lần trước.

---

## 4) Mapping trạng thái chuẩn
```jsx
const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'
const [data, setData] = useState(null);
const [error, setError] = useState(null);

useEffect(() => {
  if (!url) return;
  const ac = new AbortController();
  setStatus("loading"); setError(null);
  (async () => {
    try {
      const r = await fetch(url, { signal: ac.signal });
      if (!r.ok) throw new Error(r.statusText);
      setData(await r.json());
      setStatus("success");
    } catch (e) {
      if (e.name === "AbortError") return;
      setError(e); setStatus("error");
    }
  })();
  return () => ac.abort();
}, [url]);
```

---

## 5) Retry & backoff
```jsx
async function fetchWithRetry(url, { retries = 3, backoff = 300 } = {}) {
  for (let i = 0; i < retries; i++) {
    try {
      const r = await fetch(url);
      if (!r.ok) throw new Error(r.statusText);
      return await r.json();
    } catch (e) {
      if (i === retries - 1) throw e;
      await new Promise(r => setTimeout(r, backoff * (i + 1))); // backoff tăng dần
    }
  }
}
```

---

## 6) Custom hooks tái sử dụng
```jsx
function useFetch(url, opts) {
  const [state, setState] = useState({ status: "idle", data: null, error: null });
  useEffect(() => {
    if (!url) return;
    const ac = new AbortController();
    setState({ status: "loading", data: null, error: null });
    (async () => {
      try {
        const r = await fetch(url, { ...opts, signal: ac.signal });
        if (!r.ok) throw new Error(r.statusText);
        setState({ status: "success", data: await r.json(), error: null });
      } catch (e) {
        if (e.name === "AbortError") return;
        setState({ status: "error", data: null, error: e });
      }
    })();
    return () => ac.abort();
  }, [url]);
  return state;
}
```

---

## 7) Checklist
- [ ] Không dùng `async` trực tiếp trên callback effect.
- [ ] **Huỷ request** bằng `AbortController` hoặc **flag**.
- [ ] Xử lý **race**: chỉ commit kết quả của lần gọi mới nhất.
- [ ] Quản lý `status` tường minh; cleanup đầy đủ.

---

## 8) Bài tập
1. Viết `useFetch` có `retry` và `timeout` (AbortController + setTimeout).
2. Tạo tìm kiếm gợi ý với `debounce 300ms`; hủy request cũ khi query đổi.
3. Viết demo lỗi race: gõ nhanh 3 ký tự; sửa bằng AbortController.