import { Request, Response } from "express";

import { BookServices } from "../services/book.services";

const bookServices = new BookServices();

export const getAllBooks = async (_: Request, res: Response) => {
  const books = await bookServices.getAllBooks();
  return res.status(200).json(books);
};

export const getOneBook = async (req: Request, res: Response) => {
  const book = await bookServices.getOneBook(parseInt(req.params.id));
  return book.success
    ? res.status(200).json(book)
    : res.status(404).json({ error: book.message });
};
