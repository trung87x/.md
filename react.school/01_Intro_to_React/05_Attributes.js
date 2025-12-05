const URL = "https://react.school";

function CustomComponent(props) {
  return (
    <div style={{ border: "1px solid gray", padding: "20px" }}>
      <div>{props.title}</div>
      <div>{props.description}</div>
    </div>
  );
}

export default function App() {
  function sayHello() {
    alert("hello");
  }
  const spreadAttributes = {
    title: "Title set through Spread",
    description: "Description 2",
  };
  return (
    <>
      {/* JavaScript expressions as HTML attributes */}
      <a href={URL}>This is a link</a>;{/* className, not class */}
      <div className="red-text">Red text</div>;
      {/* event handlers must be camelCased */}
      <div onClick={sayHello}>Click me</div>;{/* Setting component props */}
      <CustomComponent title="Title" description="Description" />;
      {/* Spread operator setting props */}
      <CustomComponent {...spreadAttributes} />;
    </>
  );
}
