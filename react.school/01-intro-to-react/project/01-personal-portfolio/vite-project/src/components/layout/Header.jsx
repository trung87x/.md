import Logo from "../ui/Logo";
import Menu from "../shared/Menu";

const Header = () => {
  // Sử dụng flexbox của Tailwind để sắp xếp nội dung (Logo, Menu)
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        <Logo />
        {/* Menu không cần prop type vì Tailwind sử dụng các lớp tĩnh */}
        <Menu />
      </div>
    </header>
  );
};
export default Header;
