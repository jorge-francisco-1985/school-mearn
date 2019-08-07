const express=require("express");
const app = express();
const AES = require("mysql-aes");
const router = express.Router();


const mysqlConnection=require('../database');
router.get("/empleados", (req, res) => {
    console.log(req.body);
    mysqlConnection.query("SELECT * from usuarios", (error, rows, field) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
        }
    });
});

module.exports = router;