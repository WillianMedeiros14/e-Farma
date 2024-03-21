import { TypeFormCar } from "@/components/organism/modal-car";
import {
  db,
  collection,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  getDoc,
} from "@/config/firebase";

interface IPurchaseService extends TypeFormCar {
  userId: string;
  purchaseDate: Date;
  products: {
    category?: string;
    description?: string;
    expirationDate: string;
    id: string;
    image: string;
    manufacturer?: string;
    name: string;
    pharmaceuticalForm?: string;
    presentation?: string;
    price: number;
    totalItems: number;
  }[];
  priceTotal: number;
}

export interface IFinalizePurchaseServiceProps {
  data: IPurchaseService;
}

export async function finalizePurchaseService({
  data,
}: IFinalizePurchaseServiceProps) {
  try {
    const historicRef = await addDoc(collection(db, "purchaseHistory"), {
      ...data,
    });

    for (const product of data.products) {
      const productRef = doc(collection(db, "products"), product.id);
      const productDoc = await getDoc(productRef);

      if (productDoc.exists()) {
        const currentQuantity = productDoc.data().quantityInStock;
        const newQuantity = currentQuantity - product.totalItems;

        if (newQuantity >= 0) {
          await updateDoc(productRef, { quantityInStock: newQuantity });
        } else {
          await updateDoc(productRef, { quantityInStock: 0 });
        }
      } else {
        throw new Error(`Produto ${product.name} não encontrado`);
      }
    }

    console.log("Compra finalizada com sucesso!");
  } catch (error) {
    console.error("Erro ao finalizar a compra:", error);
  }
}
