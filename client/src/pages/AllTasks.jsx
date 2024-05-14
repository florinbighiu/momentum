import { useEffect, useState } from 'react';
import { useGetUserId } from '../hooks/getUserId';
import { useGetUserOrgId } from '../hooks/getUserOrgId';
import TodoForm from '../components/TodoForm';
import TodoCard from '../components/TaskCard';
import Loading from '../components/Loading';
import { deleteTask } from '../api/deleteTask';
import { markAsImportant } from '../api/markAsImportant';
import { fetchAllTasks } from '../api/fetchAllTasks';
import EmptyPage from '../components/EmptyPage';

const AllTaks = () => {
    const userId = useGetUserId();
    const organizationId = useGetUserOrgId();

    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, [userId, organizationId]);


    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetchAllTasks(userId, organizationId);
            setTasks(response);
            console.log(response);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };


    const setImportantState = async (todoId) => {
        setIsLoading(true);
        setError(null);

        try {
            await markAsImportant(todoId);
            fetchData();
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleTodoDelete = async (todoId) => {
        setIsLoading(true);
        setError(null);

        try {
            await deleteTask(todoId);
            fetchData()
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }


    if (isLoading) return <Loading />;

    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="flex flex-col gap-2 justify-start items-center mt-5 w-full">
            <TodoForm handleTodoCreate={fetchData} organizationId={organizationId} userId={userId} />
            {tasks.length === 0 ?
                <EmptyPage /> : (
                    <div className='flex flex-col justify-start gap-4 w-full p-10 overflow-y-auto'>
                        {tasks.map(todo => (
                            <TodoCard key={todo.id} todo={todo} markAsImportant={() => setImportantState(todo.id)} handleTodoDelete={() => handleTodoDelete(todo.id)} />
                        ))}
                    </div>
                )
            }

        </div>
    )


};

export default AllTaks;


