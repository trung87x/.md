# T5-16 — Hook Testing với Vitest & React Testing Library (RTL)

> Mục tiêu: Viết test **đáng tin** cho hooks: unit (logic thuần) & integration (lifecycle/effect/cleanup) bằng **Vitest/Jest** + **RTL**.

---

## 1) Phân lớp test
- **Pure logic**: tách hàm thuần khỏi hook để test nhanh.  
- **Hook lifecycle**: mount → update → unmount, kiểm tra **effect/cleanup**.  
- **Provider hooks**: test với **wrapper** (Context/Provider).

---

## 2) Setup cơ bản (Vitest)
```ts
// vite.config.ts: test.environment = "jsdom"
// vitest.setup.ts
import "@testing-library/jest-dom";
```

---

## 3) Test hook thuần bằng RTL
```tsx
import { renderHook, act } from "@testing-library/react";

function useCounter(initial=0){
  const [n, setN] = React.useState(initial);
  const inc = React.useCallback(()=>setN(v=>v+1), []);
  return { n, inc };
}

it("increments", () => {
  const { result } = renderHook(() => useCounter(1));
  act(() => result.current.inc());
  expect(result.current.n).toBe(2);
});
```

---

## 4) Test effect + cleanup
```tsx
function useInterval(cb:()=>void, ms:number|null){
  const ref = React.useRef(cb); React.useEffect(()=>{ref.current=cb},[cb]);
  React.useEffect(()=>{ if(ms==null) return; const id=setInterval(()=>ref.current(), ms); return ()=>clearInterval(id); },[ms]);
}

vi.useFakeTimers();
it("ticks", () => {
  const spy = vi.fn();
  renderHook(() => useInterval(spy, 1000));
  vi.advanceTimersByTime(3000);
  expect(spy).toHaveBeenCalledTimes(3);
});
```

---

## 5) Test hooks dùng Context
```tsx
const Ctx = React.createContext(0);
function useCount(){ return React.useContext(Ctx); }

it("reads context", () => {
  const wrapper = ({ children }: any) => <Ctx.Provider value={42}>{children}</Ctx.Provider>;
  const { result } = renderHook(() => useCount(), { wrapper });
  expect(result.current).toBe(42);
});
```

---

## 6) Test fetch/async
- Dùng **msw** mock network; hoặc `vi.spyOn(global, "fetch")` trả promise.  
- Dùng **`await waitFor(...)`** để đợi UI/state chuyển từ "loading" → "success".

```tsx
const json = vi.fn().mockResolvedValue([{ id:1 }]);
vi.spyOn(global, "fetch").mockResolvedValue({ ok:true, json } as any);

it("loads data", async () => {
  const { result } = renderHook(() => useJson("/api"));
  await waitFor(() => expect(result.current.status).toBe("success"));
  expect(result.current.data).toHaveLength(1);
});
```

---

## 7) Lưu ý Strict Mode
- Dev có thể mount/unmount/mount → viết effect **idempotent**.
- Fake timers cần **clear** giữa test để tránh rò rỉ.

---

## 8) Checklist
- [ ] Tách pure logic để unit-test.
- [ ] Dùng `renderHook` kiểm tra lifecycle & cleanup.
- [ ] Mock network với msw hoặc `fetch` spy.
- [ ] Wrapper cho hooks phụ thuộc Context/Provider.
- [ ] Fake timers & idempotent dưới Strict Mode.