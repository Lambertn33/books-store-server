import { BookInterface } from "./book.entity";

export interface OrderInterface {
  id?: number;
  userId: number;
  status: "ORDERED" | "CANCELED";
  amount: number;
  books?: BookInterface[];
}
