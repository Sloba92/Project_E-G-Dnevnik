const {Router} = require("express");
const router = Router();

router.get("/", require("../controlers/pages/renderIndex.js"));

module.exports = router;