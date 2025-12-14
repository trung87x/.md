import { useState } from "react";

// --- 1. Dữ liệu và Utility ---
const initialTreasures = [
  { id: 101, name: "Gold Coin Stack", value: 500, claimed: false },
  { id: 102, name: "Ancient Map", value: 1200, claimed: true },
  { id: 103, name: "Jeweled Skull", value: 2500, claimed: false },
];

const elements = {
  // Element được kéo từ object (Tương tự 04_Elements.js)
  footer: <footer>© 2025 The Captain's Vault</footer>,
};

// Hàm trả về một JSX Element (Tương tự 04_Elements.js)
function getHeaderDescription() {
  // Primitives và JSX expressions (Tương tự 02_Primitives.js)
  return <p>Total items in vault: {initialTreasures.length}</p>;
}

// --- 2. Component Con: TreasureItem (Sử dụng Props, Styling, Event) ---
// (Tương tự 07_Props.js và 09_Styling.js)
function TreasureItem({ id, name, value, isClaimed, onToggleClaim }) {
  // Inline Style cho component (Tương tự 09_Styling.js)
  const itemStyle = {
    border: `2px solid ${isClaimed ? "green" : "red"}`,
    padding: "10px",
    margin: "8px 0",
    borderRadius: "10px",
    cursor: "pointer",
    // Sử dụng JavaScript Expression trong Style (Tương tự 09_Styling.js)
    backgroundColor: isClaimed ? "lightgreen" : "lightcoral",
    color: "#333",
  };

  return (
    <div
      style={itemStyle}
      onClick={() => onToggleClaim(id)} // Event Handler (Tương tự 08_Event.js)
    >
      {/* Primitives: Chuỗi, Số, JSX */}
      <h4>
        Item: {name} - Value: {value} Gold
      </h4>
      {/* Conditional Rendering với toán tử 3 ngôi (Tương tự 03_Conditional.js) */}
      <p>
        **Status:**{" "}
        {isClaimed ? "Claimed by Captain!" : "Available for claiming"}
      </p>
    </div>
  );
}

// --- 3. Component Chính: App (Sử dụng State, Lists, Conditional Rendering) ---
export default function TreasureManager() {
  // State Hook (Tương tự 11_Use_State.js - Array of Objects)
  const [treasures, setTreasures] = useState(initialTreasures);

  // State cho Toggle Visibility
  const [showClaimed, setShowClaimed] = useState(true);

  // Hàm xử lý Event: cập nhật State (Tương tự 11_Use_State.js - Function)
  function handleToggleClaim(idToUpdate) {
    setTreasures(
      treasures.map((t) => {
        if (t.id === idToUpdate) {
          // Object State Update: Sử dụng Spread Operator (Tương tự 11_Use_State.js)
          return { ...t, claimed: !t.claimed };
        }
        return t;
      })
    );
  }

  const claimedCount = treasures.filter((t) => t.claimed).length;

  return (
    <>
      {/* Inline Element Expression (Tương tự 04_Elements.js) */}
      <h1> 💰 The Captain's Treasure Vault </h1>
      {getHeaderDescription()} {/* Element returned from function */}
      {/* Conditional Rendering với && (Tương tự 03_Conditional.js) */}
      {claimedCount === treasures.length && (
        <div style={{ color: "blue", fontWeight: "bold" }}>
          **🎉 All treasures have been claimed!**
        </div>
      )}
      {/* Button sử dụng Event Handler và Inline Styling (Tương tự 09_Styling.js) */}
      <button
        style={{ margin: "10px 0", padding: "10px", fontSize: "16px" }}
        onClick={() => setShowClaimed(!showClaimed)}
      >
        {/* Conditional Text: (Tương tự 03_Conditional.js) */}
        {showClaimed ? "Hide Claimed Items" : "Show All Items"}
      </button>
      <h2>Treasures List</h2>
      {/* Lists: Sử dụng .map() (Tương tự 06_Lists.js) */}
      {treasures
        .filter((t) => showClaimed || !t.claimed) // Lọc dựa trên State
        .map((treasure) => (
          <TreasureItem
            // Key attribute (Tương tự 06_Lists.js)
            key={`treasure-${treasure.id}`}
            id={treasure.id}
            name={treasure.name} // Prop: name (Tương tự 07_Props.js)
            value={treasure.value} // Prop: value
            isClaimed={treasure.claimed} // Prop: boolean
            onToggleClaim={handleToggleClaim} // Prop: function
          />
        ))}
      {elements.footer} {/* Element pulled from object */}
    </>
  );
}

// Export default TreasureManager; // Uncomment nếu đây là file App.js
