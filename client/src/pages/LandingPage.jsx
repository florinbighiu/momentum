import Button from "../components/Button";
import { Link } from "react-router-dom";
const LandingPage = () => {
    return (
        <div className="bg-gradient-to-r from-blue-500 to-blue-300 rounded-xl h-full">
            <header className="flex justify-between items-center py-4 px-6 bg-white shadow-md">
                <a href="" className="text-gray-600 hover:text-gray-800">
                    Tasks
                </a>
            </header>
            <main className="flex flex-col items-center gap-5 py-20 px-6">
                <h1 className="text-4xl font-bold leading-tight text-white">
                    Conquer Your To-Do List
                </h1>
                <Link to="/todos">
                <Button >
                    Get Started for Free
                </Button>
                </Link>

            </main>
        </div>
    );
};

export default LandingPage;
