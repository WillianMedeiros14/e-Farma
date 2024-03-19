import {
  IGetUserDetailsServiceProps,
  getUserDetailsService,
} from "@/services/getUserDetails.service";
import { useQuery } from "@tanstack/react-query";

export function useGetUserDetails({
  userId,
  isEnabled = true,
}: IGetUserDetailsServiceProps) {
  return useQuery({
    queryKey: ["keyUserDetails", userId],
    queryFn: async () => {
      const result = await getUserDetailsService({ userId });

      return result;
    },
    enabled: isEnabled,
  });
}
