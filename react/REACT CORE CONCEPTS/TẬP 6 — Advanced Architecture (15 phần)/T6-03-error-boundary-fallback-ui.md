# T6-03 — Error Boundary & Fallback UI

> Mục tiêu: Thiết kế **Error Boundary** để bắt lỗi runtime trong cây con, hiển thị **fallback** an toàn, và phục hồi luồng người dùng.

---

## 1) Error Boundary là gì?
- Class component đặc biệt bắt lỗi **render/lifecycle** của con.
```tsx
class ErrorBoundary extends React.Component<{ fallback: React.ReactNode }, { error: any }> {
  state = { error: null };
  static getDerivedStateFromError(error: any) { return { error }; }
  componentDidCatch(error: any, info: any) { /* log */ }
  render() { return this.state.error ? this.props.fallback : this.props.children; }
}
```

---

## 2) Granularity
- Bọc **theo mô-đun** (widget, panel), không bọc toàn app duy nhất.  
- Fallback cung cấp **retry** hoặc **mở issue** cho user.

```jsx
<ErrorBoundary fallback={<Retry onClick={reload}/>}>
  <DangerousPanel/>
</ErrorBoundary>
```

---

## 3) Kết hợp Suspense
- **Suspense** cho **loading**, ErrorBoundary cho **failure**.  
- Đặt song song/bao nhau tùy luồng.

---

## 4) Logging & Observability
- Gửi `error`, `componentStack` tới logger (Sentry).  
- Ẩn thông tin nhạy cảm trong production.

---

## 5) Checklist
- [ ] Boundary mức mô-đun, có nút retry.  
- [ ] Log lỗi với context.  
- [ ] Không nuốt lỗi global không cần thiết.

---

## 6) Bài tập
1. Tạo `ErrorBoundary` tái sử dụng + hook `useErrorBoundary()` để trigger lỗi thủ công.  
2. Tích hợp Sentry mock và thử ném lỗi.