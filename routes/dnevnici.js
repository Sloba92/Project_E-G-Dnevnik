const express = require('express');
const router = express.Router();

router.get('/', require('../controllers/pages/renderDnevnici'));
router.get('/:id', require('../controllers/pages/renderEditDnevnik'));

router.use('/api/evidencija', require('../controllers/pages/renderEditDnevnikSave'));

router.get('/', (req, res) => {
    res.render('dnevnici');
})


module.exports = router;