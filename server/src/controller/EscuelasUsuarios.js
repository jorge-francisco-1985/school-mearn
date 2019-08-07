const mysqlConnection = require('../database');

class EscuelasUsuarioDao {
    // tabla="escuela";
    static getEscuelasByUser(user) {
        return new Promise(async (resolve, reject) => {
            mysqlConnection.query(`SELECT * from escuelas where user_name='${user}' and status>=1 `, (error, rows, field) => {
                if (!error) {                
                    
                    resolve({ data: rows, code: 1, menssage: "Datos cargados correctamente" });
                    // res.json(response);
                } else {
                    resolve({ error: error, code: 0, menssage: "Error al intentar cargar la tabla" });
                    // res.json(response);
                }
            });
        });
    }


    static insertarEscuela(escuelas) {
        return new Promise(async (resolve,reject)=>{
            console.log(escuelas);
            
            mysqlConnection.query('INSERT INTO usuarios_x_escuela SET ?', escuelas, function (error, result) {
                if (!error) {
                    resolve({ data: result, code: 1, menssage: "La escuela se guardo con exito" });
                } else {
                    resolve({ error: error, code: 1, menssage: "Error al guardar la escuela" });
                }
            });
        });
        
    }

    
}
module.exports =EscuelasUsuarioDao;