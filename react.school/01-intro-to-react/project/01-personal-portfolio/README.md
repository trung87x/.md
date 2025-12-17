Đây là một yêu cầu rất hợp lý và là bước tiếp theo quan trọng khi xây dựng một ứng dụng React chuyên nghiệp: **Tổ chức mã nguồn thành các file và thư mục riêng biệt**.

Việc chia nhỏ Component giúp dự án dễ bảo trì, dễ đọc, và tối ưu hóa việc tái sử dụng code.

Dưới đây là cấu trúc thư mục dự án đề xuất, dựa trên các nguyên tắc về Functional Components, Props, và Styled Components:

### 1\. Cấu trúc Thư mục Dự án

Bạn nên sử dụng cấu trúc tập trung các component vào thư mục `src/components`, và tách biệt phần styling nếu cần.

    /my-portfolio-app
    |-- /node_modules
    |-- /public
    |-- /src
    |   |-- /components
    |   |   |-- Header.js        // Component Header
    |   |   |-- BioSection.js    // Component Giới thiệu bản thân
    |   |   |-- SkillsList.js    // Component Danh sách kỹ năng
    |   |   |-- Footer.js        // Component Footer
    |   |   |-- index.js         // File để export tất cả components (tùy chọn)
    |   |
    |   |-- /data                // Nơi lưu trữ dữ liệu tĩnh (tùy chọn)
    |   |   |-- portfolioData.js
    |   |
    |   |-- /styles              // Nơi lưu trữ các Styled Component tái sử dụng
    |   |   |-- GlobalStyles.js
    |   |   |-- StyleElements.js // Container, SkillTag, v.v.
    |   |
    |   |-- App.js               // Component chính (Tổ chức)
    |   |-- index.js             // Điểm vào (Root file)
    |
    |-- package.json
    

### 2\. Phân Tách Mã Nguồn vào các File

Dưới đây là cách bạn sẽ phân tách mã nguồn trước đó vào các file riêng biệt:

#### A. File `src/data/portfolioData.js` (Dữ liệu tĩnh)

Việc tách dữ liệu tĩnh ra khỏi component giúp dễ dàng cập nhật nội dung.

    // src/data/portfolioData.js
    
    export const PORTFOLIO_DATA = {
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
    

#### B. File `src/styles/StyleElements.js` (Styling cơ bản)

Tạo và export các Styled Component để tái sử dụng.

    // src/styles/StyleElements.js
    import styled from 'styled-components';
    
    export const Container = styled.div`
      max-width: 900px;
      margin: 30px auto;
      padding: 20px;
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    `;
    
    export const SkillTag = styled.span`
      /* Logic styling động sử dụng destructuring props */
      background-color: ${({ level }) =>
        level === 'primary' ? '#4CAF50' : '#007bff'};
      color: white;
      display: inline-block;
      padding: 8px 15px;
      margin-right: 10px;
      margin-bottom: 10px;
      border-radius: 20px;
      font-weight: bold;
    `;
    

#### C. File `src/styles/GlobalStyles.js` (Global Styling)

    // src/styles/GlobalStyles.js
    import { createGlobalStyle } from 'styled-components';
    
    export const GlobalStyle = createGlobalStyle`
       body {
        background-color: #f8f8f8;
        color: #333;
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
       }
    `;
    

#### D. Component Con: `src/components/Header.js`

    // src/components/Header.js
    import React from 'react';
    
    // Sử dụng Destructuring props để lấy giá trị name và title
    const Header = ({ name, title }) => (
      <header>
        <h1>{name}</h1>
        <p>— {title} —</p>
        <hr />
      </header>
    );
    
    export default Header;
    

#### E. Component Con: `src/components/SkillsList.js`

Component này minh họa việc **Rendering Lists** và sử dụng **Keys**.

    // src/components/SkillsList.js
    import React from 'react';
    import { SkillTag } from '../styles/StyleElements'; // Import Styled Component
    
    const SkillsList = ({ skills }) => {
        // Logic được trừu tượng hóa ra khỏi JSX
        const shouldShowMessage = skills && skills.length > 0;
    
        return (
            <section>
                <h2>⚙️ Kỹ năng chuyên môn</h2>
                <div style={{ padding: '10px 0' }}>
                    {/* Rendering Lists bằng .map() */}
                    {skills.map(skill => (
                        <SkillTag
                            key={skill.id} // Bắt buộc
                            level={skill.level} // Props cho Styled Component
                        >
                            {skill.name}
                        </SkillTag>
                    ))}
                </div>
    
                {/* Conditional Rendering */}
                {shouldShowMessage &&
                  <p style={{marginTop: '20px', fontStyle: 'italic'}}>
                    Hãy liên hệ để thảo luận về các dự án!
                  </p>
                }
            </section>
        );
    };
    
    export default SkillsList;
    

#### F. Component Con: `src/components/BioSection.js`

    // src/components/BioSection.js
    import React from 'react';
    
    const BioSection = ({ bio }) => (
      <section>
        <h2>👨‍💻 Giới thiệu</h2>
        <p>{bio}</p>
      </section>
    );
    
    export default BioSection;
    

#### G. Component Con: `src/components/Footer.js`

    // src/components/Footer.js
    import React from 'react';
    
    const Footer = ({ name }) => (
      <footer style={{ textAlign: 'center', marginTop: '30px', color: '#aaa' }}>
        <p>© {new Date().getFullYear()} {name}. Built with React.</p>
      </footer>
    );
    
    export default Footer;
    

#### H. Component Chính: `src/App.js` (Tổ chức Component)

Component này chỉ làm nhiệm vụ nhập khẩu dữ liệu, styling, và tổ chức các Component con.

    // src/App.js
    import React from 'react';
    import { PORTFOLIO_DATA } from './data/portfolioData'; // Dữ liệu
    import { GlobalStyle } from './styles/GlobalStyles'; // Styling
    import { Container } from './styles/StyleElements'; // Styling
    import Header from './components/Header';
    import BioSection from './components/BioSection';
    import SkillsList from './components/SkillsList';
    import Footer from './components/Footer';
    
    export default function App() {
    
      // Destructuring dữ liệu
      const { name, title, bio, skills } = PORTFOLIO_DATA;
    
      return (
        // Sử dụng Fragment
        <>
          <GlobalStyle />
    
          <Container>
    
            {/* Tổ chức Component con và truyền Props */}
            <Header name={name} title={title} />
            <BioSection bio={bio} />
            <SkillsList skills={skills} />
    
          </Container>
    
          <Footer name={name} />
        </>
      );
    }
    

Với cấu trúc này, bạn đã áp dụng thành công nguyên tắc chia nhỏ ứng dụng React thành các mảnh **Functional Component** có thể tái sử dụng.