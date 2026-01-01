export default function Home() {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Chào mừng đến với Dự án Demo
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Đây là trang chủ được xây dựng bằng React và Tailwind CSS. Bạn có
              thể bắt đầu tùy chỉnh mọi thứ từ đây.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
                Bắt đầu ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
