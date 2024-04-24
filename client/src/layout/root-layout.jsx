import { Outlet, useNavigate } from "react-router-dom";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton, OrganizationSwitcher } from "@clerk/clerk-react";
import Button from "../components/Button";
import Sidebar from "../components/Sidebar";


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
      <div className="fixed top-4 right-4 flex gap-5 items-end justify-end">
        <SignedIn>
          <OrganizationSwitcher />
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <Button >Sign In {' '} <span aria-hidden="true"> →</span></Button>
          </SignInButton>
        </SignedOut>
      </div>
      <main className="flex flex-row">
        <SignedIn>
          <Sidebar />
        </SignedIn>
        <Outlet />
      </main>
    </ClerkProvider>
  );
}
