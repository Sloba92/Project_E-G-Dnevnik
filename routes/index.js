const { Router } = require("express");
const router = Router();

router.get("/", require('./home'));
router.use("/index", require('./unos'));
router.use("/dnevnici", require("./dnevnici"));
router.use("/sviDnevnici", require("./sviDnevnici"));

router.get("/statistika", require("../controllers/pages/renderStatistika.js"));
router.get("/settings", require("../controllers/pages/renderSettings.js"));
router.get("/login", require("../controllers/pages/renderLogin.js"));

module.exports = router;