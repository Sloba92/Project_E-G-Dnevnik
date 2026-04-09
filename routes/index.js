const { Router } = require("express");
const router = Router();

router.get("/", require('./home'));
router.use("/index", require('./unos'));
router.use("/projects", require("./dnevnici"));

router.get("/inbox", require("../controllers/pages/renderInbox.js"));
router.get("/analytics", require("../controllers/pages/renderAnalytics.js"));
router.get("/settings", require("../controllers/pages/renderSettings.js"));
router.get("/login", require("../controllers/pages/renderLogin.js"));

module.exports = router;