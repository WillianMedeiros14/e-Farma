"use client";
import { useToast } from "@/components/ui/use-toast";

import { useRouter } from "next/navigation";
import { destroyCookie, setCookie } from "nookies";
import { ReactNode, createContext, useEffect } from "react";

interface CredentialsProps {
  cpf: string;
  password: string;
  isAdmin?: boolean;

  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
interface AuthContextData {
  SignIn: (credentials: CredentialsProps) => void;
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
          // replace("/admin/agents");
          window.location.href = "/admin";
          break;
        case "signOut":
          destroyCookie(undefined, "auth.token", { path: "/" });
          destroyCookie(undefined, "user", { path: "/" });
          replace("/");
          break;
        default:
          break;
      }
    };
  }, [replace]);

  async function SignIn({
    cpf,
    password,
    isAdmin,
    setLoading,
  }: CredentialsProps) {
    try {
      setLoading(true);
      // const { data } = await api.post("/auth/signin", {
      //   cpf,
      //   password,
      //   isAdmin,
      // });

      // api.defaults.headers.common["Authorization"] =
      //   `Bearer ${data.accessToken}`;

      // setCookie(undefined, "user", String(isAdmin), {
      //   maxAge: 60 * 60 * 24 * 30, // 30 days
      //   path: "/",
      // });

      // setCookie(undefined, "userId", data.userId, {
      //   maxAge: 60 * 60 * 24 * 30, // 30 days
      //   path: "/",
      // });

      // setCookie(undefined, "auth.token", data.accessToken, {
      //   maxAge: 60 * 60 * 24 * 30, // 30 days
      //   path: "/",
      // });

      // authChannel.postMessage("signIn");

      // window.location.href = "/admin/agents";

      // toast({
      //   description: "Sign-in realizado com sucesso.",
      // });
    } catch (error) {
      toast({
        description: "Credenciais inválidas!",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function SignOut() {
    toast({
      description: "Sign-out realizado",
    });
    destroyCookie(undefined, "auth.token", { path: "/" });
    destroyCookie(undefined, "user", { path: "/" });

    replace("/");
    authChannel.postMessage("signOut");
  }

  return (
    <AuthContext.Provider value={{ SignIn, SignOut }}>
      {children}
    </AuthContext.Provider>
  );
}
