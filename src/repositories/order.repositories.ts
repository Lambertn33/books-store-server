import prisma from "../db";

import { OrderInterface } from "../entities/order.entity";

export class OrderRepository {
  async getUserOrders(userId: number): Promise<OrderInterface[]> {
    return await prisma.order.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        status: true,
        userId: true,
      },
    });
  }
}
