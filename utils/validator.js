import { dormitories } from "./dormitories.js";

/**
 * 验证数据管理员对象数据合法性
 * @param {{id: number; name: string; gender: 1 | 2; phone: string; dormitory: string, username: string}} admin
 */
 export function validateAdmin({ id, name, gender, phone, dormitory, username }) {
    if (name == "") {
        throw Error("所填的名字不合法");
    }
    if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone)) {
        throw Error("所填的电话号码不合法");
    }
    if (!dormitories.includes(dormitory)) {
        throw Error("所填的宿舍楼不合法");
    }
    if (username == "") {
        throw Error("所填的用户名不合法");
    }
}
