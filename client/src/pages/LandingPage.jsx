import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import {
    TbArrowRight, TbLayoutKanban, TbStar, TbCalendar,
    TbSearch, TbCheck, TbBolt, TbShieldCheck, TbSparkles,
    TbBrandGithub, TbArrowUpRight,
} from "react-icons/tb";
import logo from "../assets/maze.png";

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

const FEATURES = [
    {
        icon: TbBolt,
        title: "Lightning fast",
        desc: "Instant search, keyboard-first navigation, zero loading spinners.",
        accent: "from-amber-50 to-orange-50",
        iconBg: "bg-amber-100",
        iconColor: "text-amber-500",
    },
    {
        icon: TbLayoutKanban,
        title: "Grid & list views",
        desc: "Switch between a spacious grid or a dense list — your workflow, your choice.",
        accent: "from-violet-50 to-purple-50",
        iconBg: "bg-violet-100",
        iconColor: "text-violet-500",
    },
    {
        icon: TbStar,
        title: "Priority levels",
        desc: "High, medium and low with color-coded stripes so the critical work pops instantly.",
        accent: "from-blue-50 to-indigo-50",
        iconBg: "bg-blue-100",
        iconColor: "text-blue-500",
    },
    {
        icon: TbCalendar,
        title: "Smart due dates",
        desc: "Overdue, today, tomorrow — deadlines are surfaced before they bite you.",
        accent: "from-emerald-50 to-teal-50",
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-500",
    },
    {
        icon: TbSearch,
        title: "Instant search",
        desc: "Find anything in milliseconds. Press / to jump straight in.",
        accent: "from-cyan-50 to-sky-50",
        iconBg: "bg-cyan-100",
        iconColor: "text-cyan-500",
    },
    {
        icon: TbShieldCheck,
        title: "Secure by default",
        desc: "Every request is tied to your Clerk identity. No shared state, ever.",
        accent: "from-rose-50 to-pink-50",
        iconBg: "bg-rose-100",
        iconColor: "text-rose-500",
    },
];

const STATS = [
    { value: "∞",     label: "Tasks supported" },
    { value: "<50ms", label: "Search latency" },
    { value: "100%",  label: "Keyboard navigable" },
    { value: "0",     label: "Distractions" },
];

const STEPS = [
    {
        number: "01",
        title: "Create your account",
        desc: "Sign up in under 30 seconds — no credit card, no onboarding wizard, no nonsense.",
    },
    {
        number: "02",
        title: "Capture your tasks",
        desc: "Add anything on your plate with a title, due date, and priority level. It takes two seconds.",
    },
    {
        number: "03",
        title: "Stay on top",
        desc: "Use My Day, Upcoming, and Important views to always know exactly what to tackle next.",
    },
];

function MockCard({ priority = "HIGH", title, done = false, delay = 0 }) {
    const stripe = { HIGH: "bg-rose-500", MEDIUM: "bg-amber-400", LOW: "bg-emerald-500" }[priority];
    const badge  = {
        HIGH:   "text-rose-500 bg-rose-50 border-rose-200",
        MEDIUM: "text-amber-500 bg-amber-50 border-amber-200",
        LOW:    "text-emerald-600 bg-emerald-50 border-emerald-200",
    }[priority];
    return (
        <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.4, ease: "easeOut" }}
            className="flex gap-0 rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm"
        >
            <div className={`w-[3px] shrink-0 ${stripe}`} />
            <div className="flex-1 px-3 py-2.5 flex items-center gap-3">
                <div className={`w-3.5 h-3.5 rounded border-2 flex items-center justify-center shrink-0 ${done ? "bg-blue-600 border-blue-600" : "border-gray-300"}`}>
                    {done && <TbCheck className="w-2 h-2 text-white" strokeWidth={3} />}
                </div>
                <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium truncate ${done ? "line-through text-gray-400" : "text-gray-700"}`}>{title}</p>
                </div>
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${badge}`}>{priority}</span>
            </div>
        </motion.div>
    );
}

