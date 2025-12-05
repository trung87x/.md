import React from "react";
import styled from "styled-components";

const crew = [
  { name: "Trung" },
  { name: "Truong" },
  { name: "Tu" },
  { name: "Tuan" },
];

// Creating a React functional component
function Pirate() {
  return <li>I am a modern Pirate</li>;
}

// Creating a Styled Component
const AppContainer = styled.div`
  border: 1px solid black;
  padding: 20px;
  ${(props) => `font-size: ${props.size}`}
`;

// Alternate syntax to create a functional component from arrow functions
const Header = () => <h1> 🏴‍☠️ The Captain's Tasks </h1>;

export default function App() {
  return (
    <AppContainer size="18px">
      <Header />
      <p> Manage the daily jobs at sea </p>
      <ul>
        {crew.map((user, i) => (
          <Pirate key={`task-${i}`} />
        ))}
      </ul>
    </AppContainer>
  );
}
