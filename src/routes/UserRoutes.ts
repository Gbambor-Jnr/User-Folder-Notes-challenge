import express, { Router } from "express";
import { createUser, loginUser } from "../controllers/User";

const router = Router();

router.post("/users", createUser);
router.post("/users/login", loginUser);

export default router;
