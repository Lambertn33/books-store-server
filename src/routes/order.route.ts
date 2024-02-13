import { Router } from "express";

import checkAuth from "../middleware/auth.middleware";

import {
  cancelOrder,
  getUserOrders,
  getUserOrder,
  makeOrder
} from "../controllers/order.controller";

const router = Router();

router.get("/:userId", checkAuth, getUserOrders);

router.get("/:userId/:orderId", checkAuth, getUserOrder);

router.put("/:userId/:orderId", checkAuth, cancelOrder)

router.post("/:userId", checkAuth, makeOrder);

export default router;
