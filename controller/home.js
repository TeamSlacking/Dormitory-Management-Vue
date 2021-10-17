import { menu } from "../utils/menu.js";
import { userType } from "../utils/user-type.js";
import { SakuraSwitch } from "../components/sakura-switch.js";
import { loadAvatar, storeAvatar } from "../utils/avatar.js";
import { getDormitory } from "../utils/mock-data.js";

const app = new Vue({
    el: "#app",
    components: {
        "sakura-switch": SakuraSwitch,
    },
    data: () => ({
        viewName: sessionStorage.getItem("lastView") || "主页",
        userinfo: JSON.parse(sessionStorage.getItem("userinfo")),
        system:getDormitory(),
        dorm:sessionStorage.getItem("dormUser"),
        stu:sessionStorage.getItem("stuUser")
    }),
    provide: function() {
        return {
            userinfo: this.userinfo,
        }
    },
    mounted() {
        if (!this.userinfo) {
            Swal.fire({
                position: 'middle',
                icon: 'error',
                title: '暂未登录，稍后跳转回登录界面',
                showConfirmButton: false,
                timer: 3000
            })
            .then(() => {
                location.href = "./index.html"
            })
            return
        }
        const viewName = sessionStorage.getItem("lastView")
        if (viewName) {
            this.viewName = viewName
        }
        const avatarSrc = loadAvatar(this.userinfo.username) ?? "./img/diana.jpg"
        this.setAvatar(avatarSrc)
    },
    methods: {
        setAvatar(src) {
            this.$set(this.userinfo, 'avatarSrc', src)
        },
        storeAvatar(username) {
            storeAvatar(username, this.setAvatar)
        },
        Logout() {
            Swal.fire({
                title: '你确定吗？',
                text: "你确定要注销系统吗？注销账号会导致清空所有账号信息！",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '是的，我确定！',
                cancelButtonText: '取消，我不退出',
            }).then((result) => {
                if (result.isConfirmed) {
                    let timerInterval
                    Swal.fire({
                        title: '注销中!',
                        html: '正常清除数据 <b></b>项 .',
                        timer: 2000,
                        timerProgressBar: true,
                        icon: 'warning',
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
                            Swal.fire({
                                title: '清除数据成功',
                                icon: 'success',
                                type: 'success',
                                button: '确定！'
                            })
                        }
                    })
                    sessionStorage.clear();
                    localStorage.removeItem("password");
                    localStorage.removeItem("username");
                    setTimeout("location.href = './index.html'", 3000)
                }
            })
        },
    },
    computed: {
        menu() {
            return menu.filter((item) => item.allows.includes(Number(this.userinfo.type)));
        },
        viewComponent() {
            const item = menu.find((item) => item.name === this.viewName);
            return item.component ?? IndexWelcome;
        },
        name(){
            if (this.userinfo.type == userType.SystemAdmin){
                return this.userinfo.username
            } else if (this.userinfo.type == userType.DormitoryAdmin) {
                return this.dorm;
            } else if (this.userinfo.type == userType.Student) {
                return this.stu;
            }
        },
        welcome() {
            if (this.userinfo.type == userType.SystemAdmin) {
                return "欢迎您，系统管理员";
            } else if (this.userinfo.type == userType.DormitoryAdmin) {
                return "欢迎您，宿舍管理员";
            } else if (this.userinfo.type == userType.Student) {
                return "欢迎您，同学";
            } else {
                return "非法访问！"
            }
        },
    },
    watch: {
        /** @param {string} value */
        viewName(value) {
            sessionStorage.setItem("lastView", value)
        },
    },
});