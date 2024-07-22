/* eslint-disable react/prop-types */
import { useState } from 'react';
import { createTodo } from '../api/createTask';
import { IoClose } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import { motion } from 'framer-motion';
import { fadeOut, formTransition, fade, fadeIn } from "../utils/framer";

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

    const isAnyFieldEmpty = () => todoData.name === '' || todoData.description === '' || todoData.dueDate === '';


    return (
        <div className="flex flex-col">
            <div >
                <button className='w-full flex items-center gap-2 justify-center border rounded-lg py-2 px-4 bg-white hover:bg-gray-100 bg-opacity-25 backdrop-blur-md cursor-pointer' onClick={toggleForm}>
                    <MdAdd className="text-xl" />
                    <span className="text-gray-600 font-bahn text-md font-semibold">New task</span>
                </button>
            </div>
            {showForm && (
                <motion.div
                    initial={fade}
                    animate={fadeIn}
                    exit={fadeOut}
                    transition={formTransition}
                >
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 z-50">
                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-1 border border-gray-200/75 lg:w-3/12 bg-white rounded-xl">
                            <div className='flex flex-row items-center justify-between w-full '>
                                <h2 className="text-center font-bahn font-semibold my-3 px-5">Upload your task here</h2>
                                <button className="font-bold bg-gray-200 bg-opacity-55 hover:bg-gray-300 rounded-full p-1 mr-1" onClick={toggleForm}><IoClose /></button>
                            </div>
                            <form onSubmit={handleSubmit} className="flex flex-col font-inter space-y-5 py-6 p-5">
                                <div className='flex flex-col space-y-1'>
                                    <label htmlFor="name" className="text-sm">
                                        Task name
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
                                    <label htmlFor="name" className="text-sm">
                                        Description
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
                                    <label htmlFor="name" className="text-sm">
                                        Due date
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
                                <div className="flex w-full justify-end">
                                    <button type="submit" disabled={isAnyFieldEmpty()} onClick={handleSubmit} className={`bg-gray-800 ${!isAnyFieldEmpty() ? 'hover:bg-gray-700' : ''} text-sm text-gray-200 py-1.5 px-5 rounded-lg ${isAnyFieldEmpty() ? 'bg-opacity-50 cursor-not-allowed' : ''}`}>
                                        Create
                                    </button>
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
