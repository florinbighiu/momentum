import { Link } from "react-router-dom";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/clerk-react";
import Button from "../components/Button";
import { motion } from 'framer-motion';
import { fadeOut, pageTransition, fade, fadeIn } from "../utils/framer";
import screen from "../assets/screen.png"

export default function LandingPage() {
    return (
        <motion.div
            initial={fade}
            animate={fadeIn}
            exit={fadeOut}
            transition={pageTransition}
            className="w-full"
        >
            <div id='landing' className="flex flex-col w-full h-screen items-center justify-start">

                <div className="fixed top-4 right-4 flex gap-5">
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton>
                            <Button >Sign In {' '} <span aria-hidden="true"> →</span></Button>
                        </SignInButton>
                    </SignedOut>
                </div>
                <div className="px-6 pt-14 lg:px-8">
                    <div className="w-full py-8">
                        <div className="text-center">
                            

                            <h1 className="text-4xl w-full font-bold tracking-tight text-gray-300 sm:text-6xl">
                                The easiest way to schedule your tasks.
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-300">
                                Make and account and start managing your tasks in less than a
                                minute.
                            </p>
                            
                        </div>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                to="/todos"
                                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Get started
                            </Link>
                            <Link
                                href="#"
                                className="text-sm font-semibold hover:underline leading-6 text-gray-200"
                            >
                                Learn more <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 h-full flex flex-col items-center justify-center">
                    <img className="rounded-lg z-0 shadow-xl" src={screen} alt="screen" />
                </div>
            </div>
        </motion.div>
    );
}