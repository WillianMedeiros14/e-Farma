import { TypeSignUp } from "@/components/organism/modal-signSgnup";
import { auth, db } from "@/config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export async function signUpService(data: TypeSignUp) {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    if (response.user) {
      const userId = response.user.uid;

      try {
        const docRef = await setDoc(doc(db, "users", userId), {
          name: data.name,
          email: data.email,
          phone: data.phone,
        });

        return response;
      } catch (error) {
        await response.user.delete();
        throw error;
      }
    } else {
      return response;
    }
  } catch (error) {
    throw error;
  }
}
