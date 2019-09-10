import { get, post, patch, put } from './httpASP'

//条件获取已发布的公告
export function GetNotificationAll(data, config = {}) {
    return post('/NOTIFICATION/GetPageDataTable', data, config).then((res) => {
        if (res.code === 0 || res.success) {//放到外面判断，有些返回不会返回是否成功，直接返回数据
            return Promise.resolve(res);
        }
        else {
            return Promise.reject(res);
        }
    }).catch((err) => {
        return Promise.reject(err);
    })
}
//获取最新已发布公告
export function GetNewNotification(data, config = {}) {
    return post('/NOTIFICATION/GetNewNotification', data, config).then((res) => {
        if (res.code === 0 || res.success) {//放到外面判断，有些返回不会返回是否成功，直接返回数据
            return Promise.resolve(res);
        }
        else {
            return Promise.reject(res);
        }
    }).catch((err) => {
        return Promise.reject(err);
    })
}