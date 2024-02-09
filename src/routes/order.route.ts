import { Router } from "express";

import checkAuth from "../middleware/auth.middleware";

import {
  cancelOrder,
  getUserOrders,
  getUserOrder,
  makeOrder
} from "../controllers/order.controller";

const router = Router();

router.get("/", checkAuth, getUserOrders);

router.get("/:orderId", checkAuth, getUserOrder);

router.put("/:orderId", checkAuth, cancelOrder)

router.post("/", checkAuth, makeOrder);

export default router;
