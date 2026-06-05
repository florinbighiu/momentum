import { useState, useCallback } from "react";

let nextId = 0;

export function useToast(duration = 3000) {
    const [toasts, setToasts] = useState([]);

    const dismiss = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const toast = useCallback((message, type = "success") => {
        const id = ++nextId;
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => dismiss(id), duration);
    }, [dismiss, duration]);

    return { toasts, toast, dismiss };
}

