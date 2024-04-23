import { OrganizationSwitcher, SignedIn, SignedOut, SignInButton, useAuth, UserButton } from "@clerk/clerk-react";

export default function App() {
  const user = useAuth();

  const getToken = async (user) => {
    return await user.getToken();
  }
  const userId = user.userId;

  console.log(user, getToken(user), userId)

  return (
    <header className="border-b flex items-center justify-between p-3">
      <div className="mx-[3rem]">
        <a href="/" className="flex gap-2 items-center text-xl uppercase font-extrabold text-black">
          <img src="../assets/react.svg" width="25" height="25" alt="logo" />
          Manifest
        </a>
      </div>

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