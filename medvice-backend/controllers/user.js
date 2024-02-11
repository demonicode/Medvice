const {PatientModel, ObservationModel} = require('../database/sequelize');

const records = async (req, res) => {
    const user = req.user;

    const records = await ObservationModel.findAll({where: {PatientUID: user.patientId}});
    const map = new Map();

    for (const record of records) {
        if (!map.has(record.ObservationDate)) {
            map.set(record.ObservationDate, []);
        }

        map.get(record.ObservationDate).push(record);
    }

    res.json({
        code: 200,
        data: {
            records: Object.fromEntries(map)
        }
    });
}

const profile = async (req, res) => {
    const user = req.user;
    if (!user) return res.status(404).json({code: 404, message: 'User not found'});

    const patient = await PatientModel.findOne({where: {PatientUID: user.patientId}});
    if (!patient) return res.status(404).json({code: 404, message: 'Patient not found'});

    const records = await ObservationModel.findAll({where: {PatientUID: user.patientId}});
    const map = new Map();

    for (const record of records) {
        if (!map.has(record.ObservationText)) {
            map.set(record.ObservationText, record);
        } else {
            const existing = map.get(record.ObservationText);
            if (record.ObservationValue !== 'None' && new Date(record.ObservationDate) > new Date(existing.ObservationDate)) {
                map.set(record.ObservationText, record);
            }
        }
    }

    const values = []
    map.forEach((value, key) => {
        values.push(value);
    });

    res.json({
        code: 200,
        data: {
            patient: {
                familyName: patient.NameFamily,
                givenName: patient.NameGiven,
                dob: patient.DoB,
                gender: patient.Gender
            },
            records: values
        }
    });
}

module.exports = {profile, records};