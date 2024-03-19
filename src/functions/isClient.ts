import { cookies } from "next/headers";

export function isClient() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("auth.token")?.value;

  if (accessToken) {
    return true;
  } else {
    return false;
  }
}
