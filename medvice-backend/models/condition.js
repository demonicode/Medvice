// conditions.js
const { DataTypes } = require('sequelize');

const Condition = (sequelize) => sequelize.define('conditions', {
    ConditionText: {
        type: DataTypes.TEXT,
        // allowNull: false
    },
    ConditionOnsetDates: {
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

module.exports = Condition;
