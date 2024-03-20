import { CarContext } from "@/context/car";
import { useContext } from "react";

export function useCar() {
  const context = useContext(CarContext);

  return context;
}
