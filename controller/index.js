import { menu } from "../utils/menu.js";

const app = new Vue({
    el: '#app',
    data: {
        userinfo: JSON.parse(sessionStorage.getItem("userinfo")),
        loginForm: {
            username: localStorage.getItem("username") || '',
            password: localStorage.getItem("password") || '',
            type: 0,
            rem: false
        }
    },
    methods: {
        login() {
            //验证
            if (this.loginForm.username == "") {
                swal({
                    title: "Error!",
                    text: "账号不能为空!",
                    type: "error",
                    confirmButtonText: "OK"
                });
                return;
            }
            if (this.loginForm.password == "") {
                swal({
                    title: "Error!",
                    text: "密码不能为空!",
                    type: "error",
                    confirmButtonText: "OK"
                });
                return;
            }
            if (this.loginForm.username.length < 5 || this.loginForm.username.length > 18) {
                swal({
                    title: "Error!",
                    text: "账号长度为5~18位!",
                    type: "error",
                    confirmButtonText: "OK"
                });
                return;
            }

            if (this.loginForm.password.length < 3 || this.loginForm.password.length > 18) {
                swal({
                    title: "Error!",
                    text: "密码长度为3~18位!",
                    type: "error",
                    confirmButtonText: "OK"
                });
                return;
            }
            if (this.loginForm.type == 0) {
                if (this.loginForm.username == "admin" && this.loginForm.password == "123") {
                    if (this.loginForm.rem) {
                        localStorage.setItem("username", this.loginForm.username);
                        localStorage.setItem("login_password", this.loginForm.password);
                    } else {
                        localStorage.removeItem("username");
                        localStorage.removeItem("password");
                    }
                    sessionStorage.setItem("menu", JSON.stringify(menu));
                    delete this.loginForm.Login_password;
                    sessionStorage.setItem("userinfo", JSON.stringify(this.loginForm))
                    location.href = 'home.html'
                } else {
                    swal({
                        title: "Error!",
                        text: "账号或者密码错误!",
                        type: "error",
                        confirmButtonText: "OK"
                    });
                    return;
                }
            } else if (this.loginForm.type == 1) {

            } else if (this.loginForm.type == 2) {

            } else {
                swal({
                    title: "Error!",
                    text: "登陆类型选择错误!",
                    type: "error",
                    confirmButtonText: "OK"
                });
                return;
            }
        }
    },
    computed: {
        
    },
})