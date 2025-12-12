Đây là một ví dụ đầy đủ về cấu trúc mã nguồn của một Trang giới thiệu bản thân (Personal Portfolio) đơn giản, được xây dựng dựa trên các nguyên tắc và kỹ thuật React hiện đại mà chúng ta đã thảo luận (Functional Components, Destructuring, Lists, Keys, và Styled Components).

Mã này bao gồm cả phần dữ liệu tĩnh, các Component con, và cách áp dụng styling động.

* * *

### File: `Portfolio.js` (hoặc `App.js`)

    import React from 'react';
    // Import thư viện Styling được khuyến nghị
    import styled, { createGlobalStyle } from 'styled-components';
    
    // --- DỮ LIỆU TĨNH ---
    const PORTFOLIO_DATA = {
      name: "Nguyễn Văn A",
      title: "React Developer & UI Designer",
      bio: "Chào mừng! Tôi là Nguyễn Văn A, đam mê xây dựng giao diện người dùng hiệu quả và có tính thẩm mỹ cao bằng ReactJS.",
      skills: [
        { id: 101, name: "ReactJS", level: "primary" },
        { id: 102, name: "JavaScript (ES6+)", level: "primary" },
        { id: 103, name: "Styled Components", level: "secondary" },
        { id: 104, name: "HTML & CSS", level: "secondary" },
      ]
    };
    
    // --- STYLING (STYLED COMPONENTS) ---
    
    // 1. Global Style (Áp dụng cho Body)
    const GlobalStyle = createGlobalStyle`
       body {
        background-color: #f8f8f8;
        color: #333;
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
       }
    `;
    
    // 2. Container chính (Giới hạn chiều rộng trang)
    const Container = styled.div`
      max-width: 900px;
      margin: 30px auto;
      padding: 20px;
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    `;
    
    // 3. Component Tag cho kỹ năng (Sử dụng Styling Động)
    const SkillTag = styled.span`
      display: inline-block;
      padding: 8px 15px;
      margin-right: 10px;
      margin-bottom: 10px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: bold;
    
      /* Sử dụng Props để thay đổi màu sắc động */
      background-color: ${({ level }) =>
        level === 'primary' ? '#4CAF50' : '#007bff'};
      color: white;
    
      &:hover {
        opacity: 0.9;
        cursor: pointer;
      }
    `;
    
    // --- COMPONENTS (FUNCTIONAL COMPONENTS) ---
    
    // 4. Component Header (Sử dụng Destructuring Props)
    const Header = ({ name, title }) => (
      <header>
        <h1>{name}</h1>
        <p>— {title} —</p>
        <hr />
      </header>
    );
    
    // 5. Component SkillsList (Sử dụng Rendering Lists và Keys)
    const SkillsList = ({ skills }) => (
      <section>
        <h2>⚙️ Kỹ năng chuyên môn</h2>
        <div style={{ padding: '10px 0' }}>
          {/* Lặp qua mảng skills để render từng SkillTag */}
          {skills.map(skill => (
            <SkillTag
              key={skill.id} // Bắt buộc phải có key duy nhất
              level={skill.level} // Prop động cho Styled Component
            >
              {skill.name}
            </SkillTag>
          ))}
        </div>
      </section>
    );
    
    // 6. Component Footer (Component nhỏ, đơn giản)
    const Footer = () => (
      <footer style={{ textAlign: 'center', marginTop: '30px', color: '#aaa' }}>
        {/* JSX Comment */}
        <p>© {new Date().getFullYear()} {PORTFOLIO_DATA.name}. Built with React.</p>
      </footer>
    );
    
    
    // 7. Component chính (Orchestration)
    export default function App() {
    
      // Destructuring dữ liệu từ Object
      const { name, title, bio, skills } = PORTFOLIO_DATA;
    
      // Render toàn bộ cấu trúc
      return (
        <>
          {/* Áp dụng Global Style */}
          <GlobalStyle />
    
          <Container>
    
            {/* Truyền Props xuống Header */}
            <Header name={name} title={title} />
    
            <section>
              <h2>👨‍💻 Giới thiệu</h2>
              <p>{bio}</p>
            </section>
    
            {/* Truyền Props là một mảng dữ liệu xuống SkillsList */}
            <SkillsList skills={skills} />
    
            {/* Conditional Rendering (ví dụ) */}
            {skills.length > 0 &&
              <p style={{marginTop: '20px', fontStyle: 'italic'}}>
                Hãy liên hệ để thảo luận về các dự án!
              </p>
            }
    
          </Container>
    
          {/* Fragment cho phép Footer đứng ngang hàng với Container */}
          <Footer />
        </>
      );
    }
    

### Giải thích các Nguyên tắc đã áp dụng

1.  **Functional Components:** Toàn bộ giao diện được xây dựng bằng các hàm JavaScript độc lập (`Header`, `SkillsList`, `Footer`, `App`), tuân thủ quy tắc Functional Component.
2.  **Fragments:** Component `App` sử dụng `<>...</>` để trả về nhiều phần tử ngang hàng (`GlobalStyle`, `Container`, `Footer`) mà không thêm thẻ `div` thừa vào DOM.
3.  **Destructuring Props:** Component `Header` nhận dữ liệu bằng cách giải nén trực tiếp `{ name, title }`, giúp truy cập dữ liệu sạch sẽ hơn.
4.  **Rendering Lists & Keys:** Component `SkillsList` dùng `.map()` để lặp qua mảng `skills`. Mỗi `SkillTag` được gán một `key` duy nhất là `skill.id` để hỗ trợ React theo dõi các phần tử trong danh sách một cách chính xác.
5.  **Styled Components Động:** Component `SkillTag` sử dụng logic bên trong CSS (template literal) để đọc prop `level` và quyết định màu nền (`background-color`), minh họa cho việc truy cập Props từ Styled Components.
6.  **Conditional Rendering:** Dòng `{skills.length > 0 && <p>...</p>}` sử dụng toán tử **Logical AND** để chỉ hiển thị đoạn văn bản nếu mảng `skills` có dữ liệu.