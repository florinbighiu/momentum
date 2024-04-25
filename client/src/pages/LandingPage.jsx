import maze from "../assets/maze.png"
import { Link } from "react-router-dom";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/clerk-react";
import Button from "../components/Button";
import { motion } from 'framer-motion';
import { fadeOut, pageTransition, fade, fadeIn } from "../utils/framer";

export default function LandingPage() {
    return (
        <motion.div
            initial={fade}
            animate={fadeIn}
            exit={fadeOut}
            transition={pageTransition}
            className="w-full"
        >
            <div id='landing' className="flex w-full h-screen items-center justify-center">
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
                    <div className="mx-auto max-w-3xl py-8">
                        <div className="text-center">
                            <img
                                src={maze}
                                width="100"
                                height="100"
                                alt="logo"
                                className="inline-block mb-8"
                            />

                            <h1 className="text-4xl font-bold tracking-tight text-gray-300 sm:text-6xl">
                                The easiest way to schedule your tasks within your organization.
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-300">
                                Make and account and start managing your tasks in less than a
                                minute.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Link
                                    to="/todos"
                                    className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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

                </div>
            </div>
        </motion.div>
    );
}