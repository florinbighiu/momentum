/* eslint-disable react/prop-types */
import { useState } from 'react';
import { createTodo } from '../api/todoCreate';
import Button from "./Button"
import { IoIosCloseCircle } from "react-icons/io";


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
            {!showForm && (
                <div>
                    <Button onClick={toggleForm}>Create Todo</Button>
                </div>
            )}
            {showForm && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-200/75 lg:w-2/6 bg-white rounded-xl shadow-md">
                        <div className='flex flex-row justify-between w-full '>
                            <h2 className="text-center font-peace uppercase font-bold my-3 px-5">Create Todo</h2>
                            <button className="font-bold hover:bg-gray-200 rounded-xl m-2 px-2" onClick={toggleForm}><IoIosCloseCircle /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-3  p-5">
                            <label htmlFor="name" className="text-sm font-medium">
                                Todo Name:
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
                            <div className="flex flex-col space-y-3 my-4">
                                <Button type="submit" onClick={handleSubmit}>
                                    Create Todo
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TodoForm;
