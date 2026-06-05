import ReactDOM from 'react-dom/client';
import './globals.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import RootLayout from './layout/root-layout';
import DashboardLayout from './layout/dashboard-layout';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import TodayTasks from './pages/TodayTasks';
import { UpcomingTasks } from './pages/UpcomingTasks';
import { ImportantTasks } from './pages/ImportantTasks';
import AllTasks from './pages/AllTasks';
import { CompletedTasks } from './pages/CompletedTaks';
import StatsPage from './pages/StatsPage';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) throw new Error('Missing Publishable Key');

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 30_000,
            retry: 1,
            refetchOnWindowFocus: true,
        },
    },
});

const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            { path: "/",         element: <LandingPage /> },
            { path: "/sign-in/*",element: <SignInPage /> },
            { path: "/sign-up/*",element: <SignUpPage /> },
            {
                element: <DashboardLayout />,
                path: "",
                children: [
                    { path: "/todos",     element: <TodayTasks /> },
                    { path: "/upcoming",  element: <UpcomingTasks /> },
                    { path: "/important", element: <ImportantTasks /> },
                    { path: "/completed", element: <CompletedTasks /> },
                    { path: "/all",       element: <AllTasks /> },
                    { path: "/stats",     element: <StatsPage /> },
                ],
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>
);
