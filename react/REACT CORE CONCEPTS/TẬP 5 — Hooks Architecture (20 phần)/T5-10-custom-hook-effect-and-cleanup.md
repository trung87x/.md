# T5-10 — Custom Hook: Effect + Cleanup

> Mục tiêu: Viết custom hook có **side‑effect an toàn** và **cleanup đúng**: timer, event listener, subscription, fetch/AbortController, Mutation/IntersectionObserver.

---

## 1) Khung chuẩn cho effect + cleanup
```ts
function useSomething(target: EventTarget, handler: (e:any)=>void) {
  const saved = React.useRef(handler);
  React.useEffect(() => { saved.current = handler; }, [handler]);
  React.useEffect(() => {
    if (!target) return;
    const proxy = (e:any) => saved.current(e);
    target.addEventListener("change", proxy);
    return () => target.removeEventListener("change", proxy);
  }, [target]);
}
```
- **Lưu handler** vào ref để không phải re‑register mỗi render.  
- **Cleanup** trong return của effect.

---

## 2) Timer
```ts
function useInterval(cb: () => void, ms: number | null) {
  const latest = React.useRef(cb);
  React.useEffect(() => { latest.current = cb; }, [cb]);
  React.useEffect(() => {
    if (ms == null) return;
    const id = setInterval(() => latest.current(), ms);
    return () => clearInterval(id);
  }, [ms]);
}
```

---

## 3) Fetch + AbortController
```ts
function useJson(url?: string) {
  const [state, setState] = React.useState<{status:"idle"|"loading"|"success"|"error"; data:any; error:any}>({
    status: "idle", data: null, error: null
  });
  React.useEffect(() => {
    if (!url) return;
    const ac = new AbortController();
    setState({ status: "loading", data: null, error: null });
    (async () => {
      try {
        const r = await fetch(url, { signal: ac.signal });
        if (!r.ok) throw new Error(r.statusText);
        setState({ status: "success", data: await r.json(), error: null });
      } catch (e:any) {
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

## 4) Observers (Intersection/Mutation/Resize)
```ts
function useOnVisible(el: Element | null, cb: () => void, options?: IntersectionObserverInit) {
  const latest = React.useRef(cb);
  React.useEffect(()=>{ latest.current = cb; }, [cb]);
  React.useEffect(() => {
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) latest.current(); });
    }, options);
    io.observe(el);
    return () => io.disconnect();
  }, [el, options?.root, options?.rootMargin, options?.threshold]);
}
```

---

## 5) Subscription (WebSocket/EventSource)
- Đảm bảo **đóng kết nối** khi unmount hoặc đổi tham số.  
- Queue/buffer sự kiện nếu cần để không setState quá dày.

```ts
function useEventSource(url?: string) {
  const [messages, setMessages] = React.useState<string[]>([]);
  React.useEffect(() => {
    if (!url) return;
    const es = new EventSource(url);
    const onMsg = (e: MessageEvent) => setMessages(m => [...m, e.data]);
    es.addEventListener("message", onMsg);
    es.addEventListener("error", () => es.close());
    return () => { es.removeEventListener("message", onMsg); es.close(); };
  }, [url]);
  return messages;
}
```

---

## 6) Idempotency & Strict Mode
- Dev mode có thể **mount/unmount/mount** lại → effect phải **idempotent** và cleanup **chắc chắn**.
- Tránh setState sau unmount → rely on AbortController/cờ `mounted` nếu cần.

---

## 7) Anti‑patterns
- Đăng ký listener **mỗi render** (thiếu deps/ref).  
- Quên hủy timer/observer/socket.  
- Gộp quá nhiều side‑effect vào một hook “God”. Hãy **tách**: `useInterval`, `useEventListener`, `useJson`…

---

## 8) Mini demo (UMD)
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
    function useInterval(cb, ms){
      const latest = React.useRef(cb);
      React.useEffect(()=>{ latest.current = cb; }, [cb]);
      React.useEffect(()=>{
        if(ms == null) return;
        const id = setInterval(()=>latest.current(), ms);
        return ()=>clearInterval(id);
      }, [ms]);
    }
    function App(){
      const [tick, setTick] = React.useState(0);
      useInterval(()=>setTick(t=>t+1), 1000);
      return <div>Tick: {tick}</div>;
    }
    ReactDOM.createRoot(document.getElementById("app")).render(<App/>);
  </script>
</body>
</html>
```

---

## 9) Checklist
- [ ] Tách effect theo **loại tài nguyên** (timer, listener, fetch…).  
- [ ] Dùng ref để giữ **handler mới** mà không re‑register vô ích.  
- [ ] Cleanup chắc chắn: `clearInterval`/`removeEventListener`/`abort`/`disconnect`/`close`.  
- [ ] Idempotent dưới Strict Mode.  
- [ ] Trả về API **gọn** cho nơi dùng (state + actions).

---

## 10) Bài tập
1. Viết `useEventListener(target, type, handler)` chuẩn hoá handler ref + cleanup.  
2. Tạo `useJson(url)` như trên, thêm **retry** và **abort** thủ công.  
3. Viết `useOnVisible(ref, cb)` và demo lazy‑load ảnh khi phần tử vào viewport.