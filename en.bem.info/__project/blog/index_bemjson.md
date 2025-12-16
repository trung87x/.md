[
  // 1. Block Header chung
  { block: 'header', content: [
    { block: 'logo' },
    { block: 'menu', mods: { type: 'main' } }
  ]},

  // 2. Block Carousel/Hero Section
  { block: 'hero-section', content: [
    { elem: 'title', content: 'Chào mừng đến với Blog' },
    { block: 'search-form' }
  ]},

  // 3. Container chứa nội dung chính
  { block: 'layout', elem: 'main', content: [
    // Danh sách các bài blog (Blog List)
    { block: 'posts-list', mods: { type: 'featured' }, content: [
      {
        block: 'post-card',
        mods: { size: 'large' },
        content: [
          { elem: 'image' },
          { elem: 'title', content: 'Bài viết nổi bật 1' }
        ]
      },
      // ... có thể có thêm 2-3 post-card nữa
    ]},
    
    // Sidebar
    { block: 'sidebar', content: [
      { block: 'author-info' },
      { block: 'categories-widget' }
    ]}
  ]},

  // 4. Block Footer chung
  { block: 'footer' }
]