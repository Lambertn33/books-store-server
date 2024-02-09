import prisma from "../db";

import { OrderInterface } from "../entities/order.entity";

export class OrderRepository {
  // get all user orders
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

  // get a single order with its books
  async getUserOrder(userId: number, orderId: number) {
    return await prisma.order.findFirst({
      where: {
        userId,
        AND: {
          id: orderId,
        },
      },
      include: {
        books: {
          select: {
            book: {
              select: {
                cover_image: true,
                price: true,
                title: true,
                writer: true,
                tags: true,
              },
            },
          },
        },
      },
    });
  }

  // make an order
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
      const newOrder = await prisma.order.create({
        data: {
          amount: totalAmount,
          status: "ORDERED",
          userId,
        },
      });

      const orderBooksData = bookIds.map((bookId) => ({
        orderId: newOrder.id,
        bookId,
      }));
      await prisma.orderBook.createMany({
        data: orderBooksData,
      });

      await prisma.user.update({
        where: { id: userId },
        data: { points: user?.points! - totalAmount },
      });

      return {
        success: true,
        message: "order made successfully",
      };
    });

    return transaction;
  }

  // cancel an order
  async cancelOrder(
    userId: number,
    orderId: number
  ): Promise<{ success: boolean; message?: string }> {
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId,
      },
      select: {
        id: true,
        userId: true,
        amount: true,
      },
    });

    if (!order) return { success: false, message: "order not found" };

    const transaction = await prisma.$transaction(async (prisma) => {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "CANCELED" },
      });

      await prisma.user.update({
        where: { id: userId },
        data: { points: { increment: order.amount } },
      });

      return { success: true, message: "order canceled successfully" };
    });

    return transaction;
  }
}
