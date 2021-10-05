const path = require("path");
const producer = require("./producer")
const db = require("../database/models")


let mainController = {
    index: function (req, res){
        
        res.render("index")

    },
    create: function (req, res){
        let file = req.file;
        console.log(file.originalname);//filename);

        try {

           let result= producer.create(req.body.priority, file.originalname)
           res.send(JSON.stringify(result));
            
        } catch (error) {
            console.log(error);
        }
       
    }, 
    getAll: async function (req, res){
        try {
            let all = await db.Print.findAll();
            res.send(JSON.stringify(all));
        } catch (error) {
            console.log(error);
            
        }

    }

}

module.exports = mainController;