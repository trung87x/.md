# T3-07 — Key và Reconciliation

> Mục tiêu: Hiểu vai trò của **key** trong Virtual DOM, cách React dùng **key** để nhận diện phần tử, bảo toàn state, và tối ưu quá trình diff.

---

## 1) React reconciliation recap
- React tạo **Virtual DOM mới** sau mỗi render.
- React so sánh (diff) **VDOM cũ vs mới** để quyết định giữ, di chuyển, hay hủy node.
- Để nhận diện phần tử, React dựa vào **type** và **key**.

| Type | Key | Hành vi |
|------|-----|----------|
| khác | — | Unmount + Mount lại (mất state) |
| giống | khác | Coi là phần tử khác (mất state) |
| giống | giống | Giữ lại, chỉ cập nhật props |

---

## 2) Key giúp React “nhớ” phần tử
```jsx
function List({ items }) {
  return (
    <ul>
      {items.map((it) => (
        <li key={it.id}>{it.name}</li>
      ))}
    </ul>
  );
}
```
→ Khi thêm/xoá item, React dùng `key` để **theo dõi item cũ**, giữ state đúng chỗ.

---

## 3) Khi dùng key sai (index)
```jsx
function BadList({ items }) {
  return items.map((it, i) => <input key={i} defaultValue={it.name} />);
}
```
- Chèn phần tử mới đầu danh sách → các input **bị tráo dữ liệu** (do React tái sử dụng state theo vị trí).

**Đúng:** Dùng **id ổn định**:
```jsx
function GoodList({ items }) {
  return items.map((it) => <input key={it.id} defaultValue={it.name} />);
}
```

---

## 4) Di chuyển phần tử có key đúng
React nhận biết **move operation** nếu key trùng nhau.

```jsx
// Trước: [A, B, C]
// Sau: [B, A, C]
```
React hiểu: “A và B đổi chỗ”, nên **giữ state của từng input** → không mất giá trị nhập.

---

## 5) Key trong nested list
- Key phải **unique trong danh sách anh em** (sibling), không cần toàn cục.
- Trong danh sách lồng nhau, mỗi cấp cần key riêng.
```jsx
rows.map(row => (
  <tr key={row.id}>
    {row.cells.map(cell => <td key={cell.id}>{cell.text}</td>)}
  </tr>
));
```

---

## 6) Key không phải prop của component
- React **sử dụng nội bộ** key để nhận diện phần tử, **component không thể truy cập** qua `props.key`.
- Nếu cần truyền ID → dùng prop khác (`id`, `itemId`, ...).

---

## 7) Checklist
- [ ] Dùng key ổn định (id thật hoặc uuid khi thêm).
- [ ] Không dùng index khi danh sách có thể thay đổi thứ tự.
- [ ] Key duy nhất trong cấp anh em.
- [ ] Key không thể truy cập qua props.

---

## 8) Bài tập
1. Tạo danh sách input (key=index) → thêm phần tử đầu danh sách → quan sát dữ liệu “nhảy”.
2. Sửa lại với key=id → dữ liệu giữ đúng vị trí.
3. Giải thích vì sao React cần key để bảo toàn state và effect.