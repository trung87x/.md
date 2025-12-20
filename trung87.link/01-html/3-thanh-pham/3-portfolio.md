Nơi để bạn "khoe" dự án và thông tin liên hệ với nhà tuyển dụng.

```html
<style>
  .portfolio-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
  }
  .project-card {
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 8px;
    transition: 0.3s;
  }
  .project-card:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
</style>

<section id="projects">
  <h2 style="text-align: center;">Dự Án Đã Hoàn Thành</h2>
  <div class="portfolio-grid">
    <article class="project-card">
      <img src="thumb1.webp" alt="Dự án 1" style="width:100%;" loading="lazy" />
      <h3>Website Bất Động Sản</h3>
      <p>Sử dụng HTML5, Semantic, và chuẩn SEO.</p>
    </article>
    <article class="project-card">
      <img src="thumb2.webp" alt="Dự án 2" style="width:100%;" loading="lazy" />
      <h3>App Quản Lý Chi Tiêu</h3>
      <p>Giao diện Responsive, tối ưu Performance.</p>
    </article>
  </div>
</section>
```
