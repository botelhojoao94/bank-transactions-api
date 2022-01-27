var express = require('express');
var router = express.Router();
const ClientModel = require('../Models/ClientModel');
var WalletModal = require('../Models/WalletModel');
var responseClass = require('../responseClass');

// --------------------------------- CREATE TRANSACTION ---------------------------------

router.put("/deposit", function (req, res, next) {

    // Check client id by cpf and password
    ClientModel.getClient(req.body, function (error, ret) {
        let response = new responseClass();
        if (Object.keys(ret).length === 0) {
            response.msg = 'CPF ou senha incorretos! Certifique-se de que os campos cpf e password estão preenchidos.'
            res.json(response)
        }
        else {
            let deposit = {
                client_id: ret[0].id,
                value: req.body.value
            }
            if (deposit.value <= 0) {
                response.msg = 'Insira um valor positivo para transferência'
                res.json(response)
            }
            else if (deposit.value > 2000) {
                response.msg = 'Você não pode depositar mais de R$ 2000'
                res.json(response)
            }
            else {
                doDeposit(deposit)
            }
        }
    })

    // Perform the deposit
    function doDeposit(deposit) {
        let response = new responseClass();
        WalletModal.depositValue(deposit, function (error, ret) {
            response.msg = 'Deposito efetuado'
            res.json(response)
        })
    }

})

module.exports = router;