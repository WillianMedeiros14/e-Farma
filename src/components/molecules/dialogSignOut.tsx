"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/config/firebase";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { Loader2 } from "lucide-react";

interface DialogSignOutProps {
  label: string;
  title: string;
  description: string;
}

export function DialogSignOut({
  label,
  title,
  description,
}: DialogSignOutProps) {
  const { SignOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  function handleSignOut() {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        SignOut();
        setIsLoading(false);
      })
      .catch((error) => {
        toast({
          description: "Erro ao sair da aplicação",
          variant: "destructive",
        });

        setIsLoading(false);
      });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"outline"}
          className="w-15 border border-primary-main text-primary-main"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {label}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              handleSignOut();
            }}
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
