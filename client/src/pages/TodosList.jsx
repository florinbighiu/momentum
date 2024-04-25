import { useState, useEffect } from 'react';
import { fetchTodos } from '../api/fetchTasks'
import { useGetUserId } from '../hooks/getUserId';
import { useGetUserOrgId } from '../hooks/getUserOrgId';
import TodoForm from '../components/TodoForm';
import { motion } from 'framer-motion';
import { fadeOut, pageTransition, fade, fadeIn } from "../utils/framer";
import TodoCard from '../components/TaskCard';
import Loading from '../components/Loading';
import { deleteTask } from '../api/deleteTask';

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

    const handleTodoDelete = async (todoId) => {
        setIsLoading(true);
        setError(null);

        try {
            await deleteTask(todoId);
            fetchData();
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }


    if (isLoading) return <Loading />;

    if (error) return <p>Error: {error.message}</p>;

    return (
        <motion.div
            initial={fade}
            animate={fadeIn}
            exit={fadeOut}
            transition={pageTransition}
            className="w-full h-screen"
        >
            <div className="flex flex-col gap-8 justify-center items-center w-full h-full p-5">
                <TodoForm handleTodoCreate={fetchData} organizationId={organizationId} userId={userId} />
                <div className='grid grid-cols-3 gap-4 w-full h-full overflow-y-auto'>
                    {todos.map(todo =>
                        <TodoCard key={todo.id} todo={todo} handleTodoDelete={() => handleTodoDelete(todo.id)} />
                    )
                    }
                </div>
            </div>
        </motion.div>
    );
};

export default TodosList;
