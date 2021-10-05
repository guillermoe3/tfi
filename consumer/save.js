const amqp = require('amqplib/callback_api');
const printController = require("./printController")

module.exports = {
    create: function (document){

        const options = {
            clientProperties:
            {
                connection_name: 'printer-service-publisher'
            }
        };
        const message = {
            document: document,
            date: Date.now()
        }
     
        const connection = amqp.connect('amqp://root:password@localhost', options, (error, connection) => {
            if (error) {
                throw error;
            }
        
            connection.createChannel((connErr, channel) => {
                if (connErr) {
                    throw connErr;
                }
        
                channel.assertQueue('printerStatus', {
                    durable: true, 
                    //maxPriority: 10
                });
        
                //message

                
               const sent = channel.sendToQueue('printerStatus', Buffer.from(JSON.stringify(message)), {
                    persistent: true, 
                    //priority: parseInt(message.priority, 10)

                });

                async function printDocument(){

                    try {
                        let print = await printController.printLog(document);
                        return print;
                        
                    } catch (error) {
                        console.log(error)
                        
                    }
                   
                }
               let printed= printDocument();

                
        
                sent
                ? console.log(`Sent message`, message) : console.log(`Fails sending message`,message)
                
                
            });
        
            setTimeout(function() {
                connection.close();
                process.exit(0);
            }, 300 );
        });
        
    return message;}
}
