import { Router } from "express";

import { registerUser, loginUser, logoutUser } from "../controllers/user.controllers";

import checkAuth from "../middleware/auth.middleware";

const router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", checkAuth, logoutUser);

export default router;
