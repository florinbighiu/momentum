/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TbX, TbCheck } from "react-icons/tb";
import { useQueryClient } from "react-query";
import { updateTask } from "../api/updateTask";

const inputCls = "w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all";
const labelCls = "block text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5";

const PRIORITY_OPTIONS = [
    { value: "LOW",    label: "Low",    color: "text-green-500" },
    { value: "MEDIUM", label: "Medium", color: "text-amber-500" },
    { value: "HIGH",   label: "High",   color: "text-red-500"  },
];

export default function UpdateForm({ initialValues, onClose }) {
    const [form, setForm]           = useState({ ...initialValues, priority: initialValues.priority || "MEDIUM" });
    const [submitting, setSubmitting] = useState(false);
    const [saved, setSaved]         = useState(false);
    const qc = useQueryClient();

    useEffect(() => {
        const handler = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSave = async () => {
        if (!form.name.trim()) return;
        setSubmitting(true);
        try {
            await updateTask(form.id, {
                name:        form.name,
                description: form.description,
                dueDate:     form.dueDate || null,
                priority:    form.priority,
            });
            qc.invalidateQueries(["todos"]);
            setSaved(true);
            setTimeout(onClose, 600);
        } catch (err) {
            console.error("Error updating task:", err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
                onClick={onClose}
            />

            <motion.aside
                key="panel"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                className="fixed right-0 top-0 h-screen w-80 z-50 bg-white border-l border-gray-200 shadow-xl flex flex-col"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 h-14 border-b border-gray-200 shrink-0 bg-gray-100">
                    <h3 className="text-sm font-bold text-gray-900">Edit task</h3>
                    <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors">
                        <TbX className="w-4 h-4" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-4 bg-gray-100">
                    <div>
                        <label className={labelCls}>Title *</label>
                        <input name="name" type="text" value={form.name} onChange={handleChange}
                            className={inputCls} autoFocus />
                    </div>
                    <div>
                        <label className={labelCls}>Description</label>
                        <textarea name="description" rows={4} value={form.description || ""}
                            onChange={handleChange} className={`${inputCls} resize-none`} />
                    </div>
                    <div>
                        <label className={labelCls}>Due date</label>
                        <input name="dueDate" type="date" value={form.dueDate || ""}
                            onChange={handleChange} className={inputCls} />
                    </div>
                    <div>
                        <label className={labelCls}>Priority</label>
                        <div className="flex gap-2">
                            {PRIORITY_OPTIONS.map(({ value, label, color }) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setForm(prev => ({ ...prev, priority: value }))}
                                    className={`flex-1 py-2 rounded-lg border text-xs font-semibold transition-all ${
                                        form.priority === value
                                            ? `border-current ${color} bg-gray-100 shadow-sm`
                                            : "border-gray-200 text-gray-400 hover:border-gray-300"
                                    }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-5 py-4 border-t border-gray-200 flex gap-2 shrink-0 bg-white">
                    <button onClick={onClose}
                        className="flex-1 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
                        Cancel
                    </button>
                    <button onClick={handleSave} disabled={!form.name.trim() || submitting || saved}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold text-white transition-all ${
                            saved
                                ? "bg-success"
                                : !form.name.trim() || submitting
                                    ? "bg-indigo-500/40 cursor-not-allowed"
                                    : "bg-indigo-500 hover:bg-indigo-600"
                        }`}>
                        {saved ? <><TbCheck className="w-4 h-4" /> Saved!</> : submitting ? "Savingâ€¦" : "Save changes"}
                    </button>
                </div>
            </motion.aside>
        </AnimatePresence>
    );
}