export default function LandingPage() {
    return (
        <div className="w-full min-h-screen bg-white overflow-auto">

            {/* subtle gradient blobs */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-100/60 blur-[140px]" />
                <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-100/40 blur-[140px]" />
                <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-blue-50/50 blur-[120px]" />
            </div>

            {/* ── Navbar ── */}
            <header className="fixed top-0 inset-x-0 z-20 border-b border-gray-200 bg-white/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-10 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
                            <img src={logo} className="w-4 h-4 brightness-0 invert" alt="logo" />
                        </div>
                        <span className="text-sm font-bold text-gray-900 tracking-tight">Momentum</span>
                    </div>

                    <nav className="hidden md:flex items-center gap-1 text-sm text-gray-500">
                        <a href="#features" className="px-3 py-1.5 rounded-lg hover:text-gray-900 hover:bg-gray-100 transition-colors">Features</a>
                        <a href="#preview"  className="px-3 py-1.5 rounded-lg hover:text-gray-900 hover:bg-gray-100 transition-colors">Preview</a>
                        <a href="#how"      className="px-3 py-1.5 rounded-lg hover:text-gray-900 hover:bg-gray-100 transition-colors">How it works</a>
                    </nav>

                    <div className="flex items-center gap-2">
                        <SignedIn>
                            <Link to="/todos" className="text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 transition-colors">
                                Dashboard
                            </Link>
                            <UserButton />
                        </SignedIn>
                        <SignedOut>
                            <SignInButton>
                                <button className="text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 transition-colors">
                                    Sign in
                                </button>
                            </SignInButton>
                            <Link
                                to="/sign-up"
                                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
                            >
                                Get started
                            </Link>
                        </SignedOut>
                    </div>
                </div>
            </header>

            {/* ── Hero ── */}
            <motion.main
                className="max-w-7xl mx-auto px-10 pt-40 pb-20 text-center relative"
                variants={stagger}
                initial="hidden"
                animate="show"
            >
                <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-xs font-medium mb-8">
                    <TbSparkles className="w-3.5 h-3.5" />
                    Task management, beautifully simplified
                </motion.div>

                <motion.h1 variants={fadeUp} className="text-5xl sm:text-7xl font-bold tracking-tight text-gray-900 leading-[1.08] mb-6">
                    Focus on what<br />
                    <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
                        actually matters.
                    </span>
                </motion.h1>

                <motion.p variants={fadeUp} className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10">
                    Momentum is a fast, keyboard-first task manager built for people who hate bloated project tools.
                    Capture tasks in seconds, prioritize ruthlessly, ship everything.
                </motion.p>

                <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                        to="/todos"
                        className="flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium transition-colors text-sm"
                    >
                        Open app <TbArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>

                {/* stat pills */}
                <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3 mt-12">
                    {STATS.map(({ value, label }) => (
                        <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-gray-50">
                            <span className="text-sm font-bold text-gray-900">{value}</span>
                            <span className="text-xs text-gray-400">{label}</span>
                        </div>
                    ))}
                </motion.div>
            </motion.main>

            {/* ── App preview ── */}
            <section id="preview" className="max-w-7xl mx-auto px-10 pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative rounded-2xl border border-gray-200 bg-gray-50 p-6 overflow-hidden shadow-sm"
                >
                    <div className="flex items-center gap-1.5 mb-5">
                        <div className="w-3 h-3 rounded-full bg-rose-400/70" />
                        <div className="w-3 h-3 rounded-full bg-amber-400/70" />
                        <div className="w-3 h-3 rounded-full bg-emerald-400/70" />
                        <div className="flex-1 mx-4 h-6 rounded-lg bg-white border border-gray-200 flex items-center px-3">
                            <span className="text-[11px] text-gray-400">localhost:5175</span>
                        </div>
                    </div>

                    <div className="flex gap-3 h-[340px]">
                        {/* sidebar — bg-blue-100, matches real sidebar */}
                        <div className="w-44 shrink-0 rounded-xl bg-blue-100 border border-blue-200/60 p-3 flex flex-col gap-1">
                            <div className="flex items-center gap-2 px-2 py-1.5 mb-2">
                                <div className="w-5 h-5 rounded bg-blue-600 shrink-0" />
                                <span className="text-xs font-bold text-gray-900">Momentum</span>
                            </div>
                            {["My Day", "Upcoming", "Important", "Completed", "All Tasks"].map((item, i) => (
                                <div key={item} className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11px] font-medium ${i === 0 ? "bg-blue-600 text-white" : "text-gray-600"}`}>
                                    <div className={`w-3 h-3 rounded ${i === 0 ? "bg-white/30" : "bg-blue-200"}`} />
                                    {item}
                                </div>
                            ))}
                        </div>

                        {/* content — white, matches real outlet */}
                        <div className="flex-1 rounded-xl bg-white border border-gray-200 p-4 flex flex-col gap-3 overflow-hidden shadow-sm">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-bold text-gray-900">My Day</span>
                                <div className="flex items-center gap-2">
                                    <div className="h-6 w-32 rounded-lg bg-gray-100 border border-gray-200" />
                                    <div className="h-6 w-20 rounded-full bg-blue-600" />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {["3 Total", "2 Remaining", "1 Overdue"].map((c, i) => (
                                    <div key={c} className={`text-[10px] px-2 py-0.5 rounded-lg border font-medium ${i === 2 ? "border-rose-200 text-rose-500 bg-rose-50" : "border-gray-200 text-gray-500 bg-gray-50"}`}>{c}</div>
                                ))}
                            </div>
                            <div className="grid grid-cols-2 gap-2 flex-1 overflow-hidden">
                                <MockCard priority="HIGH"   title="Deploy auth service"     delay={0.2} />
                                <MockCard priority="HIGH"   title="Fix prod DB timeout"     delay={0.3} />
                                <MockCard priority="MEDIUM" title="Review pull request #42" delay={0.4} />
                                <MockCard priority="LOW"    title="Update README docs"      done delay={0.5} />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ── Features bento ── */}
            <section id="features" className="max-w-7xl mx-auto px-10 pb-24">
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={stagger}
                    className="text-center mb-12"
                >
                    <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
                        Everything you need
                    </motion.p>
                    <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                        Fewer features, more focus.
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-gray-500 mt-3 max-w-lg mx-auto text-sm leading-relaxed">
                        No sprints, no boards, no epics. Just tasks, priorities, and deadlines.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={stagger}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                >
                    {FEATURES.map(({ icon: Icon, title, desc, accent, iconBg, iconColor }) => (
                        <motion.div
                            key={title}
                            variants={fadeUp}
                            className={`group relative p-5 rounded-2xl border border-gray-200 bg-gradient-to-br ${accent} hover:border-gray-300 hover:shadow-sm transition-all duration-300 cursor-default`}
                        >
                            <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center mb-4`}>
                                <Icon className={`w-4.5 h-4.5 ${iconColor}`} />
                            </div>
                            <p className="text-sm font-semibold text-gray-900 mb-1.5">{title}</p>
                            <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* ── How it works ── */}
            <section id="how" className="max-w-7xl mx-auto px-10 pb-24">
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={stagger}
                    className="text-center mb-14"
                >
                    <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
                        How it works
                    </motion.p>
                    <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                        Up and running in minutes.
                    </motion.h2>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={stagger}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-10"
                >
                    {STEPS.map(({ number, title, desc }) => (
                        <motion.div key={number} variants={fadeUp} className="flex flex-col gap-4">
                            <span className="text-5xl font-black text-gray-300 tabular-nums select-none leading-none">{number}</span>
                            <div>
                                <p className="text-sm font-semibold text-gray-900 mb-2">{title}</p>
                                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* ── CTA banner ── */}
            <section className="max-w-7xl mx-auto px-10 pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative overflow-hidden rounded-2xl bg-blue-400 p-10 text-center"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12),transparent_60%)]" />
                    <TbSparkles className="w-8 h-8 text-blue-200 mx-auto mb-4" />
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
                        Ready to build momentum?
                    </h2>
                    <p className="text-blue-200 mb-8 text-sm max-w-md mx-auto">
                        Join and start shipping your tasks today. Free, fast, and always improving.
                    </p>
                    <Link
                        to="/sign-up"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white hover:bg-blue-50 text-blue-600 font-medium transition-colors text-sm"
                    >
                        Get started free <TbArrowUpRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </section>

            {/* ── Footer ── */}
            <footer className="border-t border-gray-200 py-8">
                <div className="max-w-7xl mx-auto px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center">
                            <img src={logo} className="w-3 h-3 brightness-0 invert" alt="" />
                        </div>
                        <span className="text-xs font-bold text-gray-500">Momentum</span>
                    </div>
                    <p className="text-xs text-gray-400">© 2026 Momentum. Built for focus.</p>
                    <a
                        href="https://github.com/florinbighiu/manifest-app"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors"
                    >
                        <TbBrandGithub className="w-4 h-4" /> Source
                    </a>
                </div>
            </footer>
        </div>
    );
}
