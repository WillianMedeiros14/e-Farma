"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ItemRemedy } from "../atoms/intemRemedy";
import { useState } from "react";
import { useGetProductsHome } from "@/hooks/useGetProductsHome";

import { Loader2 } from "lucide-react";
import { useCar } from "@/hooks/useCar";

export function ProductsHome() {
  const { addItemCar, filter, setFilter } = useCar();

  const { data, isLoading } = useGetProductsHome({
    category: filter,
  });

  return (
    <view className="flex flex-col">
      <span className="text-center text-2xl font-bold">Nossos produtos</span>

      <div className="mt-8 mb-8 self-end">
        <Select onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtros" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categoria</SelectLabel>
              <SelectItem value="Todas">Todas</SelectItem>
              <SelectItem value="Anti-inflamatório">
                Anti-inflamatório
              </SelectItem>
              <SelectItem value="Alergias">Alergias</SelectItem>
              <SelectItem value="Dores">Dores</SelectItem>
              <SelectItem value="Gripe">Gripe</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap mx-auto gap-8 justify-center">
        {isLoading ? (
          <Loader2 className="mr-2 h-6 w-6 animate-spin" />
        ) : (
          <>
            {data && data?.length > 0 ? (
              <>
                {data?.map((item) => (
                  <ItemRemedy
                    key={item.id}
                    data={item}
                    onSelect={() => addItemCar(item)}
                  />
                ))}
              </>
            ) : (
              <>
                <span className="text-center text-1xl font-bold">
                  Não há produtos nesta categoria
                </span>
              </>
            )}
          </>
        )}
      </div>
    </view>
  );
}
