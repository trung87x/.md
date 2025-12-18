import { useState } from "react";

const INITIAL_COUNT = 0;
const INITIAL_USER = { name: "Bob", isEmployed: true };

function CounterExample() {
  const [count, setCount] = useState(INITIAL_COUNT);
  return (
    <>
      <h1> Counter example </h1>
      <h3>Count: {count}</h3>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>
        Increment (with function)
      </button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </>
  );
}

function ObjectExample() {
  const [user, setUser] = useState(INITIAL_USER);
  const { name, isEmployed } = user;
  return (
    <>
      <h1> Object example </h1>
      <h3>
        {name} is {isEmployed ? "employed" : "not employed"}
      </h3>
      <button
        onClick={() =>
          setUser({ ...user, isEmployed: isEmployed ? false : true })
        }
      >
        {isEmployed ? "Terminate" : "Hire"}
      </button>
    </>
  );
}

export default function App() {
  return (
    <>
      <CounterExample />
      <ObjectExample />
    </>
  );
}
