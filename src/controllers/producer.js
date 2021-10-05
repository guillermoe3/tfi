const amqp = require('amqplib/callback_api');

module.exports = {
    create: function (priority, name){

        const options = {
            clientProperties:
            {
                connection_name: 'producer-service-publisher'
            }
        };
        const message = {
            priority: priority,
            text: name
        }
     
        const connection = amqp.connect('amqp://root:password@localhost', options, (error, connection) => {
            if (error) {
                throw error;
            }
        
            connection.createChannel((connErr, channel) => {
                if (connErr) {
                    throw connErr;
                }
        
                channel.assertQueue('toPrint', {
                    durable: true, 
                    maxPriority: 10
                });
        
                //message

                
               const sent = channel.sendToQueue('toPrint', Buffer.from(JSON.stringify(message)), {
                    persistent: true, 
                    priority: parseInt(message.priority, 10)

                });
        
                sent
                ? console.log(`Sent message`, message) : console.log(`Fails sending message`,message)
                
                
            });
        
           /* setTimeout(function() {
                connection.close();
                process.exit(0);
            }, 5000 );*/
        });
        
    return message;}
}
