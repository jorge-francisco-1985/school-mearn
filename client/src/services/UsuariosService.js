import axios from "axios";
const url = store.state.serverHost+"usuarios";
import { store } from '../store'





class UsuariosService {
    //Get Posts
    static getUsuarios(token) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url+"/"+token);
                const data = res.data;
                resolve(
                    data
                );
            } catch (error) {
                reject(error);
            }
        })
    }
    //Create Posts
    static insertUser(user) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(store.state.serverHost + "usuarios", {user:user});
                const data = res.data;
                resolve(
                    data
                );
            } catch (error) {
                reject(error);
            }
        })
    }
    static loginUser(user){
        return new Promise(async (resolve,reject)=>{
            try{
                const res = await axios.post(store.state.serverHost+"usuarios/login",user);
                const data = res.data;
                resolve(
                    data
                );
            } catch (error) {
                reject(error);
            }
        })
    }
    // Delete Posts

    static deletePost(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default UsuariosService;