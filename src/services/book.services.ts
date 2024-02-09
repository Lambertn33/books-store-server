import { BookRepository } from "../repositories/book.repositories";

const bookRepository = new BookRepository();

export class BookServices {
  async getAllBooks() {
    return bookRepository.getBooks();
  }

  async getOneBook(id: number) {
    return bookRepository.getBook(id);
  }
}
