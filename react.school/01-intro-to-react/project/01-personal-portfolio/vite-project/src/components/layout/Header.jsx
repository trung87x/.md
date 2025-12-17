import Logo from "../ui/Logo";
import Menu from "../shared/Menu";

const Header = () => (
  <header className="bg-white sticky top-0 z-50 border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <Logo />
      <Menu type="main" />
    </div>
  </header>
);

export default Header;
