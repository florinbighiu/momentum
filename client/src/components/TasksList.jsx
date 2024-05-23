/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import { useGetUserId } from "../hooks/getUserId";
import { useGetUserOrgId } from "../hooks/getUserOrgId";
import { motion } from 'framer-motion';
import { fadeOut, pageTransition, fade, fadeIn } from "../utils/framer";
import { deleteTask } from "../api/deleteTask";
import Loading from "../components/Loading";
import { markAsImportant } from "../api/markAsImportant";
import EmptyPage from "../components/EmptyPage";
import { setCompleted } from "../api/setCompleted";


export function TasksList({ icon, name, handleFetchData }) {
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const userId = useGetUserId();
    const organizationId = useGetUserOrgId();

    useEffect(() => {
        fetchData();
    }, [userId, organizationId]);

    const fetchData = async () => {
        if (userId) {
            setIsLoading(true);
            setError(null);

            try {
                const response = await handleFetchData(userId, organizationId);
                setTodos(response);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    if (error) return <p>Error: {error.message}</p>;

    if (isLoading) return <Loading />;

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

    const handleTodoUpdate = () => {
        setShowForm(!showForm);
    }

    return (
        <motion.div
            initial={fade}
            animate={fadeIn}
            exit={fadeOut}
            transition={pageTransition}
            className="w-full h-screen p-10 flex flex-col gap-[3rem]"
        >

            <h1 className="text-3xl font-inter font-semibold flex flex-row items-center gap-2 text-gray-500">{icon}{name}</h1>

            {todos.length === 0 && (
                <EmptyPage />
            )}
            <div id="task_list" className='flex flex-col justify-start gap-4 pr-4 w-full overflow-y-auto'>
                {todos.map(todo =>

                    <TaskCard key={todo.id} onSubmit={fetchData} onClose={() => setShowForm(false)} todo={todo} handleTodoUpdate={handleTodoUpdate} markAsCompleted={() => markAsCompleted(todo.id)} markAsImportant={() => setImportantState(todo.id)} handleTodoDelete={() => handleTodoDelete(todo.id)} />
                )
                }
            </div>
        </motion.div>
    );
}
