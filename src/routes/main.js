const express = require("express");
const router = express.Router();
const path = require("path");
const main = require("../controllers/mainController");
const print = require("../../consumer/printController");
const multer = require("multer");



//multer config

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname,"../../public/uploads"))
        
    }, 
    filename: (req, file, cb) => {
       
        cb(null, file.originalname + ' ' + Date.now());

    }
}); 

const upload = multer({storage : storage});



router.get("/", main.index);
router.post("/print",upload.single("document"),main.create)
router.post("/all", main.getAll);


module.exports = router;
