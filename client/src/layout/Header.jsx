import { OrganizationSwitcher, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import SearchBar from "../components/SearchBar";

export default function Header() {
    return (
        <header className="flex items-center justify-between p-3 my-2 rounded-xl border border-gray-200">
            <SearchBar />
            <div className="flex gap-5 items-end justify-end">
                <SignedIn>
                    <OrganizationSwitcher />
                    <UserButton />
                </SignedIn>
                <SignedOut>
                    <SignInButton>
                        <button className="bg-slate-300 rounded-full px-4 py-2">Sign In</button>
                    </SignInButton>
                </SignedOut>
            </div>
        </header>
    )
}