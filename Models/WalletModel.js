const db = require('../Database/dbConection')

module.exports = class WalletModel {

    static createMainWallet(client) {
        return db.query("insert into wallet (id, balance, client_id, main) values (uuid(), '0.00', (select id from client where cpf = ?), true)", [client.cpf]);
    };

    static getBalance(id, callback) {
        return db.query("select balance from wallet where client_id = ? and main = true", [id], callback);
    };

    static depositValue(deposit, callback) {
        return db.query("update wallet set balance = balance + ? where client_id =? and main = true", [deposit.value, deposit.client_id], callback);
    };

    static withdrawValueFromTransference(transaction, callback) {
        return db.query("update wallet set balance = balance - ? where client_id = ? and main = true", [transaction.value, transaction.client_id], callback);
    };

    static depositValueFromTransference(transaction, callback) {
        return db.query("update wallet set balance = balance + ? where client_id =? and main = true", [transaction.value, transaction.receiver_id], callback);
    };

};