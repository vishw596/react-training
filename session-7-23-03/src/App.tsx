// Task 1 — Add Task
// Input + button to append new tasks
// Use Date.now() for unique IDs

// Task 2 — Completed Toggle
// Checkbox per task
// Completed tasks show with text-decoration: line-through

// Task 3 — Show Completed
// Toggle to filter only completed tasks
// Implement with useMemo

// Task 4 — Clear All
// Button to remove all tasks
// Wrap its handler in useCallback

// Task 5 — Bonus: Group Tasks
// Group into Pending & Completed sections
// Each filtered via its own useMemo


import { useCallback, useMemo, useState, type ChangeEvent } from "react";
import TodoCard from "./components/TodoCard";
type TodoList = Todo[];
type Todo = {
    id: string;
    title: string;
    isCompleted: boolean;
};
export default function App() {
    const [input, setInput] = useState("");
    const [todos, setTodos] = useState<TodoList>([]);

    
    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }, []);

    
    const handleAddTodo = useCallback((title: string) => {
        if (title === "") return;
        setTodos((todos) => [{ id: crypto.randomUUID(), title, isCompleted: false }, ...todos]);
        setInput("");
    }, []);

    
    const handleTodoCompletion = useCallback((checked: boolean, id: string) => {
        console.log(checked, id);
        setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, isCompleted: checked } : todo)));
    }, []);

    const handleClearAll = useCallback(()=>{
        setTodos([])
    },[])

    const completedTaskList = useMemo(() => {
        console.log("function executed");
        return todos.filter(({ isCompleted }) => isCompleted);
    }, [todos]);

    
    const pendingTaskList = useMemo(() => {
        console.log("function executed");
        return todos.filter(({ isCompleted }) => !isCompleted);
    }, [todos]);
    
    
    return (
        <>
            <input type="text" value={input} onChange={handleChange} />
            <button
                onClick={() => {
                    handleAddTodo(input);
                }}>
                Add todo
            </button>
            <button onClick={handleClearAll}>Clear All</button>
            {pendingTaskList.length > 0 && (
                <>
                    <h2>Pending tasks</h2>
                    {pendingTaskList.map(({ id, ...todo }) => {
                        return (
                            <div key={id}>
                                <TodoCard {...todo} handleTodoCompletion={handleTodoCompletion} id={id} />
                            </div>
                        );
                    })}
                </>
            )}
            {completedTaskList.length > 0 && (
                <>
                    <h2>Completed tasks</h2>
                    {completedTaskList.map(({ id, ...todo }) => {
                        return (
                            <div key={id}>
                                <TodoCard {...todo} handleTodoCompletion={handleTodoCompletion} id={id} />
                            </div>
                        );
                    })}
                </>
            )}
        </>
    );
}
