// CLIENTE
create table client(
        id varchar(36) primary key,
        name varchar(255) not null,
        password varchar(100) not null,
        cpf varchar(11) not null
);
drop table client

insert into client (id, name, cpf, password) values (uuid(), 'João Paulo Botelho', '02946456161', '123456');
insert into client (id, name, cpf, password) values (uuid(), 'Margarida Menezes', '5566255893', '123456');

// CARTEIRA
create table wallet(
        id varchar(36) primary key,
        balance decimal(15,2),
        client_id varchar(36),
        main boolean,
        foreign key (client_id) references client(id)
);
drop table wallet

insert into wallet (id, balance, client_id, main) values (uuid(), '1000.55', '9b3bd022-7f72-11ec-9f7f-cecd029e558e', true);
insert into wallet (id, balance, client_id, main) values (uuid(), '1000.55', '9f3bc13b-7f72-11ec-9f7f-cecd029e558e', true);

// TRANSACAO
create table transactions(
        id varchar(36) primary key,
        from_wallet_id varchar(36),
        to_wallet_id varchar(36),
        balance decimal(15,2),
        foreign key (from_wallet_id) references wallet(id),
        foreign key (to_wallet_id) references wallet(id)
);
drop table transactions

insert into transactions (id, from_wallet_id, to_wallet_id, balance) values (uuid(), 'bfc19c33-7f72-11ec-9f7f-cecd029e558e', 'd231e083-7f72-11ec-9f7f-cecd029e558e', '20.90');