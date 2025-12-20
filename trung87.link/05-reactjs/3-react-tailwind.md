# Ứng dụng 3: Kết hợp hệ sinh thái (React + Tailwind)

```jsx
import React, { useState } from "react";

// 1. Component tái sử dụng với Tailwind Props
const StatCard = ({ title, value, icon, trend }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold mt-1 text-gray-900">{value}</h3>
      </div>
      <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">{icon}</div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      <span className="text-green-500 font-bold mr-2">{trend}</span>
      <span className="text-gray-400">so với tháng trước</span>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Tối ưu bằng Tailwind */}
      <aside className="w-64 bg-slate-900 text-white hidden lg:flex flex-col p-6">
        <h1 className="text-2xl font-black tracking-tighter text-blue-400 mb-10">
          CORE-UI
        </h1>
        <nav className="space-y-2">
          {["Overview", "Analytics", "Customers", "Settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-3 rounded-xl transition ${
                activeTab === tab ? "bg-blue-600" : "hover:bg-slate-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-slate-800">{activeTab}</h2>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600">
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              🔔
            </button>
            <div className="w-10 h-10 bg-slate-200 rounded-full border-2 border-white shadow-sm"></div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Tổng doanh thu"
            value="$24,500"
            icon="💵"
            trend="+12.5%"
          />
          <StatCard
            title="Người dùng mới"
            value="1,240"
            icon="👥"
            trend="+5.2%"
          />
          <StatCard
            title="Tỷ lệ chuyển đổi"
            value="3.42%"
            icon="📈"
            trend="+1.1%"
          />
        </div>

        {/* Bảng dữ liệu mẫu */}
        <div className="mt-10 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h4 className="font-bold text-slate-800">Giao dịch gần đây</h4>
            <button className="text-blue-600 text-sm font-semibold hover:underline">
              Xem tất cả
            </button>
          </div>
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
              <tr>
                <th className="p-4">Khách hàng</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4">Số tiền</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[1, 2, 3].map((i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition">
                  <td className="p-4 font-medium">User #{i}042</td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                      Thành công
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold text-slate-700">
                    $299.00
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
```

---

**Bạn đã hoàn tất bộ tài liệu React + Tailwind. Tôi có thể hỗ trợ bạn triển khai (Deploy) dự án này lên Vercel hoặc Netlify không?**
