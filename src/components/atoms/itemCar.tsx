import Image from "next/image";

import { Button } from "../ui/button";

export function ItemCar() {
  return (
    <div className="flex flow-row justify-between">
      <div className="flex items-center gap-2 flex-1">
        <Image
          src="https://d3ddx6b2p2pevg.cloudfront.net/Custom/Content/Products/10/88/1088563_daaz-vitamina-c-tripla-acao-30-comprimidos-efervescentes_z1_637631663157731430.jpg"
          alt={"Vitamina C"}
          width={72}
          height={72}
        />
        <p className="text-[13px] font-normal">
          Vitamina C + Zinco Daaz com 30 comprimidos efervescente
        </p>
      </div>

      <div className="flex items-center gap-2">
        <p className="font-semibold text-[16px]">1</p>
        <div className="flex flex-col">
          <Button variant="outline" size="icon" className="border-0">
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

      <div className="flex items-center gap-2">
        <p className="font-semibold text-2xl">R$ 36,90</p>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="border-0">
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
