# T6-05 — useSyncExternalStore (Nâng Cao: Kiến Trúc Store)

> Mục tiêu: Nâng cấp mẫu **state ngoài React**: selector hiệu năng, **cross‑tab sync** (BroadcastChannel), **persist** (localStorage/IndexedDB), và **SSR**.

---

## 1) Kiến trúc store có selector
```ts
type Listener = () => void;
const listeners = new Set<Listener>();
let state = { user: null as null | { id: string; name: string }, token: null as null | string };

function setState(updater: (s: typeof state) => typeof state) {
  const prev = state;
  const next = updater(state);
  if (Object.is(prev, next)) return; // giữ ref nếu không đổi
  state = next; listeners.forEach((l) => l());
}
function subscribe(l: Listener){ listeners.add(l); return () => listeners.delete(l); }
function getSnapshot(){ return state; } // có thể chia nhỏ nếu cần
```

**Hook selector**:
```ts
function useStore<T>(select: (s: typeof state) => T) {
  const getSel = () => select(getSnapshot());
  return React.useSyncExternalStore(subscribe, getSel);
}
const useUser = () => useStore(s => s.user); // re-render khi user đổi
```

---

## 2) Persist & rehydrate
```ts
function persist(key="app"){
  // load
  try { const raw = localStorage.getItem(key); if(raw) state = { ...state, ...JSON.parse(raw) }; } catch {}
  // subscribe
  subscribe(() => { localStorage.setItem(key, JSON.stringify(state)); });
}
persist();
```

---

## 3) Cross‑tab sync
```ts
const bc = new BroadcastChannel("app");
subscribe(() => bc.postMessage(state));
bc.onmessage = (e) => { state = e.data; listeners.forEach(l=>l()); };
```

---

## 4) SSR
- Cung cấp `getServerSnapshot` và **seed** state từ request cookie.  
- Tránh đọc `window/*` trong module scope (chỉ trong effect).

---

## 5) Bảo mật & phân tách
- Không persist **token nhạy cảm** nếu không mã hoá.  
- Tách **domain store**: auth/store/cart thay vì mega‑store.

---

## 6) Checklist
- [ ] Selector tinh gọn; giữ reference khi không đổi.  
- [ ] Persist có try/catch; chú ý kích thước.  
- [ ] Cross‑tab đồng bộ an toàn.  
- [ ] SSR: seed & getServerSnapshot.

---

## 7) Bài tập
1. Xây auth store có `useUser()`/`useIsLoggedIn()` + persist.  
2. Đồng bộ user giữa 2 tab bằng BroadcastChannel.  
3. Thêm `getServerSnapshot` và seed từ cookie trong SSR.