const mongojs = require('mongojs');
const db = mongojs('ednevnik', ['evidencijas']);

const renderDnevnici = (req, res) => {
    db.evidencijas.find({}, (err, evidencija) => {
        res.render('dnevnici', { evidencija: evidencija });
    })
}

module.exports = renderDnevnici;