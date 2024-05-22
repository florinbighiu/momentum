import { Outlet, useNavigate } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { AnimatePresence } from "framer-motion";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
  const navigate = useNavigate();

  return (
    <ClerkProvider appearance={{
    }}

      navigate={navigate} publishableKey={PUBLISHABLE_KEY}>
      <AnimatePresence mode='wait'>
        <main className="flex flex-row">
          <Outlet />
        </main>
      </AnimatePresence>
    </ClerkProvider>
  );
}
