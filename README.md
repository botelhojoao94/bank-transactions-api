# API de transação bancária

#### URL
### https://bank-transactions-api.herokuapp.com

#### ROTAS
### /client
###### Criar novos clientes
KEYS:
### -- name
### -- cpf
### -- password

### /deposit
###### Realizar deposito em um CPF
KEYS:
### -- cpf
### -- password
### -- value

### /transaction
###### Realizar transferencia da carteira principal de um CPF para a carteira principal de outro cpf
KEYS:
### -- cpf
### -- password
### -- receiver_cpf
### -- value

