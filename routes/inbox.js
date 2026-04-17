const express = require('express');
const router = express.Router();

router.get('/', require('../controllers/pages/renderInbox'));

router.get('/', (req, res) => {
    res.render('inbox');
})



module.exports = router;