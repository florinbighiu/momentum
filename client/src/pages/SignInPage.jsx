import { SignIn } from "@clerk/clerk-react"

export default function SignInPage() {
    return (
        <div className="flex items-center justify-center w-full h-screen">
            <SignIn path="/sign-in" />
        </div>
    )
}