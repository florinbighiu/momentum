import * as React from "react";
import { useAuth } from "@clerk/clerk-react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout() {
    const { userId, isLoaded } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    React.useEffect(() => {
        if (isLoaded && !userId) navigate("/sign-in");
    }, [isLoaded, userId, navigate]);

    if (!isLoaded) return (
        <div className="flex h-screen items-center justify-center bg-zinc-950">
            <div className="w-5 h-5 border-2 border-sidebar-surface border-t-accent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="flex h-screen w-full bg-zinc-950 overflow-hidden">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <main className="flex-1 min-w-0 overflow-hidden bg-gray-100">
                <Outlet context={{ onMenuClick: () => setSidebarOpen(true) }} />
            </main>
        </div>
    );
}
