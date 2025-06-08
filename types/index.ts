export interface IProduct {
  id: string;
  brand: string;
  name: string;
  image: string;
  description: string;
  count: number;
  price: number;
  sold: number;
}

export interface IMessage {
  id: string;
  text: string;
  image?: string;
  products?: IProduct[];
  sender: "user" | "ai";
}
