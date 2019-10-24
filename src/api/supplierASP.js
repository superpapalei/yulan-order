import { get, post, patch, put } from './httpASP'

export function GetPoDetail(data, config = {}) {
    return post('/PUR_HEAD/GetPoDetail', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
export function GetRelativePo(data, config = {}) {
    return post('/PUR_HEAD/GetRelativePo', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
export function GetTransDetail(data, config = {}) {
    return post('/PUR_HEAD/GetTransDetail', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
export function SaveHeadNotes(data, config = {}) {
    return post('/PUR_HEAD/SaveHeadNotes', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
export function Submit(data, config = {}) {
    return post('/PUR_HEAD/Submit', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
export function UpdateCheckFlag(data, config = {}) {
    return post('/PUR_HEAD/UpdateCheckFlag', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
export function UpdatePartDetail(data, config = {}) {
    return post('/PUR_HEAD/UpdatePartDetail', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
export function UpdateCheckFlagBatch(data, config = {}) {
    return post('/PUR_HEAD/UpdateCheckFlagBatch', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}

export function CreateExcel(data, config = {}) {
    return post('/PUR_HEAD/CreateExcel', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}


//付款委托书查询表头
export function GetRelativePay(data, config = {}) {
    return post('/PUR_HEAD/GetRelativePay', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}

//付款委托书查询明细
export function CheckDetailByID(data, config = {}) {
    return post('/PUR_HEAD/CheckDetailByID', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}

//客户上传附件
export function editByCustomer(data,config = {}) {
    return post('/PUR_HEAD/EditByCustomer', data,config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}