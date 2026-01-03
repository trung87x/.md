import { useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";

import { SparklesIcon } from "@heroicons/react/24/outline";

const TailwindV4Layout = () => {
  const { pathname } = useLocation();

  const navigation = [
    {
      id: "marketing",
      title: "Marketing",
      icon: "Sparkles",
      sections: [
        {
          label: "PAGE SECTIONS",
          // Marketing Items
          items: [
            {
              name: "Hero Sections",
              path: "/tailwindv4/marketing/hero-sections",
            },
            {
              name: "Feature Sections",
              path: "/tailwindv4/marketing/feature-sections",
            },
            {
              name: "CTA Sections",
              path: "/tailwindv4/marketing/cta-sections",
            },
            { name: "Bento Grids", path: "/tailwindv4/marketing/bento-grids" },
            {
              name: "Pricing Sections",
              path: "/tailwindv4/marketing/pricing-sections",
            },
            {
              name: "Header Sections",
              path: "/tailwindv4/marketing/header-sections",
            },
            {
              name: "Newsletter Sections",
              path: "/tailwindv4/marketing/newsletter-sections",
            },
            { name: "Stats", path: "/tailwindv4/marketing/stats" },
            {
              name: "Testimonials",
              path: "/tailwindv4/marketing/testimonials",
            },
            {
              name: "Blog Sections",
              path: "/tailwindv4/marketing/blog-sections",
            },
            {
              name: "Contact Sections",
              path: "/tailwindv4/marketing/contact-sections",
            },
            {
              name: "Team Sections",
              path: "/tailwindv4/marketing/team-sections",
            },
            {
              name: "Content Sections",
              path: "/tailwindv4/marketing/content-sections",
            },
            { name: "Logo Clouds", path: "/tailwindv4/marketing/logo-clouds" },
            { name: "FAQs", path: "/tailwindv4/marketing/faqs" },
            { name: "Footers", path: "/tailwindv4/marketing/footers" },
          ],
        },
        {
          label: "ELEMENTS",
          items: [
            { name: "Page Sections", path: "/marketing/page-sections" },
            { name: "Elements", path: "/marketing/elements" },
          ],
        },
        {
          label: "FEEDBACK",
          items: [
            { name: "Page Sections", path: "/marketing/page-sections" },
            { name: "Elements", path: "/marketing/elements" },
          ],
        },
        {
          label: "PAGE EXAMPLES",
          items: [
            { name: "Page Sections", path: "/marketing/page-sections" },
            { name: "Elements", path: "/marketing/elements" },
          ],
        },
      ],
    },
    {
      id: "application-ui",
      title: "Application UI",
      icon: "Devices",
      sections: [
        { name: "Page Sections", path: "/marketing/page-sections" },
        { name: "Elements", path: "/marketing/elements" },
      ],
    },
    {
      id: "ecommerce",
      title: "Ecommerce",
      icon: "ShoppingCart",
      sections: [
        { name: "Page Sections", path: "/marketing/page-sections" },
        { name: "Elements", path: "/marketing/elements" },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen bg-white font-sans text-gray-900">
      {/* --- SIDEBAR --- */}
      <aside className="sticky top-0 h-screen w-72 overflow-y-auto border-r border-gray-200 bg-[#F9FAFB] pb-10">
        {/* Logo / Brand Header */}
        <div className="sticky top-0 z-20 bg-[#F9FAFB] px-6 py-5">
          <div className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">
            Component Lab / v4
          </div>
        </div>

        <nav className="px-3">
          {navigation.map((group, idx) => (
            <div key={idx} className="mb-8">
              {/* Tên nhóm lớn: MARKETING, APPLICATION UI... */}
              <div className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-900">
                {group.icon}
                <span>{group.title}</span>
              </div>

              {/* Các phân đoạn: PAGE SECTIONS, ELEMENTS... */}
              {group.sections.map((section, sIdx) => (
                <div key={sIdx} className="mt-4">
                  {section.label && (
                    <div className="mb-1 ml-4 border-l border-gray-200 px-3 py-2 text-[10px] font-bold tracking-wider text-gray-500 uppercase">
                      {section.label}
                    </div>
                  )}

                  <div className="ml-4 space-y-[2px] border-l border-gray-200">
                    {section.items.map((item) => {
                      const isActive = pathname.startsWith(item.path);
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`group relative flex items-center px-4 py-2 text-[13px] font-medium transition-all ${
                            isActive
                              ? "font-semibold text-indigo-600"
                              : "text-gray-600 hover:bg-gray-100/50 hover:text-gray-900"
                          }`}
                        >
                          {/* Vạch kẻ xanh khi Active */}
                          {isActive && (
                            <div className="absolute top-0 bottom-0 left-[-1px] w-[2px] bg-indigo-600" />
                          )}
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 bg-white">
        <header className="flex h-16 items-center border-b border-gray-100 px-8">
          <h1 className="text-sm font-medium text-gray-500">
            {pathname.split("/").filter(Boolean).join(" / ").toUpperCase()}
          </h1>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default TailwindV4Layout;
