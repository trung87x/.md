```html
<body>
  <div id="app"></div>

  <script type="text/babel">
    function Form() {
      // 🧩 Nested Function
      function handleSubmit(e) {
        e.preventDefault();
        alert("Form đã được gửi!");
      }

      return (
        {/* 🧩 Callback handleSubmit */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nhập nội dung..."
            style={{ fontSize: "16px" }}
          />
          <button type="submit">Gửi</button>
        </form>
      );
    }

    function App() {
      return <Form />;
    }

    const root = ReactDOM.createRoot(document.getElementById("app"));
    root.render(<App />);
  </script>
</body>
```
