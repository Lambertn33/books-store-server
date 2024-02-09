import { Router } from "express";

import { getAllBooks, getOneBook } from "../controllers/book.controllers";

const router = Router();

router.get("/", getAllBooks);

router.get("/:id", getOneBook);

export default router;
