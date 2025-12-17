import Header from "./Header";
import Footer from "./Footer";

const MainLayout = ({ children, columns = "two" }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
