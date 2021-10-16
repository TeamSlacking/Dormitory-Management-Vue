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
        viewName: sessionStorage.getItem("lastView"),
        avatarSrc: "./img/diana.jpg",
        userinfo: JSON.parse(sessionStorage.getItem("userinfo")),
        system:getDormitory(),
    }),
    provide: function() {
        return {
            userinfo: this.userinfo
        }
    },
    methods: {
        storeAvatar(username) {
            storeAvatar(username, (src) => this.avatarSrc = src)
        },
        Logout() {
            Swal.fire({
                title: '你确定吗？',
                text: "你确定要注销系统吗？",
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
                    setTimeout("location.href = './index.html'", 3000)
                }
            })
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
        this.avatarSrc = loadAvatar(this.userinfo.username) ?? this.avatarSrc
    },
});