import {
  IGetProductsHomeServiceProps,
  getProductsHomeService,
} from "@/services/getProductsHome.service";

import { useQuery } from "@tanstack/react-query";

export function useGetProductsHome({ category }: IGetProductsHomeServiceProps) {
  return useQuery({
    queryKey: ["keyProductsHome", category],
    queryFn: () => getProductsHomeService({ category }),
  });
}
