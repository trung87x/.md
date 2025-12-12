Đây là mã nguồn đầy đủ cho dự án **04-Countdown-Timer** (Đồng hồ đếm ngược), được tổ chức theo cấu trúc thư mục chi tiết mà chúng ta đã thống nhất.

Dự án này tập trung vào việc quản lý trạng thái số (`useState`), cập nhật trạng thái an toàn (Functional Update), và sử dụng Conditional Rendering để quản lý các nút điều khiển.

_**Lưu ý quan trọng:**_ _Module `01_Intro_to_React` không bao gồm hook `useEffect`, hook này cần thiết để chạy đồng hồ đếm ngược theo thời gian thực (ví dụ: dùng `setInterval`). Trong mã này, tôi sẽ định nghĩa logic của hàm `handleStart` và `handleStop` nhưng sẽ dùng **comment** để chỉ ra nơi cần dùng `setInterval/clearInterval`, vì đây là kiến thức nằm ngoài phạm vi tài liệu hiện tại._

### 1\. Cấu trúc Thư mục Dự án

    /countdown-timer
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

Component này chỉ có nhiệm vụ hiển thị số đếm hiện tại.

    // src/components/TimerDisplay.js
    import React from 'react';
    import { TimerDisplay as StyledDisplay } from '../styles/StyleElements'; // Đổi tên import

    // Component nhận 'count' qua Destructuring props
    const TimerDisplay = ({ count }) => {
      // Định dạng số giây thành MM:SS
      const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        // Đảm bảo luôn hiển thị hai chữ số (05, 10)
        const displayMinutes = String(minutes).padStart(2, '0');
        const displaySeconds = String(seconds).padStart(2, '0');

        return `${displayMinutes}:${displaySeconds}`;
      };

      return (
        <StyledDisplay>
          {formatTime(count)}
        </StyledDisplay>
      );
    };

    export default TimerDisplay;

#### D. Component Con: `src/components/TimerControls.js`

Component này quản lý các nút bấm và sử dụng **Conditional Rendering** để thay đổi nút Start/Stop.

    // src/components/TimerControls.js
    import React from 'react';
    import { ControlGroup, Button } from '../styles/StyleElements';

    const TimerControls = ({ isRunning, handleStart, handleStop, handleReset }) => (
      <ControlGroup>
        {/* Conditional Rendering: Nếu isRunning là TRUE, hiển thị Stop. Ngược lại, hiển thị Start. */}
        {isRunning ? (
          <Button isPrimary={false} onClick={handleStop}>
            STOP
          </Button>
        ) : (
          <Button isPrimary={true} onClick={handleStart}>
            START
          </Button>
        )}

        {/* Nút Reset luôn hiển thị */}
        <Button onClick={handleReset}>
          RESET
        </Button>
      </ControlGroup>
    );

    export default TimerControls;

#### E. Component Chính: `src/App.js`

Component này quản lý trạng thái (`useState`) và logic chính của đồng hồ.

    // src/App.js
    import React, { useState } from 'react';
    import { GlobalStyle } from './styles/GlobalStyles';
    import { Container } from './styles/StyleElements';
    import TimerDisplay from './components/TimerDisplay';
    import TimerControls from './components/TimerControls';

    const INITIAL_TIME = 300; // 5 phút

    export default function App() {
      // Khai báo state cho bộ đếm và trạng thái chạy
      const [count, setCount] = useState(INITIAL_TIME);
      const [isRunning, setIsRunning] = useState(false);

      // Biến giữ tham chiếu của interval (thường dùng useRef, nhưng ta dùng biến let ngoài scope để đơn giản hóa)
      let timerRef = React.useRef(null);

      const handleStart = () => {
        if (isRunning) return;
        setIsRunning(true);

        // *KHU VỰC CẦN SỬ DỤNG HOOK EFFECT/SETINTERVAL (Ngoài phạm vi Module 01)*
        // Đây là nơi bạn sẽ thiết lập setInterval.
        // Trong thực tế, hàm này sẽ được gọi bên trong useEffect.
        /*
        timerRef.current = setInterval(() => {
          // Functional Update: Sử dụng prevState để đảm bảo tính chính xác
          setCount(prevCount => {
            if (prevCount <= 0) {
              clearInterval(timerRef.current);
              setIsRunning(false);
              return 0;
            }
            return prevCount - 1;
          });
        }, 1000);
        */
      };

      const handleStop = () => {
        setIsRunning(false);
        // *KHU VỰC CẦN CLEARINTERVAL*
        // clearInterval(timerRef.current);
      };

      const handleReset = () => {
        handleStop();
        setCount(INITIAL_TIME); // Đặt lại giá trị ban đầu
      };

      return (
        // Sử dụng Fragment
        <>
          <GlobalStyle />
          <Container>
            <h1>Countdown Timer</h1>

            {/* Component hiển thị số */}
            <TimerDisplay count={count} />

            {/* Component điều khiển nhận các hàm xử lý và trạng thái qua Props */}
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
