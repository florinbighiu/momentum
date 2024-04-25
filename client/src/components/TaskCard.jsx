/* eslint-disable react/prop-types */
import { LuCalendarCheck } from "react-icons/lu";
import { MdDeleteForever } from "react-icons/md";

function TodoCard({ todo, handleTodoDelete }) {
    return (
        <div className="bg-background bg-cover bg-no-repeat hover:cursor-pointer hover:scale-95 transition-all ease-in-out max-h-80 flex justify-between flex-col border rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-white">{todo.name}</h2>
            <p className="text-white mt-2">{todo.description}</p>
            <div className="flex flex-row justify-between">
            <div className="flex items-center justify-center mt-4 gap-3 text-white">
                <LuCalendarCheck />
                    <span className="text-white">{todo.dueDate}</span>
            </div>
            <div className="flex items-center justify-between mt-4">
                <button onClick={handleTodoDelete} className="flex items-center gap-2 text-white hover:text-red-500">
                    <MdDeleteForever />
                    <span>Delete</span>
                </button>
            </div>
            </div>
        </div>
    );
}

export default TodoCard;


