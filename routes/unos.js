const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
})

router.post('/', require('../controllers/pages/renderIndex'));


module.exports = router;