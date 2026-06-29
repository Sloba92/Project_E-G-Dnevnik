const express = require('express');
const router = express.Router();
const EvidencijaModel = require('../../models/EvidencijaModel');

router.put('/:id', async (req, res) => {
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

        const updated = await EvidencijaModel.findByIdAndUpdate(
            req.params.id,
            {
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
            },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ message: 'Evidencija nije pronadjena'});
        }

        res.status(200).json({ message: 'Evidencija azurirana', data: updated});

    } catch (error) {
        res.status(400).json({ message: 'Greska pri azuriranju', error: error.message})
    }
});

module.exports = router;