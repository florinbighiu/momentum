/* eslint-disable react/prop-types */
import { useState } from 'react';
import { createTodo } from '../api/todoCreate';
import { useGetUserId } from '../utils/getUserId';
import { useGetUserOrgId } from '../utils/getUserOrgId';
import Button from './Button';

const CreateTodo = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [showForm, setShowForm] = useState(false); // State for form visibility

    const userId = useGetUserId();
    const organizationId = useGetUserOrgId();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createTodo({
                name,
                description,
                userId,
                organizationId,
                dueDate,
            });
            setName('');
            setDescription('');
            setDueDate('');
            setShowForm(false);
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    };

    const toggleForm = () => setShowForm(!showForm);

    return (
        <>
            <div>
                <Button onClick={toggleForm}>
                    Create Todo
                </Button>
            </div>
            {showForm && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-200/75 lg:w-2/6 bg-white p-5 rounded-xl shadow-md">
                        <h2 className='text-center uppercase font-bold font-mono my-3'>Create Todo</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                            <label htmlFor="name" className="text-sm font-medium">
                                Todo Name:
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <label htmlFor="description" className="text-sm font-medium">
                                Description: (Optional)
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="rounded-md border border-gray-300 p-2 h-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <label htmlFor="dueDate" className="text-sm font-medium">
                                Due Date: (Optional)
                            </label>
                            <input
                                type="date"
                                id="dueDate"
                                name="dueDate"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </form>
                        <div className='flex flex-col space-y-3 my-4'>
                            <Button
                                type="submit"
                            >
                                Create Todo
                            </Button>
                            <button onClick={toggleForm}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreateTodo;
