/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbLayoutGrid, TbList, TbAlertTriangle, TbRefresh } from "react-icons/tb";
import TaskCard from "./TaskCard";
import { useGetUserId } from "../hooks/getUserId";
import { useGetUserOrgId } from "../hooks/getUserOrgId";
import {
    useTodos,
    useDeleteTodo,
    useToggleImportant,
    useCompleteTodo,
} from "../hooks/useTodos";
import Loading from "./Loading";
import EmptyPage from "./EmptyPage";
import SearchBar from "./SearchBar";
import { Toast } from "./Toast";
import { useToast } from "../hooks/useToast";
import TodoForm from "./TodoForm";

function StatChip({ label, value, variant = "default" }) {
    const colors = {
        default: "bg-white border-gray-200 text-gray-600",
        danger:  "bg-red-50 border-red-100 text-red-500",
        success: "bg-green-50 border-green-100 text-green-600",
        accent:  "bg-indigo-50 border-indigo-100 text-indigo-500",
    };
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold ${colors[variant]}`}>
            <span className="text-gray-400 font-normal">{label}</span>
            {value}
        </span>
    );
}

/* optional client-side filter â€” pages can pass a predicate to narrow results */
export function TasksList({ icon, name, handleFetchData, filter }) {
    const [search, setSearch] = useState("");
    const [view, setView]     = useState("grid");
    const { toasts, toast, dismiss } = useToast();
    const formRef = useRef(null);

    const userId         = useGetUserId();
    const organizationId = useGetUserOrgId();

    /* React Query â€” all pages share the same cache key */
    const { data: todos = [], isLoading, isError, error, refetch } = useTodos(userId, organizationId);

    const deleteMut    = useDeleteTodo(userId, organizationId);
    const importantMut = useToggleImportant(userId, organizationId);
    const completeMut  = useCompleteTodo(userId, organizationId);

    /* keyboard shortcut: "n" opens new-task form */
    // (retained in TasksList so each page has it)

    const handleDelete = async (id) => {
        try { await deleteMut.mutateAsync(id); toast("Task deleted."); }
        catch (err) { toast(err.message || "Failed to delete.", "error"); }
    };

    const handleToggleImportant = async (id, isImportant) => {
        try {
            await importantMut.mutateAsync({ id, isImportant });
            toast(isImportant ? "Removed from important." : "Marked as important.");
        } catch (err) { toast(err.message || "Failed.", "error"); }
    };

    const handleComplete = async (id) => {
        try { await completeMut.mutateAsync(id); toast("Task completed!"); }
        catch (err) { toast(err.message || "Failed.", "error"); }
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    /* apply page-level filter first, then search */
    const pageTodos = filter ? todos.filter(filter) : todos;
    const filtered  = search.trim()
        ? pageTodos.filter(t =>
            t.name.toLowerCase().includes(search.toLowerCase()) ||
            t.description?.toLowerCase().includes(search.toLowerCase()))
        : pageTodos;

    const overdue   = pageTodos.filter(t => !t.completed && t.dueDate && new Date(t.dueDate) < today).length;
    const remaining = pageTodos.filter(t => !t.completed).length;
    const completed = pageTodos.filter(t => t.completed).length;

    if (isError) return (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 h-full bg-white">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <TbAlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-sm font-semibold text-gray-900">Failed to load tasks</p>
            <p className="text-xs text-gray-400">{error?.message}</p>
            <button onClick={refetch}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500 text-white text-xs font-medium hover:bg-indigo-600 transition-colors">
                <TbRefresh className="w-3.5 h-3.5" /> Try again
            </button>
        </div>
    );

    if (isLoading) return <Loading />;

    return (
        <div className="flex flex-col h-full bg-white overflow-hidden">
            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-gray-200 shrink-0">
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2.5">
                        <span className="text-gray-400">{icon}</span>
                        <h1 className="text-xl font-bold text-gray-900 tracking-tight">{name}</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <SearchBar value={search} onChange={setSearch} />
                        <div className="flex items-center bg-gray-100 border border-gray-200 rounded-lg p-0.5 gap-0.5">
                            <button onClick={() => setView("grid")}
                                className={`p-1.5 rounded-md transition-colors ${view === "grid" ? "bg-white shadow-sm text-gray-900" : "text-gray-400 hover:text-gray-600"}`}>
                                <TbLayoutGrid className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => setView("list")}
                                className={`p-1.5 rounded-md transition-colors ${view === "list" ? "bg-white shadow-sm text-gray-900" : "text-gray-400 hover:text-gray-600"}`}>
                                <TbList className="w-3.5 h-3.5" />
                            </button>
                        </div>
                        <TodoForm ref={formRef} userId={userId} organizationId={organizationId} />
                    </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-2 flex-wrap">
                    <StatChip label="Total"     value={pageTodos.length} />
                    {remaining > 0 && <StatChip label="Remaining" value={remaining} variant="accent" />}
                    {overdue   > 0 && <StatChip label="Overdue"   value={overdue}   variant="danger" />}
                    {completed > 0 && <StatChip label="Done"      value={completed} variant="success" />}
                </div>
            </div>

            {/* Task list */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
                {filtered.length === 0 && <EmptyPage searchTerm={search} />}

                <AnimatePresence initial={false}>
                    <div className={view === "grid"
                        ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3"
                        : "flex flex-col gap-2"}>
                        {filtered.map(todo => (
                            <motion.div
                                key={todo.id}
                                layout
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.97 }}
                                transition={{ duration: 0.15 }}
                            >
                                <TaskCard
                                    todo={todo}
                                    markAsCompleted={() => handleComplete(todo.id)}
                                    markAsImportant={() => handleToggleImportant(todo.id, todo.important)}
                                    handleTodoDelete={() => handleDelete(todo.id)}
                                />
                            </motion.div>
                        ))}
                    </div>
                </AnimatePresence>
            </div>

            <Toast toasts={toasts} dismiss={dismiss} />
        </div>
    );
}
