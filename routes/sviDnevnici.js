const express = require('express');
const router = express.Router();

router.get('/', require('../controllers/pages/renderSviDnevnici'));

// router.get('/', (req, res) => {
//     res.render('sviDnevnici');
// })



module.exports = router;