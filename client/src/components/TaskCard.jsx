/* eslint-disable react/prop-types */
import { LuCalendarCheck } from "react-icons/lu";
import { MdDeleteForever } from "react-icons/md";
import { CiStar } from "react-icons/ci";


function TodoCard({ todo, handleTodoDelete, markAsImportant, markAsCompleted }) {

    

    return (
        <div className="hover:cursor-pointer max-h-40 flex flex-row bg-gray-100 border border-slate-700/15  rounded-lg">
            <div className="border-r w-[5%] bg-gray-200 rounded-l-lg flex items-center justify-center">
                <input type="checkbox" className="w-4 h-4 cursor-pointer" onClick={markAsCompleted}
                    defaultChecked={todo.completed} disabled={todo.completed}
                />
            </div>
            <div className="flex justify-between flex-col flex-1 px-5 py-3">
                <div className="flex flex-row justify-between gap-3">
                    <h2 className="text-xl text-center w-full font-bold">{todo.name}</h2>
                    {(!todo.important && !todo.completed) && (
                        <button className="bg-gray-100 p-2 border rounded-md hover:bg-gray-200" onClick={() => markAsImportant(todo.id)}>
                            <CiStar className="text-yellow-500 h-4 w-4 " />
                        </button>
                    )}

                </div>
                <p className="text-gray-500 mt-2">{todo.description}</p>
                <div className="flex flex-row justify-between">
                    <div className="flex items-center justify-center mt-4 gap-3 font-semibold">
                        <LuCalendarCheck />
                        <span className="text-gray-500">{todo.dueDate}</span>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <button onClick={handleTodoDelete} className="flex items-center gap-2 text-gray-700 hover:text-red-500">
                            <MdDeleteForever />
                            <span className="font-semibold">Delete</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TodoCard;


