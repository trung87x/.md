Tương tự như lần trước, tôi đã thêm `useEffect` và `useRef` để triển khai logic thời gian thực (`setInterval/clearInterval`) một cách chính xác, đảm bảo đồng hồ bấm giờ hoạt động như mong đợi.

Bạn chỉ cần sao chép toàn bộ mã này vào file `App.jsx` trong dự án của mình.

---

## 💻 File Gộp Chung: `App.jsx` (Dùng `useEffect` và `useRef` để hoạt động)

JavaScript

    // ===============================================
    // FILE GỘP CHUNG: App.jsx
    // Chứa toàn bộ Logic, Component, và Styles cho Stopwatch Timer
    // ===============================================

    import React, { useState, useRef, useEffect } from 'react';
    import styled, { createGlobalStyle } from 'styled-components';

    // -----------------------------------------------
    // A. Global & Style Definitions (Styles)
    // -----------------------------------------------

    // Global Styles (src/styles/GlobalStyles.js)
    const GlobalStyle = createGlobalStyle`
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

    // Style Elements (src/styles/StyleElements.js)
    const Container = styled.div`
        background-color: #222;
        padding: 40px;
        border-radius: 10px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        text-align: center;
    `;

    const StyledTimerDisplay = styled.h1`
        font-size: 6em;
        margin: 10px 0 30px 0;
        font-weight: 300;
        color: #4CAF50;
    `;

    const Button = styled.button`
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

    const ControlGroup = styled.div`
        margin-top: 20px;
    `;

    // -----------------------------------------------
    // B. Component Con: TimerDisplay (src/components/TimerDisplay.js)
    // -----------------------------------------------

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
            <StyledTimerDisplay>
                {formatTime(count)}
            </StyledTimerDisplay>
        );
    };

    // -----------------------------------------------
    // C. Component Con: TimerControls (src/components/TimerControls.js)
    // -----------------------------------------------

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

            <Button onClick={handleReset}>
                RESET
            </Button>
        </ControlGroup>
    );

    // -----------------------------------------------
    // D. Component Chính: App (src/App.js)
    // -----------------------------------------------

    const INITIAL_TIME = 0; // Đồng hồ bấm giờ bắt đầu từ 0

    export default function App() {
        // Khai báo state
        const [count, setCount] = useState(INITIAL_TIME);
        const [isRunning, setIsRunning] = useState(false);

        // Dùng useRef để giữ tham chiếu của interval qua các lần render
        const timerRef = useRef(null);

        // Logic để bắt đầu đếm
        const handleStart = () => {
            if (isRunning) return;
            setIsRunning(true);
        };

        // Logic để dừng đếm
        const handleStop = () => {
            setIsRunning(false);
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };

        // Logic để đặt lại
        const handleReset = () => {
            handleStop(); // Dừng nếu đang chạy
            setCount(INITIAL_TIME);
        };

        // **HOOK EFFECT:** Quản lý vòng đời của setInterval
        useEffect(() => {
            if (isRunning) {
                // Khởi tạo interval
                timerRef.current = setInterval(() => {
                    // Functional Update: Dùng prevCount + 1 để tăng bộ đếm an toàn
                    setCount(prevCount => prevCount + 1);
                }, 1000);
            }

            // Cleanup function: Đảm bảo clearInterval khi component unmount hoặc isRunning thay đổi
            return () => {
                if (timerRef.current) {
                    clearInterval(timerRef.current);
                }
            };
        }, [isRunning]); // Chỉ chạy lại khi trạng thái isRunning thay đổi

        return (
            <>
                <GlobalStyle />
                <Container>
                    <h1>Stopwatch Timer</h1>

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
