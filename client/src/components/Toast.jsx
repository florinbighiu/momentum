/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from "framer-motion";
import { TbCheck, TbAlertTriangle, TbX } from "react-icons/tb";

const ICONS = {
    success: <div className="w-5 h-5 rounded-full bg-success flex items-center justify-center shrink-0"><TbCheck className="w-3 h-3 text-white" strokeWidth={3} /></div>,
    error:   <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center shrink-0"><TbAlertTriangle className="w-3 h-3 text-white" /></div>,
};

export function Toast({ toasts, dismiss }) {
    return (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
            <AnimatePresence>
                {toasts.map(t => (
                    <motion.div key={t.id}
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.96 }}
                        transition={{ duration: 0.18 }}
                        className="pointer-events-auto flex items-center gap-2.5 bg-gray-900 border border-zinc-700 shadow-xl rounded-xl px-3.5 py-2.5 min-w-[200px] max-w-xs"
                    >
                        {ICONS[t.type] || ICONS.success}
                        <span className="text-xs text-zinc-100 font-medium flex-1">{t.message}</span>
                        <button onClick={() => dismiss(t.id)} className="text-zinc-500 hover:text-zinc-300 transition-colors">
                            <TbX className="w-3.5 h-3.5" />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
