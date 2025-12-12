const elements = {
  footer: <footer>Created by The Captain.</footer>,
};

function getDescription() {
  return <p> Managing my tasks at sea </p>;
}

function BetterDescription() {
  return <p> This is a better description because it's a component </p>;
}

export default function App() {
  // Inline Element Expression
  const header = <h1> 🏴‍☠️ The Captain's Tasks </h1>;
  // Element returned from function
  const description = getDescription();
  // Element pulled from object
  const footer = elements["footer"];

  return (
    <>
      {header}
      {description}
      <BetterDescription />
      {footer}
    </>
  );
}
