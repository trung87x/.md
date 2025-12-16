[
  // 1. Header (Tái sử dụng)
  { block: 'header', content: [
    { block: 'logo' },
    { block: 'menu', mods: { type: 'main' } }
  ]},

  // 2. Tiêu đề trang Danh mục
  { block: 'page-title', content: 'Danh mục: Công nghệ' },

  // 3. Container nội dung
  { block: 'layout', elem: 'main', content: [
    // Danh sách bài blog (Chỉ hiển thị card tiêu chuẩn)
    { block: 'posts-list', content: [
      { block: 'post-card' }, // Bài viết 1
      { block: 'post-card' }, // Bài viết 2
      // ...
    ]},
    
    // Block Phân trang
    { block: 'pagination', mods: { theme: 'basic' } },

    // Sidebar (Tái sử dụng)
    { block: 'sidebar', content: [
      { block: 'categories-widget' },
      { block: 'tags-cloud' }
    ]}
  ]},

  // 4. Footer (Tái sử dụng)
  { block: 'footer' }
]