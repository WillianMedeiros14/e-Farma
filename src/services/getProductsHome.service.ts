import { collection, db, getDocs, query, where } from "@/config/firebase";

interface IError {
  error: {};
  message: string;
}

export interface IProducts {
  amount?: string;
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
  quantityInStock?: number;
}

export interface IGetProductsHomeServiceProps {
  category: string;
}

export async function getProductsHomeService({
  category,
}: IGetProductsHomeServiceProps): Promise<IProducts[] | null> {
  try {
    const docRef = collection(db, "products");
    const queryObject = query(docRef, where("category", "==", `${category}`));
    const queryRef = category === "Todas" ? docRef : queryObject;

    const docSnap = await getDocs(queryRef);

    let value: IProducts[] = [];

    docSnap.forEach((doc) => {
      const data = doc.data() as IProducts;

      const newValues = [...value];

      const newValue = {
        ...data,
        id: doc.id,
      };

      newValues.push(newValue);

      value = newValues;
    });

    if (value.length > 0) {
      return value;
    } else {
      return null;
    }
  } catch (error) {
    console.log({ error });
    return null;
  }
}
