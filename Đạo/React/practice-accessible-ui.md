# Accessible UI Practice — 12 Bài tập a11y

> Mục tiêu: thực hành làm giao diện truy cập được (accessibility / a11y). Mỗi bài có code starter + nhiệm vụ mở rộng.  
> Copy từng bài vào `App.jsx` hoặc file component tương ứng và chạy thử trong trình duyệt với keyboard & screen reader (nếu có).

---

## 1 — Semantic HTML + Skip Link
Mục tiêu: dùng thẻ semantic (`header`, `main`, `nav`, `footer`) và thêm `skip to content`.

```jsx
export default function App() {
  return (
    <>
      <a href="#main" className="sr-only-focusable">Skip to main content</a>
      <header><h1>Trang demo</h1></header>
      <nav aria-label="Chính">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </nav>
      <main id="main">
        <h2>Chào mừng</h2>
        <p>Nội dung chính...</p>
      </main>
      <footer>© 2025</footer>
    </>
  );
}
```
**Nhiệm vụ+:** style `.sr-only-focusable` sao cho link chỉ hiện khi được focus; kiểm tra tab keyboard.

---

## 2 — Accessible Form (label + error)
Mục tiêu: nhãn rõ ràng, `aria-invalid`, `aria-describedby`.

```jsx
import { useState } from "react";
export default function Form() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) setError("Tên bắt buộc");
    else setError("");
  };
  return (
    <form onSubmit={submit} aria-describedby={error ? "name-error" : undefined}>
      <label htmlFor="name">Họ tên</label>
      <input id="name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!error} />
      {error && <p id="name-error" role="alert">{error}</p>}
      <button type="submit">Gửi</button>
    </form>
  );
}
```
**Nhiệm vụ+:** khi lỗi xuất hiện, focus vào input; sử dụng `aria-live` cho thông báo.

---

## 3 — Keyboard navigable menu (aria, roles)
Mục tiêu: tab + arrow keys, đúng `role` và `aria-*`.

```jsx
import { useState } from "react";

export default function Menu() {
  const items = ["Home","Docs","About"];
  const [index, setIndex] = useState(0);
  return (
    <ul role="menubar" aria-label="Main menu">
      {items.map((it, i) => (
        <li role="none" key={it}>
          <a
            role="menuitem"
            href={`#${it.toLowerCase()}`}
            tabIndex={i === index ? 0 : -1}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") setIndex((i+1)%items.length);
              if (e.key === "ArrowLeft") setIndex((i-1+items.length)%items.length);
            }}
          >
            {it}
          </a>
        </li>
      ))}
    </ul>
  );
}
```
**Nhiệm vụ+:** đảm bảo tab focus vào đúng item; thêm `aria-current` cho item đang chọn.

---

## 4 — Accessible modal (focus trap + aria-modal)
Mục tiêu: trap focus, restore focus, `aria-modal`, `role="dialog"`.

```jsx
import { useRef, useEffect, useState } from "react";

