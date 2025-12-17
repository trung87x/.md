const MainLayout = ({ children }) => {
  // Container bao bọc toàn bộ trang
  return <div className="min-h-screen flex flex-col">{children}</div>;
};
export default MainLayout;
