/* eslint-disable react/prop-types */
import { useState } from 'react';
import { createTodo } from '../api/createTask';
import Button from "./Button"
import { IoClose } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import { motion } from 'framer-motion';
import { fadeOut, pageTransition, fade, fadeIn } from "../utils/framer";

const TodoForm = ({ handleTodoCreate, organizationId, userId }) => {
    const [showForm, setShowForm] = useState(false);
    const [todoData, setTodoData] = useState({ name: '', description: '', dueDate: '' });

    const handleChange = (event) => {
        setTodoData({ ...todoData, organizationId, userId, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createTodo(todoData);
            setShowForm(false);
            setTodoData({ name: '', desc: '', dueDate: '' });

            if (handleTodoCreate) {
                handleTodoCreate();
            }
        } catch (error) {
            console.error("Error creating todo:", error);
        }
    };

    const toggleForm = () => setShowForm(!showForm);

    return (
        <div className="flex flex-col space-y-2">
            <div >
                <button className='w-full flex items-center gap-2 justify-center border rounded-md py-2 px-4 bg-slate-200 hover:bg-slate-100 cursor-pointer bg-opacity-25' onClick={toggleForm}>
                    <MdAdd className="text-xl" />
                    <span className="text-gray-600 text-sm">New task</span>
                </button>
            </div>
            {showForm && (
                <motion.div
                    initial={fade}
                    animate={fadeIn}
                    exit={fadeOut}
                    transition={pageTransition}
                >
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-200/75 lg:w-3/12 bg-white rounded-xl shadow-md">
                            <div className='flex flex-row justify-between w-full '>
                                <h2 className="text-center font-peace font-semibold my-3 px-5">Upload your task here</h2>
                                <button className="font-bold hover:bg-gray-100 rounded-xl m-2 px-2" onClick={toggleForm}><IoClose /></button>
                            </div>
                            <form onSubmit={handleSubmit} className="flex flex-col space-y-5 py-6 p-5">
                                <div className='flex flex-col space-y-1'>
                                    <label htmlFor="name" className="text-sm font-medium">
                                        Task name:
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={todoData.name}
                                        onChange={handleChange}
                                        className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className='flex flex-col space-y-1'>
                                    <label htmlFor="name" className="text-sm font-medium">
                                        Description:
                                    </label>
                                    <input
                                        type="text"
                                        id="description"
                                        name="description"
                                        value={todoData.description}
                                        onChange={handleChange}
                                        className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className='flex flex-col space-y-1'>
                                    <label htmlFor="name" className="text-sm font-medium">
                                        Due Date:
                                    </label>
                                    <input
                                        type="date"
                                        id="dueDate"
                                        name="dueDate"
                                        value={todoData.dueDate}
                                        onChange={handleChange}
                                        className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col space-y-3 py-4">
                                    <Button type="submit" onClick={handleSubmit}>
                                        Create
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default TodoForm;
