import { get, post, patch, put } from './httpASP'

//插入已读公告记录
export function GetCustomerStudy(data, config = {}) {
    return post('/STUDY_FORM/GetCustomerStudy', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}