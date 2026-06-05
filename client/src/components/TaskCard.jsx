/* eslint-disable react/prop-types */
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { TbStar, TbStarFilled, TbPencil, TbTrash, TbCalendar } from "react-icons/tb";
import Checkbox from "./Checkbox";
import UpdateForm from "./UpdateForm";

const PRIORITY = {
    HIGH:   { stripe: "bg-red-500",  badge: "text-red-600 bg-red-50 border-red-200",        label: "High"   },
    MEDIUM: { stripe: "bg-warning", badge: "text-amber-600 bg-amber-50 border-amber-200",  label: "Medium" },
    LOW:    { stripe: "bg-success", badge: "text-green-600 bg-green-50 border-green-200",  label: "Low"    },
};

function formatDate(str) {
    if (!str) return null;
    const due   = new Date(str);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    const diff = Math.round((due - today) / 86400000);
    if (diff < 0)  return { label: `${Math.abs(diff)}d overdue`, cls: "text-red-500 bg-red-50 border-red-200" };
    if (diff === 0) return { label: "Today",    cls: "text-green-600 bg-green-50 border-green-200" };
    if (diff === 1) return { label: "Tomorrow", cls: "text-blue-600 bg-blue-50 border-blue-200" };
    if (diff <= 7)  return { label: `In ${diff}d`, cls: "text-gray-600 bg-border border-gray-200" };
    return { label: due.toLocaleDateString("en-US", { month: "short", day: "numeric" }), cls: "text-gray-400 bg-border border-gray-200" };
}

export default function TaskCard({ todo, markAsImportant, markAsCompleted, handleTodoDelete }) {
    const [showEdit, setShowEdit] = useState(false);
    const p        = PRIORITY[todo.priority] || PRIORITY.MEDIUM;
    const dateInfo = formatDate(todo.dueDate);

    return (
        <>
            <div className={`group flex gap-0 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${todo.completed ? "opacity-50" : ""}`}>
                {/* priority stripe */}
                <div className={`w-[3px] shrink-0 ${p.stripe} rounded-l-xl`} />

                <div className="flex-1 p-3.5 min-w-0">
                    {/* row 1: badge + action icons */}
                    <div className="flex items-center justify-between mb-2.5">
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${p.badge}`}>
                            {p.label}
                        </span>
                        <div className="flex items-center gap-0.5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-150">
                            {!todo.completed && (
                                <>
                                    <button
                                        onClick={markAsImportant}
                                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                                        title={todo.important ? "Remove from important" : "Mark important"}
                                    >
                                        {todo.important
                                            ? <TbStarFilled className="w-3.5 h-3.5 text-amber-500" />
                                            : <TbStar className="w-3.5 h-3.5 text-gray-400" />
                                        }
                                    </button>
                                    <button
                                        onClick={() => setShowEdit(true)}
                                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                                        title="Edit"
                                    >
                                        <TbPencil className="w-3.5 h-3.5 text-gray-400" />
                                    </button>
                                </>
                            )}
                            <button
                                onClick={handleTodoDelete}
                                className="p-1.5 rounded-lg hover:bg-red-50 transition-colors group/del"
                                title="Delete"
                            >
                                <TbTrash className="w-3.5 h-3.5 text-gray-400 group-hover/del:text-red-500 transition-colors" />
                            </button>
                        </div>
                    </div>

                    {/* row 2: checkbox + title + desc */}
                    <div className="flex items-start gap-2.5">
                        <div className="mt-0.5">
                            <Checkbox checked={todo.completed} onChange={markAsCompleted} disabled={todo.completed} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium leading-snug ${todo.completed ? "line-through text-gray-400" : "text-gray-900"}`}>
                                {todo.name}
                            </p>
                            {todo.description && (
                                <p className="text-xs text-gray-400 mt-0.5 line-clamp-2 leading-relaxed">
                                    {todo.description}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* row 3: meta chips */}
                    {(dateInfo || todo.important) && (
                        <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
                            {dateInfo && (
                                <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md border ${dateInfo.cls}`}>
                                    <TbCalendar className="w-3 h-3" />
                                    {dateInfo.label}
                                </span>
                            )}
                            {todo.important && (
                                <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md border bg-amber-50 text-amber-600 border-amber-200">
                                    <TbStarFilled className="w-3 h-3" /> Important
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {showEdit && (
                    <UpdateForm initialValues={todo} onClose={() => setShowEdit(false)} />
                )}
            </AnimatePresence>
        </>
    );
}
