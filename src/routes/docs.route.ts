import { Router } from "express";

import { getApiDocs } from "../controllers/docs.controller";

const router = Router();

router.get("/", getApiDocs);

export default router;
