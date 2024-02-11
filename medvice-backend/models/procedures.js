// procedures.js
const {DataTypes} = require('sequelize');

const Procedure = (sequelize) => sequelize.define('procedures', {
    ProcedureText: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ProcedureDates: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    PatientUID: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

module.exports = Procedure;
