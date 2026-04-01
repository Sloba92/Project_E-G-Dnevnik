const { Schema, model } = require("mongoose");

const Evidencija = new Schema({
    izvodjac_radova: { type: String, required: [true, "Name is required"] },
    objekat: { type: String, required: [true, "Object name is required"] },
    mesto: { type: String, required: [true, "Mesto name is required"] },
    investitor: { type: String, required: [true, "Name is required"] },
    dan: { type: String, required: true },
    datum: { type: Date, required: true },
    radno_vreme_pocetak: { type: String, required: true },
    radno_vreme_kraj: { type: String, required: true },
    ukupni_sati: { type: Number, required: true },
    opis_posla: { type: String, required: true },
    status_kvara: { type: String, required: true }
});

const EvidencijaModel = model ('Evidencija', Evidencija);
module.exports = EvidencijaModel;