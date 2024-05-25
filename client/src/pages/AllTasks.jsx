import { useEffect, useState } from 'react';
import { useGetUserId } from '../hooks/getUserId';
import { useGetUserOrgId } from '../hooks/getUserOrgId';
import TodoForm from '../components/TodoForm';
import TaskCard from '../components/TaskCard';
import Loading from '../components/Loading';
import { deleteTask } from '../api/deleteTask';
import { markAsImportant } from '../api/markAsImportant';
import EmptyPage from '../components/EmptyPage';
import { fetchTasks } from '../api/fetchTasks';
import { setCompleted } from '../api/setCompleted';

const AllTaks = () => {
    const userId = useGetUserId();
    const organizationId = useGetUserOrgId();

    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchData();
    }, [userId, organizationId]);


    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetchTasks(userId, organizationId);
            setTasks(response);
            console.log(response);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleTodoUpdate = () => {
        setShowForm(!showForm);
    }

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

    const markAsCompleted = async (todoId) => {
        setIsLoading(true);
        setError(null);
        try {
            await setCompleted(todoId);
            fetchData();
        } catch (error) {
            console.error("Error marking todo as completed:", error);
        } finally {
            setIsLoading(false);
        }
    }


    if (isLoading) return <Loading />;

    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="flex flex-col gap-2 justify-start items-center mt-5 h-screen w-full">
            <TodoForm handleTodoCreate={fetchData} organizationId={organizationId} userId={userId} />
            {tasks.length === 0 ?
                <EmptyPage /> : (
                    <div className='flex flex-col justify-start gap-4 p-10 w-full overflow-y-auto'>
                        {tasks.map(todo => (
                            <TaskCard key={todo.id} onSubmit={fetchData} onClose={() => setShowForm(false)} todo={todo} handleTodoUpdate={handleTodoUpdate} markAsCompleted={() => markAsCompleted(todo.id)} markAsImportant={() => setImportantState(todo.id)} handleTodoDelete={() => handleTodoDelete(todo.id)} />
                        ))}
                    </div>
                )
            }

        </div>
    )


};

export default AllTaks;