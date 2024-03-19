import Image from "next/image";
import { Button } from "../ui/button";
import { ModalLogin } from "../organism/modal-login";
import { ModalSignSignUp } from "../organism/modal-signSgnup";

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
        <ModalLogin />

        <span className="mx-4">ou</span>

        <ModalSignSignUp />
      </div>
    </div>
  );
}
