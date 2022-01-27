var express = require('express');
var router = express.Router();
var ClientModel = require('../Models/ClientModel');
var WalletModel = require('../Models/WalletModel');
var responseClass = require('../responseClass');

// --------------------------------- CREATE CLIENT ---------------------------------

router.post("/client", function (req, res, next) {

    // Create client
    ClientModel.createClient(req.body, function (error, ret) {
        let response = new responseClass();
        if (error) {
            response.error = true;
            if (error.code == 'ER_DUP_ENTRY')
                response.msg = 'Este CPF já possui conta aberta'
            else if (error.code = 'ER_DATA_TOO_LONG')
                response.msg = 'Certifique-se de que o campo name tenha mais de 4 caracteres, o campo cpf tenha 11 dígitos e o campo password tenha mais de 6 dígitos'
            console.log(error)
        } else {
            if (req.body.cpf.match(/^[0-9]+$/) != null) {
                response.msg = "Cliente adicionado com sucesso";
                // Create main wallet with zero balance
                WalletModel.createMainWallet(req.body)
            }
            else {
                response.msg = "O CPF deve conter apenas números";
            }

        }
        res.json(response);
    })
})

module.exports = router;