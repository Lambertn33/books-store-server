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
        amount: true,
        status: true,
        userId: true,
      },
    });
  }

  async makeOrder(
    userId: number,
    bookIds: number[]
  ): Promise<{ success: boolean; message?: string }> {
    const books = await prisma.book.findMany({
      where: {
        id: {
          in: bookIds,
        },
      },
      select: {
        id: true,
        price: true,
      },
    });

    const totalAmount = books.reduce((acc, book) => acc + book.price, 0);

    // create order
    const newOrder = await prisma.order.create({
      data: {
        amount: totalAmount,
        status: "ORDERED",
        userId,
      },
    });

    // create orderBooks
    const orderBooksData = bookIds.map((bookId) => ({
      orderId: newOrder.id,
      bookId,
    }));

    await prisma.orderBook.createMany({
      data: orderBooksData,
    });

    return {
      success: true,
      message: "order made successfully",
    };
  }
}
