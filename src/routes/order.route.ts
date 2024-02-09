import { Router } from "express";

import checkAuth from "../middleware/auth.middleware";

import { getUserOrders, makeOrder } from "../controllers/order.controller";

const router = Router();

router.get("/", checkAuth, getUserOrders);

router.post("/", checkAuth, makeOrder);

export default router;