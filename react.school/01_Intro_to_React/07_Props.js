const crew = [
  { name: "Trung" },
  { name: "Truong" },
  { name: "Tu" },
  { name: "Tuan" },
];

function User(props) {
  return (
    <div>
      {props.name}
      {props.data.info}
      {props.jsxElement}
      {props.nestedAttribute}
    </div>
  );
}

function UserDes({ name, data: { info }, jsxElement, nestedAttribute }) {
  return (
    <div>
      {name}
      {info}
      {jsxElement}
      {nestedAttribute}
    </div>
  );
}

export default function App() {
  return (
    <>
      <h1>🏴‍☠️ The Captain's Crew</h1>
      {crew.map((user, i) => (
        <User
          key={`user-${i}`}
          title={user.name}
          data={{ info: " low" }}
          jsxElement={<b> time </b>}
          {...{ nestedAttribute: "team" }}
        />
      ))}
    </>
  );
}
