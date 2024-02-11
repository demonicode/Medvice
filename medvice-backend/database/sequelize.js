const {Sequelize} = require("sequelize");
const {Client} = require("pg");

require('dotenv').config();

const createPostgresDatabase = async () => {
    const client = new Client({
        user: process.env.POSTGRES_DATABASE_USER,
        password: process.env.POSTGRES_DATABASE_PASSWORD,
        host: process.env.POSTGRES_DATABASE_HOST,
        database: "postgres",
    });

    await client.connect();

    const databaseName = process.env.POSTGRES_DATABASE_NAME;

    const res = await client.query(`SELECT datname
                                    FROM pg_catalog.pg_database
                                    WHERE datname = '${databaseName}'`);

    if (res.rowCount === 0) {
        console.log(`${databaseName} database not found, creating it.`);
        await client.query(`CREATE DATABASE "${databaseName}";`);
        console.log(`created database ${databaseName}`);
    } else {
        console.log(`${databaseName} database exists.`);
    }
};

const connectPostgres = async () => {
    try {
        await createPostgresDatabase()
        await sequelize.authenticate();
        console.log('Connected to Postgres');

        return sequelize;
    } catch (error) {
        console.log('Error connecting to Postgres:', error);
    }
};

const sequelize = new Sequelize(process.env.POSTGRES_URI, {
    define: {
        timestamps: false
    }
}) // Example for postgres
connectPostgres(sequelize)
const PatientModel = require('../models/patient')(sequelize);
const ConditionModel = require('../models/condition')(sequelize);
const ImmunizationModel = require('../models/immunizations')(sequelize);
const MedicationModel = require('../models/medications')(sequelize);
const ProcedureModel = require('../models/procedures')(sequelize);
const ClaimModel = require('../models/claims')(sequelize);
const ObservationModel = require('../models/observations')(sequelize);
const EncounterModel = require('../models/encounters')(sequelize);

module.exports = {
    sequelize,
    PatientModel,
    ConditionModel,
    ImmunizationModel,
    MedicationModel,
    ProcedureModel,
    ClaimModel,
    ObservationModel,
    EncounterModel
};