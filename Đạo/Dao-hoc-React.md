# ⚛️ ĐẠO HỌC REACT  
*Một cách nhìn triết học về dòng chảy và sự tái sinh trong giao diện.*

---

## 🧩 1️⃣ Component → ĐẠO
> “Đạo” là gốc — mỗi component là một vũ trụ nhỏ, tự vận hành, tự sinh diệt.

```jsx
function Welcome() {
  return <h1>Welcome to the Dao of React 🌿</h1>;
}
```
➡️ Mỗi **component** giống như một “sinh mệnh nhỏ” trong hệ React.  
Nó có hình (UI), có hồn (logic), và có đời sống riêng.  

> “Component là Đạo — biết đủ, tự nhiên, không cần điều khiển.”  

---

## 📜 2️⃣ Props & State → ĐẠO LÝ
> “Đạo lý” là hiểu mối liên hệ — *đưa cái gì vào, sinh ra cái gì.*

```jsx
function Greeting({ name }) {
  const [mood, setMood] = React.useState("calm");

  return (
    <div>
      <p>Hello, {name}. Your mind is {mood}.</p>
      <button onClick={() => setMood("peaceful")}>Find Peace</button>
    </div>
  );
}
```
➡️ **Props** là “duyên” – những điều bên ngoài đi vào.  
**State** là “nghiệp” – phản ứng nội tại từ bên trong.  
Khi hiểu được chúng, bạn nắm được **đạo lý của tái sinh**.  

> “Biết props là hiểu duyên,  
> Biết state là hiểu tâm.”  

---

## 🌱 3️⃣ Hooks & Context → NHÂN QUẢ
> “Nhân quả” là khi hành động ở nơi này, ảnh hưởng đến nơi khác.  
> React Hook là cầu nối của nghiệp — mỗi hành động gieo ra, component gặt lại.

```jsx
const ThemeContext = React.createContext("light");

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Panel />
    </ThemeContext.Provider>
  );
}

function Panel() {
  const theme = React.useContext(ThemeContext);
  return <div className={`panel ${theme}`}>Theme: {theme}</div>;
}
```
➡️ Đây là **nhân quả React** –  
Provider gieo “value”, Consumer gặt “value”.  
Nếu không kiểm soát, context loạn — nghiệp loạn.  

> “React Hook là luật nhân quả của component.  
> Gieo dữ liệu ở đâu, tái render ở đó.”  

---

## 💫 4️⃣ Accessible UI → THIỆN NGHIỆP
> “Thiện nghiệp” là dùng React để giúp con người dễ dàng tương tác hơn,  
> không phải để khoe code đẹp hay hiệu ứng rực rỡ.

```jsx
function AccessibleButton() {
  return (
    <button aria-label="Play video" onClick={() => alert("🎬 Play!")}>
      ▶
    </button>
  );
}
```
➡️ Đây là **thiện nghiệp React** — code nhẹ, dễ hiểu, dễ truy cập.  
Không tạo ảo ảnh, chỉ tạo trải nghiệm thật.

> “Làm React có đạo, nghĩa là  
> code của bạn sống, nhưng không hại ai.”  

---

## 🌿 Tóm gọn ĐẠO HỌC REACT

| Tầng | Concept | Triết lý | Ví dụ |
|------|----------|-----------|--------|
| 🧩 **Đạo** | Component | Đơn vị sống độc lập, tự nhiên | `function Welcome() {}` |
| 📜 **Đạo lý** | Props & State | Hiểu mối liên hệ trong – ngoài | `useState, props` |
| 🌱 **Nhân quả** | Hooks & Context | Gieo dữ liệu, gặt phản ứng | `useContext, useEffect` |
| 💫 **Thiện nghiệp** | Accessible UI | Viết vì người dùng, không vì cái đẹp | `aria-label`, semantic React |

---

> “React không chỉ render UI,  
> nó render sự vận hành của tâm thức.  
> Mỗi component sinh ra, chết đi —  
> nhưng state, props và hook vẫn tiếp nối như dòng đời.” ✨  
