import { get, post, patch, put } from './httpASP'
//银行汇款，委托喷绘，退货赔偿都放在这里
//根据id查找汇款单
export function GetPaymentById(data, config = {}) {
    return post('/PAYMENT_BILL/GetPaymentById', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
//插入委托喷绘记录
export function InsertBrush(data, config = {}) {
    return post('/AIRBRUSHDESIGNREASSURE/InsertBrush', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}