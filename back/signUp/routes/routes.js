const Router = require("express");
const { json } = require("body-parser");
const { postUser, postRestaurant } = require("../controllers/signUpController.js");
const router = Router();

//router.use(json());

router.post("/sign-up", postUser);
router.post("/sign-up-restaurant", postRestaurant);



module.exports = router;