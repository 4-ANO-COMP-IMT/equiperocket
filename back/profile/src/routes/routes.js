import Router from "express"
import { updateProfile, getProfileData } from "../controller/profileController.js" 

const router = Router()


router.post("/profile", getProfileData)
router.post("/profile/:email", updateProfile)

export default router