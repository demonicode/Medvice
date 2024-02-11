// medications.js
const { DataTypes } = require('sequelize');

const Medication = (sequelize) => sequelize.define('medications', {
    MedicationText: {
        type: DataTypes.TEXT,
        // allowNull: false
    },
    MedicationDates: {
        type: DataTypes.TEXT,
        // allowNull: false
    },
    PatientUID: {
        type: DataTypes.TEXT,
        // allowNull: false
    },
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

module.exports = Medication;
