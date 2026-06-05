/* eslint-disable react/prop-types */
import { forwardRef, useImperativeHandle, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TbPlus, TbX } from "react-icons/tb";
import { useQueryClient } from "react-query";
import { createTodo } from "../api/createTask";
import { DatePicker } from "./DatePicker";

const EMPTY = { name: "", description: "", dueDate: "", priority: "MEDIUM" };

const inputCls = "w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all";
const labelCls = "block text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5";

const TodoForm = forwardRef(function TodoForm({ userId, organizationId }, ref) {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(EMPTY);
    const [submitting, setSubmitting] = useState(false);
    const qc = useQueryClient();

    useImperativeHandle(ref, () => ({ openForm: () => setOpen(true) }));

    const handleChange = (e) => setData(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const close = () => { setOpen(false); setData(EMPTY); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await createTodo({ ...data, organizationId, userId });
            qc.invalidateQueries(["todos"]);
            close();
        } catch (err) {
            console.error("Error creating task:", err);
        } finally {
            setSubmitting(false);
        }
    };

    const isEmpty = !data.name.trim() || !data.dueDate;

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
            >
                <TbPlus className="w-4 h-4" strokeWidth={2.5} />
                New task
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm"
                        onMouseDown={(e) => e.target === e.currentTarget && close()}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96, y: 8 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 8 }}
                            transition={{ duration: 0.18 }}
                            className="w-full max-w-md bg-white border border-gray-200 rounded-t-2xl sm:rounded-2xl shadow-xl p-6 mx-0 sm:mx-4 max-h-[90dvh] overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="text-base font-bold text-gray-900">New task</h2>
                                <button onClick={close} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors">
                                    <TbX className="w-4 h-4" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <div>
                                    <label className={labelCls}>Task name *</label>
                                    <input name="name" type="text" value={data.name} onChange={handleChange}
                                        placeholder="What needs to be done?" className={inputCls} autoFocus required />
                                </div>
                                <div>
                                    <label className={labelCls}>Description</label>
                                    <textarea name="description" value={data.description} onChange={handleChange}
                                        placeholder="Add details..." rows={3}
                                        className={`${inputCls} resize-none`} />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className={labelCls}>Due date *</label>
                                        <DatePicker
                                            value={data.dueDate}
                                            onChange={(val) => setData(prev => ({ ...prev, dueDate: val }))}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className={labelCls}>Priority</label>
                                        <select name="priority" value={data.priority} onChange={handleChange} className={inputCls}>
                                            <option value="LOW">Low</option>
                                            <option value="MEDIUM">Medium</option>
                                            <option value="HIGH">High</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2 pt-2 border-t border-gray-200">
                                    <button type="button" onClick={close}
                                        className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
                                        Cancel
                                    </button>
                                    <button type="submit" disabled={isEmpty || submitting}
                                        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors ${isEmpty || submitting ? "bg-blue-600/40 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}>
                                        <TbPlus className="w-4 h-4" />
                                        {submitting ? "Creating..." : "Create task"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
});

export default TodoForm;
