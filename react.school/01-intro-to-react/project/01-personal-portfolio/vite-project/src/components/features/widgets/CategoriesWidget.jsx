import { Link } from "react-router-dom";

const CategoriesWidget = () => {
  const categories = [
    { name: "Công nghệ", slug: "cong-nghe", count: 12 },
    { name: "Đời sống", slug: "doi-song", count: 5 },
    { name: "Lập trình", slug: "lap-trinh", count: 8 },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900 mb-4">Danh mục</h3>
      <ul className="space-y-3">
        {categories.map((cat) => (
          <li key={cat.slug}>
            <Link
              to={`/category/${cat.slug}`}
              className="flex justify-between items-center text-slate-600 hover:text-indigo-600 transition-colors"
            >
              <span>{cat.name}</span>
              <span className="bg-slate-100 text-slate-500 text-xs px-2 py-1 rounded-full">
                {cat.count}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default CategoriesWidget;
