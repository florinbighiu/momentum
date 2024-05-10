/* eslint-disable react/prop-types */
import { LuCalendarCheck } from "react-icons/lu";
import { MdDeleteForever } from "react-icons/md";

function TodoCard({ todo, handleTodoDelete, markAsImportant }) {
    return (
        <div className="bg-background bg-cover bg-no-repeat hover:cursor-pointer hover:scale-[0.99] transition-all duration-300 max-h-40 flex justify-between flex-col border rounded-lg shadow-md p-6">
            <div className="flex flex-row justify-between gap-3">
                <h2 className="text-xl text-center w-full font-bold text-white">{todo.name}</h2>
                {!todo.important && (
                    <button className="bg-white bg-opacity-35 px-3 rounded-md hover:scale-90 transition-all ease-in-out" onClick={() => markAsImportant(todo.id)}>!</button>
                )}

            </div>
            <p className="text-white mt-2">{todo.description}</p>
            <div className="flex flex-row justify-between">
                <div className="flex items-center justify-center mt-4 gap-3 font-semibold text-white">
                    <LuCalendarCheck />
                    <span className="text-gray-100">{todo.dueDate}</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <button onClick={handleTodoDelete} className="flex items-center gap-2 text-gray-100 hover:text-red-500">
                        <MdDeleteForever />
                        <span className="font-semibold">Delete</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TodoCard;


