import { Link } from "react-router-dom";

const Logo = () => (
  <Link
    to="/"
    className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
  >
    <span className="text-gray-900">BEM</span>BLOG
  </Link>
);

export default Logo;
