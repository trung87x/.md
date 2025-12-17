import { NavLink } from "react-router-dom";

const Menu = ({ type = "main" }) => {
  const links = [
    { name: "Trang chủ", path: "/" },
    { name: "Công nghệ", path: "/category/cong-nghe" },
    { name: "Đời sống", path: "/category/doi-song" },
  ];

  return (
    <nav className={type === "main" ? "block" : "hidden"}>
      <ul className="flex space-x-8">
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-blue-600 ${
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                    : "text-gray-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
