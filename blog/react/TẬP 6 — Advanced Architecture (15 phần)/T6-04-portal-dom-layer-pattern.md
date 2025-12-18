# T6-04 — Portal & DOM Layer Pattern

> Mục tiêu: Sử dụng **Portal** để render UI sang **layer DOM khác** (overlay, modal, tooltip), tách bề mặt trình bày khỏi cây bố cục hiện tại, và xử lý focus/a11y.

---

## 1) Portal cơ bản
```jsx
return ReactDOM.createPortal(children, document.getElementById("overlay-root"));
```

- Hữu ích cho **modal**, **dropdown**, **tooltip**, **toast** — tránh ảnh hưởng `overflow:hidden`/z-index của container.

---

## 2) DOM layering pattern
- Tạo các **root layer**: `#app`, `#overlay-root`, `#toast-root`.  
- Quản lý **focus trap**, **aria-hidden** nền, **scroll lock** khi mở modal.

```tsx
function Modal({ open, onOpenChange, children }) {
  useScrollLock(open);
  useFocusTrap(open);
  if (!open) return null;
  return createPortal(<div role="dialog" aria-modal="true">{children}</div>, overlayRoot);
}
```

---

## 3) Event & positioning
- Dùng **pointer events**/capture để đóng modal khi click outside.  
- Với tooltip/dropdown: dùng **floating-ui** để tính vị trí; cân nhắc **useLayoutEffect** khi đo.

---

## 4) Checklist
- [ ] Root layer riêng cho overlay/toast.  
- [ ] Focus trap + aria; scroll lock.  
- [ ] Đóng khi click outside/ESC.  
- [ ] Kiểm tra trên mobile (viewport, keyboard).

---

## 5) Bài tập
1. Tạo `Modal` headless dùng portal + focus trap.  
2. Viết `ToastProvider` render vào `#toast-root`.