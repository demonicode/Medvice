// immunizations.js
const { DataTypes } = require('sequelize');

const Immunization = (sequelize) => sequelize.define('immunizations', {
    Immunization: {
        type: DataTypes.TEXT,
        // allowNull: false
    },
    ImmunizationDates: {
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

module.exports = Immunization;
