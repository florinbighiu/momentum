/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import { TbCalendarClock, TbSun, TbStar, TbCheck, TbLayoutGrid, TbChartBar, TbX } from "react-icons/tb";
import logo from "../assets/maze.png";
import { useGetUserId } from "../hooks/getUserId";
import { useGetUserOrgId } from "../hooks/getUserOrgId";
import { useTodos } from "../hooks/useTodos";

/* â”€â”€â”€ derive badge counts from cached todos â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function useCounts() {
    const userId         = useGetUserId();
    const organizationId = useGetUserOrgId();
    const { data: todos = [] } = useTodos(userId, organizationId);

    const today = new Date(); today.setHours(0, 0, 0, 0);

    return {
        today:     todos.filter(t => {
            if (!t.dueDate || t.completed) return false;
            const d = new Date(t.dueDate); d.setHours(0,0,0,0);
            return d.getTime() === today.getTime();
        }).length,
        upcoming:  todos.filter(t => {
            if (!t.dueDate || t.completed) return false;
            const d = new Date(t.dueDate); d.setHours(0,0,0,0);
            const seven = new Date(today); seven.setDate(seven.getDate() + 7);
            return d > today && d <= seven;
        }).length,
        important: todos.filter(t => t.important && !t.completed).length,
        completed: todos.filter(t => t.completed).length,
        all:       todos.length,
    };
}

function Badge({ n }) {
    if (!n) return null;
    return (
        <span className="ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-blue-600/10 text-blue-600/70 tabular-nums">
            {n > 99 ? "99+" : n}
        </span>
    );
}

function UserSection() {
    const { user } = useUser();
    return (
        <div className="px-3 py-3 border-t border-blue-200/50 shrink-0 flex items-center gap-2.5">
            <UserButton appearance={{ elements: { avatarBox: "w-7 h-7 shrink-0" } }} />
            <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-900 truncate">{user?.firstName ?? "Account"}</p>
                <p className="text-[11px] text-gray-600 truncate">{user?.primaryEmailAddress?.emailAddress ?? ""}</p>
            </div>
        </div>
    );
}

export default function Sidebar({ open, onClose }) {
    const counts = useCounts();

    const NAV = [
        { to: "/todos",     icon: TbSun,          label: "My Day",    count: counts.today,     iconColor: "text-amber-500" },
        { to: "/upcoming",  icon: TbCalendarClock, label: "Upcoming",  count: counts.upcoming,  iconColor: "text-violet-500" },
        { to: "/important", icon: TbStar,          label: "Important", count: counts.important, iconColor: "text-rose-500" },
        { to: "/completed", icon: TbCheck,         label: "Completed", count: counts.completed, iconColor: "text-emerald-500" },
        { to: "/all",       icon: TbLayoutGrid,    label: "All Tasks", count: counts.all,       iconColor: "text-blue-500" },
    ];

    return (
        <aside className={`fixed inset-y-0 left-0 z-40 flex flex-col h-screen w-64 shrink-0 bg-blue-100 overflow-hidden transition-transform duration-300 ease-in-out lg:relative lg:w-56 lg:translate-x-0 lg:z-auto ${open ? "translate-x-0" : "-translate-x-full"}`}>
            {/* Brand */}
            <div className="flex items-center h-14 shrink-0 px-4">
                <NavLink to="/" onClick={onClose} className="flex items-center gap-2.5 flex-1">
                    <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center shrink-0 shadow-sm">
                        <img src={logo} alt="Momentum" className="w-4 h-4 brightness-0 invert" />
                    </div>
                    <span className="text-sm font-bold text-gray-900 tracking-tight">Momentum</span>
                </NavLink>
                <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg hover:bg-blue-200/60 transition-colors text-gray-600">
                    <TbX className="w-4 h-4" />
                </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-2 py-3 overflow-y-auto">
                <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-blue-600 select-none">
                    Views
                </p>
                <ul className="space-y-0.5">
                    {NAV.map(({ to, icon: Icon, label, count, iconColor }) => (
                        <li key={to}>
                            <NavLink
                                to={to}
                                onClick={onClose}
                                className={({ isActive }) =>
                                    `group flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-100 ${
                                        isActive
                                            ? "bg-blue-500 text-white"
                                            : "text-gray-700 hover:text-gray-900 hover:bg-blue-600/10"
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : iconColor}`} />
                                        <span className="flex-1 truncate">{label}</span>
                                        <Badge n={count} />
                                    </>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Analytics */}
                <p className="px-3 mt-5 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-blue-600 select-none">
                    Insights
                </p>
                <NavLink
                    to="/stats"
                    onClick={onClose}
                    className={({ isActive }) =>
                        `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-100 ${
                            isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:text-gray-900 hover:bg-blue-600/10"
                        }`
                    }
                >
                    {({ isActive }) => (
                        <>
                            <TbChartBar className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-indigo-500"}`} />
                            <span>Stats</span>
                        </>
                    )}
                </NavLink>
            </nav>

            {/* User */}
            <SignedIn>
                <UserSection />
            </SignedIn>
        </aside>
    );
}
