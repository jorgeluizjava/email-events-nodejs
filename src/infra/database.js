
const dbConfig = {
    user: 'lgmail_admin_st',
    password: 'Ducato.3730',
    database: 'legal-email-manager',
    server: 'db-legal-email-stage.cpejxionylyr.us-east-1.rds.amazonaws.com',
    pool: {
        max: 5,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false, // for azure
        trustServerCertificate: true
    }
};

module.exports = dbConfig;