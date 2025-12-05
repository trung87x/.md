const crew = [
  { name: "Trung" },
  { name: "Truong" },
  { name: "Tu" },
  { name: "Tuan" },
];

export default function App() {
  return (
    <>
      <h1>Captain's Tasks</h1>
      {crew.map((user, i) => (
        <div key={`task-${i}`}>{user.name}</div>
      ))}
    </>
  );
}
