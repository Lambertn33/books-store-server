import { Request, Response } from "express";

import { OrderServices } from "../services/order.services";

const orderServices = new OrderServices();

export const getUserOrders = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const orders = await orderServices.getUserOrders(parseInt(userId!));

  return res.status(200).json(orders);
};

export const getUserOrder = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const { orderId } = req.params;

  const orders = await orderServices.getUserOrder(parseInt(userId!), parseInt(orderId));

  return res.status(200).json(orders);
};

export const makeOrder = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const bookIds = req.body.booksIds as number[];

  const orderResult = await orderServices.makeOrder(parseInt(userId!), bookIds);

  return orderResult.success
    ? res.status(200).json({ message: orderResult.message })
    : res.status(500).json({ error: orderResult.message });
};

export const cancelOrder = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const { orderId } = req.params;

  const cancelOrderResult = await orderServices.cancelOrder(
    parseInt(userId!),
    parseInt(orderId)
  );

  return cancelOrderResult.success
    ? res.status(200).json({ message: cancelOrderResult.message })
    : res.status(500).json({ error: cancelOrderResult.message });
};
