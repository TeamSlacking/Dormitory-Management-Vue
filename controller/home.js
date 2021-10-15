import { menu } from "../utils/menu.js";
import { userType } from "../utils/user-type.js";
import { SakuraSwitch } from "../components/sakura-switch.js";

const app = new Vue({
    el: "#app",
    components: {
        "sakura-switch": SakuraSwitch,
    },
    data: () => ({
        viewName: "主页",
        userinfo: JSON.parse(sessionStorage.getItem("userinfo")),
    }),
    methods: {
        Logout(){
            let timerInterval
                Swal.fire({
                title: '注销中!',
                html: '正常清除数据 <b></b>项,完成后自动退出登录 .',
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
                }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                }
                })

            sessionStorage.clear();
            setTimeout(() => location.href = './index.html', 2000)
        },
        changePassword() {

        }
    },
    computed: {
        menu() {
            return menu.filter((item) => item.allows.includes(Number(this.userinfo.type)));
        },
        viewComponent() {
            const item = menu.find((item) => item.name === this.viewName);
            return item.component ?? IndexWelcome;
        },
        welcome(){
            if(this.userinfo.type == userType.SystemAdmin){
                return "欢迎您，系统管理员";
            } else if (this.userinfo.type == userType.DormitoryAdmin){
                return "欢迎您，宿舍管理员";
            }else if (this.userinfo.type == userType.Student){
                return "欢迎您，同学";
            }else {
                return "非法访问！"
            }
        }
    },
    watch: {
        /** @param {string} value */
        viewName(value) {
            sessionStorage.setItem("lastView", value)
        },
    },
    mounted() {
        const viewName = sessionStorage.getItem("lastView")
        if (viewName) {
            this.viewName = viewName
        }
    },
});
