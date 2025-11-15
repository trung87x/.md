# ⚡️ ĐẠO HỌC NEXT.JS  
*Một cách nhìn triết học về framework hợp nhất frontend và backend.*

---

## 🧩 1️⃣ Routing → ĐẠO
> “Đạo là trật tự. Mọi đường đều dẫn về nguồn.”

Trong Next.js, **App Router** là hiện thân của Đạo —  
mọi thứ đều **tự sắp xếp** dựa trên cấu trúc thư mục.  
Không cần ép buộc, không cần config rườm rà — chỉ cần **thuận theo cấu trúc**.

```text
app/
 ├─ layout.tsx
 ├─ page.tsx
 ├─ about/
 │   └─ page.tsx
 └─ blog/[slug]/page.tsx
```

➡️ **Routing là Đạo:**  
Mọi thứ vận hành *tự nhiên*, không cần khai báo —  
chỉ cần “biết chỗ nào nên ở chỗ đó”.

> “Khi hiểu routing, bạn không điều khiển dòng chảy —  
> bạn để nó tự chảy.”

---

## 📜 2️⃣ Server & Client Component → ĐẠO LÝ
> “Đạo lý là hiểu trong – ngoài, âm – dương.”

Next.js phân chia hai cõi:  
- **Server Component:** tĩnh, sâu, xử lý dữ liệu (âm)  
- **Client Component:** sinh động, tương tác (dương)

```tsx
// Server Component (mặc định)
export default async function Page() {
  const res = await fetch("https://api.example.com/posts");
  const posts = await res.json();
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}
```

```tsx
// Client Component
"use client";
export default function Counter() {
  const [n, setN] = useState(0);
  return <button onClick={() => setN(n+1)}>Count: {n}</button>;
}
```

➡️ Khi bạn **phân biệt mà không chia rẽ**,  
hiểu cái nào nên render ở server, cái nào ở client —  
bạn đang **sống trong Đạo lý của hiệu năng và ý nghĩa**.

> “Hiểu client là hiểu hành động.  
> Hiểu server là hiểu gốc rễ.”

---

## 🌱 3️⃣ Data Fetching → NHÂN QUẢ
> “Mọi dữ liệu đều có nhân và quả.”

`fetch()`, `revalidate`, `cache`, `generateStaticParams`...  
Mỗi dòng gọi dữ liệu đều là một **nghiệp** được gieo,  
và kết quả — render, cache, ISR — là **quả** của hành động đó.

```tsx
export const revalidate = 60; // Gieo nhân — 60s tái sinh một lần

export default async function Page() {
  const res = await fetch("https://api.example.com/data", { next: { revalidate: 60 } });
  const data = await res.json();
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

➡️ Nếu bạn hiểu **nhân quả của fetch**,  
bạn biết khi nào nên cache, khi nào nên động, khi nào nên tĩnh.

> “Tĩnh và động không đối lập —  
> chỉ là hai mặt của cùng một dòng dữ liệu.”

---

## 💫 4️⃣ Fullstack Harmony → THIỆN NGHIỆP
> “Thiện nghiệp là hợp nhất. Khi frontend và backend không còn ranh giới.”

Next.js cho phép bạn:
- Gọi DB ngay trong component,  
- Định nghĩa API trong cùng dự án,  
- Render và revalidate tự nhiên như hơi thở.

```tsx
// app/api/quote/route.ts
export async function GET() {
  return Response.json({ message: "Code như thiền, build như nước." });
}
```

```tsx
// app/page.tsx
export default async function Page() {
  const res = await fetch("/api/quote");
  const data = await res.json();
  return <p>{data.message}</p>;
}
```

➡️ **Fullstack trong Next.js chính là thiện nghiệp** —  
vì bạn không còn chia rẽ giữa “dev backend” và “dev frontend”.  
Mọi thứ trở nên **liên thông, liền mạch, vô ngại.**

> “Khi ranh giới biến mất, code trở thành đạo.”

---

## 🌿 TÓM GỌN ĐẠO HỌC NEXT.JS

| Tầng | Concept | Triết lý | Ví dụ |
|------|----------|-----------|--------|
| 🧩 **Đạo** | Routing | Trật tự tự nhiên – cấu trúc sinh ra đường đi | `app/page.tsx`, `app/blog/[slug]` |
| 📜 **Đạo lý** | Server & Client Component | Âm – Dương cân bằng | `"use client"`, `fetch()` |
| 🌱 **Nhân quả** | Data Fetching & Caching | Gieo hành động – gặt phản ứng | `revalidate`, `cache` |
| 💫 **Thiện nghiệp** | Fullstack Harmony | Hợp nhất backend–frontend | `app/api/...`, server actions |

---

> “Next.js là Đạo của hợp nhất.  
> React là tâm,  
> Next là con đường đưa tâm ra thế giới.” ✨  
