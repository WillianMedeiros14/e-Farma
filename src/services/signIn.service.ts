import { TypeSignIn } from "@/components/organism/modal-login";
import { auth, signInWithEmailAndPassword } from "@/config/firebase";

export async function signInService(data: TypeSignIn) {
  const response = await signInWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );
  return response;
}
