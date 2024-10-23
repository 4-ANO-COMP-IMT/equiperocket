import Router from "express";
import {getEatery,getEateryNearby , getEateryById, addEatery, updateOcuancy}  from "../controllers/eateryController.js";


const router = Router();

// router.use(json());
router.get("/restaurants:id",getEateryById);
router.post("/restaurants",getEatery );
router.get('/restaurants/nearby', getEateryNearby);
router.post('/restaurants/:id/occupancy',updateOcuancy );
router.post('/restaurants/add', addEatery);

export default router;
