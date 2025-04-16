import { Input } from "@/components/ui/input"
import { useState, KeyboardEvent } from "react"

export default function SearchBar({ onSearch }: any) {
    const [value, setValue] = useState('');

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch?.(value);
        }
    };

    return (
        <div className="flex items-center p-2 bg-[#F3EADB] dark:bg-gray-800 rounded-lg shadow">
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                type="text"
                placeholder="Search a CA"
                className="flex-1 text-gray-900 dark:text-white bg-transparent border-none focus:ring-0"
            />
            <SearchIcon className="text-gray-500 dark:text-gray-400" />
        </div>
    )
}

function SearchIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    )
}