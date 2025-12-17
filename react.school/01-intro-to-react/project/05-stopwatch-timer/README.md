Đây là mã nguồn đầy đủ cho dự án **05-Stopwatch-Timer** (Đồng hồ bấm giờ), được tổ chức theo cấu trúc thư mục đã áp dụng cho dự án trước.

Đồng hồ bấm giờ yêu cầu các kỹ thuật tương tự như đồng hồ đếm ngược, nhưng tập trung vào việc **tăng dần** trạng thái số (`count`) và quản lý logic **Start/Stop** thông qua `useState`.

_**Lưu ý:**_ _Cũng như dự án trước, việc thực thi logic thời gian thực (sử dụng `setInterval/clearInterval`) nằm ngoài phạm vi kiến thức cơ bản của Module `01_Intro_to_React`. Mã này sẽ thiết lập cấu trúc Component, State, và Event Handlers một cách chính xác, nhưng logic thời gian thực sẽ được đặt trong comment._

### 1\. Cấu trúc Thư mục Dự án

    /stopwatch-timer
    |-- /src
    |   |-- /components
    |   |   |-- TimerDisplay.js      // Hiển thị số đếm
    |   |   |-- TimerControls.js     // Các nút Start/Stop/Reset
    |   |
    |   |-- /styles
    |   |   |-- GlobalStyles.js
    |   |   |-- StyleElements.js     // Các Styled Component chung
    |   |
    |   |-- App.js                   // Component Chính (Quản lý State và Logic)
    |
    |-- index.js

### 2\. Mã Nguồn Chi Tiết

#### A. File `src/styles/GlobalStyles.js`

(Không thay đổi so với dự án trước để giữ giao diện thống nhất)

    // src/styles/GlobalStyles.js
    import { createGlobalStyle } from 'styled-components';

    export const GlobalStyle = createGlobalStyle`
       body {
        background-color: #333;
        color: white;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        margin: 0;
       }
    `;

#### B. File `src/styles/StyleElements.js`

(Sử dụng Styled Components để định nghĩa các thành phần UI)

    // src/styles/StyleElements.js
    import styled from 'styled-components';

    export const Container = styled.div`
      background-color: #222;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
      text-align: center;
    `;

    export const TimerDisplay = styled.h1`
      font-size: 6em;
      margin: 10px 0 30px 0;
      font-weight: 300;
      color: #4CAF50;
    `;

    export const Button = styled.button`
      /* Styling động dựa trên props (isPrimary) */
      background-color: ${({ isPrimary }) => (isPrimary ? '#4CAF50' : '#f44336')};
      color: white;
      border: none;
      padding: 10px 20px;
      margin: 0 10px;
      border-radius: 5px;
      font-size: 1em;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        opacity: 0.9;
      }
    `;

    export const ControlGroup = styled.div`
      margin-top: 20px;
    `;

#### C. Component Con: `src/components/TimerDisplay.js`

(Nhận `count` qua props và định dạng thời gian)

    // src/components/TimerDisplay.js
    import React from 'react';
    import { TimerDisplay as StyledDisplay } from '../styles/StyleElements';

    const TimerDisplay = ({ count }) => {
      // Định dạng số giây thành MM:SS
      const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        const displayMinutes = String(minutes).padStart(2, '0');
        const displaySeconds = String(seconds).padStart(2, '0');

        return `${displayMinutes}:${displaySeconds}`;
      };

      return (
        <StyledDisplay>
          {/* JavaScript expression được nhúng vào JSX */}
          {formatTime(count)}
        </StyledDisplay>
      );
    };

    export default TimerDisplay;

#### D. Component Con: `src/components/TimerControls.js`

(Sử dụng Conditional Rendering để hiển thị nút phù hợp)

    // src/components/TimerControls.js
    import React from 'react';
    import { ControlGroup, Button } from '../styles/StyleElements';

    const TimerControls = ({ isRunning, handleStart, handleStop, handleReset }) => (
      <ControlGroup>
        {/* Conditional Rendering dựa trên isRunning */}
        {isRunning ? (
          <Button isPrimary={false} onClick={handleStop}>
            STOP
          </Button>
        ) : (
          <Button isPrimary={true} onClick={handleStart}>
            START
          </Button>
        )}

        {/* Gắn Event handler (onClick) là hàm JavaScript */}
        <Button onClick={handleReset}>
          RESET
        </Button>
      </ControlGroup>
    );

    export default TimerControls;

#### E. Component Chính: `src/App.js`

(Quản lý trạng thái và định nghĩa logic)

    // src/App.js
    import React, { useState } from 'react'; // Import useState hook
    import { GlobalStyle } from './styles/GlobalStyles';
    import { Container } from './styles/StyleElements';
    import TimerDisplay from './components/TimerDisplay';
    import TimerControls from './components/TimerControls';

    const INITIAL_TIME = 0; // Bắt đầu từ 0 cho đồng hồ bấm giờ

    export default function App() {
      // Khai báo state
      const [count, setCount] = useState(INITIAL_TIME); //
      const [isRunning, setIsRunning] = useState(false);

      // Sử dụng useRef để giữ tham chiếu interval (hoặc biến let tạm thời)
      let timerRef = React.useRef(null);

      const handleStart = () => {
        if (isRunning) return;
        setIsRunning(true);

        // *KHU VỰC LOGIC CHẠY SETINTERVAL (Nằm ngoài phạm vi Module 01)*
        /*
        timerRef.current = setInterval(() => {
          // Functional Update: Dùng prevCount + 1 để tăng bộ đếm an toàn
          setCount(prevCount => prevCount + 1);
        }, 1000);
        */
      };

      const handleStop = () => {
        setIsRunning(false);
        // clearInterval(timerRef.current);
      };

      const handleReset = () => {
        handleStop();
        setCount(INITIAL_TIME); // Đặt lại count về 0
      };

      return (
        // Sử dụng Fragment (<>...</>)
        <>
          <GlobalStyle />
          <Container>
            <h1>Stopwatch Timer</h1>

            {/* Truyền state xuống component con qua props */}
            <TimerDisplay count={count} />

            <TimerControls
              isRunning={isRunning}
              handleStart={handleStart}
              handleStop={handleStop}
              handleReset={handleReset}
            />
          </Container>
        </>
      );
    }
