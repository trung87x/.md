# Ứng dụng 1: Xây dựng Blog hoặc Trang Tin tức (SSG)

### Mã nguồn Next.js (App Router - Static Fetching)

**1. Trang danh sách bài viết (`app/blog/page.tsx`)**

```tsx
// Mặc định là Server Component, dữ liệu được fetch tĩnh (SSG)
export default async function BlogPage() {
  const res = await fetch("https://api.example.com/posts");
  const posts = await res.json();

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Tin tức mới nhất</h1>
      <div className="grid gap-6">
        {posts.map((post: any) => (
          <article key={post.id} className="border-b pb-4">
            <h2 className="text-xl font-semibold hover:text-blue-600">
              <a href={`/blog/${post.slug}`}>{post.title}</a>
            </h2>
            <p className="text-gray-600">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
```

**2. Trang chi tiết bài viết với `generateStaticParams` (`app/blog/[slug]/page.tsx`)**

```tsx
// Tạo sẵn các đường dẫn tĩnh tại thời điểm Build
export async function generateStaticParams() {
  const posts = await fetch("https://api.example.com/posts").then((res) =>
    res.json()
  );

  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

export default async function PostDetail({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const res = await fetch(`https://api.example.com/posts/${slug}`);
  const post = await res.json();

  return (
    <article className="max-w-2xl mx-auto py-10">
      <h1 className="text-4xl font-black mb-4">{post.title}</h1>
      <div className="prose lg:prose-xl">{post.content}</div>
    </article>
  );
}
```

---

### Các điểm quan trọng:

- **Tốc độ:** Vì HTML được tạo sẵn khi build, trình duyệt không cần chờ đợi xử lý từ Database khi người dùng truy cập.
- **SEO:** Mã nguồn HTML đầy đủ giúp Google Bot dễ dàng thu thập dữ liệu và xếp hạng bài viết.
- **`generateStaticParams`:** Hàm quan trọng nhất để khai báo cho Next.js biết trang nào cần được "đúc" sẵn thành file tĩnh.

**Bạn có muốn tôi cung cấp mã nguồn cho "Ứng dụng 2: Tối ưu hóa SEO & Hình ảnh (Metadata & Image Optimization)" không?**
