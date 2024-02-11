// patients.js
const { DataTypes } = require('sequelize');

const Patient = (sequelize) => sequelize.define('patients', {
    PatientUID: {
        type: DataTypes.TEXT,
        // allowNull: false,
        // primaryKey: true
    },
    NameFamily: {
        type: DataTypes.TEXT,
        // allowNull: false
    },
    NameGiven: {
        type: DataTypes.TEXT,
        // allowNull: false
    },
    DoB: {
        type: DataTypes.DATE,
        // allowNull: false
    },
    Gender: {
        type: DataTypes.TEXT,
        // allowNull: false
    },
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
});

module.exports = Patient;
