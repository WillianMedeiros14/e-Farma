"use client";

import { useToast } from "@/components/ui/use-toast";
import { IProducts } from "@/services/getProductsHome.service";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

export interface IItemsCar extends IProducts {
  quantityInCart: number;
}

interface CarContextData {
  addItemCar: (item: IProducts) => void;
  itemsCar: IItemsCar[];
  removeItemCar: (id: string) => void;
  handleIncreaseItemQuantity: (id: string) => void;
  handleDecreaseItemQuantity: (id: string) => void;
  handleClean: () => void;
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

interface CarProviderProps {
  children: ReactNode;
}

export const CarContext = createContext({} as CarContextData);

export function CarProvider({ children }: CarProviderProps) {
  const { toast } = useToast();

  const [itemsCar, setItemsCar] = useState<IItemsCar[]>([]);

  const [filter, setFilter] = useState("Todas");

  function addItemCar(item: IProducts) {
    const existingItem = itemsCar.find((existing) => existing.id === item.id);

    if (!existingItem) {
      setItemsCar((prevItems) => [
        ...prevItems,
        { ...item, quantityInCart: 1 },
      ]);
    } else {
      toast({
        description: "Este produto já está em seu carrinho",
        variant: "destructive",
      });
    }
  }

  function removeItemCar(id: string) {
    const updatedItemsCar = itemsCar.filter((item) => item.id !== id);
    setItemsCar(updatedItemsCar);
  }

  function handleIncreaseItemQuantity(id: string) {
    const updatedItemsCar = itemsCar.map((item) => {
      if (item.id === id) {
        return { ...item, quantityInCart: item.quantityInCart + 1 };
      }
      return item;
    });

    setItemsCar(updatedItemsCar);
  }

  function handleDecreaseItemQuantity(id: string) {
    const updatedItemsCar = itemsCar.map((item) => {
      if (item.id === id) {
        const newValue = item.quantityInCart - 1;

        return { ...item, quantityInCart: newValue };
      }
      return item;
    });

    setItemsCar(updatedItemsCar);
  }

  function handleClean() {
    setItemsCar([]);
  }

  return (
    <CarContext.Provider
      value={{
        addItemCar,
        itemsCar,
        removeItemCar,
        handleIncreaseItemQuantity,
        handleDecreaseItemQuantity,
        handleClean,
        filter,
        setFilter,
      }}
    >
      {children}
    </CarContext.Provider>
  );
}
