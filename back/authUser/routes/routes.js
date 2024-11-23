const Router = require("express");
const { authUser } = require("../controllers/authController");
const bodyParser = require("body-parser");
const { authMiddlewere } = require("../middlewares/authMiddleware");

const router = Router();

router.use(bodyParser.json());

router.post("/sign-in", authUser);
router.get("/profile", authMiddlewere);


module.exports = router;