export default function ModalDemo() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef();
  const firstRef = useRef();

  useEffect(() => {
    if (open) {
      firstRef.current?.focus();
      const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    } else {
      buttonRef.current?.focus();
    }
  }, [open]);

  return (
    <>
      <button ref={buttonRef} onClick={() => setOpen(true)}>Mở modal</button>
      {open && (
        <div role="dialog" aria-modal="true" aria-labelledby="dlg-title">
          <h2 id="dlg-title">Tiêu đề</h2>
          <button ref={firstRef} onClick={() => setOpen(false)}>Đóng</button>
        </div>
      )}
    </>
  );
}
```
**Nhiệm vụ+:** implement focus trap (tab cycles trong modal); dim background via `aria-hidden` cho phần còn lại.

---

## 5 — Accessible table (caption + scope)
Mục tiêu: `caption`, `scope` on `<th>`, keyboard focus for rows.

```jsx
export default function Table() {
  return (
    <table>
      <caption>Danh sách người dùng</caption>
      <thead>
        <tr><th scope="col">Tên</th><th scope="col">Tuổi</th></tr>
      </thead>
      <tbody>
        <tr tabIndex={0}><td>Trung</td><td>24</td></tr>
        <tr tabIndex={0}><td>Mai</td><td>22</td></tr>
      </tbody>
    </table>
  );
}
```
**Nhiệm vụ+:** khi row được chọn (Enter), hiển thị chi tiết bằng `aria-expanded` hoặc `aria-controls`.

---

## 6 — Live regions & status updates (`aria-live`)
Mục tiêu: thông báo động cho screen reader.

```jsx
import { useState } from "react";
export default function LiveRegion() {
  const [msg, setMsg] = useState("");
  return (
    <div>
      <button onClick={() => setMsg("Đã tải xong!")}>Simulate load</button>
      <div aria-live="polite">{msg}</div>
    </div>
  );
}
```
**Nhiệm vụ+:** dùng `role="status"` vs `aria-live="assertive"`; thử với loading/errors.

---

## 7 — Forms: accessible pickers & labels
Mục tiêu: radio, checkbox, select với nhãn & fieldset legend.

```jsx
export default function Poll() {
  return (
    <form>
      <fieldset>
        <legend>Chọn màu yêu thích</legend>
        <label><input type="radio" name="c" /> Đỏ</label>
        <label><input type="radio" name="c" /> Xanh</label>
      </fieldset>
    </form>
  );
}
```
**Nhiệm vụ+:** keyboard navigate radio with arrow keys (enhancement).

---

## 8 — Contrast & focus visible
Mục tiêu: test contrast, ensure visible `:focus` outline.
Task: implement CSS rule for `:focus` that is visible (not just outline: none). Test with browser devtools Contrast.
**Nhiệm vụ+:** add `.focus-visible` styles or use `:focus-visible`.

---

## 9 — Accessible images (alt, decorative)
Mục tiêu: proper `alt` text; `role="img"` with `aria-label` for complex images.

```jsx
export default function Avatar({ src, name }) {
  return <img src={src} alt={name ? `Avatar của ${name}` : ""} />;
}
```
**Nhiệm vụ+:** mark purely decorative images with empty alt `alt=""`.

---

## 10 — Skip repetitive content for screen readers (`aria-hidden`)
Mục tiêu: hide non-essential visuals from assistive tech.
Task: when opening modal, mark page content `aria-hidden="true"`; images used purely for layout `aria-hidden="true"`.

---

## 11 — Accessible notifications & toasts
Mục tiêu: toast uses `role="status"` and `aria-live`.
Pattern: toasts container `<div aria-live="polite" aria-atomic="true">...</div>`. Ensure screen reader reads new toast.
**Nhiệm vụ+:** implement 2 types (info/assertive) and test.

---

## 12 — Component library a11y checklist (wrap-up)
Tạo 1 component (e.g., `AccessibleButton`) that enforces:
- uses `<button>` not `<div>` (semantic)
- accepts `aria-*` props and forwards them
- supports keyboard activation (Enter/Space)
- visible focus
- accessible name (children or `aria-label`)

```jsx
export default function AccessibleButton({ children, onClick, ariaLabel, ...rest }) {
  return (
    <button onClick={onClick} aria-label={ariaLabel} {...rest}>
      {children}
    </button>
  );
}
```
**Nhiệm vụ+:** add JSDoc/PropTypes explaining accessibility guarantees.

---

## Checklist kiểm tra sau khi làm xong
- [ ] Mọi interactive element dùng thẻ semantic (`button`, `a`, `input`, `select`)
- [ ] Tất cả form control có `label` rõ ràng hoặc `aria-label`
- [ ] Modal trap focus & restore focus on close
- [ ] Keyboard navigable: Tab order hợp lý; arrow keys cho menu/radio khi cần
- [ ] Live regions dùng đúng `aria-live`/`role`
- [ ] Images có `alt` (rỗng nếu decorative)
- [ ] Contrast & focus visible OK
- [ ] Không dùng `onClick` trên `div` mà không có role/tabindex (nếu bắt buộc thì cung cấp keyboard support & aria-role)

---

Chúc bạn luyện tập vui! Nếu muốn, mình có thể tiếp tục bằng:  
- Gửi **giải pháp hoàn chỉnh** (code + chú giải) cho 1 bài bạn chọn, hoặc  
- Tự động **tạo project demo** (Vite) chứa từng bài dưới dạng routes/component để bạn duyệt.