"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React from "react";
import { InputComponent } from "../atoms/input-comnponent";

import { Form, FormField } from "../ui/form";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  email: z
    .string()
    .min(5, {
      message: "E-mail é um campo obrigatório",
    })
    .email({ message: "E-mail inválido" }),
  password: z.string().min(8, {
    message: "Senha deve conter pelo menos 8 caracteres",
  }),
});

export function ModalLogin() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      return null;
    },
    onSuccess: () => {
      form.reset();
      handleClose();
    },

    onError(error: any) {
      const { data } = error?.response;

      console.log({ data });

      toast({
        description: "Erro ao realizar login",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="default"
          className="w-16 bg-primary-main text-white hover:bg-primary-main"
          onClick={() => {
            form.reset();
          }}
        >
          Entrar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-semibold flex flex-col text-center">
            <span className="text-3xl">Entre</span>

            <span className="text-base font-normal">
              Informe seu e-mail e senha
            </span>
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className="w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-6 w-full space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <InputComponent
                    title="E-mail"
                    placeholder="Informe seu e-mail"
                    isLoading={isPending}
                    field={{ ...field }}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <InputComponent
                    title="Senha"
                    type="password"
                    placeholder="Digite sua senha"
                    isLoading={isPending}
                    field={{ ...field }}
                  />
                )}
              />

              <Button
                disabled={false}
                type="submit"
                className="w-full bg-primary-main"
              >
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Entrar
              </Button>

              <Button
                variant={"outline"}
                disabled={false}
                type="submit"
                className="w-full"
                onClick={handleClose}
              >
                Cancelar
              </Button>
            </form>
          </Form>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
