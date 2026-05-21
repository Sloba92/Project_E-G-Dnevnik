const mongojs = require('mongojs');
const db = mongojs('ednevnik', ['evidencijas']);

const editDnevnik = (req, res) => {
    let id = req.params.id;
     const isEdit = req.query.edit === 'true';
    db.evidencijas.findOne({ _id: mongojs.ObjectID(id) }, (err, evidencija) => {
        if (err) return res.status(500).send(err);
        res.render('dnevnici', { evidencija: evidencija, edit: isEdit });
    })
}

module.exports = editDnevnik;