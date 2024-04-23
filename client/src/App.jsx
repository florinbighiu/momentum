import { useAuth, SignedIn } from "@clerk/clerk-react";
import Header from "./layout/Header";
import TodosList from "./components/TodosList";
import Sidebar from "./layout/Sidebar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

export default function App() {

  const user = useAuth();

  console.log(user)

  return (
    <Router>
      <div className="flex flex-row">
        <SignedIn>
          <Sidebar />
        </SignedIn>
        <div className="flex flex-col w-full mx-3">
          <Header />
          <main className="flex flex-col p-3 h-full justify-between my-2 rounded-xl border border-gray-300/50">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/todos" element={<TodosList />}></Route>

            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}