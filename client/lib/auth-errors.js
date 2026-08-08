/**
 * Maps Firebase Authentication error codes to plain, user-friendly messages.
 * Never surface err.message from Firebase directly in the UI — it's written
 * for developers, not shoppers.
 *
 * Usage:
 *   import { getAuthErrorMessage } from "@/lib/auth-errors";
 *   catch (err) { setError(getAuthErrorMessage(err)); }
 */

const AUTH_ERROR_MESSAGES = {
  "auth/invalid-email": "That doesn't look like a valid email address.",
  "auth/missing-password": "Please enter your password.",
  "auth/weak-password": "Your password should be at least 6 characters.",
  "auth/email-already-in-use":
    "An account with this email already exists. Try logging in instead.",
  "auth/user-not-found": "No account found with this email.",
  "auth/wrong-password": "Incorrect email or password.",
  "auth/invalid-credential": "Incorrect email or password.",
  "auth/too-many-requests":
    "Too many attempts. Please wait a moment and try again.",
  "auth/network-request-failed":
    "Network error. Please check your connection and try again.",
  "auth/user-disabled":
    "This account has been disabled. Please contact support.",
};

const DEFAULT_MESSAGE = "Something went wrong. Please try again.";

export function getAuthErrorMessage(error) {
  const code = error?.code;
  if (code && AUTH_ERROR_MESSAGES[code]) {
    return AUTH_ERROR_MESSAGES[code];
  }
  return DEFAULT_MESSAGE;
}