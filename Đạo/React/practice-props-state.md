# React Props & State — Bài luyện nâng cao

> Mục tiêu: Hiểu sâu **Props (dữ liệu từ cha)** và **State (dữ liệu bên trong component)**.  
> Sau khi hoàn thành, bạn có thể thiết kế component tương tác, linh hoạt và tái sử dụng.

---

## 🧩 1. UserCard — Props cơ bản & mặc định
```jsx
function UserCard({ name, age, status = "offline" }) {
  return (
    <div className="border p-3 rounded-lg shadow-sm">
      <h3>{name}</h3>
      <p>Tuổi: {age}</p>
      <p>Trạng thái: {status === "online" ? "🟢 Online" : "⚪ Offline"}</p>
    </div>
  );
}

export default function App() {
  return (
    <>
      <UserCard name="Trung" age={24} status="online" />
      <UserCard name="Mai" age={22} />
    </>
  );
}
```

**Nhiệm vụ+:**
- Thêm prop `avatar` hiển thị ảnh.  
- Nếu không có avatar → hiển thị ảnh mặc định (`/placeholder.jpg`).

---

## 🛒 2. ProductItem — Props tính toán giá
```jsx
function ProductItem({ name, price, isNew }) {
  return (
    <div className="p-3 border rounded-md">
      <h3>
        {name} {isNew && <span className="text-green-500">(Mới)</span>}
      </h3>
      <p>Giá: {price.toLocaleString()}₫</p>
    </div>
  );
}

export default function App() {
  return (
    <div className="grid gap-3">
      <ProductItem name="Chuột Logitech" price={350000} isNew />
      <ProductItem name="Bàn phím cơ" price={1200000} />
    </div>
  );
}
```

**Nhiệm vụ+:**
- Thêm prop `discount` (giá giảm).  
- Nếu có `discount`, hiển thị giá gốc bị gạch ngang.

---

## ❤️ 3. LikeButton — State & sự kiện toggle
```jsx
import { useState } from "react";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);

  return (
    <button
      onClick={() => setLiked(!liked)}
      className={
        "p-2 rounded-md " +
        (liked ? "bg-pink-500 text-white" : "bg-gray-200 text-black")
      }
    >
      {liked ? "❤️ Đã thích" : "🤍 Thích"}
    </button>
  );
}
```

**Nhiệm vụ+:**
- Thêm `likesCount` (tổng số lượt thích).  
- Mỗi click +1 nếu thích, -1 nếu bỏ thích.

---

## 🔢 4. CounterBox — State, giới hạn, style động
```jsx
import { useState } from "react";

export default function CounterBox() {
  const [count, setCount] = useState(0);

  return (
    <div className="border p-3 rounded-lg text-center">
      <p
        className="text-2xl font-bold"
        style={{ color: count >= 10 ? "red" : "black" }}
      >
        {count}
      </p>
      <div className="flex gap-2 justify-center">
        <button onClick={() => setCount(Math.max(0, count - 1))}>-</button>
        <button onClick={() => setCount(0)}>Reset</button>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
    </div>
  );
}
```

**Nhiệm vụ+:**
- Giới hạn: `count >= 0`.  
- Khi `count >= 10`, đổi màu chữ thành đỏ.

---

## 🧠 5. VoteItem — Kết hợp Props + State
```jsx
import { useState } from "react";

function VoteItem({ title, onVote }) {
  const [votes, setVotes] = useState(0);

  const handleVote = () => {
    setVotes(votes + 1);
    onVote();
  };

  return (
    <div className="flex items-center gap-3">
      <span>{title}</span>
      <button onClick={handleVote}>👍</button>
      <span>{votes}</span>
    </div>
  );
}

export default function App() {
  const [total, setTotal] = useState(0);

  return (
    <div className="grid gap-3">
      <VoteItem title="React" onVote={() => setTotal(total + 1)} />
      <VoteItem title="Vue" onVote={() => setTotal(total + 1)} />
      <VoteItem title="Svelte" onVote={() => setTotal(total + 1)} />
      <p>Tổng bình chọn: {total}</p>
    </div>
  );
}
```

**Nhiệm vụ+:**
- Thêm nút “Reset tất cả”.  
- Hiển thị kết quả theo phần trăm bình chọn.

---

## ✅ Checklist hoàn thành
- [ ] Hiểu Props truyền dữ liệu 1 chiều.  
- [ ] Biết truyền hàm cha xuống con qua props.  
- [ ] Biết quản lý State trong component.  
- [ ] Biết kết hợp Props + State cho dữ liệu tương tác.  
- [ ] Tự tin tạo component độc lập & tái sử dụng.

> 💡 Khi hoàn thành, bạn đã sẵn sàng học **“Lifting State Up”** — truyền dữ liệu giữa component.