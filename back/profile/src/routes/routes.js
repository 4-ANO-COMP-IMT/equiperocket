import Router from "express"
import { updateProfile, getProfile } from "../controller/profileController.js" 

const router = Router()


router.post("/profile", getProfile)
router.put("/profile/:email", updateProfile)

export default Router