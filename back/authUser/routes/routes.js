const Router = require("express");
const { getUser, authUser } = require("../controllers/authController");
const bodyParser = require("body-parser");
const { authMiddlewere } = require("../middlewares/authMiddleware");

const router = Router();

router.use(bodyParser.json());

router.get("/sign-in", authUser);
router.get("/profile", authMiddlewere , getUser);


module.exports = router;