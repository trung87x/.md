import React from "react";

// Creating a React functional component
function Pirate() {
  return <li>I am a modern Pirate</li>;
}

// Alternate syntax to create a functional component from arrow functions
const Header = () => <h1> 🏴‍☠️ The Captain's Tasks </h1>;

export default function App() {
  return (
    <>
      <Header />
      <p> Manage the daily jobs at sea </p>
      <ul>
        <Pirate />
      </ul>
    </>
  );
}
