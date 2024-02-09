import prisma from "../db";

import { BookInterface } from "../entities";

export class BookRepository {
  async getBooks(): Promise<BookInterface[]> {
    return await prisma.book.findMany({
      select: {
        id: true,
        cover_image: true,
        title: true,
        price: true,
      },
    });
  }

  async getBook(
    id: number
  ): Promise<{ success: boolean; message?: string; book?: BookInterface }> {
    const book = await prisma.book.findFirst({
      where: {
        id,
      },
    });
    return book
      ? { success: true, book }
      : { success: false, message: "book with such ID not found" };
  }
}
