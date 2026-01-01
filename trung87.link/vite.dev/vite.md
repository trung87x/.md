npm create vite@latest -- --template react
npm install

npm install tailwindcss @tailwindcss/vite

<!-- // .css
@import "tailwindcss";
-->

<!--
import tailwindcss from '@tailwindcss/vite'
plugins: [
tailwindcss(),
],
-->

npm install -D prettier prettier-plugin-tailwindcss

<!-- // .prettierrc
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
-->

<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
<!--
@theme {
  --font-sans: InterVariable, sans-serif;
  --font-sans--font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
}
-->

<html class="bg-white dark:bg-gray-950 scheme-light dark:scheme-dark">

<!-- deleted -->
<!-- npm i @phosphor-icons/react -->

npm install @headlessui/react @heroicons/react

npm install styled-components

npm install react-router-dom

npm install react-frame-component
