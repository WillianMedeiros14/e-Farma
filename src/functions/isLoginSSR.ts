import { cookies } from "next/headers";

export function isLoginSSR() {
  const cookieStore = cookies();
  const isUserId = cookieStore.get("userId")?.value;

  if (isUserId) {
    return true;
  } else {
    return false;
  }
}
