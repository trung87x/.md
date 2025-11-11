# 🔥 Using TypeScript trong React — Hướng dẫn chi tiết

Rất tuyệt — đây là bài “Using TypeScript” trong tài liệu React chính thức — **rất quan trọng** nếu bạn muốn viết React chuyên nghiệp.  
Dưới đây là bản **hướng dẫn chi tiết, dễ hiểu, kèm giải thích, ví dụ và mẹo thực chiến** 💪

---

## ⚙️ GIỚI THIỆU — TẠI SAO DÙNG TYPESCRIPT VỚI REACT?

**TypeScript (TS)** là JavaScript có thêm **kiểu dữ liệu tĩnh (type)**.  
Nó giúp bạn:

- 🧩 Bắt lỗi khi viết code (trước khi chạy app).  
- 🧩 Hiểu rõ props, state, event… của component.  
- 🧩 Tăng năng suất (vì editor auto-complete, hiển thị doc, cảnh báo…).  
- 🧩 Làm việc nhóm an toàn hơn (code rõ ràng, ít bug ẩn).  

---

## 🪄 I. CÀI ĐẶT VÀ KHỞI TẠO

### ✅ 1️⃣ Nếu bạn dùng Framework (khuyên dùng)

Các framework React như:

- Next.js  
- Remix  
- Gatsby  
- Expo  

→ đều hỗ trợ TypeScript **mặc định** (chỉ cần thêm file `.ts` hoặc `.tsx`).

Ví dụ Next.js:

```bash
npx create-next-app@latest my-app --typescript
```

Framework tự tạo `tsconfig.json`, cài `@types/react` và `@types/react-dom`.

---

### ✅ 2️⃣ Nếu bạn thêm TypeScript vào React hiện có

Trong một dự án React bằng Vite hoặc CRA (JavaScript), chỉ cần cài thêm:

```bash
npm install --save-dev typescript @types/react @types/react-dom
```

Sau đó tạo file cấu hình `tsconfig.json` (nếu chưa có):

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "jsx": "preserve",
    "moduleResolution": "Node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "lib": ["DOM", "ESNext"]
  },
  "include": ["src"]
}
```

📌 **Lưu ý:**  
- File JSX phải có đuôi `.tsx`  
- `lib` phải bao gồm `"DOM"`  
- `jsx` nên đặt `"preserve"`  

---

## 🧱 II. TYPESCRIPT TRONG REACT COMPONENTS

### 🧩 1️⃣ Inline type (nhanh, dùng cho ví dụ nhỏ)

```tsx
function MyButton({ title }: { title: string }) {
  return <button>{title}</button>;
}

export default function App() {
  return <MyButton title="Click me" />;
}
```

👉 `{ title: string }` là cách **khai báo type ngay trong tham số props.**

---

### 🧩 2️⃣ Dùng `interface` hoặc `type` cho props (chuẩn nhất)

```tsx
interface MyButtonProps {
  title: string;
  disabled: boolean;
}

function MyButton({ title, disabled }: MyButtonProps) {
  return <button disabled={disabled}>{title}</button>;
}
```

💡 Khi props có nhiều trường hoặc tái sử dụng → **luôn dùng `interface` hoặc `type`.**

---

## 🔁 III. TYPESCRIPT VỚI HOOKS

### ✅ 1️⃣ useState

#### 🔹 TS tự suy luận (inferred type)

```tsx
const [enabled, setEnabled] = useState(false); // boolean
```

#### 🔹 Gán type tường minh (rõ ràng hơn)

```tsx
const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
```

#### 🔹 State dạng đối tượng (chuẩn production)

```tsx
type RequestState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: any }
  | { status: 'error'; error: Error };

const [request, setRequest] = useState<RequestState>({ status: 'idle' });
```

---

### ✅ 2️⃣ useReducer

Dùng khi state phức tạp.

```tsx
import { useReducer } from "react";

interface State {
  count: number;
}

type Action =
  | { type: "reset" }
  | { type: "setCount"; value: number };

