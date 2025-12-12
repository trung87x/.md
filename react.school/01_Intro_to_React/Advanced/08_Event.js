const crew = [
  { name: "Trung" },
  { name: "Truong" },
  { name: "Tu" },
  { name: "Tuan" },
];

function User({ name, onClick }) {
  return (
    <button onClick={onClick} name={name}>
      {name}
    </button>
  );
}

export default function App() {
  function sayHello(e) {
    alert("hello, " + e.target.name);
  }
  return (
    <>
      <h3> Please select a user </h3>
      {crew.map(({ name }, i) => (
        <User key={`task-${i}`} name={name} onClick={sayHello} />
      ))}
    </>
  );
}
