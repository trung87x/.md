## (Tư duy Grid & Layout)

Một Dashboard chuyên nghiệp yêu cầu khả năng quản lý không gian cực tốt. Chúng ta sẽ dùng CSS Grid để chia bố cục Tổng thể và Flexbox cho các chi tiết nhỏ.

```html
<style>
  .dashboard {
    display: grid;
    grid-template-columns: 250px 1fr; /* Sidebar cố định và nội dung giãn theo */
    grid-template-rows: 60px 1fr;
    height: 100vh;
  }
  .sidebar {
    grid-row: 1 / 3;
    background: #2c3e50;
    color: white;
    padding: 20px;
  }
  .header {
    background: white;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    padding: 0 20px;
  }
  .content {
    background: #f4f7f6;
    padding: 20px;
    overflow-y: auto;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }
  .stat-card {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
</style>

<div class="dashboard">
  <aside class="sidebar">
    <h2>Admin</h2>
    <nav>Dashboard<br />Orders<br />Users</nav>
  </aside>
  <header class="header"><h3>Tổng quan hệ thống</h3></header>
  <main class="content">
    <div class="stats-grid">
      <div class="stat-card">
        <h4>Doanh thu</h4>
        <p>$12,500</p>
      </div>
      <div class="stat-card">
        <h4>Khách hàng</h4>
        <p>1,200</p>
      </div>
      <div class="stat-card">
        <h4>Đơn hàng</h4>
        <p>450</p>
      </div>
    </div>
  </main>
</div>
```