const initialState: State = { count: 0 };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "reset": return initialState;
    case "setCount": return { count: action.value };
    default: throw new Error("Unknown action");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "setCount", value: state.count + 1 })}>+</button>
    </>
  );
}
```

---

### ✅ 3️⃣ useContext

#### Trường hợp có default value:

```tsx
type Theme = "light" | "dark";
const ThemeContext = createContext<Theme>("light");

const useTheme = () => useContext(ThemeContext);
```

#### Trường hợp `null` là mặc định:

```tsx
type User = { name: string } | null;
const UserContext = createContext<User>(null);

function useUser() {
  const user = useContext(UserContext);
  if (!user) throw new Error("useUser must be used within a Provider");
  return user;
}
```

---

### ✅ 4️⃣ useMemo & useCallback

- **useMemo:** Ghi nhớ giá trị  
- **useCallback:** Ghi nhớ hàm  

```tsx
const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);

const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
  setValue(event.currentTarget.value);
}, []);
```

---

## 🧩 IV. CÁC TYPE HỮU ÍCH TRONG `@types/react`

### ✅ 1️⃣ DOM Events

```tsx
function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
  console.log(event.currentTarget.value);
}
```

| Sự kiện | Type |
|----------|------|
| `onChange` | `React.ChangeEvent<HTMLInputElement>` |
| `onClick` | `React.MouseEvent<HTMLButtonElement>` |
| `onSubmit` | `React.FormEvent<HTMLFormElement>` |
| `onKeyDown` | `React.KeyboardEvent<HTMLInputElement>` |

---

### ✅ 2️⃣ Children

Hai cách mô tả props chứa con:

```tsx
interface Props {
  children: React.ReactNode; // mọi loại JSX, text, number, v.v.
}
```

Hoặc nếu bạn chỉ nhận **JSX elements:**

```tsx
interface Props {
  children: React.ReactElement;
}
```

---

### ✅ 3️⃣ Style

Khi dùng inline style:

```tsx
interface BoxProps {
  style: React.CSSProperties;
}

function Box({ style }: BoxProps) {
  return <div style={style}>Box</div>;
}
```

→ **Gợi ý và kiểm tra cú pháp CSS trực tiếp trong VS Code.**

---

## 🧠 V. NGUỒN HỌC TIẾP THEO

| Tài nguyên | Mô tả |
|-------------|--------|
| [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) | Tài liệu chính thức của TypeScript |
| [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/) | Tổng hợp “mẹo và kiểu thường dùng” cho React + TS |
| [TypeScript Discord](https://discord.gg/typescript) | Cộng đồng lớn để hỏi đáp |
| [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react) | Nơi chứa các type chính thức như `@types/react` |

---

## ✅ TÓM TẮT DÀNH CHO BẠN

| Nhiệm vụ | Làm gì | Ví dụ |
|-----------|--------|--------|
| Cài TS vào React | `npm i -D typescript @types/react @types/react-dom` | — |
| File chứa JSX | Dùng `.tsx` | `App.tsx` |
| Định nghĩa props | Dùng `interface` hoặc `type` | `interface Props { title: string }` |
| Dùng hooks | TS tự suy luận, hoặc truyền kiểu cụ thể | `useState<string>("")` |
| Sự kiện DOM | Dùng `React.ChangeEvent<...>` | `handleClick(e: React.MouseEvent<HTMLButtonElement>)` |
| Trẻ em (children) | `React.ReactNode` | `<Layout>{children}</Layout>` |
| Inline style | `React.CSSProperties` | `style={{ color: "red" }}` |

---

Nếu bạn muốn, mình có thể tạo cho bạn **“bộ mẫu React + TypeScript chuẩn sản xuất”**  
→ bao gồm `tsconfig.json`, ví dụ component typed, hooks typed, context, event, style,…  

Bạn muốn mình tạo skeleton đó cho bạn luôn chứ (có thể copy vào Vite hoặc Next.js)?
