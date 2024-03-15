create table
    users (
        id int primary key auto_increment NOT NULL,
        userName varchar(254) NOT NULL,
        googleId varchar(254) NOT NULL,
        userEmail varchar(254) NOT NULL unique,
    );