"use client";

import { useState } from "react";
import Image from "next/image";

export function ItemRemedy() {
  const [hover, setHover] = useState(false);

  return (
    <button
      className="p-8 max-w-[340px] flex flex-col items-center rounded-sm relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Image
        src="https://d3ddx6b2p2pevg.cloudfront.net/Custom/Content/Products/10/88/1088563_daaz-vitamina-c-tripla-acao-30-comprimidos-efervescentes_z1_637631663157731430.jpg"
        alt={"Vitamina C"}
        width={160}
        height={160}
      />

      <p className="text-[14px] mt-6">
        Vitamina C + Zinco Daaz com 30 comprimidos efervescente
      </p>

      <p className="text-3xl font-bold mt-4">R$ 36,90</p>

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
