Đây là một ví dụ tuyệt vời về cách quản lý state phức tạp (mảng đối tượng) bằng cách sử dụng các kỹ thuật như **Spread Syntax** và **`map`/`filter`** để đảm bảo tính bất biến của state.

Dưới đây là toàn bộ mã nguồn gộp:

---

## 💻 File Gộp Chung: `App.jsx` (To-Do List)

JavaScript

    // ===============================================
    // FILE GỘP CHUNG: App.jsx
    // Chứa toàn bộ Logic, Component, và Styles cho To-Do List
    // ===============================================

    import React, { useState } from 'react';
    import styled, { createGlobalStyle } from 'styled-components';

    // -----------------------------------------------
    // A. Global & Style Definitions
    // -----------------------------------------------

    // Global Styles (src/styles/GlobalStyles.js)
    const GlobalStyle = createGlobalStyle`
        body {
            background-color: #f4f4f4;
            color: #333;
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            min-height: 100vh;
            margin: 0;
            padding-top: 50px;
        }
        ul {
            list-style: none;
            padding: 0;
        }
    `;

    // Style Elements (src/styles/StyleElements.js)
    const Container = styled.div`
        background-color: white;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 500px;
    `;

    const Input = styled.input`
        width: calc(100% - 70px);
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-right: 10px;
        font-size: 16px;
    `;

    const Button = styled.button`
        background-color: #007bff;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
            background-color: #0056b3;
        }
    `;

    const ListItem = styled.li`
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid #eee;

        /* Styling động dựa trên props 'isCompleted' */
        text-decoration: ${({ isCompleted }) => (isCompleted ? 'line-through' : 'none')};
        color: ${({ isCompleted }) => (isCompleted ? '#aaa' : '#333')};
    `;

    const DeleteButton = styled(Button)`
        background-color: #dc3545;
        padding: 5px 10px;
        font-size: 12px;
        margin-left: 10px;
        &:hover {
            background-color: #bd2130;
        }
    `;


    // -----------------------------------------------
    // B. Component Con: TodoItem
    // -----------------------------------------------

    const TodoItem = ({ todo, toggleComplete, deleteTodo }) => {

        const { id, title, completed } = todo;

        return (
            <ListItem isCompleted={completed}>
                <span
                    onClick={() => toggleComplete(id)} // Event handler sử dụng Closure để truyền ID
                    style={{ cursor: 'pointer' }}
                >
                    {title}
                </span>

                <DeleteButton
                    onClick={() => deleteTodo(id)} // Event handler sử dụng Closure
                >
                    Xóa
                </DeleteButton>
            </ListItem>
        );
    };

    // -----------------------------------------------
    // C. Component Con: TodoList
    // -----------------------------------------------

    const TodoList = ({ todos, toggleComplete, deleteTodo }) => {

        const showList = todos && todos.length > 0;

        return (
            <ul>
                {/* Conditional Rendering */}
                {showList ? (
                    // Rendering Lists
                    todos.map(todo => (
                        <TodoItem
                            key={todo.id} // Bắt buộc phải có unique "key" prop
                            todo={todo}
                            toggleComplete={toggleComplete}
                            deleteTodo={deleteTodo}
                        />
                    ))
                ) : (
                    <p style={{ textAlign: 'center', marginTop: '30px', color: '#888' }}>
                        Tuyệt vời! Bạn không có việc gì cần làm.
                    </p>
                )}
            </ul>
        );
    };


    // -----------------------------------------------
    // D. Component Con: TodoForm
    // -----------------------------------------------

    const TodoForm = ({ addTodo }) => {
        // State quản lý giá trị của input
        const [inputValue, setInputValue] = useState('');

        const handleSubmit = (e) => {
            e.preventDefault(); // Ngăn chặn hành vi mặc định của form
            if (!inputValue.trim()) return; // Không cho phép thêm mục rỗng

            addTodo(inputValue.trim()); // Gọi hàm thêm mục từ App.js
            setInputValue(''); // Reset input
        };

        // Event handler để cập nhật state khi người dùng nhập
        const handleChange = (e) => {
            setInputValue(e.target.value);
        };

        return (
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <Input
                    type="text"
                    placeholder="Thêm việc cần làm..."
                    value={inputValue}
                    onChange={handleChange}
                />
                <Button type="submit">Thêm</Button>
            </form>
        );
    };


    // -----------------------------------------------
    // E. Component Chính: App (src/App.js)
    // -----------------------------------------------

    const initialTodos = [
        { id: 1, title: 'Học Hooks trong React', completed: true },
        { id: 2, title: 'Áp dụng Destructuring Props', completed: false },
        { id: 3, title: 'Thực hành List Keys', completed: false },
    ];

    export default function App() {
        // State là một mảng các object
        const [todos, setTodos] = useState(initialTodos);

        // State dùng để tạo ID duy nhất (tạm thời)
        const [nextId, setNextId] = useState(4);

        // Xử lý thêm mục mới
        const addTodo = (title) => {
            const newTodo = {
                id: nextId,
                title,
                completed: false,
            };

            // Cập nhật State Bất Biến (Immutable Update): Tạo mảng mới bằng cách sử dụng spread syntax
            setTodos([...todos, newTodo]);
            setNextId(prevId => prevId + 1); // Functional Update
        };

        // Xử lý chuyển đổi trạng thái hoàn thành
        const toggleComplete = (id) => {
            setTodos(
                todos.map(todo => {
                    if (todo.id === id) {
                        // Immutable Update: Trả về một object mới với thuộc tính 'completed' được đảo ngược
                        return { ...todo, completed: !todo.completed };
                    }
                    return todo;
                })
            );
        };

        // Xử lý xóa mục
        const deleteTodo = (id) => {
            // Immutable Update: Lọc ra các mục có ID khác với ID cần xóa
            setTodos(todos.filter(todo => todo.id !== id));
        };

        return (
            // Sử dụng Fragment
            <>
                <GlobalStyle />
                <Container>
                    <h1>Danh Sách Việc Cần Làm</h1>

                    {/* Component Form nhận hàm xử lý thông qua Props */}
                    <TodoForm addTodo={addTodo} />

                    {/* Component List nhận mảng dữ liệu và các hàm xử lý thông qua Props */}
                    <TodoList
                        todos={todos}
                        toggleComplete={toggleComplete}
                        deleteTodo={deleteTodo}
                    />
                </Container>
            </>
        );
    }
