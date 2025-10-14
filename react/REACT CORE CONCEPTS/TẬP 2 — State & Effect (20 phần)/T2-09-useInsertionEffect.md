# T2-09 — useInsertionEffect (khi nào nên dùng)

> Mục tiêu: Hiểu **useInsertionEffect** chạy *rất sớm* trong pipeline render để **chèn CSS** (style-in-js) *trước khi* trình duyệt tính toán layout. Chủ yếu dành cho **thư viện CSS-in-JS**; ứng dụng thường **hiếm khi** cần.

---

## 1) Thời điểm chạy (so với các hooks khác)

```
Render (reconciliation)
  ↳ useInsertionEffect  ← sớm nhất (trước layout & paint)
Commit
  ↳ useLayoutEffect
Paint (vẽ)
  ↳ useEffect (sau paint)
```

- `useInsertionEffect` chạy trong **render phase**, tương tự như một “hook đặc biệt” dành cho việc **chèn style**.
- Không nên làm I/O hay đọc DOM trong hook này.

---

## 2) API
```jsx
React.useInsertionEffect(() => {
  // Chèn CSS synchronously trước khi trình duyệt tính toán layout.
  // Không đọc DOM, không state updates async ở đây.
  return () => {
    // cleanup nếu có
  };
}, [deps]);
```

> CẢNH BÁO: Vì chạy rất sớm, bạn **không** nên đặt logic nặng hay side‑effect ngoài CSS. Chủ đích của React là giúp các lib như Emotion/Styled‑Components chèn rule **trước** layout để tránh nhấp nháy.

---

## 3) Dùng khi nào?
- Bạn viết **lib** CSS‑in‑JS, cần đảm bảo **style được chèn đúng thứ tự** và **trước layout**.
- Bạn có cơ chế **chèn style động** phụ thuộc props/state ngay trong render để tránh FOUC (flash of unstyled content).

### Ví dụ giả lập chèn CSS thủ công
```jsx
function useDynamicCss(cssText) {
  React.useInsertionEffect(() => {
    const style = document.createElement("style");
    style.setAttribute("data-dyn", "1");
    style.textContent = cssText;
    document.head.appendChild(style);
    return () => style.remove();
  }, [cssText]);
}
```

```jsx
function Box({ color }) {
  useDynamicCss(`.dyn-box { background:${color}; }`);
  return <div className="dyn-box" style={{ width: 120, height: 80 }} />;
}
```

> Thực tế: Nên ưu tiên **class tĩnh + CSS/utility (Tailwind)** hoặc `style` inline. `useInsertionEffect` chỉ hữu ích khi **bạn điều khiển hạ tầng style**.

---

## 4) So sánh nhanh
| Hook | Khi chạy | Dùng cho |
|-----|----------|---------|
| `useInsertionEffect` | Rất sớm (trong render) | Chèn CSS đồng bộ (lib CSS-in-JS) |
| `useLayoutEffect` | Sau commit, trước paint | Đo/điều chỉnh layout đồng bộ |
| `useEffect` | Sau paint | I/O: fetch, timers, event, subscriptions |

---

## 5) Sai lầm thường gặp
- Dùng `useInsertionEffect` để fetch/log → ❌ **Sai mục đích**.
- Đọc DOM (`getBoundingClientRect`) → ❌ Không có DOM ổn định ở giai đoạn này.
- Gây cập nhật state nặng → ❌ Có thể tạo vòng lặp khó debug.

---

## 6) Checklist
- [ ] Chỉ dùng khi thật sự cần **chèn CSS trước layout**.
- [ ] Không I/O, không đo DOM.
- [ ] Giữ logic *nhẹ* và đồng bộ.
- [ ] Với app thông thường → **không cần** hook này.

---

## 7) Bài tập
1. Viết hook `useCssRule(selector, rule)` dùng `useInsertionEffect` để chèn & cleanup rule.
2. So sánh flicker khi chèn CSS bằng `useEffect` vs `useInsertionEffect` (thay nền theo prop).
3. Trình bày vì sao SPA dùng Tailwind/vanilla CSS **không** cần hook này.