import { Router } from "express";

import { registerUser, loginUser, logoutUser, userProfile } from "../controllers/user.controllers";

import checkAuth from "../middleware/auth.middleware";

const router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", checkAuth, userProfile);

router.post("/logout", checkAuth, logoutUser);

export default router;
