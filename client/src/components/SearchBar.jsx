import { useState } from 'react';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="flex rounded-full border border-gray-300 overflow-hidden w-full sm:w-auto">
            <input
                type="text"
                className="px-4 py-2 w-full focus:outline-none"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <button className="flex items-center px-4 py-2 text-sm text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                <svg
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </div>
    );
};

export default SearchBar;
