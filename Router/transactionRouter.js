var express = require('express');
var router = express.Router();
const ClientModel = require('../Models/ClientModel');
var WalletModal = require('../Models/WalletModel');
var responseClass = require('../responseClass');

// --------------------------------- CREATE TRANSACTION ---------------------------------

router.put("/transaction", function (req, res, next) {

    // Check client id by cpf and password
    ClientModel.getClient(req.body, function (error, ret) {
        let response = new responseClass();
        if (Object.keys(ret).length === 0) {
            response.msg = 'CPF ou senha incorretos! Certifique-se de que os campos cpf e password estão preenchidos.'
            res.json(response)
        }
        else { // If id is returned (correct cpf and password)
            let transaction = {
                client_id: ret[0].id,
                receiver_cpf: req.body.receiver_cpf,
                value: req.body.value
            }
            checkReceiverId(transaction)
        }
    })

    // Check receiver id by cpf
    function checkReceiverId(transaction) {
        ClientModel.getReceiver(transaction.receiver_cpf, function (error, ret) {
            let response = new responseClass();
            if (Object.keys(ret).length === 0) { // If no id is returned (wrong cpf or password)
                response.msg = 'O CPF do destinatário está incorreto ou não foi preenchido.'
                res.json(response)
            }
            else { // If id is returned (correct cpf and password)
                transaction.receiver_id = ret[0].id
                checkBalance(transaction)
            }

        })
    }

    // Check client wallet ballance
    function checkBalance(transaction) {
        WalletModal.getBalance(transaction.client_id, function (error, ret) {
            let response = new responseClass();
            if (transaction.value <= 2000) {
                if (ret[0].balance < transaction.value) {
                    response.msg = 'O seu saldo é insuficiente para transferir esse valor'
                    res.json(response)
                }
                else if (transaction.value <= 0) {
                    response.msg = 'Insira um valor positivo para transferência'
                    res.json(response)
                }
                else {
                    doWithdraw(transaction)
                }
            } else {
                response.msg = 'Você não pode transferir mais de R$ 2000'
                res.json(response)
            }
        })
    }

    // Perform the withdraw
    function doWithdraw(transaction) {
        WalletModal.withdrawValueFromTransference(transaction, function (error, ret) {
            doDeposit(transaction)
        })
    }

    // Perform the deposit
    function doDeposit(transaction) {
        let response = new responseClass();
        WalletModal.depositValueFromTransference(transaction, function (error, ret) {
            response.msg = 'Transferência realizada'
            res.json(response)
        })
    }

})

module.exports = router;