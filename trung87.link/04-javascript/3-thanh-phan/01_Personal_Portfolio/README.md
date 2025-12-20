Dưới đây là cấu trúc dự án mẫu, áp dụng: **ES Modules**, **Objects/Arrays**, **Destructuring**, **Template Literals**, **Arrow Functions** và **Ternary Operator**.

Cấu trúc thư mục dự án

/portfolio
├── index.html
├── js
│ ├── data.js (Chứa dữ liệu cá nhân)
│ ├── render.js (Chứa logic hiển thị HTML)
│ └── main.js (File chính để chạy ứng dụng)

\--------------------------------------------------------------------------------

1\. File `js/data.js` (Dữ liệu)

Chúng ta sẽ sử dụng **Object** và **Array** để lưu trữ thông tin. Việc tách dữ liệu ra file riêng giúp bạn dễ dàng cập nhật CV sau này mà không cần sửa logic code.

/_ js/data.js _/

    // Sử dụng const và Object.freeze để đảm bảo dữ liệu gốc không bị thay đổi [2]
    export const profileData = Object.freeze({
      name: "Nguyễn Văn Code",
      role: "Frontend Developer",
      bio: "Lập trình viên đam mê JavaScript và xây dựng giao diện người dùng hiện đại.",
      social: {
        github: "https://github.com/example",
        linkedin: "https://linkedin.com/in/example",
        website: null // Ví dụ trường hợp chưa có website
      },
      skills: ["JavaScript (ES6+)", "React", "HTML5/CSS3", "Git"],
      projects: [
        {
          id: 1,
          title: "Mini Shopping Cart",
          desc: "Ứng dụng giỏ hàng đơn giản sử dụng Vanilla JS.",
          isFinished: true
        },
        {
          id: 2,
          title: "Portfolio 2.0",
          desc: "Trang cá nhân tích hợp Dark Mode.",
          isFinished: false // Dự án đang làm
        }
      ]
    });

\--------------------------------------------------------------------------------

2\. File `js/render.js` (Logic hiển thị)

File này chứa các hàm thuần túy (pure functions) để tạo ra HTML string. Chúng ta sẽ dùng **Template Literals** để viết HTML nhiều dòng và **Destructuring** để code gọn hơn.

/_ js/render.js _/

    // 1. Hàm render thông tin cá nhân
    // Sử dụng Destructuring ngay trong tham số hàm: ({ name, role, bio }) [5]
    export const renderProfile = ({ name, role, bio, social }) => {
      // Sử dụng Template Literals cho chuỗi đa dòng [6]
      return `
        <div class="profile-card">
          <h1>${name}</h1>
          <h2>${role}</h2>
          <p>${bio}</p>
          <div class="social-links">
            ${
              // Sử dụng Ternary Operator để kiểm tra null [7]
              // Nếu có social.website thì hiện link, không thì hiện thông báo
              social.website
                ? `<a href="${social.website}">Website</a>`
                : `<span class="disabled">No Website</span>`
            }
            <a href="${social.github}">GitHub</a>
          </div>
        </div>
      `;
    };

    // 2. Hàm render danh sách kỹ năng
    // Sử dụng Arrow Function ngắn gọn [8]
    export const renderSkills = (skills) => {
      // .map() biến đổi mảng string thành mảng HTML string [9]
      // .join('') gộp mảng thành một chuỗi duy nhất [10]
      const skillsHtml = skills.map(skill => `<span class="badge">${skill}</span>`).join('');

      return `
        <div class="skills-section">
          <h3>Kỹ năng</h3>
          <div class="skill-list">${skillsHtml}</div>
        </div>
      `;
    };

    // 3. Hàm render dự án
    export const renderProjects = (projects) => {
      return `
        <div class="projects-section">
          <h3>Dự án tiêu biểu</h3>
          <ul>
            ${projects.map(project => {
                // Destructuring trong callback của map [11]
                const { title, desc, isFinished } = project;

                return `
                  <li>
                    <strong>${title}</strong>
                    ${/* Ternary operator để đổi màu/trạng thái badge */ ''}
                    <span class="status ${isFinished ? 'done' : 'wip'}">
                      ${isFinished ? 'Hoàn thành' : 'Đang phát triển'}
                    </span>
                    <p>${desc}</p>
                  </li>
                `;
            }).join('')}
          </ul>
        </div>
      `;
    };

