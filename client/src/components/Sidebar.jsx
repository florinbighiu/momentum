import { Link } from "react-router-dom";
import { TbCalendarClock, TbSmartHome } from "react-icons/tb";
import { SignedIn, OrganizationSwitcher, UserButton } from "@clerk/clerk-react";
import { motion } from 'framer-motion';
import { fadeIn, fadeOut, pageTransition } from "../utils/framer";
import { FaRegStar } from "react-icons/fa";
import { IoCloudDoneOutline } from "react-icons/io5";
import { BsSun } from "react-icons/bs";
import logo from "../assets/maze.png";

export default function Sidebar() {

    return (
        <motion.div
            initial={fadeIn}
            animate={{ x: 0, opacity: 1 }}
            exit={fadeOut}
            transition={pageTransition}
        >
            <div id="sidebar" className="sm:w-64 w-full sm:h-screen bg-transparent flex sm:flex-col flex-row justify-around items-center p-4">
                <Link to="/">
                    <div className="flex flex-row items-center w-full justify-center mb-32 text-2xl font-semibold gap-1">
                        <img src={logo} alt="logo" className="w-8" />
                        <span className="text-gray-900">Momentum</span>
                    </div>
                </Link>
                <div className="flex flex-row md:flex-col h-full w-full space-y-12">
                    <div className="w-full">
                        <ul className="space-y-2 flex flex-row sm:flex-col text-gray-300 font-medium w-fit">
                            <Link to="/todos">
                                <li className="hover:bg-gray-300 hover:bg-opacity-15 py-2 px-4 rounded-lg flex flex-row items-center gap-3">
                                    <BsSun />
                                    My day
                                </li>
                            </Link>
                            <Link to="/upcoming">
                                <li className="hover:bg-gray-300 hover:bg-opacity-15 py-2 px-4 rounded-lg flex flex-row items-center gap-3">
                                    <TbCalendarClock />
                                    Upcoming schedule
                                </li>
                            </Link>
                            <Link to="/important">
                                <li className="hover:bg-gray-300 hover:bg-opacity-15 py-2 px-4 rounded-lg flex flex-row items-center gap-3">
                                    <FaRegStar />
                                    Important
                                </li>
                            </Link>
                            <Link to="/completed">
                                <li className="hover:bg-gray-300 hover:bg-opacity-15 py-2 px-4 rounded-lg flex flex-row items-center gap-3">
                                    <IoCloudDoneOutline />
                                    Completed
                                </li>
                            </Link>
                            <Link to="/all">
                                <li className="hover:bg-gray-300 hover:bg-opacity-15 py-2 px-4 rounded-lg flex flex-row items-center gap-3">
                                    <TbSmartHome />
                                    All tasks
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>
                <div className="flex w-full gap-1 justify-start">
                    <SignedIn>
                        <OrganizationSwitcher />
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </motion.div >
    );
}

