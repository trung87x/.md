import React from "react";

const AuthorBio = () => {
  return (
    // Block Author-bio
    <div className="bg-white shadow-lg rounded-xl p-6 mb-10 border-t-4 border-indigo-600">
      <h3 className="text-2xl font-semibold mb-3">Về Tác giả</h3>
      <div className="flex items-center space-x-4">
        <img
          className="w-16 h-16 rounded-full object-cover"
          src="/avatar.jpg"
          alt="Avatar"
        />
        <div>
          <p className="font-bold text-gray-800">Tên Tác giả</p>
          <p className="text-gray-600">
            Frontend Developer sử dụng React và BEM/Tailwind.
          </p>
        </div>
      </div>
    </div>
  );
};
export default AuthorBio;
