import { Link } from "react-router-dom";
import { TbBrandGoogleHome, TbCalendarClock, TbSettings } from "react-icons/tb";
import { SignedIn, OrganizationSwitcher, UserButton } from "@clerk/clerk-react";
import { motion } from 'framer-motion';
import { fadeIn, fadeOut, pageTransition } from "../utils/framer";


export default function Sidebar() {

    return (
        <motion.div
            initial={fadeIn}
            animate={{ x: 0, opacity: 1 }}
            exit={fadeOut}
            transition={pageTransition}
        >
            <div id="sidebar" className="w-64  h-screen bg-transparent flex flex-col justify-between items-center p-4">
                <div className="flex flex-col h-full w-full space-y-12">
                    <div className="w-full">
                        <ul className="space-y-2 text-gray-400 w-full">
                            <Link to="/todos">
                                <li className="hover:bg-gray-300 hover:bg-opacity-15 py-2 px-4 rounded-lg flex flex-row items-center gap-3">
                                    <TbBrandGoogleHome />
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
                                    <TbSettings />
                                    Important
                                </li>
                            </Link>
                            <Link to="/">
                                <li className="hover:bg-gray-300 hover:bg-opacity-15 py-2 px-4 rounded-lg flex flex-row items-center gap-3">
                                    <TbSettings />
                                    Completed
                                </li>
                            </Link>
                            <Link to="/">
                                <li className="hover:bg-gray-300 hover:bg-opacity-15 py-2 px-4 rounded-lg flex flex-row items-center gap-3">
                                    <TbSettings />
                                    All tasks
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>
                <div className="flex w-full gap-3 justify-start">
                    <SignedIn>
                        <OrganizationSwitcher />
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </motion.div >
    );
}

