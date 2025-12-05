export default function App() {
  return (
    <>
      <h1>Primitives in JSX</h1>
      <ul>
        <li>String: {"hello"}</li>
        <li>Number: {99}</li>
        <li>Boolean: {true}</li>
        <li>Null: {null}</li>
        <li>Undefined: {undefined}</li>
        <li>Array: {[1, 2, 3, 4, 5]}</li>
        <li>Function: {function () {}}</li>
        <li>Array of Nodes:</li>
        <ul>
          {[<li>hello</li>, <li>wow</li>, <li>cool</li>, <li>amazing</li>]}
        </ul>
        {/* JSX expressions can also be rendered inside curly braces */}
        <li>Node: {<span>I'm a Node</span>}</li>
      </ul>
    </>
  );
}
