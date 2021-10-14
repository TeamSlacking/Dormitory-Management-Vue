import { IndexWelcome } from "../components/index-welcome.js";
import { AdminManagement } from "../components/admin-management.js";
import { StudentManagement } from "../components/student-management.js";
import { BuildingManagement } from "../components/building-management.js";
import { AbsenceRecords } from "../components/absence-records.js";
import { ChangePassword } from "../components/change-password.js";

/** @type {Array<{name: string, component: Object}>} */
const menu = [
    {
        name: "主页",
        component: IndexWelcome,
    },
    {
        name: "宿舍管理员管理",
        component: AdminManagement,
    },
    {
        name: "学生管理",
        component: StudentManagement,
    },
    {
        name: "宿舍楼管理",
        component: BuildingManagement,
    },
    {
        name: "缺勤记录",
        component: AbsenceRecords,
    },
    {
        name: "修改密码",
        component: ChangePassword,
    },
];

const app = new Vue({
    el: "#app",
    data: () => ({
        menu,
        viewName: "主页",
    }),
    methods: {},
    computed: {
        viewComponent() {
            const item = menu.find((item) => item.name === this.viewName);
            return item.component ?? IndexWelcome;
        },
    },
    watch: {
        viewName(value) {
            sessionStorage.setItem("lastView", value)
        }
    },
    mounted() {
        const viewName = sessionStorage.getItem("lastView")
        if (viewName) {
            this.viewName = viewName
        }
    }
});
