"use client";
import {
  AlertDialog,
  AlertDialogContent,
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

const formSchema = z
  .object({
    name: z.string().min(5, {
      message: "Nome deve ter pelo menos 6 caracteres",
    }),
    email: z
      .string()
      .min(5, {
        message: "E-mail é um campo obrigatório",
      })
      .email({ message: "E-mail inválido" }),
    phone: z.string().min(11, {
      message: "Digie um numero de telefone válido",
    }),

    password: z.string().min(8, {
      message: "Senha deve conter pelo menos 8 caracteres",
    }),
    confirmPassword: z.string().min(8, {
      message: "A confirmação de senha deve conter pelo menos 8 caracteres",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export function ModalSignSignUp() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      confirmPassword: "",
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
        description: "Erro ao criar cadastro",
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
          variant="outline"
          className="w-25 bg-white text-black  hover:bg-white underline border-0 font-bold"
          onClick={() => {
            form.reset();
          }}
        >
          Cadastre-se
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-semibold flex flex-col text-center">
            <span className="text-3xl">Cadastre-se</span>

            <span className="text-base font-normal">
              Para conseguir realizar seus pedidos
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
                name="name"
                render={({ field }) => (
                  <InputComponent
                    title="Nome"
                    placeholder="Digite seu nome"
                    isLoading={isPending}
                    field={{ ...field }}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <InputComponent
                    title="Telefone"
                    placeholder="Digite seu telefone"
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

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <InputComponent
                    title="Confirmação de senha"
                    type="password"
                    placeholder="Confirm sua senha"
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
                Cadastrar
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
