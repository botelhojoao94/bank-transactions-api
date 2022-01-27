# API de transação bancária

#### URL
### https://bank-transactions-api.herokuapp.com

#### ROTAS
###### Criar novos clientes
### /client
KEYS:
### -- name
### -- cpf
### -- password

###### Realizar deposito em um CPF
### /deposit
KEYS:
### -- cpf
### -- password
### -- value

###### Realizar transferencia da carteira principal de um CPF para a carteira principal de outro cpf
### /transaction
KEYS:
### -- cpf
### -- password
### -- receiver_cpf
### -- value

