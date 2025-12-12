// ===============================================
// FILE GỘP CHUNG: App.jsx
// Chứa toàn bộ Logic, Component, và Styles cho Theme Toggle
// ===============================================

import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

// -----------------------------------------------
// A. Style Definitions (src/styles/StyleElements.js)
// -----------------------------------------------

// Định nghĩa màu sắc cơ bản
const COLORS = {
  light: { background: "#f0f0f0", text: "#333", primary: "#007bff" },
  dark: { background: "#333", text: "#f0f0f0", primary: "#4CAF50" },
};

// Container chính, thay đổi màu nền và màu chữ dựa trên prop 'isDarkMode'
const Container = styled.div`
  /* Sử dụng Destructuring props để truy cập isDarkMode */
  background-color: ${({ isDarkMode }) =>
    isDarkMode ? COLORS.dark.background : COLORS.light.background};
  color: ${({ isDarkMode }) =>
    isDarkMode ? COLORS.dark.text : COLORS.light.text};

  padding: 40px;
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.5s ease;
  margin: 50px auto;
  text-align: center;
`;

const Title = styled.h1`
  margin-top: 0;
  font-size: 2em;
`;

const ToggleButton = styled.button`
  /* Styling động cho nút dựa trên isDarkMode */
  background-color: ${({ isDarkMode }) =>
    isDarkMode ? COLORS.dark.primary : COLORS.light.primary};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    opacity: 0.9;
    transform: scale(1.05);
  }
`;

// -----------------------------------------------
// B. Component Con: ContentArea (src/components/ContentArea.js)
// -----------------------------------------------

const ContentArea = ({ isDarkMode }) => (
  <>
    <Title>
      {/* Conditional Rendering để hiển thị tiêu đề */}
      {isDarkMode ? "Chế độ Tối (Dark Mode)" : "Chế độ Sáng (Light Mode)"}
    </Title>

    <p>Đây là nội dung thử nghiệm của ứng dụng.</p>

    {/* Conditional Rendering: Chỉ hiển thị thẻ p này nếu ở Dark Mode */}
    {isDarkMode && (
      <p style={{ fontStyle: "italic" }}>
        {/* Toán tử Logical AND (&&) được sử dụng cho Conditional Rendering */}
        Màu nền tối giúp mắt bạn dễ chịu hơn.
      </p>
    )}
  </>
);

// -----------------------------------------------
// C. Component Con: ThemeButton (src/components/ThemeButton.js)
// -----------------------------------------------

const ThemeButton = ({ isDarkMode, onToggle }) => {
  // Sử dụng Conditional Rendering (Ternary) để thay đổi nội dung nút
  const buttonText = isDarkMode ? "🌞 Chuyển sang Sáng" : "🌙 Chuyển sang Tối";

  return (
    <ToggleButton
      isDarkMode={isDarkMode} // Prop động cho Styled Component
      onClick={onToggle} // Gắn Event Handler
    >
      {buttonText}
    </ToggleButton>
  );
};

// -----------------------------------------------
// D. Component Chính: App (src/App.js)
// -----------------------------------------------

export default function App() {
  // State quản lý chế độ chủ đề (Boolean: true = Dark, false = Light)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Hàm xử lý khi người dùng click nút
  const handleToggleTheme = () => {
    // Cập nhật state bằng cách đảo ngược giá trị hiện tại
    setIsDarkMode(!isDarkMode);
  };

  return (
    // Sử dụng Fragment (<>...</>)
    <>
      {/* Lưu ý: Không cần GlobalStyle ở đây. Nếu bạn muốn thay đổi màu nền toàn bộ body, 
            bạn sẽ cần dùng GlobalStyle và truyền isDarkMode vào đó (nếu bạn không dùng ThemeProvider).
            */}

      {/* Container nhận state isDarkMode để thay đổi styling */}
      <Container isDarkMode={isDarkMode}>
        {/* Component hiển thị nội dung */}
        <ContentArea isDarkMode={isDarkMode} />

        {/* Component nút nhận hàm xử lý và trạng thái qua Props */}
        <ThemeButton isDarkMode={isDarkMode} onToggle={handleToggleTheme} />
      </Container>
    </>
  );
}
