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
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { points: true },
    });

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

    if (totalAmount > user?.points!) {
      return {
        success: false,
        message: "You have insufficient points to buy these books",
      };
    }

    const transaction = await prisma.$transaction(async (prisma) => {
      // Create the order
      const newOrder = await prisma.order.create({
        data: {
          amount: totalAmount,
          status: "ORDERED",
          userId,
        },
      });

      // Create orderBooks
      const orderBooksData = bookIds.map((bookId) => ({
        orderId: newOrder.id,
        bookId,
      }));
      await prisma.orderBook.createMany({
        data: orderBooksData,
      });

      // Deduct points from user's account
      await prisma.user.update({
        where: { id: userId },
        data: { points: user?.points! - totalAmount },
      });

      return {
        success: true,
        message: "order made successfully",
      };
    });

    // Return the newly created order
    return transaction;
  }
}
