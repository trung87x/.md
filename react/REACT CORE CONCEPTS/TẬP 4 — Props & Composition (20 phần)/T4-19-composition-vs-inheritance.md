# T4-19 — Composition vs Inheritance

> Mục tiêu: Khẳng định tư duy **composition** trong React và vì sao **kế thừa** (inheritance) hiếm khi cần thiết; cách thay bằng render props, compound, slots.

---

## 1) Vì sao composition?
- JSX **là** composition tự nhiên: lồng component làm phần tử con.
- Đơn vị **thay thế** được: bạn quyết định **giao diện** component qua props/children, không cần subclass.

```jsx
function Card({ header, children, footer }) { /* ... */ }
<Card header={<Title/>} footer={<Actions/>}><Body/></Card>
```

---

## 2) Nhược điểm của inheritance trong React
- Gắn chặt vào **hierarchy class** → khó đổi UI/behavior cục bộ.
- Gây **đa hình phức tạp**; refactoring khó; không hợp kiến trúc function component.

---

## 3) Thay inheritance bằng…
- **Composition + props/children**: truyền phần UI cần thay đổi.
- **Compound component**: chia nhỏ (Tabs/Dropdown/Accordion).  
- **Render props**: khi cần **truyền logic** cho phần con tự render.
- **Custom hooks**: khi chỉ cần **chia sẻ logic**, không ảnh hưởng tree.

---

## 4) Mẫu thay thế thực tế
### Inheritance (ý tưởng cũ)
```jsx
class ModalWithConfirm extends Modal { /* ... override render() ... */ }
```
### Composition (đúng hướng)
```jsx
<Modal title="Delete">
  <p>Are you sure?</p>
  <Modal.Actions>
    <Button>Cancel</Button>
    <Button variant="danger">Delete</Button>
  </Modal.Actions>
</Modal>
```

---

## 5) Khi nào inheritance vẫn xuất hiện?
- **ErrorBoundary** vẫn là class (yêu cầu `componentDidCatch`).  
- Code cũ/class component legacy.  
- Wrapper bên ngoài React (framework khác).

> Nhưng ngay cả vậy, bạn vẫn có thể **compose** error boundary quanh subtree.

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
    function Modal({ title, children, actions }){
      return <div style={{border:'1px solid #ddd',padding:12}}>
        <h3>{title}</h3>
        <div>{children}</div>
        <div>{actions}</div>
      </div>;
    }
    function App(){
      return (
        <Modal title="Delete" actions={<><button>Cancel</button><button>Delete</button></>}>
          Are you sure?
        </Modal>
      );
    }
    ReactDOM.createRoot(document.getElementById('app')).render(<App/>);
  </script>
</body>
</html>
```

---

## 7) Checklist
- [ ] Ưu tiên composition (children/slots/compound).
- [ ] Dùng hooks để chia sẻ logic thay vì kế thừa.
- [ ] Chỉ dùng class/inheritance cho trường hợp đặc biệt (ErrorBoundary/legacy).
- [ ] API rõ ràng, nhỏ gọn, thay thế được.

---

## 8) Bài tập
1. Refactor component kế thừa `Modal*` sang composition với `Modal` + slots.
2. Viết `Dropdown` compound thay thế subclassing.
3. Tạo bài so sánh trước/sau: độ linh hoạt UI tăng như thế nào?