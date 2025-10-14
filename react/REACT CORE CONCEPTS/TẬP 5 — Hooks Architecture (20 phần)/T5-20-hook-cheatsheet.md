# T5-20 — Hook Cheatsheet

> Mục tiêu: Bảng **cheatsheet** tổng hợp để tra cứu nhanh khi viết/đánh giá hook.

---

## 1) Quy tắc vàng
- Top‑level calls; thứ tự **ổn định**.
- Output **ổn định** (memo/callback).
- Cleanup **chắc chắn** cho timer/listener/fetch/observer.
- Không literal trong deps; dùng `useMemo`/`useCallback`.
- Viết **contract** rõ ràng; test & docs.

---

## 2) Snippets nhanh
```ts
// useLatest
function useLatest<T>(v:T){ const r=React.useRef(v); React.useEffect(()=>{r.current=v},[v]); return r; }

// Stable callback
function useStableCallback<T extends (...a:any[])=>any>(fn:T):T{
  const r=useLatest(fn); // @ts-ignore
  return React.useCallback(((...a)=>r.current(...a)) as T, [r]);
}

// Event listener
function useEventListener(target:EventTarget|null, type:string, handler:(e:any)=>void, opts?:any){
  const h = useStableCallback(handler);
  React.useEffect(()=>{ if(!target) return; target.addEventListener(type, h, opts); return ()=>target.removeEventListener(type, h, opts); }, [target, type, h, opts]);
}
```

---

## 3) Mẫu fetch + abort
```ts
function useJson(url?: string){
  const [s, setS] = React.useState({ status:"idle", data:null as any, error:null as any });
  React.useEffect(()=>{
    if(!url) return;
    const ac = new AbortController();
    setS({ status:"loading", data:null, error:null });
    (async()=>{
      try{
        const r = await fetch(url, { signal: ac.signal });
        if(!r.ok) throw new Error(r.statusText);
        setS({ status:"success", data: await r.json(), error:null });
      } catch(e:any){ if(e.name!=="AbortError") setS({ status:"error", data:null, error:e }); }
    })();
    return ()=>ac.abort();
  }, [url]);
  return s;
}
```

---

## 4) Checklist review PR (hooks)
- [ ] Tên bắt đầu bằng `use`, mục tiêu rõ.
- [ ] Input có default; output ổn định.
- [ ] Deps đúng; không literal trong deps.
- [ ] Cleanup tài nguyên đầy đủ.
- [ ] Có test (fake timers/msw nếu cần) và README.

---

## 5) Liên kết nhanh
- T5‑02 (useRef & DOM), T5‑05 (useSyncExternalStore), T5‑06 (Transition/Deferred), T5‑07 (useEvent/alternatives), T5‑10 (Effect+Cleanup), T5‑11 (Performance hooks).