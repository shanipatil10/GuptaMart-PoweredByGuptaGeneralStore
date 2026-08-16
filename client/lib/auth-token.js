import { auth } from "./firebase";

export async function getAuthToken() {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User is not authenticated");
  }

  return await user.getIdToken();
}