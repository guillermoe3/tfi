const path = require("path");
const db = require("./database/models")


let printController = {
    index: function (req, res){
        
        res.send(JSON.stringify("recibido"));

    },
    printLog: async function (document){

        let registro = await db.Print.create({
            document: document,
            date: Date.now()

        })
        //console.log(registro.id)
        return JSON.stringify(registro);

        //res.send(JSON.stringify(registro));
       
    }

}

module.exports = printController;