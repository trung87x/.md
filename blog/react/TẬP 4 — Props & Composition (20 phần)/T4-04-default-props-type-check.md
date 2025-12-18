# T4-04 — Default Props & Type Check

> Mục tiêu: Quản lý **giá trị mặc định** và **kiểu hóa** props để code an toàn, dễ bảo trì — dùng PropTypes (JS) hoặc TypeScript (ưu tiên).

---

## 1) Default props (JS/TS)
- **Ưu tiên** đặt default khi **destructure tham số**:
```jsx
function Button({ label = "OK", disabled = false }) { /* ... */ }
```
- Với **TypeScript**, có thể kết hợp union/optional:
```ts
type ButtonProps = {
  label?: string;
  disabled?: boolean;
};
function Button({ label = "OK", disabled = false }: ButtonProps) { /* ... */ }
```

> Ghi chú: `Component.defaultProps` trước đây hay dùng với class, nhưng với function + TS hiện đại, **ít cần**.

---

## 2) PropTypes (JavaScript)
Khi **không dùng TS**, dùng `prop-types` để check lúc dev.
```jsx
import PropTypes from "prop-types";

function Badge({ text = "New", color = "#10b981" }) { /* ... */ }

Badge.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
};
```
- Ưu điểm: phát hiện sai loại, thiếu prop trong dev.
- Nhược: chỉ check **runtime dev**, không thay thế được TS.

---

## 3) TypeScript: định nghĩa chặt chẽ
```ts
type Variant = "solid" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

type ButtonProps = {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: Variant;
  size?: Size;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  label = "OK",
  variant = "solid",
  size = "md",
  disabled = false,
  ...rest
}: ButtonProps) {
  return (
    <button data-variant={variant} data-size={size} disabled={disabled} {...rest}>
      {label}
    </button>
  );
}
```
- Kế thừa **thuộc tính gốc của `<button>`** bằng `React.ButtonHTMLAttributes` giúp `onBlur`, `title`, `type`… hoạt động tự nhiên.
- Union literal (`"sm" | "md" | "lg"`) cho **DX tốt** (gợi ý IDE + kiểm tra biên).

---

## 4) Kết hợp default + type check đúng chỗ
- Default nằm trong **destructure** → một nguồn sự thật.
- Kiểu hoá đầy đủ giúp **props optional** rõ ràng và **giảm if/guard** trong thân component.

---

## 5) Validate props tùy chỉnh (JS)
```jsx
const colorProp = (props, propName, componentName) => {
  const v = props[propName];
  if (v && !/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v)) {
    return new Error(`${componentName}: '${propName}' phải là mã màu hex`);
  }
};
Badge.propTypes = { color: colorProp };
```

---

## 6) Mini demo (UMD)
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
    function Button({ label = "OK", disabled = false, ...rest }) {
      return <button disabled={disabled} {...rest}>{label}</button>;
    }
    function App() {
      return (
        <div>
          <Button onClick={() => alert("clicked")} />
          <Button label="Delete" disabled />
        </div>
      );
    }
    ReactDOM.createRoot(document.getElementById("app")).render(<App />);
  </script>
</body>
</html>
```

---

## 7) Checklist
- [ ] Đặt default ở destructure; tránh `defaultProps` cho function components.
- [ ] Dùng **TypeScript** khi có thể; nếu không, dùng **PropTypes**.
- [ ] Kế thừa attributes HTML thích hợp (`ButtonHTMLAttributes`, `InputHTMLAttributes`...).

---

## 8) Bài tập
1. Viết `Button` (TS) với `variant`, `size` có union type; kế thừa thuộc tính `<button>`.
2. `Tag({ color = "#10b981", closable = false, onClose })` kiểm tra runtime bằng PropTypes.
3. Tạo `Input` nhận `defaultValue`, `value`, `onChange` và type đầy đủ trong TS.