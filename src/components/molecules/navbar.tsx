import Image from "next/image";
import { Button } from "../ui/button";
import { ModalLogin } from "../organism/modal-login";
import { ModalSignSignUp } from "../organism/modal-signSgnup";
import { ModalCar } from "../organism/modal-car";
import { isLoginSSR } from "@/functions/isLoginSSR";
import { DialogSignOut } from "./dialogSignOut";

export function Navbar() {
  return (
    <div className="mb-9 flex w-full items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-4">
        <Image
          src={"/assets/logoEFarmas.svg"}
          alt={"E-Farms"}
          width={112}
          height={20}
        />
      </div>

      <div className="flex">
        {isLoginSSR() ? (
          <div className="flex gap-3">
            <ModalCar />

            <DialogSignOut
              label={"Sair"}
              title={"Confirmar saída"}
              description={
                "Você está prestes a sair do sistema. Tem certeza de que deseja prosseguir? Se você sair, será desconectado da sua conta e precisará fazer login novamente para acessar o sistema."
              }
            />
          </div>
        ) : (
          <div className="flex gap-3 items-center">
            <ModalLogin />
            <span className="mx-4">ou</span>
            <ModalSignSignUp />
          </div>
        )}
      </div>
    </div>
  );
}
