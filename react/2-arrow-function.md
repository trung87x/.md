```html
<body>
  <div id="app"></div>

  <script type="text/babel">
    // 🧩 Arrow Function
    const Button = ({ label }) => (
      <button onClick={() => alert(label)} style={{ fontSize: "16px" }}>
        {label}
      </button>
    );

    // 🧩 Function Declaration
    function App() {
      return (
        <>
          <Button label="React" />
          <Button label="JavaScript" />
        </>
      );
    }

    const root = ReactDOM.createRoot(document.getElementById("app"));
    root.render(<App />);
  </script>
</body>
```
