[
  // 1. Header (Tái sử dụng)
  { block: 'header', content: [
    { block: 'logo' },
    { block: 'menu', mods: { type: 'main' } }
  ]},

  // 2. Container nội dung
  { block: 'layout', elem: 'main', content: [
    
    // Block Bài viết Chi tiết
    { block: 'post-detail', content: [
      { elem: 'title', content: 'Tên bài viết chi tiết' },
      { elem: 'meta' }, // Thông tin tác giả, ngày đăng
      { elem: 'content' } // Nội dung HTML của bài viết
    ]},

    // Block Bình luận
    { block: 'comments', mods: { type: 'threaded' } },

    // Block Bài viết liên quan
    { block: 'related-posts', content: [
      { block: 'post-preview', mods: { compact: true } },
      // ...
    ]},

    // Sidebar (Tái sử dụng)
    { block: 'sidebar', content: [
      { block: 'author-info' },
      { block: 'categories-widget' }
    ]}
  ]},

  // 3. Footer (Tái sử dụng)
  { block: 'footer' }
]