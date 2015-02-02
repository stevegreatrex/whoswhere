/*global module:false*/

module.exports = {
    db: process.env.OPENSHIFT_POSTGRESQL_DB_URL || 'postgres://postgres:postgres@localhost/whoswhere',
    ip: process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
    port: process.env.OPENSHIFT_NODEJS_PORT || 3000
};