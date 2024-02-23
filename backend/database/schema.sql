create table
    users (
        id int primary key auto_increment NOT NULL,
        first_name varchar(100) NOT NULL,
        last_name varchar(100) NOT NULL,
        email varchar(254) NOT NULL unique,
        password varchar(254) NOT NULL,
        reset_token varchar(254),
        reset_token_expires_at DATETIME
    );