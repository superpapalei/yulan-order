import { get, post, patch, put } from './httpASP'

//获得用户可见调查表
export function GetCustomerStudy(data, config = {}) {
    return post('/STUDY_FORM/GetCustomerStudy', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
//获得调查表内容
export function GetGroupContextOption(data, config = {}) {
    return post('/SF_GROUP/GetGroupContextOption', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}