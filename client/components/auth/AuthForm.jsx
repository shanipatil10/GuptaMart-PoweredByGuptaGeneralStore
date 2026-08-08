"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { Mail, Leaf, ArrowRight, Loader2 } from "lucide-react";

import { auth } from "@/lib/firebase";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/auth/PasswordInput";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MODE_CONTENT = {
  login: {
    title: "Welcome Back",
    subtitle: null,
    submitLabel: "Log In",
    loadingLabel: "Logging in...",
  },
  signup: {
    title: "Create Your Account",
    subtitle: null,
    submitLabel: "Create Account",
    loadingLabel: "Creating account...",
  },
  forgot: {
    title: "Reset Your Password",
    subtitle: "Enter your email and we'll send you a link to reset it.",
    submitLabel: "Send Reset Link",
    loadingLabel: "Sending link...",
  },
};

/**
 * AuthForm
 * Single card handling Login, Sign Up, and Forgot Password as three
 * internal view-states, matching the Stitch reference. Talks directly
 * to the existing Firebase Auth instance — never re-initializes it.
 */
export default function AuthForm() {
  const router = useRouter();

  const [mode, setMode] = useState("login"); // "login" | "signup" | "forgot"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const content = MODE_CONTENT[mode];

  function switchMode(nextMode) {
    setMode(nextMode);
    setError("");
    setSuccess("");
    setPassword("");
    setConfirmPassword("");
  }

  function validate() {
    if (!email.trim()) return "Please enter your email address.";
    if (!EMAIL_PATTERN.test(email.trim())) {
      return "Please enter a valid email address.";
    }

    if (mode === "forgot") return null;

    if (!password) return "Please enter your password.";

    if (mode === "signup") {
      if (password.length < 6) {
        return "Your password should be at least 6 characters.";
      }
      if (!confirmPassword) return "Please confirm your password.";
      if (password !== confirmPassword) return "Passwords do not match.";
    }

    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email.trim(), password);
        router.push("/");
      } else if (mode === "signup") {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
        router.push("/");
      } else {
        await sendPasswordResetEmail(auth, email.trim());
        setSuccess("Check your inbox for a link to reset your password.");
      }
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-50 px-4 py-12">
      {/* Ambient background: soft off-white with a very subtle green gradient glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-green-100/50 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-green-50 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Brand mark */}
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-700 shadow-sm">
            <Leaf className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
          </span>
          <span className="mt-4 text-[11px] font-semibold uppercase tracking-widest text-green-700">
            Gupta General Store
          </span>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-900">
            {content.title}
          </h1>
          {content.subtitle && (
            <p className="mt-1.5 max-w-xs text-sm text-neutral-500">
              {content.subtitle}
            </p>
          )}
        </div>

        {/* Card */}
        <div className="rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgba(16,24,16,0.08)] sm:p-8">
          {/* Login / Sign Up toggle — hidden in forgot-password mode */}
          {mode !== "forgot" && (
            <div className="mb-6 flex rounded-full bg-neutral-100 p-1">
              <button
                type="button"
                onClick={() => switchMode("login")}
                className={`flex-1 rounded-full py-2 text-sm font-medium transition-colors duration-200 ${
                  mode === "login"
                    ? "bg-white text-neutral-900 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => switchMode("signup")}
                className={`flex-1 rounded-full py-2 text-sm font-medium transition-colors duration-200 ${
                  mode === "signup"
                    ? "bg-white text-neutral-900 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                Sign Up
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-neutral-700"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
                  aria-hidden="true"
                />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="h-11 w-full rounded-xl border-neutral-200 bg-neutral-50 pl-10 text-sm text-neutral-800 placeholder:text-neutral-400 transition-colors duration-200 focus-visible:border-green-600/40 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-green-600/30"
                />
              </div>
            </div>

            {/* Password — not shown in forgot-password mode */}
            {mode !== "forgot" && (
              <PasswordInput
                id="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                labelAction={
                  mode === "login" ? (
                    <button
                      type="button"
                      onClick={() => switchMode("forgot")}
                      className="text-xs font-medium text-green-700 transition-colors duration-200 hover:text-green-800"
                    >
                      Forgot?
                    </button>
                  ) : null
                }
              />
            )}

            {/* Confirm Password — signup only */}
            {mode === "signup" && (
              <PasswordInput
                id="confirmPassword"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
              />
            )}

            {/* Error / success messages */}
            {error && (
              <p
                role="alert"
                className="rounded-xl bg-red-50 px-3.5 py-2.5 text-sm text-red-700"
              >
                {error}
              </p>
            )}
            {success && (
              <p
                role="status"
                className="rounded-xl bg-green-50 px-3.5 py-2.5 text-sm text-green-700"
              >
                {success}
              </p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="h-11 w-full rounded-xl bg-green-700 text-sm font-medium text-white transition-colors duration-200 hover:bg-green-800 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  {content.loadingLabel}
                </>
              ) : (
                <>
                  {content.submitLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </Button>
          </form>

          {/* Back to login — forgot-password mode only */}
          {mode === "forgot" && (
            <button
              type="button"
              onClick={() => switchMode("login")}
              className="mt-5 w-full text-center text-sm font-medium text-green-700 transition-colors duration-200 hover:text-green-800"
            >
              ← Back to login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}