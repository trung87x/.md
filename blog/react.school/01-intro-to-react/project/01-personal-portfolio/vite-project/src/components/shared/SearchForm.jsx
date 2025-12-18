const SearchForm = () => {
  // Tailwind CSS định kiểu trực tiếp các Element
  return (
    <form className="max-w-md mx-auto flex space-x-2">
      <input
        className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
        placeholder="Tìm kiếm..."
      />
      <button
        className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-150 shadow-md"
        type="submit"
      >
        Tìm
      </button>
    </form>
  );
};
export default SearchForm;
