const mysqlConnection = require('../database');
const EscuelaUsuario = require("./EscuelasUsuarios");

class EscuelasDao {
    constructor (){
        this.tabla = "escuela";
    }
    
    static getEscuelas(user) {
        return new Promise((resolve,reject)=>{
            mysqlConnection.query(`SELECT * from ${tabla} where user_name!='${user}'`, (error, rows, field) => {
                if (!error) {
                    let response = { data: rows, token: newToken, code: 1, menssage: "Datos cargados correctamente" };
                    resolve(response);
                    // res.json(response);
                } else {
                    let response = { token: newToken, code: 0, menssage: "Error al intentar cargar la tabla" };
                    reject(respose);
                    // res.json(response);
                }

            });
        });
    }
    static insertarEscuela(data){
        return new Promise(async(resolve, reject) => {
            
            mysqlConnection.query('INSERT INTO escuela SET ?', data.escuela, function (error, result) {
                if (!error) {
                    var res = EscuelaUsuario.insertarEscuela({ id_escuela: data.escuela.id_escuela, user_name: data.user_name });
                    resolve(res);
                    
                } 
                else {
                    resolve({ error: error, code: 1, menssage: "Error al guardar la escuela" });
                }
            });
        });
        
    }
    static modificaEscuela(data){
        return new Promise(async(resolve, reject) => {
            var clave=data.id_escuela;
            delete data.id_escuela;
            delete data.user_name
            mysqlConnection.query(`UPDATE escuela SET ? where id_escuela='${clave}'` , data, function (error, result) {
                if (!error) {
                    resolve({data: result, code: 1, menssage: "Los datos se actualizaron correctamente" });
                    
                } 
                else {
                    resolve({ error: error, code: 1, menssage: "Error al actualizar los datos" });
                }
            });
        });
        
    }
}
module.exports =EscuelasDao;