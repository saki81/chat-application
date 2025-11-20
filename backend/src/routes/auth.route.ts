import express from "express"
import { register, login, logout, updateProfile, checkAuth }  from "../controllers/auth.controller";
import  { protectedRoute }  from "../middleware/auth.middleware"


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", protectedRoute, updateProfile);

router.get("/check", protectedRoute, checkAuth)

export default router;