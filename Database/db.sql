// CLIENTE
create table client(
        id varchar(36) primary key,
        name varchar(255) not null check(length(name) >= 4),
        password varchar(100) not null check(length(password) >= 6),
        cpf varchar(11) unique not null check(length(cpf) = 11)
);


// CARTEIRA
// A carteira foi criada para que seja possível ter mais de uma conta por cpf futuramente
create table wallet(
        id varchar(36) primary key,
        balance decimal(15,2),
        client_id varchar(36),
        main boolean,
        foreign key (client_id) references client(id)
);
