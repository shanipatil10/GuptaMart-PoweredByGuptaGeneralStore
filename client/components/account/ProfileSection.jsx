"use client";

import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { Pencil, X, Loader2, ShieldCheck } from "lucide-react";
import { auth } from "@/lib/firebase";
import { getAuthErrorMessage } from "@/lib/auth-errors";

function getInitials(name, email) {
  if (name && name.trim()) {
    const parts = name.trim().split(/\s+/);
    return parts.length > 1
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : parts[0].slice(0, 2).toUpperCase();
  }
  return (email || "?").slice(0, 2).toUpperCase();
}

/**
 * ProfileSection
 * Shows the authenticated user's real Firebase identity. Only
 * displayName is editable — that's the only profile field Firebase's
 * email/password auth actually supports without a backend. Email is
 * shown read-only since it's the Firebase-verified identity, not a
 * freely editable field.
 */
export default function ProfileSection({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user.displayName || "");
  // Local mirror of the saved name — updateProfile() doesn't retrigger
  // AuthContext's onAuthStateChanged, so we reflect the save here
  // instead of relying on `user` to update itself.
  const [savedName, setSavedName] = useState(user.displayName || "");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleCancel() {
    setDisplayName(savedName);
    setError("");
    setIsEditing(false);
  }

  async function handleSave(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!displayName.trim()) {
      setError("Please enter your name.");
      return;
    }

    setIsSaving(true);
    try {
      await updateProfile(auth.currentUser, { displayName: displayName.trim() });
      setSavedName(displayName.trim());
      setSuccess("Profile updated.");
      setIsEditing(false);
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 rounded-3xl border border-[#1c6d24]/10 bg-white p-5 shadow-[0_8px_30px_rgba(45,66,50,0.05)] sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ebf7ea] text-lg font-semibold text-[#1c6d24]">
            {getInitials(savedName, user.email)}
          </span>
          <div>
            <p className="text-base font-semibold text-[#1a1c19]">
              {savedName || "Your Account"}
            </p>
            <p className="text-sm text-[#707a6c]">{user.email}</p>
            <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-[#ebf7ea] px-2.5 py-1 text-[11px] font-semibold text-[#1c6d24]">
              <ShieldCheck className="h-3 w-3" aria-hidden="true" />
              Connected via Firebase
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => (isEditing ? handleCancel() : setIsEditing(true))}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#1c6d24]/20 px-4 py-2 text-xs font-semibold text-[#1a1c19] transition-all duration-200 hover:bg-[#ebf7ea] active:scale-[0.98]"
        >
          {isEditing ? (
            <>
              <X className="h-3.5 w-3.5" aria-hidden="true" />
              Cancel
            </>
          ) : (
            <>
              <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
              Edit Profile
            </>
          )}
        </button>
      </div>

      {isEditing && (
        <form
          onSubmit={handleSave}
          className="mt-6 animate-in fade-in slide-in-from-top-2 duration-300 space-y-5 border-t border-[#1c6d24]/10 pt-6"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="displayName"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.05em] text-[#4e6452]"
              >
                Full Name
              </label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your full name"
                autoComplete="name"
                className="h-11 w-full rounded-xl border border-[#1c6d24]/15 bg-white px-4 text-sm text-[#1a1c19] placeholder:text-[#9aa39a] transition-all duration-200 ease-out focus:border-[#1c6d24]/40 focus:outline-none focus:ring-2 focus:ring-[#1c6d24]/20"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.05em] text-[#4e6452]">
                Email Address
              </label>
              <div className="flex h-11 items-center justify-between rounded-xl border border-[#1c6d24]/10 bg-[#f4f4ee] px-4 text-sm text-[#707a6c]">
                <span className="truncate">{user.email}</span>
                <span className="ml-2 shrink-0 text-[11px] italic text-[#9aa39a]">
                  Read-only via Firebase
                </span>
              </div>
            </div>
          </div>

          {error && (
            <p role="alert" className="rounded-xl bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
              {error}
            </p>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-[#1c6d24] px-5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#155a1d] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70"
            >
              {isSaving && <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />}
              Save Changes
            </button>
          </div>
        </form>
      )}

      {!isEditing && success && (
        <p role="status" className="mt-4 text-xs font-medium text-[#1c6d24]">
          {success}
        </p>
      )}
    </div>
  );
}