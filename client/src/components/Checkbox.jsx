/* eslint-disable react/prop-types */
export default function Checkbox({ checked, onChange, disabled }) {
    return (
        <button
            type="button"
            role="checkbox"
            aria-checked={checked}
            disabled={disabled}
            onClick={disabled ? undefined : onChange}
            className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
                ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                ${checked
                    ? "bg-indigo-500 border-indigo-500"
                    : "bg-white border-gray-300 hover:border-indigo-500"
                }`}
        >
            {checked && (
                <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 10" fill="none"
                    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="1,5 4.5,8.5 11,1" />
                </svg>
            )}
        </button>
    );
}
