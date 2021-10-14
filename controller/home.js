import { menu } from "../utils/menu.js";

const app = new Vue({
    el: "#app",
    data: () => ({
        menu,
        viewName: "主页",
        userinfo: JSON.parse(sessionStorage.getItem("userinfo")),
    }),
    methods: {
        Logout(){
            swal({
                title: "注销成功",
                text: "注销账号成功，3秒后自动退出当前登陆",
                icon: "success",
                button: "确定!",
              });
            sessionStorage.clear();
            setTimeout("location.href = '/Dormitory_Management-vue/index.html'", 3000)
        }
    },
    computed: {
        viewComponent() {
            const item = menu.find((item) => item.name === this.viewName);
            return item.component ?? IndexWelcome;
        },
        Welcome(){
            if(this.userinfo.type == 0){
                return "欢迎您，系统管理员";
            } else if (this.userinfo.type == 1){
                return "欢迎您，宿舍管理员";
            }else if (this.userinfo.type == 2){
                return "欢迎您，同学";
            }else {
                return "非法访问！"
            }
        }
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
    },
});
