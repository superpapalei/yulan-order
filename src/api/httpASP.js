import Axios from 'axios'
import Cookies from "js-cookie";

var baseUrl = 'http://localhost:49438/';//本地
//var baseUrl = 'http://47.107.56.156:666/';//测试
//var baseUrl = 'http://14.29.223.114:568/';//正式
//var baseUrl = 'http://47.107.56.156:568/';//不用了

/**
 * 封装get方法
 * @param url 
 * @param params 
 * @returns {Promise} 
 */
export function get(url, params = {}, config = {}) {
    Axios.defaults.withCredentials = false;
    return new Promise((resolve, reject) => {
        Axios.get(baseUrl + url, {
            params: params,
        }, config)
            .then(response => {
                Axios.defaults.withCredentials = true;
                if (response.data.code == -1) {
                    vm.$router.push({
                        path: '/login'
                    });
                    reject(response.data);
                }
                else {
                    if (Cookies.get("cid") && sessionStorage.getItem("_userId") && sessionStorage.getItem("_userId") != Cookies.get("cid")) {
                        vm.$router.push({
                            path: '/login'
                        });
                        reject(response.data);
                    }
                }
                resolve(response.data);
            })
            .catch(err => {
                Axios.defaults.withCredentials = true;
                reject(err)
            })
    })
}
/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}, config = {}) {
    Axios.defaults.withCredentials = false;
    return new Promise((resolve, reject) => {
        Axios.post(baseUrl + url, data, config)
            .then(response => {
                Axios.defaults.withCredentials = true;
                if (response.data.code == -1) {
                    vm.$router.push({
                        path: '/login'
                    });
                    reject(response.data);
                }
                else {
                    if (Cookies.get("cid") && sessionStorage.getItem("_userId") && sessionStorage.getItem("_userId") != Cookies.get("cid")) {
                        vm.$router.push({
                            path: '/login'
                        });
                        reject(response.data);
                    }
                }
                resolve(response.data);
            })
            .catch(error => {
                Axios.defaults.withCredentials = true;
                reject(error);
            })
    })
}
/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}, config = {}) {
    Axios.defaults.withCredentials = false;
    return new Promise((resolve, reject) => {
        Axios.patch(baseUrl + url, data, config)
            .then(response => {
                Axios.defaults.withCredentials = true;
                if (response.data.code == -1) {
                    vm.$router.push({
                        path: '/login'
                    });
                    reject(response.data);
                }
                else {
                    if (Cookies.get("cid") && sessionStorage.getItem("_userId") && sessionStorage.getItem("_userId") != Cookies.get("cid")) {
                        vm.$router.push({
                            path: '/login'
                        });
                        reject(response.data);
                    }
                }
                resolve(response.data);
            })
            .catch(error => {
                Axios.defaults.withCredentials = true;
                reject(error);
            })
    })
}
/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}, config = {}) {
    Axios.defaults.withCredentials = false;
    return new Promise((resolve, reject) => {
        Axios.put(baseUrl + url, data, config)
            .then(response => {
                Axios.defaults.withCredentials = true;
                if (response.data.code == -1) {
                    vm.$router.push({
                        path: '/login'
                    });
                    reject(response.data);
                }
                else {
                    if (Cookies.get("cid") && sessionStorage.getItem("_userId") && sessionStorage.getItem("_userId") != Cookies.get("cid")) {
                        vm.$router.push({
                            path: '/login'
                        });
                        reject(response.data);
                    }
                }
                resolve(response.data);
            }, err => {
                Axios.defaults.withCredentials = true;
                reject(err)
            })
    })
}