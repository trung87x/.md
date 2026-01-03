import { lazy } from "react";

// Sử dụng alias @ trỏ thẳng vào thư mục pages
const modules = import.meta.glob("@/pages/**/*.jsx");

const routes = Object.keys(modules).map((path) => {
  // Biến đổi đường dẫn: /src/pages/Marketing/Hero.jsx -> marketing/hero
  // Lưu ý: Vite sẽ resolve @ thành /src/ khi thực hiện globbing
  const name = path
    .replace("/src/pages/", "")
    .replace(".jsx", "")
    .toLowerCase();

  const routePath =
    name === "index" || name.endsWith("/index")
      ? name === "index"
        ? "/"
        : `/${name.replace("/index", "")}`
      : `/${name}`;

  return {
    path: routePath,
    // Lazy load component
    component: lazy(modules[path]),
  };
});

export default routes;
