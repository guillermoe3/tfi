const amqp = require('amqplib/callback_api');
const save = require('./save');
const print = require("./printController");

const options = {
    clientProperties:
    {
        connection_name: 'producer-service-consumer'
    }
};


function consumer(){
    console.log("hola consumer "+Date.now());

    amqp.connect('amqp://root:password@localhost', options, (error, connection) => {
        if (error) {
            throw error;
        }

        connection.createChannel((connErr, channel) => {
            if (connErr) {
                throw connErr;
            }

            channel.assertQueue("toPrint", {
                durable: true,
                maxPriority: 10
            });
            
        channel.consume('toPrint',(msg) => {
            console.log(msg.content.toString());
            let registro = JSON.parse(msg.content.toString());
            console.log(registro.text)
            
            //let printobj = await print.printLog(registro.text);
            
            let fecha = Date.now();

            if (fecha % 2 == 0){
                console.log("Es par, lo imprimo")
                try {
                    let obj = save.create(registro.text);
                } catch (error) {
                    console.log(error);
                    
                }
            } else {console.log("Es impar, no lo imprimo")}
            
        },{noAck: true});

        setTimeout(function() {
            console.log("chau "+Date.now());
            connection.close();
            process.exit(0);
        }, 1000);
    });

})
}

consumer();

