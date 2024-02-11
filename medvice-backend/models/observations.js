// observations.js
const { DataTypes } = require('sequelize');

const Observation = (sequelize) => sequelize.define('observations', {
    ObservationText: {
        type: DataTypes.TEXT,
        // allowNull: false
    },
    ObservationValue: {
        type: DataTypes.TEXT,
        // allowNull: false
    },
    ObservationUnit: {
        type: DataTypes.TEXT,
        // allowNull: false
    },
    ObservationDate: {
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

module.exports = Observation;
