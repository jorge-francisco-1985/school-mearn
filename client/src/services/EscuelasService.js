import axios from "axios";
const url = store.state.serverHost + "Escuelas";
import { store } from '../store'





class EscuelasService {
    //Get Posts
    static getEscuelas(token) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url + "/" + token);
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
    static insertEscuela(escuela) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(url, escuela);
                const data = res.data;
                resolve(
                    data
                );
            } catch (error) {
                reject(error);
            }
        })
    }
    static editarEscuela(request) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.put(url, request);
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

    static deleteEscuela(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default EscuelasService;