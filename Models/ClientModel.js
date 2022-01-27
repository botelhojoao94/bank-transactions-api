const db = require('../Database/dbConection')

module.exports = class ClientModel {

    static createClient(client, callback) {
        return db.query("insert into client (id, name, cpf, password) values (uuid(), ?, ?, ?)", [client.name, client.cpf, client.password], callback);
    };

    static getClient(client, callback) {
        return db.query("select id from client where cpf = ? and password = ?", [client.cpf, client.password], callback)
    };

    static getReceiver(cpf, callback) {
        return db.query("select id from client where cpf = ? ", [cpf], callback)
    };
};