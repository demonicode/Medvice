// claims.js
const {DataTypes} = require('sequelize');

const Claim = (sequelize) => sequelize.define('claims', {
    ClaimProvider: {
        type: DataTypes.TEXT,
        // allowNull: false
    },
    ClaimInsurance: {
        type: DataTypes.TEXT,
        // allowNull: false
    },
    ClaimDate: {
        type: DataTypes.TEXT,
        // allowNull: false
    },
    ClaimType: {
        type: DataTypes.TEXT,
        // allowNull: false
    },
    ClaimItem: {
        type: DataTypes.TEXT,
        // allowNull: false
    },
    ClaimUSD: {
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

module.exports = Claim;
