/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from "framer-motion";
import { IoCheckmarkCircle, IoAlertCircle, IoClose } from "react-icons/io5";

const ICONS = {
    success: <IoCheckmarkCircle className="w-4 h-4 text-emerald-600 shrink-0" />,
    error:   <IoAlertCircle className="w-4 h-4 text-red-600 shrink-0" />,
};

export function Toast({ toasts, dismiss }) {
    return (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
            <AnimatePresence>
                {toasts.map(t => (
                    <motion.div
                        key={t.id}
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.97 }}
                        transition={{ duration: 0.18 }}
                        className="pointer-events-auto flex items-center gap-2.5 bg-white border border-border shadow-modal rounded-xl px-3.5 py-2.5 min-w-[200px] max-w-xs"
                    >
                        {ICONS[t.type] || ICONS.success}
                        <span className="text-xs text-gray-800 font-medium flex-1">{t.message}</span>
                        <button onClick={() => dismiss(t.id)} className="text-gray-500 hover:text-gray-800 transition-colors">
                            <IoClose className="w-3.5 h-3.5" />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