\--------------------------------------------------------------------------------

3\. File `js/main.js` (Kết nối)

Đây là nơi chúng ta **Import** các module lại với nhau và đưa vào DOM. Code trong module tự động chạy ở chế độ `strict mode`.

/_ js/main.js _/

    // Import Named Exports từ các file khác [13]
    import { profileData } from './data.js';
    import { renderProfile, renderSkills, renderProjects } from './render.js';

    // Hàm khởi tạo ứng dụng
    const initApp = () => {
      const rootElement = document.getElementById('app');

      if (!rootElement) return;

      // Sử dụng Destructuring để lấy các mảng/object con từ profileData [14]
      const { skills, projects, ...basicInfo } = profileData;

      // Ghép các chuỗi HTML lại với nhau
      // basicInfo chứa {name, role, bio, social} nhờ Rest syntax trong destructuring [15]
      rootElement.innerHTML = `
        ${renderProfile(basicInfo)}
        <hr/>
        ${renderSkills(skills)}
        <hr/>
        ${renderProjects(projects)}
      `;
    };

    // Chạy hàm khởi tạo
    initApp();

\--------------------------------------------------------------------------------

4\. File `index.html`

Phần quan trọng nhất ở đây là thuộc tính `type="module"`. Nếu thiếu nó, trình duyệt sẽ không hiểu lệnh `import/export`.

<!DOCTYPE html>

    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My Simple Portfolio</title>
        <style>
            body { font-family: sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
            .badge { background: #eee; padding: 5px 10px; margin-right: 5px; border-radius: 4px; }
            .status.done { color: green; }
            .status.wip { color: orange; font-style: italic; }
            .disabled { color: gray; text-decoration: line-through; }
        </style>
    </head>
    <body>
        <!-- Nơi JavaScript sẽ "bơm" nội dung vào -->
        <div id="app"></div>

        <!-- KHAI BÁO MODULE: Bắt buộc phải có type="module" -->
        <script type="module" src="./js/main.js"></script>
    </body>
    </html>

Tổng kết các kỹ thuật đã dùng:

1. **Modules (Import/Export):** Chúng ta chia nhỏ code: `data.js` chỉ chứa thông tin, `render.js` chỉ chứa giao diện. Điều này giúp code dễ bảo trì hơn rất nhiều so với viết tất cả trong một file.

2. **Template Literals (\*\***\`\`\***\*):** Thay vì cộng chuỗi `'<h1>' + name + '</h1>'` rất rối mắt, ta dùng `${name}` để nhúng biến trực tiếp vào HTML.

3. **Destructuring:** Trong hàm `renderProfile`, thay vì viết `data.name`, `data.role`, ta bóc tách ngay từ đầu `({ name, role })` giúp code ngắn gọn và rõ nghĩa.

4. **Array Methods (\*\***.map\***\*,** **.join\*\***):\*\* Đây là "combo" kinh điển để tạo danh sách HTML từ mảng dữ liệu. `.map` biến đổi từng object dự án thành chuỗi HTML `<li>...</li>`, và `.join('')` nối chúng lại thành một khối liền mạch.

5. **Ternary Operator (\*\***? :\***\*):** Xử lý logic hiển thị thông minh: nếu dự án chưa xong (`isFinished: false`), nó tự động hiện nhãn "Đang phát triển" màu cam mà không cần viết khối `if-else` dài dòng.

Bạn có thể tạo các file này trên máy tính và mở `index.html` bằng **Live Server** (hoặc một local server bất kỳ) để xem kết quả. Lưu ý là Modules không chạy trực tiếp qua giao thức `file://` do bảo mật CORS.
