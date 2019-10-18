import { get, post, patch, put } from "./httpASP";

//修改密码
export function ChangePassword(data, config = {}) {
    return post("/WEB_USER/ChangePassword", data, config).then(res => {
        return Promise.resolve(res);
    }).catch(err => {
        return Promise.reject(err);
    });
}
