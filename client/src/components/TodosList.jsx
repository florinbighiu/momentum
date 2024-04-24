import { useState, useEffect } from 'react';
import { fetchTodos } from '../api/fetchTodos'
import { useGetUserId } from '../hooks/getUserId';
import { useGetUserOrgId } from '../hooks/getUserOrgId';
import TodoForm from './TodoForm';

const TodosList = () => {
    const userId = useGetUserId();
    const organizationId = useGetUserOrgId();
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, [userId, organizationId]);


    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetchTodos(userId, organizationId);
            setTodos(response);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleMarkComplete = async (todoId) => {
        try {
            await handleMarkComplete(todoId);
            setTodos(
                todos.map((todo) => (todo.id === todoId ? { ...todo, completed: true } : todo))
            );
        } catch (error) {
            console.error('Error marking todo complete:', error);
        }
    };

    if (isLoading) return <p>Loading todos...</p>;

    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="flex flex-col gap-8 justify-start items-center w-full m-3">
            <TodoForm handleTodoCreate={fetchData} organizationId={organizationId} userId={userId} />
            <div className='w-full h-full m-12'>
                <ul className="grid grid-cols-3 gap-3 overflow-hidden w-2/4">
                    {todos.map((todo) => (
                        <li
                            key={todo.id}
                            className={`flex items-center justify-between p-2 mb-2 border border-gray-200 hover:translate-x-1 cursor-pointer rounded-md shadow-sm ${todo.completed ? "line-through decoration-solid decoration-gray-400" : ""
                                }`}
                        >
                            <div className="flex items-center">
                                {todo.completed && (
                                    <span className="mr-2 text-gray-400 line-through">
                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414-1.414L14.293 4.586a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                )}
                                <span className="text-base font-medium">{todo.name}</span>
                            </div>
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => handleMarkComplete(todo.id)}
                                className="bg-slate-200 p-2 px-4 rounded-full"
                            />
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
};

export default TodosList;
