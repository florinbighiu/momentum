import { useOutletContext } from "react-router-dom";
import { useTodos } from "../hooks/useTodos";
import { useGetUserId } from "../hooks/getUserId";
import { useGetUserOrgId } from "../hooks/getUserOrgId";
import { TbChartBar, TbCheck, TbAlertTriangle, TbStar, TbClock, TbMenu2 } from "react-icons/tb";
import Loading from "../components/Loading";

function Ring({ pct, size = 80, stroke = 7, color = "#6366f1" }) {
    const r   = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    const dash = circ * (pct / 100);
    return (
        <svg width={size} height={size} className="-rotate-90">
            <circle cx={size / 2} cy={size / 2} r={r} fill="none"
                stroke="currentColor" strokeWidth={stroke} className="text-border" />
            <circle cx={size / 2} cy={size / 2} r={r} fill="none"
                stroke={color} strokeWidth={stroke}
                strokeDasharray={`${dash} ${circ}`}
                strokeLinecap="round"
                style={{ transition: "stroke-dasharray 0.6s ease" }}
            />
        </svg>
    );
}

/* â”€â”€â”€ stat card  */
function StatCard({ icon: Icon, label, value, sub, iconBg, iconColor }) {
    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
                <Icon className={`w-5 h-5 ${iconColor}`} />
            </div>
            <div>
                <p className="text-2xl font-bold text-gray-900 leading-none">{value}</p>
                <p className="text-sm font-medium text-gray-600 mt-1">{label}</p>
                {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
            </div>
        </div>
    );
}

/* â”€â”€â”€ bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function Bar({ label, count, total, color }) {
    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
    return (
        <div>
            <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-gray-600">{label}</span>
                <span className="text-xs font-semibold text-gray-900">{count} <span className="text-gray-400 font-normal">({pct}%)</span></span>
            </div>
            <div className="h-1.5 rounded-full bg-border overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-700 ${color}`} style={{ width: `${pct}%` }} />
            </div>
        </div>
    );
}

export default function StatsPage() {
    const { onMenuClick } = useOutletContext() ?? {};
    const userId         = useGetUserId();
    const organizationId = useGetUserOrgId();
    const { data: todos = [], isLoading } = useTodos(userId, organizationId);

    if (isLoading) return <Loading />;

    const today = new Date(); today.setHours(0, 0, 0, 0);

    const total     = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const remaining = todos.filter(t => !t.completed).length;
    const important = todos.filter(t => t.important && !t.completed).length;
    const overdue   = todos.filter(t => !t.completed && t.dueDate && new Date(t.dueDate) < today).length;
    const dueToday  = todos.filter(t => {
        if (!t.dueDate || t.completed) return false;
        const d = new Date(t.dueDate); d.setHours(0,0,0,0);
        return d.getTime() === today.getTime();
    }).length;

    const high   = todos.filter(t => !t.completed && t.priority === "HIGH").length;
    const medium = todos.filter(t => !t.completed && t.priority === "MEDIUM").length;
    const low    = todos.filter(t => !t.completed && t.priority === "LOW").length;

    const completionPct = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="flex flex-col h-full bg-white overflow-hidden">
            {/* header */}
            <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-4 border-b border-gray-200 shrink-0">
                <div className="flex items-center gap-2.5">
                    {onMenuClick && (
                        <button onClick={onMenuClick} className="lg:hidden p-1.5 -ml-1 rounded-lg hover:bg-gray-100 transition-colors">
                            <TbMenu2 className="w-5 h-5 text-gray-500" />
                        </button>
                    )}
                    <span className="text-gray-400"><TbChartBar className="w-5 h-5" /></span>
                    <h1 className="text-xl font-bold text-gray-900 tracking-tight">Stats</h1>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                {/* completion ring + summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* ring */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 shadow-sm sm:col-span-1">
                        <div className="relative">
                            <Ring pct={completionPct} size={96} stroke={8} />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xl font-bold text-gray-900">{completionPct}%</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-semibold text-gray-900">Completion rate</p>
                            <p className="text-xs text-gray-400 mt-0.5">{completed} of {total} tasks done</p>
                        </div>
                    </div>

                    {/* stat cards */}
                    <div className="sm:col-span-2 grid grid-cols-2 gap-3">
                        <StatCard icon={TbCheck} label="Completed" value={completed}
                            sub={`${remaining} remaining`}
                            iconBg="bg-green-50" iconColor="text-green-500" />
                        <StatCard icon={TbAlertTriangle} label="Overdue" value={overdue}
                            sub={overdue > 0 ? "Need attention" : "All on track"}
                            iconBg="bg-red-50" iconColor="text-red-500" />
                        <StatCard icon={TbStar} label="Important" value={important}
                            sub="Not yet completed"
                            iconBg="bg-amber-50" iconColor="text-amber-500" />
                        <StatCard icon={TbClock} label="Due Today" value={dueToday}
                            sub="Incomplete tasks"
                            iconBg="bg-indigo-50" iconColor="text-indigo-500" />
                    </div>
                </div>

                {/* priority breakdown */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                    <p className="text-sm font-semibold text-gray-900 mb-4">Open tasks by priority</p>
                    <div className="space-y-3">
                        <Bar label="High"   count={high}   total={remaining} color="bg-red-500" />
                        <Bar label="Medium" count={medium} total={remaining} color="bg-warning" />
                        <Bar label="Low"    count={low}    total={remaining} color="bg-success" />
                    </div>
                </div>

                {total === 0 && (
                    <div className="text-center py-16 text-gray-400 text-sm">
                        No tasks yet â€” create one to see your stats.
                    </div>
                )}
            </div>
        </div>
    );
}
