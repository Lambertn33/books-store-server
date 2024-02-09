import { Request, Response } from "express";

import { OrderServices } from "../services/order.services";

const orderServices = new OrderServices();

export const getUserOrders = async (req: Request, res: Response) => {
  const  userId  = req.authenticatedUser?.id;

  const orders = orderServices.getUserOrders(userId!);

  return res.status(200).json(orders);
};

export const makeOrder = async(req: Request, res: Response) => {
  const  userId  = req.authenticatedUser?.id;

  const bookIds = req.body.booksIds as number[];

  const orderResult = await orderServices.makeOrder(userId!, bookIds);

  return orderResult.success ?
    res.status(200).json({ message: orderResult.message })
    : res.status(500).json({ error: "an error occured" })
}
