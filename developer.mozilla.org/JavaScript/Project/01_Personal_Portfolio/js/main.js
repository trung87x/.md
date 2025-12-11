import { profileData } from "./data.js";
import { renderProfile, renderSkills, renderProjects } from "./render.js";

const initApp = () => {
  const rootElement = document.getElementById("app");

  if (!rootElement) return;

  const { skills, projects, ...basicInfo } = profileData;

  rootElement.innerHTML = `
        ${renderProfile(basicInfo)}
        <hr/>
        ${renderSkills(skills)}
        <hr/>
        ${renderProjects(projects)}
    `;
};

initApp();
