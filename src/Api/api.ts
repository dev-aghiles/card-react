import axios from "axios";
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  amount: number;
}

export const getPorducts = async (): Promise<Product[]> => {
  const response = await axios.get("https://fakestoreapi.com/products/");
  const data = response.data;
  return data;
};
