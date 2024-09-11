import Router from "express";
import {getEatery,getEateryNearby , getEateryById, addEatery}  from "../controllers/eateryController.js";


const router = Router();

// router.use(json());
router.get("/restaurants:id",getEateryById);
router.post("/restaurants",getEatery );
router.get('/restaurants/nearby', getEateryNearby);

router.post('/restaurants', addEatery);

export default router;