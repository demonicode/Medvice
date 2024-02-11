// encounters.js
const { DataTypes } = require('sequelize');

const Encounter = (sequelize) => sequelize.define('encounters', {
    EncountersText: {
        type: DataTypes.TEXT,
        // allowNull: false
    },
    EncounterLocation: {
        type: DataTypes.TEXT,
        // allowNull: false
    },
    EncounterProvider: {
        type: DataTypes.TEXT,
        // allowNull: false
    },
    EncounterDates: {
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

module.exports = Encounter;
