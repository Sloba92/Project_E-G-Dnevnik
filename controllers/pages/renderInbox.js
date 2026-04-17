
const mogojs = require('mongojs');
const db = mogojs('ednevnik',['evidencijas'])

const ucitajDnevnike = (req, res) => { 
    db.evidencijas.find({}, (err, evidencija) => {
        res.render('inbox', {evidencija: evidencija});
    })
}
module.exports = ucitajDnevnike;