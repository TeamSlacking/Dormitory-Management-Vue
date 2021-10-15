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
            let timerInterval
                Swal.fire({
                title: '注销中!',
                html: '正常清除数据 <b></b>,完成后自动退出登录 .',
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
            setTimeout("location.href = '/Dormitory_Management-vue/index.html'", 2000)
        }
    },
    computed: {
        viewComponent() {
            const item = menu.find((item) => item.name === this.viewName);
            return item.component ?? IndexWelcome;
        },
        welcome(){
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
