import { get, post, patch, put } from './httpASP'

//客户申请列表
export function GetImageCustomer(data, config = {}) {
    return post('/IMAGE_STORE/GetImageCustomer', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
//新增
export function InsertImageStore(data, config = {}) {
    return post('/IMAGE_STORE/InsertImageStore', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
//上传文件
export function UploadFiles(data, config = {}) {
    return post('/IMAGE_STORE/UploadFiles', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}