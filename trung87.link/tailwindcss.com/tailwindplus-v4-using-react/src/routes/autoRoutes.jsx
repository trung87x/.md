import { lazy } from "react";

const modules = import.meta.glob("../pages/**/*.jsx");

const routes = Object.keys(modules).map((path) => {
  // Biến đổi đường dẫn: ../pages/Blog/Post.jsx -> blog/post
  const name = path.replace("../pages/", "").replace(".jsx", "").toLowerCase();

  return {
    // Nếu file là index.jsx thì path là "/", nếu không thì dùng tên file
    path:
      name === "index" || name.endsWith("/index")
        ? name === "index"
          ? "/"
          : `/${name.replace("/index", "")}`
        : `/${name}`,
    // Bọc lazy quanh function import
    component: lazy(modules[path]),
  };
});

export default routes;
