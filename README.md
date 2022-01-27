# API de transação bancária

#### URL
### https://bank-transactions-api.herokuapp.com

#### OBS.: Todas as chaves devem ser passadas no body como urlencoded

#### ROTAS
###### Criar novos clientes
### /client (post)
#### KEYS:
#### -- name
#### -- cpf
#### -- password

###### Realizar deposito em um CPF
### /deposit (put)
KEYS:
#### -- cpf
#### -- password
#### -- value

###### Realizar transferencia da carteira principal de um CPF para a carteira principal de outro cpf
### /transaction (put)
KEYS:
#### -- cpf
#### -- password
#### -- receiver_cpf
#### -- value

