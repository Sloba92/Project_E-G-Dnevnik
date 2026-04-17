const express = require('express');
const router = express.Router();

router.get('/', require('../controllers/pages/renderDnevnici'));
router.get('/:id', require('../controllers/pages/renderEditDnevnik'));

router.get('/', (req, res) => {
    res.render('dnevnici');
})


module.exports = router;