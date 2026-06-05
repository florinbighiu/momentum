import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
    return (
        <div className="flex items-center justify-center w-full min-h-screen bg-gray-50">
            <SignUp path="/sign-up" appearance={{
                variables: {
                    colorBackground: "#ffffff",
                    colorInputBackground: "#f9fafb",
                    colorInputText: "#111827",
                    colorText: "#111827",
                    colorTextSecondary: "#6b7280",
                    colorPrimary: "#2563eb",
                    colorNeutral: "#6b7280",
                    borderRadius: "0.75rem",
                },
            }} />
        </div>
    );
}
