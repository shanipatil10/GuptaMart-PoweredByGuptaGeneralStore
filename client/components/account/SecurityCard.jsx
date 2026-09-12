"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  signOut,
} from "firebase/auth";
import { ChevronDown, LogOut, Loader2 } from "lucide-react";
import { auth } from "@/lib/firebase";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import PasswordInput from "@/components/auth/PasswordInput";

/**
 * SecurityCard
 * Groups the two account-security actions from the reference: change
 * password (expands inline — no dialog dependency assumed) and logout.
 *
 * Change password reauthenticates with the current password first,
 * which is what Firebase requires before updatePassword() will
 * succeed for an older session — this also means the common
 * "auth/requires-recent-login" error mostly shouldn't surface, but
 * it's still handled below if Firebase ever returns it anyway.
 */
export default function SecurityCard({ user }) {
  const router = useRouter();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  function resetForm() {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!currentPassword) {
      setError("Please enter your current password.");
      return;
    }
    if (newPassword.length < 6) {
      setError("New password should be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    setIsSaving(true);
    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPassword);

      setSuccess("Your password has been updated.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setError("Your current password is incorrect.");
      } else if (err.code === "auth/requires-recent-login") {
        setError("For security, please log out and log back in, then try again.");
      } else {
        setError(getAuthErrorMessage(err));
      }
    } finally {
      setIsSaving(false);
    }
  }

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      await signOut(auth);
      router.push("/login");
    } catch {
      // If sign-out itself fails, keep the user on the page rather
      // than pretending it worked.
      setIsLoggingOut(false);
    }
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 [animation-delay:100ms] rounded-3xl border border-[#1c6d24]/10 bg-white p-5 shadow-[0_8px_30px_rgba(45,66,50,0.05)] sm:p-6">
      <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#1c6d24]">
        Security
      </h2>

      {/* Change password toggle row */}
      <button
        type="button"
        onClick={() => {
          setIsFormOpen((open) => !open);
          if (isFormOpen) resetForm();
        }}
        aria-expanded={isFormOpen}
        className="mt-4 flex w-full items-center justify-between rounded-2xl px-1 py-2 text-left transition-colors duration-200 hover:bg-[#ebf7ea]/60"
      >
        <div>
          <p className="text-sm font-semibold text-[#1a1c19]">Change Password</p>
          <p className="mt-0.5 text-xs text-[#707a6c]">
            Update your security credentials.
          </p>
        </div>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-[#707a6c] transition-transform duration-200 ${
            isFormOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {isFormOpen && (
        <form
          onSubmit={handleChangePassword}
          className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300 space-y-4 border-t border-[#1c6d24]/10 pt-4"
        >
          <PasswordInput
            id="currentPassword"
            label="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            autoComplete="current-password"
          />
          <PasswordInput
            id="newPassword"
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
          />
          <PasswordInput
            id="confirmNewPassword"
            label="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />

          {error && (
            <p role="alert" className="rounded-xl bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
              {error}
            </p>
          )}
          {success && (
            <p role="status" className="rounded-xl bg-green-50 px-3.5 py-2.5 text-sm text-green-700">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={isSaving}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[#1c6d24] text-sm font-semibold text-white transition-all duration-200 hover:bg-[#155a1d] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70"
          >
            {isSaving && <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />}
            Update Password
          </button>
        </form>
      )}

      {/* Logout */}
      <button
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-full border border-red-200 text-sm font-semibold text-red-600 transition-all duration-200 hover:bg-red-50 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70"
      >
        {isLoggingOut ? (
          <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
        ) : (
          <LogOut className="h-4 w-4" aria-hidden="true" />
        )}
        {isLoggingOut ? "Logging out..." : "Log Out"}
      </button>
    </div>
  );
}