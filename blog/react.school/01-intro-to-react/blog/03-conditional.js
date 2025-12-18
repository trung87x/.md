export default function App() {
  const renderMe = true;
  return (
    <>
      <h1>Captain's Tasks</h1>
      {renderMe ? "This renders!" : "Does not render!"}
      {renderMe && <div>This also renders</div>}
    </>
  );
}
