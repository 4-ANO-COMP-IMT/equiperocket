import Router from "express";
import { json } from "body-parser";
import { postUser } from "../controllers/signUpController.js";

const router = Router();

router.use(json());

router.get("/sign-up", postUser);



export default router;