const {Router} = require("express");
const router = Router();

router.get("/", require("../controllers/pages/renderIndex.js"));
router.get("/index", require("../controllers/pages/renderIndex.js"));
router.get("/projects", require("../controllers/pages/renderProjects.js"));
router.get("/inbox", require("../controllers/pages/renderInbox.js"));
router.get("/analytics", require("../controllers/pages/renderAnalytics.js"));
router.get("/settings", require("../controllers/pages/renderSettings.js"));
router.get("/login", require("../controllers/pages/renderLogin.js"));

module.exports = router;