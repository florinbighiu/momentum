/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { updateTask } from "../api/updateTask";

const UpdateForm = ({ initialValues, onSubmit, onClose }) => {
    const [formData, setFormData] = useState(initialValues);
    const formRef = useRef(null);

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleUpdate = async (taskId, formData) => {
        try {
            await updateTask(taskId, formData);
            onSubmit();
            onClose();
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const isAnyFieldEmpty = () => formData.name === '' || formData.description === '';


    return (
        <motion.div
            ref={formRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed right-0 top-0 h-screen w-1/3 z-50 flex justify-end"
        >
            <div className="bg-white border shadow-lg p-4 w-3/4 max-w-md">
                <h3 className="text-xl font-semibold mb-4">Update Task</h3>
                <form>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            rows={5}
                            value={formData.description}
                            onChange={handleInputChange}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex items-center justify-end ">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg     mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={() => handleUpdate(formData.id, formData)}
                            disabled={isAnyFieldEmpty()}
                            className={`bg-blue-500  text-white py-2 px-4 rounded-lg ${isAnyFieldEmpty() ? 'bg-opacity-50 cursor-not-allowed' : ''}`}
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default UpdateForm;
