import axios from 'axios';
import config from './config';

class Services {
    constructor() {
        if (!Services._instance) { //был ли создан экземпляр класса (синглтон)

            this.services = axios.create({
                baseURL: config.api
            });

            if (localStorage._token) {

                this.addToken();
            }

            this.services.interceptors.response.use(this.handleSuccess, this.handleError);

            Services._instance = this;
        }

        return Services._instance;
    }

    addToken() {

        this.services.defaults.headers.common["auth-token"] = localStorage._token;
    }

    handleSuccess(response) {
        return response;
    }

    handleError(error) {
        switch (error.response.status) {
            case 401:
            case 400:
            case 422:
                break;
            default:
                // document.location = '/404'
                break;
        }
        return Promise.reject(error);
    }

    get(path, params){
        return this.services.request({
            method: "GET",
            url: path,
            responseType: "json",
            params: params
        });
    }

    put(path, payload){
        return this.services.request({
            method: "PUT",
            url: path,
            responseType: "json",
            data: payload
        });
    }

    post(path, payload){
        return this.services.request({
            method: "POST",
            url: path,
            responseType: "json",
            data: payload
        });
    }

    delete(path){
        return this.services.delete(path);
    }

}

const instance = new Services();
Object.freeze(instance);

export default instance;

//логика обращения к серверу

//singltone