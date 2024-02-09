import { Request, Response } from "express";

import { OrderServices } from "../services/order.services";

const orderServices = new OrderServices();

export const getUserOrders = async (req: Request, res: Response) => {
  const  userId  = req.authenticatedUser?.id;

  const orders = orderServices.getUserOrders(userId!);

  return res.status(200).json(orders);
};
