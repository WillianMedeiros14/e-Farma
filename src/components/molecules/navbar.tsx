import Image from "next/image";
import { Button } from "../ui/button";

export function Navbar() {
  return (
    <div className="mb-9 flex w-full items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          src={"/assets/logoEFarmas.svg"}
          alt={"E-Farms"}
          width={112}
          height={20}
        />
      </div>

      <div>
        <Button
          variant="default"
          className="w-16 bg-primary-main text-white hover:bg-primary-main"
        >
          Entrar
        </Button>

        <span className="mx-4">ou</span>

        <Button
          variant="outline"
          className="w-25 bg-white text-black  hover:bg-white underline border-0 font-bold"
        >
          Cadastre-se
        </Button>
      </div>
    </div>
  );
}
