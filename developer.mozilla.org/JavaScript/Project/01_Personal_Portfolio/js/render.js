export const renderProfile = ({ name, role, bio, social }) => {
  return `
    <div class="profile-card">
      <h1>${name}</h1>
      <h2>${role}</h2>
      <p>${bio}</p>
      <div class="social-links">
        ${
          social.website
            ? `<a href="${social.website}">Website</a>`
            : `<span class="disable">No Website</span>`
        }
        <a href="${social.github}"></a>
      </div>
    </div>
  `;
};

export const renderSkills = (skills) => {
  const skillsHtml = skills
    .map((skill) => `<span class="badge">${skill}</span>`)
    .join("");
  return `
    <div class="skills-section">
      <h3>Ky nang</h3>
      <div class="skill-list">${skillsHtml}</div>
    </div>
  `;
};

export const renderProjects = (projects) => {
  return `
    <div class="projects-section">
      <h3>Du an tieu bieu</h3>
      <ul>
        ${projects
          .map((project) => {
            const { title, desc, isFinished } = project;

            return `
              <li>
                <strong>${title}</strong>
                <span class="status ${isFinished ? "done" : "wip"}">
                  ${isFinished ? "Hoan thanh" : "Dang phat trien"}
                </span>
                <p>${desc}</p>
              </li>
            `;
          })
          .join("")}
      </ul>
    </div>  
  `;
};
