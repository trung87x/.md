# T6-11 — Virtualization Pattern (List Lớn)

> Mục tiêu: Hiển thị danh sách **rất lớn** (1k–100k+) bằng **virtualization** để giảm DOM nodes, tối ưu memory & re-render.

---

## 1) Khái niệm
- Chỉ render **cửa sổ nhìn thấy** + một ít **buffer** hai đầu.
- Tính **offset** để phần tử ảo trông như full list.

---

## 2) Kiến trúc cơ bản (fixed height)
```tsx
type RowRenderer<T> = (item: T, idx: number) => React.ReactNode;
export function VirtualList<T>({ items, rowHeight, height, renderRow }: {
  items: T[]; rowHeight: number; height: number; renderRow: RowRenderer<T>;
}) {
  const [scrollTop, setScrollTop] = React.useState(0);
  const onScroll = (e: React.UIEvent<HTMLDivElement>) => setScrollTop(e.currentTarget.scrollTop);
  const total = items.length * rowHeight;
  const start = Math.floor(scrollTop / rowHeight);
  const visible = Math.ceil(height / rowHeight) + 2;
  const slice = items.slice(start, Math.min(items.length, start + visible));
  const offsetY = start * rowHeight;
  return (
    <div style={{ overflow: "auto", height }} onScroll={onScroll}>
      <div style={{ height: total, position: "relative" }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {slice.map((it, i) => renderRow(it, start + i))}
        </div>
      </div>
    </div>
  );
}
```

---

## 3) Chiều cao động
- Dùng **ResizeObserver** đo item và cập nhật **map chiều cao**; tính prefix‑sum để ước lượng offset.
- Hoặc dùng thư viện: **react‑virtual**, **react‑window**, **react‑virtualized**.

---

## 4) Tối ưu
- Row là **`React.memo`** với props primitive.
- **Key ổn định**; tránh tạo hàm inline nặng.
- Batch data fetch khi cuộn gần cuối (infinite scroll).

---

## 5) Mini demo (UMD)
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
<div id="app"></div>
<script type="text/babel">
  function VirtualList({ items, rowHeight=28, height=240 }){
    const [top, setTop] = React.useState(0);
    const start = Math.floor(top/rowHeight);
    const visible = Math.ceil(height/rowHeight)+2;
    const slice = items.slice(start, start+visible);
    const offset = start*rowHeight;
    return (<div style={{height, overflow:'auto'}} onScroll={e=>setTop(e.currentTarget.scrollTop)}>
      <div style={{height: items.length*rowHeight, position:'relative'}}>
        <div style={{transform:`translateY(${offset}px)`}}>
          {slice.map((v,i)=> <div key={start+i} style={{height:rowHeight,borderBottom:'1px solid #eee'}}>Row {start+i}: {v}</div>)}
        </div>
      </div>
    </div>);
  }
  function App(){
    const items = React.useMemo(()=>Array.from({length:20000}, (_,i)=>"Item "+i), []);
    return <VirtualList items={items} />;
  }
  ReactDOM.createRoot(document.getElementById('app')).render(<App/>);
</script>
</body>
</html>
```

---

## 6) Checklist
- [ ] Render cửa sổ + buffer; tính offset chính xác.  
- [ ] Row memo + key ổn định.  
- [ ] Tối ưu chiều cao động bằng đo lường/observer.  
- [ ] Infinite scroll + batch fetch.

---

## 7) Bài tập
1. Viết VirtualList chiều cao động bằng ResizeObserver.  
2. Thêm infinite scroll, tải 1k item mỗi lần khi chạm 80%.  
3. So sánh FPS giữa list thật vs virtual hoá.