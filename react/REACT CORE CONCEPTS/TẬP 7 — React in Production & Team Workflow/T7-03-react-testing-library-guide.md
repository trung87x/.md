# T7-03 — React Testing Library Guide

> 🧪 Kiểm thử hành vi người dùng, không phải chi tiết implementation.

---

## 🎯 Mục tiêu
- Hiểu nguyên tắc test React “the way users use it”.
- Dùng Vitest + React Testing Library để test component.
- Biết viết unit test và integration test.

---

## ⚙️ Cài đặt

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

Thêm script:
```json
"scripts": {
  "test": "vitest"
}
```

---

## 🧩 Ví dụ test cho Button

```jsx
// Button.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

test("renders button and handles click", () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  fireEvent.click(screen.getByText(/click me/i));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

---

## 🧪 Test Hook với custom render

```jsx
// useCounter.test.jsx
import { renderHook, act } from "@testing-library/react";
import { useCounter } from "./useCounter";

test("increments counter", () => {
  const { result } = renderHook(() => useCounter());
  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
});
```

---

## ✅ Ghi nhớ
| Nguyên tắc | Ý nghĩa |
|-------------|----------|
| **Test hành vi, không test implementation** | Dùng `screen.getByText`, không `querySelector`. |
| **Mỗi test 1 hành vi rõ ràng** | Tên test nên mô tả hành động người dùng. |
| **Dùng jest-dom matcher** | `toBeInTheDocument`, `toHaveClass`, `toHaveTextContent`. |

---

## 🚀 Kết luận
React Testing Library giúp đảm bảo UI hoạt động đúng như người dùng thấy.  
➡️ Tiếp theo: Tự động kiểm thử và deploy bằng GitHub Actions.
