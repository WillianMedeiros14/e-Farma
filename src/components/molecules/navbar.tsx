import Image from "next/image";
import { Button } from "../ui/button";
import { ModalLogin } from "../organism/modal-login";
import { ModalSignSignUp } from "../organism/modal-signSgnup";

const token = "2";

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
        {token !== "" ? (
          <div className="flex gap-3">
            <Button
              variant="default"
              className="w-17 bg-primary-main text-white hover:bg-primary-main"
            >
              Carrinho
            </Button>

            <Button
              variant={"outline"}
              disabled={false}
              type="submit"
              className="w-15 border border-primary-main text-primary-main"
            >
              Sair
            </Button>
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
