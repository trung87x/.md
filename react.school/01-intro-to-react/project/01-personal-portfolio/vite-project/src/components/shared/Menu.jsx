const Menu = () => {
  // Giả sử Menu chính (type: 'main' trong BEM truyền thống)
  // Tailwind định kiểu trực tiếp
  return (
    <nav className="hidden md:block">
      <ul className="flex space-x-4">
        <li className="text-gray-600 hover:text-indigo-600 cursor-pointer">
          Trang chủ
        </li>
        <li className="text-gray-600 hover:text-indigo-600 cursor-pointer">
          Dự án
        </li>
        <li className="text-gray-600 hover:text-indigo-600 cursor-pointer">
          Liên hệ
        </li>
      </ul>
    </nav>
  );
};
export default Menu;
