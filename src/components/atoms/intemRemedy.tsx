"use client";

import { useState } from "react";
import Image from "next/image";
import { IProducts } from "@/services/getProductsHome.service";

interface IItemRemedy {
  data: IProducts;
  onSelect: () => void;
}

export function ItemRemedy({ data, onSelect }: IItemRemedy) {
  const [hover, setHover] = useState(false);

  return (
    <button
      className="p-8 max-w-[340px] flex flex-col items-center rounded-sm relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onSelect}
    >
      <Image src={data.image} alt={data.name} width={160} height={160} />

      <p className="text-[14px] mt-6">{data.name}</p>

      <p className="text-3xl font-bold mt-4">R$ {data.price}</p>

      <div
        className={`absolute inset-0 flex flex-col items-center justify-center rounded-[16px] border border-[#191919] transition-all duration-300 ${
          hover ? "opacity-100 bg-white" : "opacity-0"
        }`}
      >
        <p className="text-black font-bold text-4xl">+</p>
        <p className="text-black">Adicionar</p>
      </div>
    </button>
  );
}
