import { useState } from "react";
import {
  ClipboardIcon,
  CheckIcon,
  CodeBracketIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

const PreviewWrapper = ({ children, code, name }) => {
  const [tab, setTab] = useState("preview"); // 'preview' | 'code'
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-12 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* HEADER: Thanh điều hướng và công cụ */}
      <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-4 py-3">
        <div className="flex items-center gap-4">
          <h3 className="font-mono text-sm font-bold tracking-wider text-gray-700 uppercase">
            // {name}
          </h3>

          <div className="flex rounded-lg bg-gray-200/50 p-1">
            <button
              onClick={() => setTab("preview")}
              className={`flex items-center gap-2 rounded-md px-3 py-1 text-xs font-medium transition-all ${
                tab === "preview"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <EyeIcon className="h-4 w-4" /> Preview
            </button>
            <button
              onClick={() => setTab("code")}
              className={`flex items-center gap-2 rounded-md px-3 py-1 text-xs font-medium transition-all ${
                tab === "code"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <CodeBracketIcon className="h-4 w-4" /> Code
            </button>
          </div>
        </div>

        {/* Nút Copy */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-all hover:bg-gray-50 active:scale-95"
        >
          {copied ? (
            <>
              <CheckIcon className="h-4 w-4 text-green-500" />
              <span className="text-green-600">Copied!</span>
            </>
          ) : (
            <>
              <ClipboardIcon className="h-4 w-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* BODY: Nội dung thay đổi theo Tab */}
      <div className="bg-white">
        {tab === "preview" ? (
          <div className="flex min-h-[400px] items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] p-0 sm:p-8">
            <div className="relative isolate max-h-[600px] w-full overflow-auto rounded-lg bg-white shadow-2xl ring-1 ring-gray-900/5">
              {children}
            </div>
          </div>
        ) : (
          <div className="max-h-[600px] overflow-auto bg-gray-900 p-6">
            <pre className="font-mono text-sm leading-relaxed text-gray-300">
              <code>{code}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewWrapper;
