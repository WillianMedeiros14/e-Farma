"use client";
import { queryClient } from "@/app/providers";
import { TypeSignIn } from "@/components/organism/modal-login";
import { useToast } from "@/components/ui/use-toast";
import {
  IUser,
  getUserDetailsService,
} from "@/services/getUserDetails.service";
import { signInService } from "@/services/signIn.service";

import { useRouter } from "next/navigation";
import { destroyCookie, setCookie } from "nookies";
import { ReactNode, createContext, useEffect } from "react";

interface AuthContextData {
  SignIn: (credentials: TypeSignIn) => void;
  SignOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);
export let authChannel: BroadcastChannel;

export function AuthProvider({ children }: AuthProviderProps) {
  const { toast } = useToast();
  const { replace } = useRouter();

  useEffect(() => {
    authChannel = new BroadcastChannel("auth");

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case "signIn":
          window.location.href = "/";

          break;
        case "signOut":
          destroyCookie(undefined, "userId", { path: "/" });
          window.location.href = "/";
          replace("/");
          break;
        default:
          break;
      }
    };
  }, [replace]);

  async function SignIn({ email, password }: TypeSignIn) {
    try {
      const result = await signInService({
        email,
        password,
      });

      const userId = result.user.uid;

      const dataUser = await getUserDetailsService({
        userId: userId,
      });

      queryClient.setQueriesData(
        { queryKey: ["keyUserDetails", userId] },
        () => {
          return {
            ...dataUser,
          };
        }
      );

      setCookie(undefined, "userId", userId, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      authChannel.postMessage("signIn");

      window.location.href = "/";

      toast({
        description: "Sign-in realizado com sucesso.",
      });
    } catch (error) {
      toast({
        description: "Credenciais inválidas!",
        variant: "destructive",
      });
    }
  }

  async function SignOut() {
    queryClient.clear();
    toast({
      description: "Sign-out realizado",
    });

    destroyCookie(undefined, "userId", { path: "/" });

    replace("/");
    authChannel.postMessage("signOut");
  }

  return (
    <AuthContext.Provider value={{ SignIn, SignOut }}>
      {children}
    </AuthContext.Provider>
  );
}
