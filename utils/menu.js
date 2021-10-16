import { HomeWelcome } from "../components/home-welcome.js";
import { AdminManagement } from "../components/admin-management.js";
import { StudentManagement } from "../components/student-management.js";
import { BuildingManagement } from "../components/building-management.js";
import { AbsenceRecords } from "../components/absence-records.js";
import { ChangePassword } from "../components/change-password.js";
import { userType } from "./user-type.js";
import { HomeInfo } from "../components/home-info.js";

const { SystemAdmin, DormitoryAdmin, Student } = userType

/** @type {Array<{name: string; component: object; allows: Array<0 | 1 | 2>}>} */
export const menu = [
    {
        name: "主页",
        component: HomeWelcome,
        allows: [SystemAdmin, DormitoryAdmin, Student],
    },
    {
        name: "个人信息",
        component: HomeInfo,
        allows: [SystemAdmin, DormitoryAdmin, Student],
    },
    {
        name: "宿舍管理员管理",
        component: AdminManagement,
        allows: [SystemAdmin],
    },
    {
        name: "学生管理",
        component: StudentManagement,
        allows: [SystemAdmin, DormitoryAdmin],
    },
    {
        name: "宿舍楼管理",
        component: BuildingManagement,
        allows: [SystemAdmin],
    },
    {
        name: "缺勤记录",
        component: AbsenceRecords,
        allows: [SystemAdmin, DormitoryAdmin, Student],
    },
    {
        name: "修改密码",
        component: ChangePassword,
        allows: [SystemAdmin, DormitoryAdmin, Student],
    },
];
