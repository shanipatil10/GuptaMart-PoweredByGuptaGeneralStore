import AuthForm from "@/components/auth/AuthForm";

export const metadata = {
  title: "Log In or Sign Up | GuptaMart",
  description:
    "Access your GuptaMart account to shop fresh groceries from Gupta General Store.",
};

export default function LoginPage() {
  return <AuthForm />;
}