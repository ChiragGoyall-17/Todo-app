import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./TodoList.css"

export default function TodoList() {
    let [todos, setTodos] = useState([{ task: "sample-task", id: uuidv4() }]);
    let [newTodo, setNewTodo] = useState("");

    let addNewTodo = () => {
        setTodos((prevTodos) => {
            return [...prevTodos, { task: newTodo, id: uuidv4() , isDone : false}];
        });
        setNewTodo("");
    }

    let updateTodoValue = (event) => {
        setNewTodo(event.target.value);
    }

    let deleteTodo = (id) => {
        setTodos((prevTodos) =>todos.filter((prevTodos) => prevTodos.id != id));
    }

    let isDoneAll = () => {
        setTodos( (prevTodos) => 
            prevTodos.map((todo) => {
        return {
            ...todo,
            isDone : true 
        };
       })
    );
    }

    let toggleDone = (id) => {
        setTodos( (prevTodos) => 
            prevTodos.map((todo) => 
                todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
     )
        );
    };
       

    return (
        <div className="todo-container">
        <div className="todo-box">
            <h2>Todo List</h2>
            <div className="input-group">
                <input 
                    className="todo-input "
                    placeholder="Add a new task"
                    value={newTodo}
                    onChange={updateTodoValue}
                />
            <br />
            <br />
            <button className="add-btn" onClick={addNewTodo}>Add</button>
                </div>
            <br />
            <br />
            <br />

            <hr />
            <h4>Task Todo</h4>
            <ul className="todo-list">
                    {todos.map((todo) => (
                        <li key={todo.id} className="todo-item">
                            <span style={todo.isDone ? {textDecorationLine : "line-through"}: {}}>{todo.task}</span>
                            &nbsp;
                            <span className="btn-group">
                                <button className="toggle-btn" onClick={() => toggleDone(todo.id)}>
                                    {todo.isDone ? "↩️" : "✔"}
                                </button>
                                &nbsp; 
                                <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>✖</button>
                            </span>
                        </li>
                    ))}
                </ul>
                <button className="mark-all-btn" onClick={isDoneAll}>Mark All as Done</button>
            </div>
        </div>
             
    );
}