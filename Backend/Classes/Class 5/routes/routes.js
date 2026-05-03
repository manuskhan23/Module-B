import express from "express";
import signupController from "../controller/signupController.js";
import loginController from "../controller/loginController.js";
import { createPost, getPost, updatePost, deletePost } from "../controller/postApi.js";

const router = express.Router();

router.post("/api/v1/signup", signupController);
router.post("/api/v1/login", loginController);

router.post("/api/createpost", createPost);
router.get("/api/getpost", getPost);
router.put("/api/updatepost/:id", updatePost);
router.delete("/api/deletepost/:id", deletePost);

export default router;