import { useState } from "react";
import Frame, { FrameContextConsumer } from "react-frame-component";
// Import nội dung file CSS dưới dạng chuỗi (string) bằng ?inline
import styleContent from "@/styles/style-guide.css?inline";

const PreviewWrapper = ({ children, name }) => {
  const [view, setView] = useState("desktop");

  const widths = {
    mobile: "375px",
    tablet: "768px",
    desktop: "100%",
  };

  // Lấy các thẻ <style> và <link> từ trang chính để bơm vào Iframe
  // Bởi vì Iframe cần CSS của Tailwind mới hiển thị đúng được.
  const head = (
    <>
      <style>{styleContent}</style>
      <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    </>
  );

  return (
    <div className="my-10 border-b border-gray-200 pb-10">
      <div className="mb-4 flex items-center justify-between px-4">
        <h3 className="font-mono text-sm font-bold tracking-widest text-gray-500 uppercase">
          // {name}
        </h3>

        <div className="flex rounded-lg bg-gray-100 p-1">
          {Object.keys(widths).map((w) => (
            <button
              key={w}
              onClick={() => setView(w)}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                view === w ? "bg-white text-blue-600 shadow" : "text-gray-400"
              }`}
            >
              {w.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center overflow-hidden border-y border-dashed border-gray-300 bg-gray-50 p-8">
        {/* Iframe chính là "vũ khí" bí mật ở đây */}
        <Frame
          head={head}
          style={{
            width: widths[view],
            height: "600px", // Bạn có thể tùy chỉnh chiều cao
            transition: "all 0.5s ease",
          }}
          className="rounded-lg bg-white shadow-2xl"
        >
          {/* Sử dụng FrameContextConsumer bởi vì chúng ta cần truy cập vào 
              window và document CỦA IFRAME thay vì trang chính.
          */}
          <FrameContextConsumer>
            {({ document, window }) => {
              return (
                <div className="bg-white">
                  {/* Bởi vì một số component Headless UI cần biết context của document 
                    để xử lý sự kiện click-out hoặc focus trap.
                  */}
                  {children}
                </div>
              );
            }}
          </FrameContextConsumer>
        </Frame>
      </div>
    </div>
  );
};

export default PreviewWrapper;
