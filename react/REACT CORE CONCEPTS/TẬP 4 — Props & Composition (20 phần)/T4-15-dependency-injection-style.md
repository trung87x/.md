# T4-15 — Dependency Injection (DI) Style trong React

> Mục tiêu: Tách **phụ thuộc** (API, storage, logger, feature flag, formatter…) ra khỏi component để **dễ test, mock, và thay thế**; triển khai DI qua props, context, và provider factory.

---

## 1) DI là gì? Tại sao cần?
- **Dependency Injection**: component **không tự khởi tạo** phụ thuộc mà **nhận từ bên ngoài** (inject).  
- Lợi ích: **test dễ** (mock), **thay thế** implementation, **độc lập** môi trường (web/native), cô lập side-effects.

```jsx
// ❌ Anti-pattern: gắn chặt vào phụ thuộc cụ thể
function Profile() {
  const api = new RealApi(); // cứng
  // ...
}
// ✅ DI qua prop
function Profile({ api }) { /* ... dùng api ... */ }
```

---

## 2) DI qua Props (đơn giản nhất)
Truyền các service/adapter qua props.

```tsx
type Api = { getUser(id: string): Promise<User> };
function Profile({ api, userId }: { api: Api; userId: string }) {
  const [user, setUser] = React.useState<User | null>(null);
  React.useEffect(() => { api.getUser(userId).then(setUser); }, [api, userId]);
  if (!user) return <Spinner/>;
  return <div>{user.name}</div>;
}
```

- Test:
```tsx
const fakeApi: Api = { getUser: async () => ({ id:"1", name:"Test" }) };
render(<Profile api={fakeApi} userId="1" />);
```

---

## 3) DI qua Context (toàn cục có kiểm soát)
Tạo **ServiceContext** chứa các dependency; inject một lần ở root.

```tsx
type Services = { api: Api; logger: { log: (...a:any[]) => void } };
const ServiceCtx = React.createContext<Services | null>(null);
export function useServices() {
  const v = React.useContext(ServiceCtx);
  if (!v) throw new Error("useServices phải nằm trong <ServiceProvider>");
  return v;
}
export function ServiceProvider({ services, children }: { services: Services; children: React.ReactNode }) {
  return <ServiceCtx.Provider value={services}>{children}</ServiceCtx.Provider>;
}
function Profile({ userId }: { userId: string }) {
  const { api, logger } = useServices();
  React.useEffect(() => { logger.log("load", userId); }, [logger, userId]);
  // ...
}
```

- **Ưu**: không prop drilling.  
- **Nhược**: nhớ **memo hóa** `services` để tránh re-render rộng.

---

## 4) Provider Factory / Environment Adapter
Chọn implementation theo môi trường (dev/prod/mock).

```tsx
function createServices(env: "mock" | "prod"): Services {
  if (env === "mock") {
    return {
      api: { getUser: async (id) => ({ id, name: "Mock " + id }) },
      logger: { log: (...a) => console.debug("[mock]", ...a) },
    };
  }
  return {
    api: new RealApi(),
    logger: console,
  };
}

// Root
const services = React.useMemo(() => createServices(import.meta.env.MODE === "development" ? "mock" : "prod"), []);
<ServiceProvider services={services}><App/></ServiceProvider>
```

---

## 5) DI + Hooks
Gói các dependency trong **custom hooks** để có API gọn.

```tsx
function useUser(id: string) {
  const { api } = useServices();
  const [user, setUser] = React.useState<User | null>(null);
  React.useEffect(() => { api.getUser(id).then(setUser); }, [api, id]);
  return user;
}
```

---

## 6) DI + Testing Strategy
- **Unit**: inject mock (fake/stub/spies).  
- **Integration**: inject adapter thật nhưng mock network (msw).  
- **E2E**: adapter thật trên staging.

---

## 7) Anti-patterns
- **Khởi tạo** service trong render/effect nhiều lần → tạo **instance rác**.  
- Trộn **toàn cục** và **cục bộ** tùy hứng → khó theo dõi.  
- Cho component **tự import** service singleton ở mọi nơi → **coupling** cứng, test khó.

---

## 8) Mini demo (UMD ý tưởng)
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
<div id="app"></div>
<script type="text/babel">
  const ServiceCtx = React.createContext(null);
  function ServiceProvider({ services, children }){
    return <ServiceCtx.Provider value={services}>{children}</ServiceCtx.Provider>;
  }
  function useServices(){
    const v = React.useContext(ServiceCtx);
    if(!v) throw new Error("useServices trong Provider");
    return v;
  }
  function Profile({ userId }){
    const { api } = useServices();
    const [user, setUser] = React.useState(null);
    React.useEffect(()=>{ api.getUser(userId).then(setUser); }, [api, userId]);
    return <div>User: {user?.name ?? "…"}</div>;
  }
  const mock = { api: { getUser: async (id) => ({ id, name: "Mock " + id }) } };
  ReactDOM.createRoot(document.getElementById("app")).render(
    <ServiceProvider services={mock}><Profile userId="1"/></ServiceProvider>
  );
</script>
</body>
</html>
```

---

## 9) Checklist
- [ ] Chọn **kênh DI**: props (đơn giản) hay context (toàn cục).
- [ ] Tạo **factory** cho service theo môi trường.
- [ ] Memo hóa `services` để ổn định tham chiếu.
- [ ] Viết hooks thin (`useX`) để truy cập service.
- [ ] Test bằng mock/spy; integration dùng msw.

---

## 10) Bài tập
1. Tạo `ServiceProvider` với `api`, `storage`, `logger`. Viết `useUser()` lấy dữ liệu.
2. Viết `createServices(env)` cho mock/prod và test `Profile` với mock.
3. Dùng msw mock API và đo số render khi thay đổi `services` (quên memo) vs có memo.