/* eslint-disable react/prop-types */
import { TbSearch, TbX } from "react-icons/tb";

export default function SearchBar({ value, onChange }) {
    return (
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all w-44
            ${value
                ? "bg-white border-gray-300 shadow-sm"
                : "bg-gray-100 border-gray-200 hover:border-gray-300"
            }
            focus-within:bg-white focus-within:border-indigo-500 focus-within:shadow-sm`}
        >
            <TbSearch className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <input
                type="text"
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder="Search..."
                className="bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none w-full"
            />
            {value && (
                <button onClick={() => onChange("")} className="text-gray-400 hover:text-gray-600 transition-colors shrink-0">
                    <TbX className="w-3.5 h-3.5" />
                </button>
            )}
        </div>
    );
}
