
const express = require('express');
const router = express.Router();
const EvidencijaModel = require('../../models/EvidencijaModel');

router.post('/', async (req, res) => {
  try {
    const {
      izvodjac_radova,
      objekat,
      mesto,
      investitor,
      dan,
      datum,
      radno_vreme_pocetak,
      radno_vreme_kraj,
      ukupni_sati,
      podizvodjac_radova_name,
      opis_posla,
      status_kvara
    } = req.body;

    const newEvidencija = new EvidencijaModel({
      izvodjac_radova,
      objekat,
      mesto,
      investitor,
      dan,
      datum,
      radno_vreme_pocetak,
      radno_vreme_kraj,
      ukupni_sati,
      podizvodjac_radova_name,
      opis_posla,
      status_kvara
    });

    const saved = await newEvidencija.save();
    res.status(201).json({ message: 'Evidencija sacuvana!', data: saved });

  } catch (error) {
    res.status(400).json({ message: 'Geska pri zapisu!', error: error.message });
  }
});

module.exports = router;