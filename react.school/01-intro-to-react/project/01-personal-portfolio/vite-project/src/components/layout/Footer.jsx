const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-600 font-medium">
            <span className="text-indigo-600 font-bold">BEM</span>BLOG
          </div>
          <div className="text-slate-400 text-sm">
            © 2025 Dự án Blog React.js. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm text-slate-500">
            <a href="#" className="hover:text-indigo-600">
              Quy định
            </a>
            <a href="#" className="hover:text-indigo-600">
              Bảo mật
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
