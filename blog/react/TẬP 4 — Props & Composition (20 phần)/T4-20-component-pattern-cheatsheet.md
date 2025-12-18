# T4-20 — Component Pattern Cheatsheet

> Mục tiêu: Bảng **cheatsheet** tổng hợp các pattern component/props/composition đã học trong Tập 4 để tra cứu nhanh.

---

## 1) Props & naming
- Giá trị: `value`, `defaultValue`, `checked`  
- Hành động: `onChange`, `onOpenChange`, `onSelect`  
- Trạng thái: `disabled`, `readOnly`, `invalid`

---

## 2) Controlled vs Uncontrolled
```jsx
// Controlled
<input value={v} onChange={e=>setV(e.target.value)} />
// Uncontrolled
<input defaultValue="A" ref={ref} />
```

---

## 3) Tránh prop explosion
- Tách compound/slots, nhóm config:  
`<Table columns={[...]} pagination={{ page, pageSize, onChange }} />`

---

## 4) Ổn định props
```jsx
const opt = useMemo(()=>({ dense:true }), []);
const onPick = useCallback((x)=>select(x), [select]);
```

---

## 5) Context hygiene
- Memo `value`, split value/actions, domain nhỏ.
- Cân nhắc store ngoài React (`useSyncExternalStore`).

---

## 6) Các pattern chính
- **Children & Composition** (T4‑02)  
- **Slot pattern** (T4‑11)  
- **Compound component** (T4‑10)  
- **Render props** (T4‑09, T4‑14)  
- **HOC** (T4‑13)  
- **Config‑driven** (T4‑16)  
- **Dependency Injection** (T4‑15)

---

## 7) Checklist review PR
- [ ] Tên props rõ ràng, có contract.
- [ ] Không trộn controlled/uncontrolled.
- [ ] Props nặng được memo hóa.
- [ ] Context được split và memo value.
- [ ] Pattern phù hợp: children/slots/compound/hook.
- [ ] Có test/Storybook/docs cho component phức tạp.

---

## 8) Snippets tiện dụng
```jsx
// useControllableState
function useControllableState({ value, defaultValue, onChange }) {
  const [inner, setInner] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const state = isControlled ? value : inner;
  const setState = React.useCallback((next) => {
    const v = typeof next === "function" ? next(state) : next;
    if (!isControlled) setInner(v);
    onChange?.(v);
  }, [isControlled, state, onChange]);
  return [state, setState];
}
```

---

## 9) Bài tập tổng kết
1. Thiết kế `Select` compound có controlled/uncontrolled + keyboard a11y.
2. Viết `ProfileCard` config‑driven (slots: avatar, actions).
3. Tạo README “Component patterns” cho team, link đến từng bài trong Tập 4.