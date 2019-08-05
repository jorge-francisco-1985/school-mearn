const express = require("express");
const app = express();
const AES = require("mysql-aes");
const router = express.Router();
const mysqlConnection = require('../database');



router.get("/usuarios", (req, res) => {
    console.log(req.body);

    mysqlConnection.query("SELECT * from usuarios", (error, rows, field) => {
        if (!error) {
            res.json(rows);

        } else {
            console.log(error);
        }
    });
});

router.post("/usuarios", (req, res) => {
    var usuario = req.body.user;
    usuario.pass = AES.encrypt("String(usuario.pass)", 'app.get("clave")');
    mysqlConnection.query('INSERT INTO usuarios SET ?', usuario, function (err, result) {
        if (!err) {

            if (result.affectedRows >= 1) {
                res.json({ code: 1, message: "Usuario Agregado con exito" });
            }


        } else {
            console.log(err.errno);
        }
    });
});

module.exports = router;