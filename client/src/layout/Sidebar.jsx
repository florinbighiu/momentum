import CreateTodo from "../components/CreateTodo";
import maze from "../assets/maze.png"

export default function Sidebar() {
    return (
        <div className="min-h-screen w-64 overflow-y-auto m-2 rounded-xl flex flex-col justify-between p-4 border border-gray-300/50">
            <div className="flex flex-col space-y-12 items-center justify-center">
                <a href="/" className="flex gap-2 items-center text-xl uppercase font-extrabold text-black">
                    <img src={maze} width="25" height="25" alt="logo" />
                    Manifest
                </a>
                </div>
            <CreateTodo />
            <nav>
                <ul className="space-y-2">
                    <li className="hover:bg-gray-300 py-2 px-4 rounded-md">
                        <a href="/" className="text-base font-medium text-black">
                            Dashboard
                        </a>
                    </li>
                    <li className="hover:bg-gray-300 py-2 px-4 rounded-md">
                        <a href="/" className="text-base font-medium text-black">
                            Todos
                        </a>
                    </li>
                    <li className="hover:bg-gray-300 py-2 px-4 rounded-md">
                        <a href="/" className="text-base font-medium text-black">
                            Settings
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

