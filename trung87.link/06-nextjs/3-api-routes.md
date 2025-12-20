# Ứng dụng 3: API Routes (Full-stack Capabilities)

```typescript
// app/api/contact/route.ts (Next.js App Router)
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // 1. Lấy dữ liệu từ phía Client gửi lên
    const body = await request.json();
    const { email, message } = body;

    // 2. Logic Back-end: Giả lập kết nối Database hoặc gửi Email
    console.log(`Đang xử lý dữ liệu cho: ${email}`);

    // Giả lập một tác vụ tốn thời gian (DB Save)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 3. Phản hồi kết quả về cho Front-end
    return NextResponse.json(
      { message: "Gửi thông tin thành công!", data: body },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi hệ thống Server" },
      { status: 500 }
    );
  }
}

// Cách gọi từ Front-end (Client Side)
/*
  const sendData = async () => {
    const res = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({ email: 'user@example.com', message: 'Hello!' }),
    });
    const result = await res.json();
    alert(result.message);
  };
*/
```

---

**Bộ tài liệu về Next.js đã hoàn thành. Bạn có muốn tôi tổng hợp lại tất cả thành một file "Lộ trình Full-stack Frontend 2025" duy nhất không?**
