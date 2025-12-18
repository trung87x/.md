# T4-16 — Config-driven Component

> Mục tiêu: Thiết kế component **dựa trên cấu hình** (config) để tạo UI **linh hoạt** từ JSON/schema: form, bảng, menu, biểu đồ…, đồng thời giữ code **dễ bảo trì**.

---

## 1) Ý tưởng
- Thay vì hard-code UI, component nhận **config** mô tả **cấu trúc & hành vi**.
- Hữu ích cho **form động**, **table cột linh hoạt**, **menu/toolbar**, **dashboard**.

```tsx
type Column<T> = {
  key: keyof T;
  title: string;
  render?: (row: T) => React.ReactNode;
  width?: number;
};
function DataTable<T>({ rows, columns }: { rows: T[]; columns: Column<T>[] }) {
  return (
    <table>
      <thead><tr>{columns.map(c => <th key={String(c.key)} style={{ width: c.width }}>{c.title}</th>)}</tr></thead>
      <tbody>{rows.map((r,i) => <tr key={i}>{columns.map(c => <td key={String(c.key)}>{c.render ? c.render(r) : (r as any)[c.key]}</td>)}</tr>)}</tbody>
    </table>
  );
}
```

---

## 2) Form động từ schema
```tsx
type Field =
  | { type: "text"; name: string; label: string; placeholder?: string }
  | { type: "select"; name: string; label: string; options: { value: string; label: string }[] }
  | { type: "checkbox"; name: string; label: string };

function DynamicForm({ fields, value, onChange }: { fields: Field[]; value: Record<string, any>; onChange: (v:any)=>void }) {
  return (
    <form>
      {fields.map(f => {
        const v = value[f.name];
        switch (f.type) {
          case "text": return <label key={f.name}>{f.label}<input value={v ?? ""} placeholder={f.placeholder} onChange={e => onChange({ ...value, [f.name]: e.target.value })} /></label>;
          case "select": return <label key={f.name}>{f.label}<select value={v ?? ""} onChange={e => onChange({ ...value, [f.name]: e.target.value })}>{f.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></label>;
          case "checkbox": return <label key={f.name}><input type="checkbox" checked={!!v} onChange={e => onChange({ ...value, [f.name]: e.target.checked })} /> {f.label}</label>;
        }
      })}
    </form>
  );
}
```

---

## 3) Tối ưu hoá & tính mở rộng
- **Memo hóa** cột/field nếu tính toán nặng.
- Cho phép `render`/`component` tuỳ biến ở mỗi item.
- **Validation** qua schema (Yup/Zod) + mapping sang UI.
- **Plugins**: nhận các **renderer** đăng ký theo `type`.

```tsx
type Renderer = (field: any, value: any, onChange: (v:any)=>void) => React.ReactNode;
const registry: Record<string, Renderer> = {};
export function register(type: string, renderer: Renderer) { registry[type] = renderer; }
function DynamicFormPluggable({ fields, value, onChange }) {
  return <form>{fields.map(f => registry[f.type]?.(f, value[f.name], (v)=>onChange({ ...value, [f.name]: v })) ?? null)}</form>;
}
```

---

## 4) SSR/CSR & dữ liệu
- Config có thể đến từ server → **CSR** render nhanh với skeleton; **SSR** cần hydrate đúng.  
- Cân nhắc **security**: chỉ cho phép type/props an toàn khi config từ bên ngoài.

---

## 5) Anti-patterns
- Config trở thành **ngôn ngữ lập trình** thứ hai (quá phức tạp).  
- `render` inline nặng → thiếu memo, kéo re-render.
- Config **không version** → khó migrate khi thay đổi schema.

---

## 6) Mini demo (UMD)
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>label{display:block;margin:6px 0}</style>
</head>
<body>
<div id="app"></div>
<script type="text/babel">
  function DataTable({ rows, columns }) {
    return (
      <table border="1" cellPadding="4">
        <thead><tr>{columns.map(c => <th key={c.key}>{c.title}</th>)}</tr></thead>
        <tbody>{rows.map((r,i) => <tr key={i}>{columns.map(c => <td key={c.key}>{c.render ? c.render(r) : r[c.key]}</td>)}</tr>)}</tbody>
      </table>
    );
  }
  function App(){
    const rows = [{name:"Lan", age:24},{name:"Minh", age:28}];
    const columns = [
      { key:"name", title:"Name" },
      { key:"age", title:"Age" },
      { key:"actions", title:"", render:(r)=><button onClick={()=>alert(r.name)}>View</button> }
    ];
    return <DataTable rows={rows} columns={columns}/>;
  }
  ReactDOM.createRoot(document.getElementById("app")).render(<App/>);
</script>
</body>
</html>
```

---

## 7) Checklist
- [ ] Định nghĩa **schema/config** rõ ràng, có version.
- [ ] Cho phép `render`/`component` tùy biến có kiểm soát.
- [ ] Memo hóa cấu hình nặng; tách renderer theo type.
- [ ] Bảo mật khi nhận config từ bên ngoài.

---

## 8) Bài tập
1. Viết `DynamicForm` từ schema và tích hợp Zod để validate trước khi submit.
2. Tạo `DataTable` có `column.visible` và `column.sorter(a,b)`; thêm `onSort`.
3. Thiết kế hệ `register(type, renderer)` để plugin hóa nhiều field đặc biệt (date, tags, uploader).