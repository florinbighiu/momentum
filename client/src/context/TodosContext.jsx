/* eslint-disable react/prop-types */
import { createContext, useState,  } from 'react';

const TodosContext = createContext({ todos: [], setTodos: () => { } });

export const TodosProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);

    const addTodo = (newTodo) => {
        setTodos([...todos, newTodo]);
    };

    return (
        <TodosContext.Provider value={{ todos, addTodo }}>
            {children}
        </TodosContext.Provider>
    );
};
