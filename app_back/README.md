# Backend

## Installed packages

```
    $ npm init -y
    $ npm install --save express
    $ npm install --save-dev nodemon
    $ npm install --save dotenv
	$ npm install --save cors
    $ npm install --save oracledb
	$ npm install --save bcryptjs
	$ npm install --save cookie-parser
```

# .env

```

#Server configurations
SERVER_PORT=8500
#Database configurations
DB_USER=user1234
DB_PASSWORD=admin1234
DB_CONNECT_STRING=localhost:1521/orclpdb

```

# script SQL

```
--TABLE PERSON
CREATE TABLE PERSON (
	ID NUMBER,
	EMAIL VARCHAR2(100) UNIQUE NOT NULL,
	PASSWORD VARCHAR2(1000) NOT NULL,
	FIRST_NAME VARCHAR2(100) NOT NULL,
	LAST_NAME VARCHAR2(100) NOT NULL,
	TOKEN_PERSON VARCHAR2(1000) NOT NULL,
	ADD_DATE DATE DEFAULT SYSDATE,
	MOD_DATE DATE,
	PRIMARY KEY(ID)
);

--SEQUENCE PERSON
CREATE SEQUENCE SQ_PERSON NOCACHE;

--TABLE CATEGORY
CREATE TABLE CATEGORY (
	ID NUMBER,
	PERSON_ID NUMBER NOT NULL,
	TITLE VARCHAR2(100) NOT NULL,
	TEXT VARCHAR2(2000) NOT NULL,
	PRIMARY KEY(ID),
	FOREIGN KEY(PERSON_ID) REFERENCES PERSON(ID)
);

--SEQUENCE CATEGORY
CREATE SEQUENCE SQ_CATEGORY NOCACHE;

--REMOVE DATA
DELETE FROM PERSON;
DELETE FROM CATEGORY;

--REMOVE TABLE
DROP TABLE PERSON;
DROP TABLE CATEGORY;

--REMOVE SEQUENCE
DROP SEQUENCE SQ_PERSON;
DROP SEQUENCE SQ_CATEGORY;

--FUNCTION API_TOKEN
CREATE OR REPLACE FUNCTION API_TOKEN(PSECRET VARCHAR2) RETURN VARCHAR2
IS
	VRESULT VARCHAR2(4000);
BEGIN
	SELECT UTL_RAW.CAST_TO_VARCHAR2(UTL_I18N.STRING_TO_RAW(STANDARD_HASH(PSECRET,'MD5'),'AL32UTF8')) INTO VRESULT FROM dual;
	RETURN VRESULT;
END API_TOKEN;
```
# comandor para abrir DB

```
sqlplus / as sysdba
ALTER PLUGGABLE DATABASE ORCLPDB OPEN;

```

# comandor para crear usuario para DB

```

sqlplus

//hay que posisionarnos en la DB que queremos crear el usuario la mia se llama orclpdb

ALTER SESSION SET CONTAINER = orclpdb; 

CREATE USER "usuario" IDENTIFIED BY "password" CONTAINER=CURRENT;

//debemos agregarle los permisos al usuario para crear, modificar, etc.

GRANT ALL PRIVILEGES TO "usuario" CONTAINER=CURRENT;

//tambien se puede limitar la cantidad de request que hace un usuario para este uso daremos ilimitado

ALTER USER "usuario" DEFAULT TABLESPACE users TEMPORARY TABLESPACE temp QUOTA UNLIMITED ON users;

```