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
import { ItemCar } from "../atoms/itemCar";
import { InputSelect } from "../atoms/input-select";
import Image from "next/image";
import { useCar } from "@/hooks/useCar";

const formSchema = z.object({
  paymentMethod: z.string().min(1, {
    message: "Selecione um método de pagamento",
  }),
  street: z.string().min(1, {
    message: "Digite o seu logradouro",
  }),
  number: z.string().min(1, {
    message: "Digite o número de seu endereço",
  }),
  neighborhood: z.string().min(1, {
    message: "Digite o seu bairro",
  }),
  complement: z.string().min(1, {
    message: "Digite um ponto de referência",
  }),
});
export function ModalCar() {
  const { toast } = useToast();
  const {
    itemsCar,
    removeItemCar,

    handleIncreaseItemQuantity,
    handleDecreaseItemQuantity,
  } = useCar();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentMethod: "",
      street: "",
      number: "",
      neighborhood: "",
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
        description: "Erro ao finalizar compra",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values });
    mutate(values);
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {itemsCar.length > 0 && (
          <Button
            variant="default"
            className="w-17 bg-primary-main text-white hover:bg-primary-main"
            onClick={() => {
              form.reset();
            }}
          >
            <Image
              src={"/assets/shopping.svg"}
              alt={"shopping"}
              width={24}
              height={24}
            />

            <span className="ml-2">{itemsCar.length} itens</span>
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex flex-row items-center justify-between">
            <AlertDialogTitle className="font-semibold flex text-center text-2xl justify-center items-center">
              Produtos
            </AlertDialogTitle>
            <Button
              variant={"outline"}
              disabled={false}
              type="submit"
              className="w-3 text-1xl border-0"
              onClick={handleClose}
            >
              x
            </Button>
          </div>
        </AlertDialogHeader>

        <div className="w-full">
          {itemsCar.map((item) => (
            <ItemCar
              key={item.id}
              data={item}
              onRemove={() => removeItemCar(item.id)}
              handleDecreaseItemQuantity={() =>
                handleDecreaseItemQuantity(item.id)
              }
              handleIncreaseItemQuantity={() =>
                handleIncreaseItemQuantity(item.id)
              }
            />
          ))}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-6 w-full space-y-4"
            >
              <div className="mb-8">
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <InputSelect
                      title="Método de pagamento"
                      placeholder="Selecione um método"
                      data={[
                        { id: "Pix", name: "Pix" },
                        { id: "Cartão de débito", name: "Cartão de débito" },
                        { id: "Cartão de crédito", name: "crédito" },
                      ]}
                      field={{ ...field }}
                      placeholderSearch="Pesquise uma ocorrência"
                      placeholderSearchNotFound="Ocorrência não encontrada"
                    />
                  )}
                />
              </div>

              <span className="font-semibold">Endereço</span>

              <div className="flex justify-between">
                <div className="w-[62%] gap-4">
                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <InputComponent
                        title="Logradouro"
                        placeholder="Informe sua (ex.: Av, Beco, Rua, etc…)"
                        isLoading={isPending}
                        field={{ ...field }}
                      />
                    )}
                  />
                </div>

                <div className="w-[35%]">
                  <FormField
                    control={form.control}
                    name="number"
                    render={({ field }) => (
                      <InputComponent
                        title="Número"
                        placeholder="Número de residência"
                        isLoading={isPending}
                        field={{ ...field }}
                      />
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="neighborhood"
                render={({ field }) => (
                  <InputComponent
                    title="Bairro"
                    placeholder="Digite o seu bairro"
                    isLoading={isPending}
                    field={{ ...field }}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="complement"
                render={({ field }) => (
                  <InputComponent
                    title="Complemento"
                    placeholder="Informe um ponto de referência"
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
                Finalizar pedido
              </Button>
            </form>
          </Form>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
