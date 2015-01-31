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
    id serial primary key,
    userId int not null,
    absenceDate date not null,
    unit int not null,
    absenceTypeId int not null,
    CONSTRAINT absences_user FOREIGN KEY (userId) REFERENCES Users (id),
    CONSTRAINT absences_absence_type FOREIGN KEY (absenceTypeId) REFERENCES absence_types (id)
);

-- Create a function that always returns the first non-NULL item
CREATE OR REPLACE FUNCTION public.first_agg ( anyelement, anyelement )
RETURNS anyelement LANGUAGE sql IMMUTABLE STRICT AS $$
        SELECT $1;
$$;

-- And then wrap an aggregate around it
CREATE AGGREGATE public.first (
        sfunc    = public.first_agg,
        basetype = anyelement,
        stype    = anyelement
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

INSERT INTO users (id, firstName, lastName, workStreamId)
VALUES
    (1,'Matthew','Webb', 1),
    (2,'Thomas','William Burgess', 1),
    (3,'Henry','Sullivan', 1),
    (4,'Enrique','Tirabocchi', 1),
    (5,'Charles','Toth', 1),
    (6,'Gertrude','Ederle', 1),
    (7,'Amelia','Gade Corson', 1),
    (8,'Edward','H. Temme', 2),
    (9,'Florence','Chadwick', 2),
    (10,'Damian','Pizá Beltran', 2),
    (11,'Marilyn','Bell', 2),
    (12,'Brojen','Das', 2),
    (13,'Arati','Saha', 2),
    (14,'Mihir','Sen', 2),
    (15,'Antonio','Abertondo', 2),
    (16,'Jon','Erikson', 3),
    (17,'John','Maclean', 3),
    (18,'Philippe','Croizon', 3),
    (19,'Trent','Grimsey', 3),
    (20,'Philip','Rush', 3),
    (21,'Kevin','Murphy', 4),
    (22,'Alison','Streeter', 4),
    (23,'Cynthia','Nicholas', 4);

INSERT INTO absences (userId, absenceDate, unit, absenceTypeId)
VALUES
    (1,'2014-10-06',1,2),
    (1,'2014-10-06',2,2),
    (1,'2014-10-07',1,2),
    (1,'2014-10-07',2,2),
    (1,'2014-10-08',1,2),
    (1,'2014-10-08',2,2),
    (1,'2014-10-09',1,2),
    (1,'2014-10-09',2,2),
    (1,'2014-10-10',1,2),
    (1,'2014-10-10',2,2),
    (1,'2014-10-20',1,3),
    (1,'2014-11-20',1,2),
    (1,'2014-11-20',2,2),
    (1,'2014-11-21',1,2),
    (1,'2014-11-21',2,2),
    (1,'2014-12-25',1,1),
    (1,'2014-12-25',2,1),
    (1,'2014-12-26',1,1),
    (1,'2014-12-26',2,1),
    (1,'2015-01-01',1,1),
    (1,'2015-01-01',2,1),
    (1,'2015-04-03',1,1),
    (1,'2015-04-06',2,1),
    (1,'2015-04-06',1,1),
    (1,'2015-04-13',1,2),
    (1,'2015-04-13',2,2),
    (1,'2015-04-14',1,2),
    (1,'2015-04-14',2,2),
    (1,'2015-04-15',1,2),
    (1,'2015-04-15',2,2),
    (1,'2015-04-16',1,2),
    (1,'2015-04-16',2,2),
    (1,'2015-04-17',1,2),
    (1,'2015-04-17',2,2),
    (1,'2015-05-04',2,1),
    (1,'2015-05-04',1,1),
    (1,'2015-05-25',2,1),
    (1,'2015-05-25',1,1),
    (1,'2015-08-31',2,1),
    (1,'2015-08-31',1,1),
    (1,'2015-11-11',1,3),
    (1,'2015-11-11',2,3),
    (1,'2015-12-25',2,1),
    (1,'2015-12-25',1,1),
    (1,'2015-12-28',2,1),
    (1,'2015-12-28',1,1),
    (2,'2014-12-22',1,2),
    (2,'2014-12-22',2,2),
    (2,'2014-12-23',1,2),
    (2,'2014-12-23',2,2),
    (2,'2014-12-24',1,2),
    (2,'2014-12-24',2,2),
    (2,'2014-12-25',1,1),
    (2,'2014-12-25',2,1),
    (2,'2014-12-26',1,1),
    (2,'2014-12-26',2,1),
    (2,'2015-01-01',1,1),
    (2,'2015-01-01',2,1),
    (2,'2015-04-03',1,1),
    (2,'2015-04-06',2,1),
    (2,'2015-04-06',1,1),
    (2,'2015-05-04',2,1),
    (2,'2015-05-04',1,1),
    (2,'2015-05-25',2,1),
    (2,'2015-05-25',1,1),
    (2,'2015-08-31',2,1),
    (2,'2015-08-31',1,1),
    (2,'2015-11-11',1,3),
    (2,'2015-11-11',2,3),
    (2,'2015-12-25',2,1),
    (2,'2015-12-25',1,1),
    (2,'2015-12-28',2,1),
    (2,'2015-12-28',1,1),
    (3,'2014-12-22',1,2),
    (3,'2014-12-22',2,2),
    (3,'2014-12-23',1,2),
    (3,'2014-12-23',2,2),
    (3,'2014-12-24',1,2),
    (3,'2014-12-24',2,2),
    (3,'2014-12-25',1,1),
    (3,'2014-12-25',2,1),
    (3,'2014-12-26',1,1),
    (3,'2014-12-26',2,1),
    (3,'2015-01-01',1,1),
    (3,'2015-01-01',2,1),
    (3,'2015-04-03',1,1),
    (3,'2015-04-06',2,1),
    (3,'2015-04-06',1,1),
    (3,'2015-05-04',2,1),
    (3,'2015-05-04',1,1),
    (3,'2015-05-25',2,1),
    (3,'2015-05-25',1,1),
    (3,'2015-08-31',2,1),
    (3,'2015-08-31',1,1),
    (3,'2015-11-11',1,3),
    (3,'2015-11-11',2,3),
    (3,'2015-12-25',2,1),
    (3,'2015-12-25',1,1),
    (3,'2015-12-28',2,1),
    (3,'2015-12-28',1,1),
    (4,'2014-11-03',1,3),
    (4,'2014-11-03',2,3),
    (4,'2014-12-22',1,2),
    (4,'2014-12-22',2,2),
    (4,'2014-12-23',1,2),
    (4,'2014-12-23',2,2),
    (4,'2014-12-24',1,2),
    (4,'2014-12-24',2,2),
    (4,'2014-12-25',1,1),
    (4,'2014-12-25',2,1),
    (4,'2014-12-26',1,1),
    (4,'2014-12-26',2,1),
    (4,'2015-01-01',1,1),
    (4,'2015-01-01',2,1),
    (4,'2015-04-03',1,1),
    (4,'2015-04-06',2,1),
    (4,'2015-04-06',1,1),
    (4,'2015-05-04',2,1),
    (4,'2015-05-04',1,1),
    (4,'2015-05-25',2,1),
    (4,'2015-05-25',1,1),
    (4,'2015-08-31',2,1),
    (4,'2015-08-31',1,1),
    (4,'2015-11-11',1,3),
    (4,'2015-11-11',2,3),
    (4,'2015-12-25',2,1),
    (4,'2015-12-25',1,1),
    (4,'2015-12-28',2,1),
    (4,'2015-12-28',1,1),
    (5,'2014-12-23',1,2),
    (5,'2014-12-23',2,2),
    (5,'2014-12-24',1,2),
    (5,'2014-12-24',2,2),
    (5,'2014-12-25',1,1),
    (5,'2014-12-25',2,1),
    (5,'2014-12-26',1,1),
    (5,'2014-12-26',2,1),
    (5,'2015-01-01',1,1),
    (5,'2015-01-01',2,1),
    (5,'2015-02-02',1,2),
    (5,'2015-04-03',1,1),
    (5,'2015-04-06',2,1),
    (5,'2015-04-06',1,1),
    (5,'2015-05-04',2,1),
    (5,'2015-05-04',1,1),
    (5,'2015-05-25',2,1),
    (5,'2015-05-25',1,1),
    (5,'2015-08-31',2,1),
    (5,'2015-08-31',1,1),
    (5,'2015-12-25',2,1),
    (5,'2015-12-25',1,1),
    (5,'2015-12-28',2,1),
    (5,'2015-12-28',1,1),
    (6,'2014-10-27',1,2),
    (6,'2014-10-27',2,2),
    (6,'2014-10-28',1,2),
    (6,'2014-10-28',2,2),
    (6,'2014-10-29',1,2),
    (6,'2014-10-29',2,2),
    (6,'2014-10-30',1,2),
    (6,'2014-10-30',2,2),
    (6,'2014-10-31',1,2),
    (6,'2014-10-31',2,2),
    (6,'2014-12-25',1,1),
    (6,'2014-12-25',2,1),
    (6,'2014-12-26',1,1),
    (6,'2014-12-26',2,1),
    (6,'2015-01-01',1,1),
    (6,'2015-01-01',2,1),
    (6,'2015-04-03',1,1),
    (6,'2015-04-06',2,1),
    (6,'2015-04-06',1,1),
    (6,'2015-05-04',2,1),
    (6,'2015-05-04',1,1),
    (6,'2015-05-25',2,1),
    (6,'2015-05-25',1,1),
    (6,'2015-08-31',2,1),
    (6,'2015-08-31',1,1),
    (6,'2015-12-25',2,1),
    (6,'2015-12-25',1,1),
    (6,'2015-12-28',2,1),
    (6,'2015-12-28',1,1),
    (7,'2014-12-25',1,1),
    (7,'2014-12-25',2,1),
    (7,'2014-12-26',1,1),
    (7,'2014-12-26',2,1),
    (7,'2015-01-01',1,1),
    (7,'2015-01-01',2,1),
    (7,'2015-04-03',1,1),
    (7,'2015-04-06',2,1),
    (7,'2015-04-06',1,1),
    (7,'2015-05-04',2,1),
    (7,'2015-05-04',1,1),
    (7,'2015-05-25',2,1),
    (7,'2015-05-25',1,1),
    (7,'2015-08-31',2,1),
    (7,'2015-08-31',1,1),
    (7,'2015-12-25',2,1),
    (7,'2015-12-25',1,1),
    (7,'2015-12-28',2,1),
    (7,'2015-12-28',1,1),
    (8,'2014-12-25',1,1),
    (8,'2014-12-25',2,1),
    (8,'2014-12-26',1,1),
    (8,'2014-12-26',2,1),
    (8,'2015-01-01',1,1),
    (8,'2015-01-01',2,1),
    (8,'2015-02-02',2,2),
    (8,'2015-02-03',1,2),
    (8,'2015-02-03',2,2),
    (8,'2015-02-04',1,2),
    (8,'2015-02-04',2,2),
    (8,'2015-02-05',1,2),
    (8,'2015-02-05',2,2),
    (8,'2015-02-06',1,2),
    (8,'2015-02-06',2,2),
    (8,'2015-02-09',1,2),
    (8,'2015-02-09',2,2),
    (8,'2015-02-10',1,2),
    (8,'2015-02-10',2,2),
    (8,'2015-02-11',1,2),
    (8,'2015-02-11',2,2),
    (8,'2015-02-12',1,2),
    (8,'2015-02-12',2,2),
    (8,'2015-02-13',1,2),
    (8,'2015-02-13',2,2),
    (8,'2015-04-03',1,1),
    (8,'2015-04-06',2,1),
    (8,'2015-04-06',1,1),
    (8,'2015-05-04',2,1),
    (8,'2015-05-04',1,1),
    (8,'2015-05-25',2,1),
    (8,'2015-05-25',1,1),
    (8,'2015-08-31',2,1),
    (8,'2015-08-31',1,1),
    (8,'2015-12-25',2,1),
    (8,'2015-12-25',1,1),
    (8,'2015-12-28',2,1),
    (8,'2015-12-28',1,1),
    (9,'2014-12-25',1,1),
    (9,'2014-12-25',2,1),
    (9,'2014-12-26',1,1),
    (9,'2014-12-26',2,1),
    (9,'2015-01-01',1,1),
    (9,'2015-01-01',2,1),
    (9,'2015-04-03',1,1),
    (9,'2015-04-06',2,1),
    (9,'2015-04-06',1,1),
    (9,'2015-05-04',2,1),
    (9,'2015-05-04',1,1),
    (9,'2015-05-25',2,1),
    (9,'2015-05-25',1,1),
    (9,'2015-08-31',2,1),
    (9,'2015-08-31',1,1),
    (9,'2015-11-11',1,3),
    (9,'2015-11-11',2,3),
    (9,'2015-12-25',2,1),
    (9,'2015-12-25',1,1),
    (9,'2015-12-28',2,1),
    (9,'2015-12-28',1,1),
    (10,'2014-10-27',1,2),
    (10,'2014-10-27',2,2),
    (10,'2014-10-28',1,2),
    (10,'2014-10-28',2,2),
    (10,'2014-10-29',1,2),
    (10,'2014-10-29',2,2),
    (10,'2014-10-30',1,2),
    (10,'2014-10-30',2,2),
    (10,'2014-10-31',1,2),
    (10,'2014-10-31',2,2),
    (10,'2014-12-25',1,1),
    (10,'2014-12-25',2,1),
    (10,'2014-12-26',1,1),
    (10,'2014-12-26',2,1),
    (10,'2015-01-01',1,1),
    (10,'2015-01-01',2,1),
    (10,'2015-04-03',1,1),
    (10,'2015-04-06',2,1),
    (10,'2015-04-06',1,1),
    (10,'2015-05-04',2,1),
    (10,'2015-05-04',1,1),
    (10,'2015-05-25',2,1),
    (10,'2015-05-25',1,1),
    (10,'2015-08-31',2,1),
    (10,'2015-08-31',1,1),
    (10,'2015-11-11',1,3),
    (10,'2015-11-11',2,3),
    (10,'2015-12-25',2,1),
    (10,'2015-12-25',1,1),
    (10,'2015-12-28',2,1),
    (10,'2015-12-28',1,1),
    (11,'2014-10-27',1,3),
    (11,'2014-10-27',2,3),
    (11,'2014-10-28',1,3),
    (11,'2014-10-28',2,3),
    (11,'2014-10-29',1,3),
    (11,'2014-10-29',2,3),
    (11,'2014-10-30',1,3),
    (11,'2014-10-30',2,3),
    (11,'2014-10-31',1,3),
    (11,'2014-10-31',2,3),
    (11,'2014-11-03',1,3),
    (11,'2014-11-03',2,3),
    (11,'2014-11-04',1,3),
    (11,'2014-11-04',2,3),
    (11,'2014-11-05',1,3),
    (11,'2014-11-05',2,3),
    (11,'2014-11-06',1,3),
    (11,'2014-11-06',2,3),
    (11,'2014-11-07',1,3),
    (11,'2014-11-07',2,3),
    (11,'2014-11-10',1,3),
    (11,'2014-11-10',2,3),
    (11,'2014-11-11',1,3),
    (11,'2014-11-11',2,3),
    (11,'2014-11-12',1,3),
    (11,'2014-11-12',2,3),
    (11,'2014-11-13',1,3),
    (11,'2014-11-13',2,3),
    (11,'2014-11-14',1,3),
    (11,'2014-11-14',2,3),
    (11,'2014-11-17',1,3),
    (11,'2014-11-17',2,3),
    (11,'2014-11-18',1,3),
    (11,'2014-11-18',2,3),
    (11,'2014-11-19',1,3),
    (11,'2014-11-19',2,3),
    (11,'2014-11-20',1,3),
    (11,'2014-11-20',2,3),
    (11,'2014-11-21',1,3),
    (11,'2014-11-21',2,3),
    (11,'2014-11-24',1,3),
    (11,'2014-11-24',2,3),
    (11,'2014-11-25',1,3),
    (11,'2014-11-25',2,3),
    (11,'2014-11-26',1,3),
    (11,'2014-11-26',2,3),
    (11,'2014-11-27',1,3),
    (11,'2014-11-27',2,3),
    (11,'2014-11-28',1,3),
    (11,'2014-11-28',2,3),
    (11,'2014-12-25',1,1),
    (11,'2014-12-25',2,1),
    (11,'2014-12-26',1,1),
    (11,'2014-12-26',2,1),
    (11,'2015-01-01',1,1),
    (11,'2015-01-01',2,1),
    (11,'2015-04-03',1,1),
    (11,'2015-04-06',2,1),
    (11,'2015-04-06',1,1),
    (11,'2015-05-04',2,1),
    (11,'2015-05-04',1,1),
    (11,'2015-05-25',2,1),
    (11,'2015-05-25',1,1),
    (11,'2015-08-31',2,1),
    (11,'2015-08-31',1,1),
    (11,'2015-11-11',1,3),
    (11,'2015-11-11',2,3),
    (11,'2015-12-25',2,1),
    (11,'2015-12-25',1,1),
    (11,'2015-12-28',2,1),
    (11,'2015-12-28',1,1),
    (12,'2014-12-23',1,2),
    (12,'2014-12-23',2,2),
    (12,'2014-12-24',1,2),
    (12,'2014-12-24',2,2),
    (12,'2014-12-25',1,1),
    (12,'2014-12-25',2,1),
    (12,'2014-12-26',1,1),
    (12,'2014-12-26',2,1),
    (12,'2015-01-01',1,1),
    (12,'2015-01-01',2,1),
    (12,'2015-04-03',1,1),
    (12,'2015-04-06',2,1),
    (12,'2015-04-06',1,1),
    (12,'2015-05-04',2,1),
    (12,'2015-05-04',1,1),
    (12,'2015-05-25',2,1),
    (12,'2015-05-25',1,1),
    (12,'2015-08-31',2,1),
    (12,'2015-08-31',1,1),
    (12,'2015-12-25',2,1),
    (12,'2015-12-25',1,1),
    (12,'2015-12-28',2,1),
    (12,'2015-12-28',1,1),
    (13,'2014-12-22',1,2),
    (13,'2014-12-22',2,2),
    (13,'2014-12-23',1,2),
    (13,'2014-12-23',2,2),
    (13,'2014-12-24',1,2),
    (13,'2014-12-24',2,2),
    (13,'2014-12-25',1,1),
    (13,'2014-12-25',2,1),
    (13,'2014-12-26',1,1),
    (13,'2014-12-26',2,1),
    (13,'2015-01-01',1,1),
    (13,'2015-01-01',2,1),
    (13,'2015-04-03',1,1),
    (13,'2015-04-06',2,1),
    (13,'2015-04-06',1,1),
    (13,'2015-05-04',2,1),
    (13,'2015-05-04',1,1),
    (13,'2015-05-25',2,1),
    (13,'2015-05-25',1,1),
    (13,'2015-08-31',2,1),
    (13,'2015-08-31',1,1),
    (13,'2015-11-11',1,3),
    (13,'2015-11-11',2,3),
    (13,'2015-12-25',2,1),
    (13,'2015-12-25',1,1),
    (13,'2015-12-28',2,1),
    (13,'2015-12-28',1,1),
    (14,'2014-12-22',1,2),
    (14,'2014-12-22',2,2),
    (14,'2014-12-23',1,2),
    (14,'2014-12-23',2,2),
    (14,'2014-12-24',1,2),
    (14,'2014-12-24',2,2),
    (14,'2014-12-25',1,1),
    (14,'2014-12-25',2,1),
    (14,'2014-12-26',1,1),
    (14,'2014-12-26',2,1),
    (14,'2015-01-01',1,1),
    (14,'2015-01-01',2,1),
    (14,'2015-04-03',1,1),
    (14,'2015-04-06',2,1),
    (14,'2015-04-06',1,1),
    (14,'2015-05-04',2,1),
    (14,'2015-05-04',1,1),
    (14,'2015-05-25',2,1),
    (14,'2015-05-25',1,1),
    (14,'2015-08-31',2,1),
    (14,'2015-08-31',1,1),
    (14,'2015-11-11',1,3),
    (14,'2015-11-11',2,3),
    (14,'2015-12-25',2,1),
    (14,'2015-12-25',1,1),
    (14,'2015-12-28',2,1),
    (14,'2015-12-28',1,1),
    (15,'2014-12-22',1,2),
    (15,'2014-12-22',2,2),
    (15,'2014-12-23',1,2),
    (15,'2014-12-23',2,2),
    (15,'2014-12-24',1,2),
    (15,'2014-12-24',2,2),
    (15,'2014-12-25',1,1),
    (15,'2014-12-25',2,1),
    (15,'2014-12-26',1,1),
    (15,'2014-12-26',2,1),
    (15,'2015-01-01',1,1),
    (15,'2015-01-01',2,1),
    (15,'2015-04-03',1,1),
    (15,'2015-04-06',2,1),
    (15,'2015-04-06',1,1),
    (15,'2015-05-04',2,1),
    (15,'2015-05-04',1,1),
    (15,'2015-05-25',2,1),
    (15,'2015-05-25',1,1),
    (15,'2015-08-31',2,1),
    (15,'2015-08-31',1,1),
    (15,'2015-12-25',2,1),
    (15,'2015-12-25',1,1),
    (15,'2015-12-28',2,1),
    (15,'2015-12-28',1,1),
    (16,'2014-12-22',1,2),
    (16,'2014-12-22',2,2),
    (16,'2014-12-23',1,2),
    (16,'2014-12-23',2,2),
    (16,'2014-12-24',1,2),
    (16,'2014-12-24',2,2),
    (16,'2014-12-25',1,1),
    (16,'2014-12-25',2,1),
    (16,'2014-12-26',1,1),
    (16,'2014-12-26',2,1),
    (16,'2015-01-01',1,1),
    (16,'2015-01-01',2,1),
    (16,'2015-04-03',1,1),
    (16,'2015-04-06',2,1),
    (16,'2015-04-06',1,1),
    (16,'2015-05-04',2,1),
    (16,'2015-05-04',1,1),
    (16,'2015-05-25',2,1),
    (16,'2015-05-25',1,1),
    (16,'2015-08-31',2,1),
    (16,'2015-08-31',1,1),
    (16,'2015-12-25',2,1),
    (16,'2015-12-25',1,1),
    (16,'2015-12-28',2,1),
    (16,'2015-12-28',1,1),
    (17,'2014-10-27',1,2),
    (17,'2014-10-27',2,2),
    (17,'2014-10-28',1,2),
    (17,'2014-10-28',2,2),
    (17,'2014-10-29',1,2),
    (17,'2014-10-29',2,2),
    (17,'2014-11-03',1,3),
    (17,'2014-11-03',2,3),
    (17,'2014-12-22',1,2),
    (17,'2014-12-22',2,2),
    (17,'2014-12-23',1,2),
    (17,'2014-12-23',2,2),
    (17,'2014-12-24',1,2),
    (17,'2014-12-24',2,2),
    (17,'2014-12-25',1,1),
    (17,'2014-12-25',2,1),
    (17,'2014-12-26',1,1),
    (17,'2014-12-26',2,1),
    (17,'2015-01-01',1,1),
    (17,'2015-01-01',2,1),
    (17,'2015-04-03',1,1),
    (17,'2015-04-06',2,1),
    (17,'2015-04-06',1,1),
    (17,'2015-05-04',2,1),
    (17,'2015-05-04',1,1),
    (17,'2015-05-25',2,1),
    (17,'2015-05-25',1,1),
    (17,'2015-08-31',2,1),
    (17,'2015-08-31',1,1),
    (17,'2015-12-25',2,1),
    (17,'2015-12-25',1,1),
    (17,'2015-12-28',2,1),
    (17,'2015-12-28',1,1),
    (18,'2014-10-27',1,2),
    (18,'2014-10-27',2,2),
    (18,'2014-10-28',1,2),
    (18,'2014-10-28',2,2),
    (18,'2014-10-29',1,2),
    (18,'2014-10-29',2,2),
    (18,'2014-10-30',1,2),
    (18,'2014-10-30',2,2),
    (18,'2014-10-31',1,2),
    (18,'2014-10-31',2,2),
    (18,'2014-12-25',1,1),
    (18,'2014-12-25',2,1),
    (18,'2014-12-26',1,1),
    (18,'2014-12-26',2,1),
    (18,'2015-01-01',1,1),
    (18,'2015-01-01',2,1),
    (18,'2015-04-03',1,1),
    (18,'2015-04-06',2,1),
    (18,'2015-04-06',1,1),
    (18,'2015-05-04',2,1),
    (18,'2015-05-04',1,1),
    (18,'2015-05-25',2,1),
    (18,'2015-05-25',1,1),
    (18,'2015-08-31',2,1),
    (18,'2015-08-31',1,1),
    (18,'2015-11-11',1,3),
    (18,'2015-11-11',2,3),
    (18,'2015-12-25',2,1),
    (18,'2015-12-25',1,1),
    (18,'2015-12-28',2,1),
    (18,'2015-12-28',1,1),
    (19,'2014-12-25',1,1),
    (19,'2014-12-25',2,1),
    (19,'2014-12-26',1,1),
    (19,'2014-12-26',2,1),
    (19,'2015-01-01',1,1),
    (19,'2015-01-01',2,1),
    (19,'2015-04-03',1,1),
    (19,'2015-04-06',2,1),
    (19,'2015-04-06',1,1),
    (19,'2015-05-04',2,1),
    (19,'2015-05-04',1,1),
    (19,'2015-05-25',2,1),
    (19,'2015-05-25',1,1),
    (19,'2015-08-31',2,1),
    (19,'2015-08-31',1,1),
    (19,'2015-12-25',2,1),
    (19,'2015-12-25',1,1),
    (19,'2015-12-28',2,1),
    (19,'2015-12-28',1,1),
    (20,'2014-10-27',1,2),
    (20,'2014-10-27',2,2),
    (20,'2014-10-28',1,2),
    (20,'2014-10-28',2,2),
    (20,'2014-10-29',1,2),
    (20,'2014-10-29',2,2),
    (20,'2014-10-30',1,2),
    (20,'2014-10-30',2,2),
    (20,'2014-10-31',1,2),
    (20,'2014-10-31',2,2),
    (20,'2014-12-25',1,1),
    (20,'2014-12-25',2,1),
    (20,'2014-12-26',1,1),
    (20,'2014-12-26',2,1),
    (20,'2015-01-01',1,1),
    (20,'2015-01-01',2,1),
    (20,'2015-04-03',1,1),
    (20,'2015-04-06',2,1),
    (20,'2015-04-06',1,1),
    (20,'2015-05-04',2,1),
    (20,'2015-05-04',1,1),
    (20,'2015-05-25',2,1),
    (20,'2015-05-25',1,1),
    (20,'2015-08-31',2,1),
    (20,'2015-08-31',1,1),
    (20,'2015-11-11',1,3),
    (20,'2015-11-11',2,3),
    (20,'2015-12-25',2,1),
    (20,'2015-12-25',1,1),
    (20,'2015-12-28',2,1),
    (20,'2015-12-28',1,1),
    (21,'2014-11-03',1,3),
    (21,'2014-11-03',2,3),
    (21,'2014-12-25',1,1),
    (21,'2014-12-25',2,1),
    (21,'2014-12-26',1,1),
    (21,'2014-12-26',2,1),
    (21,'2015-01-01',1,1),
    (21,'2015-01-01',2,1),
    (21,'2015-04-03',1,1),
    (21,'2015-04-06',2,1),
    (21,'2015-04-06',1,1),
    (21,'2015-05-04',2,1),
    (21,'2015-05-04',1,1),
    (21,'2015-05-25',2,1),
    (21,'2015-05-25',1,1),
    (21,'2015-08-31',2,1),
    (21,'2015-08-31',1,1),
    (21,'2015-12-25',2,1),
    (21,'2015-12-25',1,1),
    (21,'2015-12-28',2,1),
    (21,'2015-12-28',1,1),
    (22,'2014-11-03',1,3),
    (22,'2014-11-03',2,3),
    (22,'2014-12-25',1,1),
    (22,'2014-12-25',2,1),
    (22,'2014-12-26',1,1),
    (22,'2014-12-26',2,1),
    (22,'2015-01-01',1,1),
    (22,'2015-01-01',2,1),
    (22,'2015-04-03',1,1),
    (22,'2015-04-06',2,1),
    (22,'2015-04-06',1,1),
    (22,'2015-05-04',2,1),
    (22,'2015-05-04',1,1),
    (22,'2015-05-25',2,1),
    (22,'2015-05-25',1,1),
    (22,'2015-08-31',2,1),
    (22,'2015-08-31',1,1),
    (22,'2015-12-25',2,1),
    (22,'2015-12-25',1,1),
    (22,'2015-12-28',2,1),
    (22,'2015-12-28',1,1),
    (23,'2014-10-27',1,2),
    (23,'2014-10-27',2,2),
    (23,'2014-10-28',1,2),
    (23,'2014-10-28',2,2),
    (23,'2014-10-29',1,2),
    (23,'2014-10-29',2,2),
    (23,'2014-10-30',1,2),
    (23,'2014-10-30',2,2),
    (23,'2014-12-25',1,1),
    (23,'2014-12-25',2,1),
    (23,'2014-12-26',1,1),
    (23,'2014-12-26',2,1),
    (23,'2015-01-01',1,1),
    (23,'2015-01-01',2,1),
    (23,'2015-04-03',1,1),
    (23,'2015-04-06',2,1),
    (23,'2015-04-06',1,1),
    (23,'2015-05-04',2,1),
    (23,'2015-05-04',1,1),
    (23,'2015-05-25',2,1),
    (23,'2015-05-25',1,1),
    (23,'2015-08-31',2,1),
    (23,'2015-08-31',1,1),
    (23,'2015-11-11',1,3),
    (23,'2015-11-11',2,3),
    (23,'2015-12-25',2,1),
    (23,'2015-12-25',1,1),
    (23,'2015-12-28',2,1),
    (23,'2015-12-28',1,1);




