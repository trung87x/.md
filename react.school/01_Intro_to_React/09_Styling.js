const crew = [
  { name: "Trung", id: uniqueId() },
  { name: "Truong", id: uniqueId() },
  { name: "Tu", id: uniqueId() },
  { name: "Tuan", id: uniqueId() },
];

function User({ name, onClick }) {
  // inline style here.
  return (
    <div
      style={{
        border: "1px, solid, blue",
        maxWidth: "100px",
        padding: "5px",
        margin: "5px 0px",
        boxShadow: "0px 0px 5px black",
        borderRadius: "8px",
      }}
      onClick={onClick}
    >
      {name}
    </div>
  );
}

function uniqueId() {
  return Math.floor(Math.random() * 10000000);
}

export default function App() {
  function sayHello(name) {
    alert("hello, " + name);
  }
  return (
    <>
      <h1> 🏴‍☠️ The Captain's Crew </h1>
      <p> Tiny User Management System (TUMS) </p>
      <h2> Explorers </h2>
      {/* Inline style here */}
      <button
        className="add-explorer-button"
        style={{ fontSize: "20px", marginBottom: "10px" }}
        onClick={() => alert("Adding Explorer")}
      >
        Add Explorer
      </button>
      {crew.map(({ name, id }, i) => (
        <User
          key={`task-${id}`}
          name={name}
          onClick={() => {
            sayHello(name);
          }}
        />
      ))}
    </>
  );
}
