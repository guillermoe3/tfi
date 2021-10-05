TFI

Solution made with NodeJS, RabbitMQ (docker-compose in “rabbitmq” folder), sequelize, MySQL and EJS. 

Endpoints: 

/print -> to print a file. This endpoint add to queue “toPrint” the name of the file and the priority. 
/all -> to get all files printed.