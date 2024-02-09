import { Router } from "express";

import checkAuth from "../middleware/auth.middleware";

import {
  getUserOrders,
  getUserOrder,
  makeOrder,
} from "../controllers/order.controller";

const router = Router();

router.get("/", checkAuth, getUserOrders);

router.get("/:orderId", checkAuth, getUserOrder);

router.post("/", checkAuth, makeOrder);

export default router;
