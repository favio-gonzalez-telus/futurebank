## BUILD
# docker build -t mybackend:0.1.0 .
## RUN DB_USER=appuser
# docker run -e DB_USER=appuser -e DB_PASSWORD=myapppass -e DB_CONNECT_STRING=172.17.0.2:1521/xepdb1 -p -d 8500:8500 faviog2/futurebank_back:0.1.0

FROM oraclelinux:8.7

LABEL developer="FG2"

ENV SERVER_PORT=8500 \
    DB_USER=appuser \
    DB_PASSWORD=myapppass \
    DB_CONNECT_STRING=localhost:1521/xepdb1

# https://yum.oracle.com/oracle-instant-client.html
RUN dnf install oracle-instantclient-release-el8 -y
RUN dnf install oracle-instantclient-basic -y

# https://yum.oracle.com/oracle-linux-nodejs.html#InstallingNodeOnOL8
RUN dnf module enable nodejs:16 -y
RUN dnf module install nodejs -y

COPY . /opt/app

WORKDIR /opt/app

RUN npm install

CMD ["npm", "start"]