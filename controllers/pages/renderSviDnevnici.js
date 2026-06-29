
const mogojs = require('mongojs');
const db = mogojs('ednevnik',['evidencijas'])

const ucitajDnevnike = (req, res) => { 
    db.evidencijas.find({}, (err, evidencija) => {
        res.render('sviDnevnici', {evidencija: evidencija});
    })
}
module.exports = ucitajDnevnike;