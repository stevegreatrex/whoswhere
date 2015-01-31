DROP DATABASE IF EXISTS whoswhere;

CREATE DATABASE whoswhere;

\connect whoswhere;

CREATE TABLE work_streams (
    id int primary key,
    name varchar (50) not null
);

CREATE TABLE absence_types (
    id int primary key,
    name varchar(50) not null
);

CREATE TABLE users (
    id int primary key,
    workStreamId int not null,
    firstName varchar (100) not null,
    lastName varchar (100) not null,
    CONSTRAINT user_work_stream FOREIGN KEY (workStreamId) REFERENCES work_streams (id)
);

CREATE TABLE absences (
    id int primary key,
    userId int not null,
    absenceDate date not null,
    unit bit not null default 0::bit,
    absenceTypeId int not null,
    CONSTRAINT absences_user FOREIGN KEY (userId) REFERENCES Users (id),
    CONSTRAINT absences_absence_type FOREIGN KEY (absenceTypeId) REFERENCES absence_types (id)
);

INSERT INTO work_streams (id, name)
VALUES
    (1, 'Proposition Development'),
    (2, 'Engineering'),
    (3, 'Sales and Marketing'),
    (4, 'Project Management');

INSERT INTO absence_types (id, name)
VALUES
    (1, 'Public Holiday'),
    (2, 'Vacation'),
    (3, 'Training');



