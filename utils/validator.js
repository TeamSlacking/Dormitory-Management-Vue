import { dormitories } from "./dormitories.js";

/**
 * 验证宿舍管理员对象数据合法性
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

/**
 * 验证学生管理对象数据合法性
 * @param {{id: number; scode:number; sname: string; gender: 1 | 2; phone: string; dormitory: string, roomId: string}} StudentManagement
 */
export function validateStudentManagement({ id, scode,sname, gender, phone, dormitory, roomId }) {
    if (scode == "") {
        throw Error("所填的学号不合法");
    }
	if (sname == "") {
        throw Error("所填的名字不合法");
    }
    if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone)) {
        throw Error("所填的电话号码不合法");
    }
    if (!dormitories.includes(dormitory)) {
        throw Error("所填的宿舍楼不合法");
    }
}

/**
 * 验证缺勤记录对象数据合法性
 * 
 *@param {{id: number; scode: string; name: string; dormitory: string; room: number; date: datetime-local; beizhu: string}} AbsenceRecord
 */
export function validateAbsenceRecord({ id, scode, sname, dormitory, roomId, date, beizhu }) {
    if (scode == "") {
        throw Error("所填的学号不合法");
    }
    if (sname == "") {
        throw Error("所填的名字不合法");
    }
    if (!dormitories.includes(dormitory)) {
        throw Error("所填的宿舍楼不合法");
    }
    if (roomId == "") {
        throw Error("所填的寝室不合法");
    }
    if (date == "") {
        throw Error("所填的日期不合法");
    }
    if (beizhu == "") {
        throw Error("所填的备注不合法");
    }
}