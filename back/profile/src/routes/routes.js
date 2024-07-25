import Router from "express"
import { updateProfile, getProfile } from "../controller/profileController.js" 

const router = Router()


router.get("/profile/:email", getProfile)
router.put("/profile/:email", updateProfile)

export default Router