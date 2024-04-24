import maze from "../assets/maze.png"
import { Link } from "react-router-dom";
import { TbBrandGoogleHome, TbCalendarClock, TbSettings } from "react-icons/tb";


export default function Sidebar() {


    return (
        <div id="sidebar" className="w-64  h-screen bg-transparent flex flex-col justify-between items-center p-4">
            <div className="flex flex-col justify-between h-1/3">
                <div className="flex flex-col space-y-12 items-center justify-center">
                    <Link to="/" className="flex gap-2 items-center text-2xl font-bold text-gray-200">
                        <img src={maze} width="35" height="35" alt="logo" />
                        Manifest
                    </Link>
                </div>
            </div>
            <nav className="w-full">
                <ul className="space-y-2 text-gray-400 font-semibold">
                    <Link to="/">
                        <li className="hover:bg-gray-300 hover:bg-opacity-15 py-2 px-4 rounded-lg flex flex-row items-center gap-3">
                            <TbBrandGoogleHome />
                            Home
                        </li>
                    </Link>
                    <Link to="/todos">
                        <li className="hover:bg-gray-300 hover:bg-opacity-15 py-2 px-4 rounded-lg flex flex-row items-center gap-3">
                            <TbCalendarClock />
                            Upcoming
                        </li>
                    </Link>
                    <Link to="/todos">
                        <li className="hover:bg-gray-300 hover:bg-opacity-15 py-2 px-4 rounded-lg flex flex-row items-center gap-3">
                            <TbSettings /> 
                            Settings
                        </li>
                    </Link>
                </ul>
            </nav>
        </div>
    );
}

