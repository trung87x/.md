Tuyệt vời! Dự án **08-To-Do-List** (Danh sách việc cần làm) là nơi lý tưởng để củng cố các kỹ thuật cốt lõi của React, đặc biệt là cách xử lý trạng thái phức tạp (mảng các đối tượng) và tương tác với sự kiện.

Dưới đây là cấu trúc dự án và mã nguồn được thiết kế để áp dụng các nguyên tắc từ các nguồn tài liệu của bạn, bao gồm `useState`, `Rendering Lists`, `Keys`, `Destructuring props`, và `Event Listeners`.

### 1\. Cấu trúc Thư mục Dự án

Chúng ta sẽ tiếp tục sử dụng cấu trúc đã thống nhất:

    /to-do-list-app
    |-- /src
    |   |-- /components
    |   |   |-- TodoItem.js          // Component hiển thị từng mục (item)
    |   |   |-- TodoForm.js          // Component form thêm mục mới
    |   |   |-- TodoList.js          // Component hiển thị danh sách các mục
    |   |
    |   |-- /styles
    |   |   |-- GlobalStyles.js
    |   |   |-- StyleElements.js     // Các Styled Component chung
    |   |
    |   |-- App.js                   // Component Chính (Quản lý State)
    |
    |-- index.js

### 2\. Mã Nguồn Chi Tiết

#### A. File `src/styles/GlobalStyles.js`

    // src/styles/GlobalStyles.js
    import { createGlobalStyle } from 'styled-components';

    export const GlobalStyle = createGlobalStyle`
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
    `;

#### B. File `src/styles/StyleElements.js`

    // src/styles/StyleElements.js
    import styled from 'styled-components';

    export const Container = styled.div`
      background-color: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 500px;
    `;

    export const Input = styled.input`
      width: calc(100% - 70px);
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-right: 10px;
      font-size: 16px;
    `;

    export const Button = styled.button`
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

    export const ListItem = styled.li`
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #eee;

      /* Styling động dựa trên props 'isCompleted' */
      text-decoration: ${({ isCompleted }) => (isCompleted ? 'line-through' : 'none')};
      color: ${({ isCompleted }) => (isCompleted ? '#aaa' : '#333')};
    `;

    export const DeleteButton = styled(Button)`
      background-color: #dc3545;
      padding: 5px 10px;
      font-size: 12px;
      margin-left: 10px;
    `;

#### C. Component Con: `src/components/TodoForm.js`

Component này quản lý form nhập liệu để thêm mục mới.

    // src/components/TodoForm.js
    import React, { useState } from 'react'; // Sử dụng useState
    import { Input, Button } from '../styles/StyleElements';

    const TodoForm = ({ addTodo }) => {
      // State quản lý giá trị của input
      const [inputValue, setInputValue] = useState(''); //

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

    export default TodoForm;

#### D. Component Con: `src/components/TodoItem.js`

Component này hiển thị một mục công việc duy nhất và xử lý các sự kiện tương tác.

    // src/components/TodoItem.js
    import React from 'react';
    import { ListItem, DeleteButton } from '../styles/StyleElements';

    // Sử dụng Destructuring props để lấy id, title, completed, và handlers
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

    export default TodoItem;

#### E. Component Con: `src/components/TodoList.js`

Component này chứa logic để lặp (map) qua danh sách công việc.

    // src/components/TodoList.js
    import React from 'react';
    import TodoItem from './TodoItem';

    const TodoList = ({ todos, toggleComplete, deleteTodo }) => {

      // Lấy ra logic khỏi JSX để code sạch sẽ hơn
      const showList = todos && todos.length > 0;

      return (
        <ul>
          {/* Conditional Rendering: Chỉ hiển thị nếu có mục trong danh sách */}
          {showList ? (
            // Rendering Lists: Sử dụng .map() để tạo JSX từ mảng JS
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

    export default TodoList;

#### F. Component Chính: `src/App.js`

Component này quản lý trạng thái chính (mảng công việc) và định nghĩa các hàm xử lý logic.

    // src/App.js
    import React, { useState } from 'react';
    import { GlobalStyle } from './styles/GlobalStyles';
    import { Container } from './styles/StyleElements';
    import TodoForm from './components/TodoForm';
    import TodoList from './components/TodoList';

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

        // Cập nhật State: Tạo mảng mới bằng cách sử dụng spread syntax
        setTodos([...todos, newTodo]);
        setNextId(prevId => prevId + 1); // Functional Update
      };

      // Xử lý chuyển đổi trạng thái hoàn thành
      const toggleComplete = (id) => {
        setTodos(
          todos.map(todo => {
            if (todo.id === id) {
              // Sử dụng Spread Syntax để cập nhật thuộc tính 'completed' bên trong object
              return { ...todo, completed: !todo.completed };
            }
            return todo;
          })
        );
      };

      // Xử lý xóa mục
      const deleteTodo = (id) => {
        // Lọc ra các mục có ID khác với ID cần xóa
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
