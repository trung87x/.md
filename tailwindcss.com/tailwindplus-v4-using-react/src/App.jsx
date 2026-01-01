// 1. Phải thêm lazy và Suspense vào đây
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Import tĩnh cho các trang quan trọng (tải ngay lập tức)
import Home from "@/pages/Home";
import About from "@/pages/About";
import routes from "@/routes/autoRoutes";

// Import động cho trang Blog
const DynamicPage = lazy(() => import("./pages/blog"));

// Component loading xoay tròn
const LoadingFallback = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <nav className="flex gap-4 bg-gray-100 p-4">
        <Link to="/" className="text-blue-600 hover:underline">
          Trang chủ
        </Link>
        <Link to="/about" className="text-blue-600 hover:underline">
          Giới thiệu
        </Link>
        <Link to="/blog" className="text-blue-600 hover:underline">
          Blog
        </Link>
        <Link
          to="/marketing/page-sections/hero-sections"
          className="font-medium text-indigo-600 hover:underline"
        >
          Preview Hero
        </Link>
      </nav>

      {/* 2. Sử dụng LoadingFallback ở đây để giao diện đồng bộ */}
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* CÁC ROUTE CỐ ĐỊNH (ƯU TIÊN CAO) */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<DynamicPage />} />

          {/* CÁC ROUTE TỰ ĐỘNG (QUÉT TỪ THƯ MỤC) */}
          {routes.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}

          {/* TRANG 404 */}
          <Route
            path="*"
            element={
              <div className="p-10 text-center text-red-500">
                Trang không tồn tại
              </div>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
