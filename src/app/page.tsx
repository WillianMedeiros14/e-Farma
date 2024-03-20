import { Navbar } from "@/components/molecules/navbar";
import Image from "next/image";

import { ItemRemedy } from "@/components/atoms/intemRemedy";
import { ProductsHome } from "@/components/organism/products-home";

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

      <ProductsHome />
    </main>
  );
}
