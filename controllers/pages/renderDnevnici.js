const mongojs = require('mongojs');
const db = mongojs('ednevnik', ['evidencijas']);

const renderDnevnici = (req, res) => {
    const isEdit = req.query.edit === 'true';
    db.evidencijas.find({}, (err, evidencija) => {
        res.render('dnevnici', { evidencija: evidencija, edit: isEdit });
    })
}

module.exports = renderDnevnici;