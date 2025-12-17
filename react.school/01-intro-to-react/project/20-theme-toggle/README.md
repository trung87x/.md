Tuyệt vời. Dự án cuối cùng trong loạt bài thực hành cơ bản này là **20-Theme-Toggle** (Chuyển đổi Chủ đề Sáng/Tối). Dự án này là ví dụ điển hình để thực hành **State Boolean**, **Conditional Rendering** và **Styling động** bằng cách sử dụng Props trong Styled Components.

Dưới đây là cấu trúc dự án và mã nguồn chi tiết.

### 1\. Cấu trúc Thư mục Dự án

    /theme-toggle-app
    |-- /src
    |   |-- /components
    |   |   |-- ThemeButton.js       // Nút chuyển đổi chủ đề
    |   |   |-- ContentArea.js       // Nội dung chính
    |   |
    |   |-- /styles
    |   |   |-- GlobalStyles.js
    |   |   |-- StyleElements.js     // Các Styled Component chung
    |   |
    |   |-- App.js                   // Component Chính (Quản lý State)
    |
    |-- index.js
    

### 2\. Mã Nguồn Chi Tiết

#### A. File `src/styles/StyleElements.js`

Chúng ta sẽ sử dụng Styled Components và áp dụng logic Destructuring Props để thay đổi màu sắc dựa trên state `isDarkMode`.

    // src/styles/StyleElements.js
    import styled from 'styled-components';
    
    // Định nghĩa màu sắc cơ bản
    const COLORS = {
        light: { background: '#f0f0f0', text: '#333', primary: '#007bff' },
        dark: { background: '#333', text: '#f0f0f0', primary: '#4CAF50' },
    };
    
    // Container chính, thay đổi màu nền và màu chữ dựa trên prop 'isDarkMode'
    export const Container = styled.div`
      /* Sử dụng Destructuring props để truy cập isDarkMode */
      background-color: ${({ isDarkMode }) => (isDarkMode ? COLORS.dark.background : COLORS.light.background)};
      color: ${({ isDarkMode }) => (isDarkMode ? COLORS.dark.text : COLORS.light.text)};
    
      padding: 40px;
      border-radius: 10px;
      width: 100%;
      max-width: 600px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      transition: all 0.5s ease;
      margin: 50px auto;
      text-align: center;
    `;
    
    export const Title = styled.h1`
      margin-top: 0;
      font-size: 2em;
    `;
    
    export const ToggleButton = styled.button`
      /* Styling động cho nút dựa trên isDarkMode */
      background-color: ${({ isDarkMode }) => (isDarkMode ? COLORS.dark.primary : COLORS.light.primary)};
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
    

#### B. File `src/components/ThemeButton.js`

Component hiển thị nút chuyển đổi.

    // src/components/ThemeButton.js
    import React from 'react';
    import { ToggleButton } from '../styles/StyleElements';
    
    // Nhận trạng thái hiện tại và hàm xử lý thông qua Destructuring props
    const ThemeButton = ({ isDarkMode, onToggle }) => {
    
      // Sử dụng Conditional Rendering (Ternary) để thay đổi nội dung nút
      const buttonText = isDarkMode ? '🌞 Chuyển sang Sáng' : '🌙 Chuyển sang Tối';
    
      return (
        <ToggleButton
          isDarkMode={isDarkMode} // Prop động cho Styled Component
          onClick={onToggle} // Gắn Event Handler
        >
          {buttonText}
        </ToggleButton>
      );
    };
    
    export default ThemeButton;
    

#### C. Component Con: `src/components/ContentArea.js`

Component hiển thị nội dung mẫu.

    // src/components/ContentArea.js
    import React from 'react';
    import { Title } from '../styles/StyleElements';
    
    const ContentArea = ({ isDarkMode }) => (
      <>
        <Title>
          {/* Conditional Rendering để hiển thị tiêu đề */}
          {isDarkMode ? "Chế độ Tối (Dark Mode)" : "Chế độ Sáng (Light Mode)"}
        </Title>
    
        <p>
          Đây là nội dung thử nghiệm của ứng dụng.
        </p>
    
        {/* Conditional Rendering: Chỉ hiển thị thẻ p này nếu ở Dark Mode */}
        {isDarkMode && (
            <p style={{ fontStyle: 'italic' }}>
              {/* Toán tử Logical AND (&&) được sử dụng cho Conditional Rendering */}
              Màu nền tối giúp mắt bạn dễ chịu hơn.
            </p>
        )}
      </>
    );
    
    export default ContentArea;
    

#### D. Component Chính: `src/App.js`

Component này quản lý trạng thái boolean bằng `useState` và tổ chức các Component con.

    // src/App.js
    import React, { useState } from 'react'; // Import useState hook
    import { Container } from './styles/StyleElements';
    import ThemeButton from './components/ThemeButton';
    import ContentArea from './components/ContentArea';
    
    // Không cần GlobalStyle trong ví dụ này vì Container đã bao trọn styling
    // import { GlobalStyle } from './styles/GlobalStyles';
    
    export default function App() {
    
      // State quản lý chế độ chủ đề (Boolean: true = Dark, false = Light)
      const [isDarkMode, setIsDarkMode] = useState(false);
    
      // Hàm xử lý khi người dùng click nút
      const handleToggleTheme = () => {
        // Cập nhật state bằng giá trị mới, đảo ngược giá trị hiện tại
        setIsDarkMode(!isDarkMode); //
    
        // Lưu ý: Đối với state boolean đơn giản, ta không cần Functional Update
      };
    
      return (
        // Sử dụng Fragment (<>...</>)
        <>
          {/* Container nhận state isDarkMode để thay đổi styling */}
          <Container isDarkMode={isDarkMode}>
    
            {/* Component hiển thị nội dung */}
            <ContentArea isDarkMode={isDarkMode} />
    
            {/* Component nút nhận hàm xử lý và trạng thái qua Props */}
            <ThemeButton
              isDarkMode={isDarkMode}
              onToggle={handleToggleTheme}
            />
    
          </Container>
        </>
      );
    }