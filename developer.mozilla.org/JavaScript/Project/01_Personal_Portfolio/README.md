Tất nhiên rồi. Để đáp ứng yêu cầu của bạn, tôi đã gộp toàn bộ mã JavaScript (Dữ liệu, Hàm Render và Logic Chính) vào trong thẻ `<script>` đặt ở cuối file `portfolio.html`.

File HTML này đã tích hợp đầy đủ các cú pháp hiện đại (Destructuring, Arrow Function, Template Literals, Array Methods) mà chúng ta đã thảo luận.

    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Personal Portfolio - Tổng hợp ES6+</title>

        <!-- CSS Tối giản để hiển thị demo -->
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                max-width: 800px;
                margin: 20px auto;
                padding: 20px;
                background-color: #f8f8f8;
                color: #333;
                line-height: 1.6;
            }
            header { margin-bottom: 30px; border-bottom: 2px solid #ddd; padding-bottom: 20px; }
            h1 { color: #007bff; margin-bottom: 5px; }
            h2 { color: #555; font-size: 1.2em; font-weight: normal; margin-top: 0; }
            h3 { color: #333; border-left: 5px solid #007bff; padding-left: 10px; margin-top: 30px; }
            .badge {
                background: #e0f7fa;
                color: #007bff;
                padding: 5px 10px;
                margin: 5px 5px 5px 0;
                border-radius: 4px;
                display: inline-block;
                font-size: 0.9em;
            }
            .social-links a { margin-right: 15px; color: #007bff; text-decoration: none; }
            .social-links a:hover { text-decoration: underline; }
            .status.done { color: green; font-weight: bold; background: #e6ffed; padding: 2px 5px; border-radius: 3px; }
            .status.wip { color: orange; font-style: italic; background: #fff8e6; padding: 2px 5px; border-radius: 3px; }
            .disabled { color: gray; text-decoration: line-through; }
            ul { list-style: none; padding-left: 0; }
            li { margin-bottom: 15px; border-left: 3px solid #eee; padding-left: 10px; }
        </style>
    </head>
    <body>
        <!-- Nơi nội dung sẽ được JavaScript tạo ra -->
        <div id="app">
            <!-- Chờ nội dung được render... -->
        </div>

        <!-- KHỐI SCRIPT CHỨA TOÀN BỘ LOGIC JAVASCRIPT -->
        <script>
            /* ============================================================
               1. DATA (Dữ liệu cá nhân)
               Sử dụng Object.freeze() để bảo vệ hằng số.
               ============================================================ */

            // [Object.freeze] ngăn chặn việc thay đổi dữ liệu sau khi khởi tạo.
            const profileData = Object.freeze({
              name: "Nguyễn Văn Code",
              role: "Frontend Developer (ES6+ Enthusiast)",
              bio: "Lập trình viên đam mê JavaScript và xây dựng giao diện người dùng hiện đại. Thích sử dụng cú pháp gọn gàng, hiệu quả.",
              social: {
                github: "https://github.com/example",
                linkedin: "https://linkedin.com/in/example",
                website: null // Giá trị này sẽ được kiểm tra bằng toán tử ba ngôi
              },
              skills: ["JavaScript (ES6+)", "React", "HTML5/CSS3", "Git", "Destructuring", "Array Methods"],
              projects: [
                {
                  id: 1,
                  title: "Mini Shopping Cart",
                  desc: "Ứng dụng giỏ hàng đơn giản sử dụng Vanilla JS. Tập trung vào Array Methods và Destructuring.",
                  isFinished: true
                },
                {
                  id: 2,
                  title: "Portfolio 2.0",
                  desc: "Trang cá nhân tích hợp Dark Mode. Hiện đang ở trạng thái 'Đang phát triển'.",
                  isFinished: false
                }
              ]
            });


            /* ============================================================
               2. RENDER FUNCTIONS (Hàm tạo HTML)
               Sử dụng [Arrow Functions] và [Template Literals]
               ============================================================ */

            // [Arrow Function] với [Destructuring] trong tham số
            const renderProfile = ({ name, role, bio, social }) => {
              // [Template Literals] cho phép chuỗi đa dòng
              return `
                <header>
                  <h1>${name}</h1>
                  <h2>${role}</h2>
                  <p>${bio}</p>
                  <div class="social-links">
                    ${
                      // [Ternary Operator]: Kiểm tra social.website có tồn tại (truthy) không
                      social.website
                        ? `<a href="${social.website}" target="_blank">Website</a>`
                        : `<span class="disabled">Chưa có Website</span>`
                    }
                    <a href="${social.github}" target="_blank">GitHub</a>
                    <a href="${social.linkedin}" target="_blank">LinkedIn</a>
                  </div>
                </header>
              `;
            };

            // Hàm render danh sách kỹ năng
            const renderSkills = (skills) => {
              // [Array.prototype.map] để biến đổi mảng dữ liệu thành mảng HTML string
              const skillsHtml = skills.map(skill =>
                `<span class="badge">${skill}</span>`
              ).join(''); // .join('') gộp mảng thành một chuỗi duy nhất

              return `
                <section class="skills-section">
                  <h3>🛠️ Kỹ năng</h3>
                  <div class="skill-list">${skillsHtml}</div>
                </section>
              `;
            };

            // Hàm render dự án
            const renderProjects = (projects) => {
              return `
                <section class="projects-section">
                  <h3>🚀 Dự án tiêu biểu</h3>
                  <ul>
                    ${projects.map(project => {
                        // [Destructuring] trong callback của map
                        const { title, desc, isFinished } = project;

                        return `
                          <li>
                            <strong>${title}</strong>
                            <span class="status ${
                              // [Ternary Operator] lồng nhau để chọn class CSS
                              isFinished ? 'done' : 'wip'
                            }">
                              ${isFinished ? 'Hoàn thành' : 'Đang phát triển'}
                            </span>
                            <p>${desc}</p>
                          </li>
                        `;
                    }).join('')}
                  </ul>
                </section>
              `;
            };


            // ============================================================
            // 3. MAIN LOGIC (Khởi chạy ứng dụng)
            // ============================================================

            const initApp = () => {
              const rootElement = document.getElementById('app');

              if (!rootElement) {
                console.error("Không tìm thấy phần tử #app để render nội dung.");
                return;
              }

              // [Destructuring Assignment] với [Rest Property]
              // Tách mảng skills và projects, phần còn lại gom vào basicInfo
              const { skills, projects, ...basicInfo } = profileData;

              // Ghép các chuỗi HTML đã tạo lại và chèn vào DOM
              rootElement.innerHTML = `
                ${renderProfile(basicInfo)}
                <hr/>
                ${renderSkills(skills)}
                <hr/>
                ${renderProjects(projects)}
              `;
            };

            // Chạy hàm khởi tạo ngay lập tức
            initApp();
        </script>
    </body>
    </html>
