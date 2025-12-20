# Ứng dụng 2: Trang Thương mại điện tử (SSR + ISR)

```tsx
// app/products/[id]/page.tsx (Next.js App Router)

// ISR: Cấu hình tự động cập nhật lại dữ liệu sau mỗi 60 giây
export const revalidate = 60;

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  // Fetch dữ liệu với cơ chế ISR (Incremental Static Regeneration)
  const res = await fetch(`https://api.example.com/products/${id}`, {
    next: { revalidate: 60 },
  });
  const product = await res.json();

  return (
    <div className="max-w-6xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Hình ảnh sản phẩm */}
      <div className="bg-gray-100 rounded-3xl overflow-hidden shadow-inner">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover mix-blend-multiply"
        />
      </div>

      {/* Thông tin realtime (Giá và Tồn kho) */}
      <div className="flex flex-col justify-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          {product.name}
        </h1>

        <div className="flex items-center gap-6 mb-8">
          <span className="text-4xl font-bold text-red-500">
            {product.price.toLocaleString("vi-VN")} đ
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
            Tồn kho: {product.stock}
          </span>
        </div>

        <p className="text-gray-600 text-lg leading-relaxed mb-10">
          {product.description}
        </p>

        <div className="flex gap-4">
          <button className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all active:scale-95">
            Mua ngay
          </button>
          <button className="p-4 border-2 border-gray-200 rounded-2xl hover:bg-gray-50 transition">
            ❤️
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

**Bạn có muốn tôi cung cấp mã nguồn cho "Ứng dụng 3: API Routes & Fullstack (Serverless Functions)" không?**
