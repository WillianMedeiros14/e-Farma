import { Navbar } from "@/components/molecules/navbar";
import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Footer } from "@/components/molecules/footer";

export default function Home() {
  return (
    <main className="flex flex-1 min-h-screen flex-col p-10">
      <Navbar />

      <div className="w-8/12 self-center mb-8">
        <Image
          src={"/assets/bannerPromotion.svg"}
          alt={"E-Farms"}
          layout="responsive"
          width={2000}
          height={300}
          objectFit="cover"
        />
      </div>

      <span className="text-center text-2xl font-bold">Nossos produtos</span>

      <div className="self-end mt-8">
        <Select>
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

      <div className="flex-1"></div>
    </main>
  );
}
