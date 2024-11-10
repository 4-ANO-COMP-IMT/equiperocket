import Router from "express";
import {getEatery,getEateryNearby , getEateryById, addEatery, updateOcuancy, getEateryByCNPJ}  from "../controllers/eateryController.js";


const router = Router();

// router.use(json());
router.get("/restaurants:id",getEateryById);
router.post("/restaurants",getEatery );
router.get('/restaurants/nearby', getEateryNearby);
router.post('/restaurants/occupancy',updateOcuancy );
router.post('/restaurants/add', addEatery);
router.post('/restaurants/cnpj', getEateryByCNPJ);

export default router;
