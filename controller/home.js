import { AdminManagement } from "../components/admin-management.js";
import { IndexWelcome } from "../components/index-welcome.js";

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
    },
    {
        name: "宿舍楼管理",
    },
    {
        name: "缺勤记录",
    },
    {
        name: "修改密码",
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
});
