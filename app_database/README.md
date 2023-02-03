# Database Container

# Using docker

``` powershell
# RUN database
docker run -d -p 1521:1521 `
-e ORACLE_PASSWORD=mypass `
-e APP_USER=appuser `
-e APP_USER_PASSWORD=myapppass `
-v $pwd\:/container-entrypoint-initdb.d `
-v oracle-disk3:/opt/oracle/oradata `
gvenzl/oracle-xe:21.3.0
```
docker exec -it facf326a8e4d sqlplus sys/mypass@//localhost:1521/XEPDB1 as sysdba
@/container-entrypoint-initdb.d/insert_data.sql
