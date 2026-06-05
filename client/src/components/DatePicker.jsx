/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { format, parseISO } from "date-fns";
import { TbCalendar, TbX } from "react-icons/tb";
import "react-day-picker/dist/style.css";

export function DatePicker({ value, onChange, required }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    // value is a "yyyy-MM-dd" string; DayPicker wants a Date
    const selected = value ? parseISO(value) : undefined;

    const handleSelect = (day) => {
        if (!day) return;
        onChange(format(day, "yyyy-MM-dd"));
        setOpen(false);
    };

    // close on outside click
    useEffect(() => {
        if (!open) return;
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [open]);

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className={`w-full flex items-center gap-2 bg-gray-100 border rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500
                    ${open ? "border-indigo-500 ring-2 ring-indigo-500/30" : "border-gray-200"}
                    ${selected ? "text-gray-900" : "text-gray-400"}`}
            >
                <TbCalendar className="w-4 h-4 shrink-0 text-gray-400" />
                <span className="flex-1 text-left">
                    {selected ? format(selected, "MMM d, yyyy") : "Pick a date"}
                </span>
                {selected && (
                    <TbX
                        className="w-3.5 h-3.5 text-gray-400 hover:text-gray-900 transition-colors"
                        onClick={(e) => { e.stopPropagation(); onChange(""); }}
                    />
                )}
            </button>

            {open && (
                <div className="absolute z-50 mt-1.5 rounded-xl border border-gray-200 bg-white shadow-xl overflow-hidden"
                    style={{ minWidth: 280 }}>
                    <DayPicker
                        mode="single"
                        selected={selected}
                        onSelect={handleSelect}
                        showOutsideDays
                        required={required}
                        modifiersClassNames={{
                            selected: "rdp-selected",
                            today: "rdp-today",
                        }}
                        styles={{
                            root: { margin: 0, padding: "12px" },
                        }}
                    />
                </div>
            )}
        </div>
    );
}
