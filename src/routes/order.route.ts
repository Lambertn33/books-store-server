import { Router } from "express";

import checkAuth from "../middleware/auth.middleware";

import { getUserOrders } from "../controllers/order.controller";

const router = Router();

router.get("/", checkAuth, getUserOrders);

export default router;