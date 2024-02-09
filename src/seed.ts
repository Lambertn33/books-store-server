import prisma from "./db";

async function seedBooks() {
  const booksCount = await prisma.book.count();

  // seed only when books table is empty
  if (booksCount === 0) {
    const bookImage =
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg";
    await prisma.book.deleteMany();

    await prisma.book.createMany({
      data: [
        {
          price: 6,
          cover_image: bookImage,
          title: "Book 1",
          writer: "Writer 1",
          tags: ["FICTION", "SCIENCE"],
        },
        {
          price: 80,
          cover_image: bookImage,
          title: "Book 2",
          writer: "Writer 2",
          tags: ["FICTION", "SCIENCE"],
        },
        {
          price: 30,
          cover_image: bookImage,
          title: "Book 3",
          writer: "Writer 3",
          tags: ["FICTION", "SCIENCE"],
        },
        {
          price: 10,
          cover_image: bookImage,
          title: "Book 4",
          writer: "Writer 1",
          tags: ["NON_FICTION", "ESSAY"],
        },
        {
          price: 12,
          cover_image: bookImage,
          title: "Book 5",
          writer: "Writer 2",
          tags: ["FICTION", "NON_FICTION"],
        },
        {
          price: 42,
          cover_image: bookImage,
          title: "Book 6",
          writer: "Writer 3",
          tags: ["SCIENCE", "ESSAY"],
        },
        {
          price: 50,
          cover_image: bookImage,
          title: "Book 7",
          writer: "Writer 1",
          tags: ["FICTION", "SCIENCE"],
        },
        {
          price: 38,
          cover_image: bookImage,
          title: "Book 8",
          writer: "Writer 2",
          tags: ["ESSAY", "NON_FICTION", "SCIENCE"],
        },
        {
          price: 9,
          cover_image: bookImage,
          title: "Book 9",
          writer: "Writer 3",
          tags: ["FICTION", "SCIENCE", "NON_FICTION"],
        },
        {
          price: 15,
          cover_image: bookImage,
          title: "Book 10",
          writer: "Writer 1",
          tags: ["FICTION"],
        },
        {
          price: 10,
          cover_image: bookImage,
          title: "Book 11",
          writer: "Writer 2",
          tags: ["FICTION", "SCIENCE"],
        },
        {
          price: 20,
          cover_image: bookImage,
          title: "Book 12",
          writer: "Writer 3",
          tags: ["FICTION", "SCIENCE"],
        },
      ],
    });
  }
}

seedBooks()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
