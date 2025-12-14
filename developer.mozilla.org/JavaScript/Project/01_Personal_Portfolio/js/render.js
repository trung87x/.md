export const renderProfile = ({ name, role, bio, social }) => {
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

export const renderSkills = (skills) => {
  // [Array.prototype.map] để biến đổi mảng dữ liệu thành mảng HTML string
  const skillsHtml = skills
    .map((skill) => `<span class="badge">${skill}</span>`)
    .join(""); // .join('') gộp mảng thành một chuỗi duy nhất

  return `
      <section class="skills-section">
        <h3>🛠️ Kỹ năng</h3>
        <div class="skill-list">${skillsHtml}</div>
      </section>
    `;
};

export const renderProjects = (projects) => {
  return `
      <section class="projects-section">
        <h3>🚀 Dự án tiêu biểu</h3>
        <ul>
          ${projects
            .map((project) => {
              // [Destructuring] trong callback của map
              const { title, desc, isFinished } = project;

              return `
                <li>
                  <strong>${title}</strong> 
                  <span class="status ${
                    // [Ternary Operator] lồng nhau để chọn class CSS
                    isFinished ? "done" : "wip"
                  }">
                    ${isFinished ? "Hoàn thành" : "Đang phát triển"}
                  </span>
                  <p>${desc}</p>
                </li>
              `;
            })
            .join("")}
        </ul>
      </section>
    `;
};
