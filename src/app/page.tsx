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
import { ItemRemedy } from "@/components/atoms/items/intemRemedy";

export default function Home() {
  return (
    <main className="flex max-w-screen-2xl mx-auto min-h-screen flex-col p-10">
      <Navbar />

      <div className="w-full self-center mb-8">
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

      <div className="mt-8 mb-8 self-end">
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

      {/* <div className="border flex flex-col justify-center"> */}
      <div className="flex flex-wrap mx-auto gap-8 justify-center">
        <ItemRemedy />

        <ItemRemedy />

        <ItemRemedy />

        <ItemRemedy />

        <ItemRemedy />

        <ItemRemedy />

        <ItemRemedy />

        <ItemRemedy />

        <ItemRemedy />

        <ItemRemedy />
        <ItemRemedy />
        <ItemRemedy />
        <ItemRemedy />
        <ItemRemedy />
        <ItemRemedy />
      </div>
      {/* </div> */}
    </main>
  );
}
