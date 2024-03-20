"use client";

import Image from "next/image";

import { Button } from "../ui/button";
import { IProducts } from "@/services/getProductsHome.service";
import { IItemsCar } from "@/context/car";

interface IItemCar {
  data: IItemsCar;
  onRemove: () => void;
  handleIncreaseItemQuantity: () => void;
  handleDecreaseItemQuantity: () => void;
}

export function ItemCar({
  data,
  onRemove,
  handleIncreaseItemQuantity,
  handleDecreaseItemQuantity,
}: IItemCar) {
  return (
    <div className="flex flow-row justify-between">
      <div className="flex items-center gap-2 flex-1">
        <Image src={data.image} alt={data.name} width={72} height={72} />
        <p className="text-[13px] font-normal pr-5">{data.name}</p>
      </div>

      <div className="flex items-center gap-2">
        <p className="font-semibold text-[16px]">{data.quantityInCart}</p>
        <div className="flex flex-col">
          <Button
            variant="outline"
            size="icon"
            className="border-0"
            onClick={handleIncreaseItemQuantity}
            disabled={data.quantityInCart === data.quantityInStock}
          >
            <Image
              src={"/assets/upArrow.svg"}
              alt={"E-Farms"}
              width={24}
              height={24}
            />
          </Button>
          <Button
            style={{ transform: "rotate(180deg)" }}
            variant="outline"
            size="icon"
            className="border-0"
            disabled={data.quantityInCart === 1}
            onClick={handleDecreaseItemQuantity}
          >
            <Image
              src={"/assets/upArrow.svg"}
              alt={"E-Farms"}
              width={24}
              height={24}
            />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 w-[104px] justify-center">
        <p className="font-semibold text-2xl text-center">
          R$ {data.price * data.quantityInCart}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="border-0"
          onClick={onRemove}
        >
          <Image
            src={"/assets/delete.svg"}
            alt={"E-Farms"}
            width={24}
            height={24}
          />
        </Button>
      </div>
    </div>
  );
}
