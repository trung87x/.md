## (Tinh giản & Hiện đại)

Giao diện quản trị phần mềm (SaaS) yêu cầu sự sạch sẽ. Tailwind giúp bạn tạo ra các khoảng trắng (spacing) và màu sắc (shades) cực kỳ chuẩn xác mà không cần phối màu thủ công.

```html
<div class="flex h-screen bg-gray-100">
  <aside class="w-64 bg-indigo-900 text-white hidden md:block">
    <div class="p-6 text-2xl font-bold">SaaS Logo</div>
    <nav class="mt-6">
      <a href="#" class="block py-3 px-6 bg-indigo-800 border-l-4 border-white"
        >Tổng quan</a
      >
      <a href="#" class="block py-3 px-6 hover:bg-indigo-800 transition"
        >Khách hàng</a
      >
      <a href="#" class="block py-3 px-6 hover:bg-indigo-800 transition"
        >Báo cáo</a
      >
    </nav>
  </aside>

  <main class="flex-1 flex flex-col">
    <header
      class="h-16 bg-white shadow-sm flex items-center px-8 justify-between"
    >
      <span class="text-gray-700 font-medium">Chào buổi sáng, Admin!</span>
      <div class="w-10 h-10 bg-indigo-500 rounded-full"></div>
    </header>
    <section class="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        class="bg-white p-6 rounded-xl shadow-sm border-t-4 border-green-500"
      >
        <p class="text-sm text-gray-500">Doanh thu</p>
        <p class="text-2xl font-bold">$24,000</p>
      </div>
    </section>
  </main>
</div>
```
