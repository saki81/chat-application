import express from "express";
import { getUsersSidebar, getMessages, sendMessage } from "../controllers/message.controller";
import { protectedRoute } from "../middleware/auth.middleware";


const router = express.Router();

router.get("/users", protectedRoute, getUsersSidebar);
router.get("/:id", protectedRoute, getMessages);

router.post("/send/:id", protectedRoute, sendMessage)

export default router;