import PreviewWrapper from "@/components/PreviewWrapper";

// Import component từ features bởi vì trang (page) chỉ nên làm nhiệm vụ layout,
// còn logic hiển thị chi tiết nằm ở features.
import SimpleCentered from "@/component-plus/marketing/1-page-sections/01-hero-sections/simple_centered";
import SimpleCenteredCopy from "@/component-plus/marketing/1-page-sections/01-hero-sections/simple_centered";

const HeroDemoPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header của trang quản lý/preview (không bị ảnh hưởng bởi Iframe) */}
      <header className="flex items-center justify-between bg-slate-900 px-10 py-8 text-white">
        <div>
          <h1 className="text-xl font-black tracking-tighter uppercase">
            Component Lab
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Dự án: Chừng mực / Nhà làm
          </p>
        </div>
        <div className="rounded border border-slate-700 bg-slate-800 px-3 py-1 text-xs">
          Vite + Tailwind + Iframe
        </div>
      </header>

      <main className="mx-auto max-w-[1400px]">
        {/* Trường hợp 1: Hero Section đơn giản */}
        <PreviewWrapper name="Standard Hero Section">
          <SimpleCentered />
        </PreviewWrapper>

        {/* Trường hợp 2: Component có chứa Header/Menu cố định (Fixed) */}
        {/* Bởi vì dùng Iframe, Header fixed sẽ bám vào khung Preview, không bị tràn lên Header Lab */}
        <PreviewWrapper name="Full Page Mockup (with Sticky Nav)">
          <div className="relative">
            {/* Giả lập một Header bên trong component */}
            <SimpleCenteredCopy />
            {/* Bạn có thể ném thêm Footer vào đây để test full page */}
          </div>
        </PreviewWrapper>

        <SimpleCenteredCopy />
      </main>

      <footer className="mt-20 border-t py-20 text-center text-gray-300">
        &copy; 2025 - Build with Passion
      </footer>
    </div>
  );
};

export default HeroDemoPage;
