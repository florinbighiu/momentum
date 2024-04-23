import { useQuery } from 'react-query';
import { fetchTodos } from '../api/fetchTodos';
import { useGetUserId } from '../utils/getUserId';
import { useGetUserOrgId } from '../utils/getUserOrgId';
import { handleMarkComplete } from '../api/markAsCompleted';

const TodosList = () => {
    const userId = useGetUserId();
    const organizationId = useGetUserOrgId();

    const { isLoading, error, data } = useQuery(
        ['todos', userId, organizationId], 
        () => fetchTodos(userId, organizationId))

    if (isLoading) return <p>Loading todos...</p>;

    if (error) return <p>Error: {error.message}</p>;

    return (
        <ul className="list-none p-0">
            {data.map((todo) => (
                <li key={todo.id} className={`flex items-center justify-between p-2 mb-2 border border-gray-200 rounded-md shadow-sm ${todo.completed ? "line-through decoration-solid decoration-gray-400" : ""}`}>
                    <div className="flex items-center">
                        {todo.completed && (
                            <span className="mr-2 text-gray-400 line-through">
                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414-1.414L14.293 4.586a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </span>
                        )}
                        <span className="text-base font-medium">{todo.name}</span>
                    </div>
                    <button
                        className="bg-slate-200 p-2 px-4 rounded-full"
                        onClick={() => handleMarkComplete(todo.id)}
                    >
                        Complete
                    </button>
                    <div>
                            <span className="text-gray-500 text-sm">{todo.description}</span>
                    </div>
                    <div>
                        {todo.description && (
                            <span className="text-gray-500 text-sm">{todo.dueDate}</span>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    );

};

export default TodosList;
