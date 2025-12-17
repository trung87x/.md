import SearchForm from "../shared/SearchForm";

const HeroSection = () => {
  return (
    // Sử dụng lớp tiện ích Tailwind cho padding, background, và căn giữa
    <section className="bg-gray-100 py-16 text-center">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
        Chào mừng đến với Blog
      </h2>
      {/* SearchForm được lồng vào */}
      <SearchForm />
    </section>
  );
};
export default HeroSection;
