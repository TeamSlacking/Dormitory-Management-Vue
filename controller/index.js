import { menu } from "../utils/menu.js";

const app = new Vue({
    el: '#app',
    data: {
        userinfo: JSON.parse(sessionStorage.getItem("userinfo")),
        loginForm: {
            Login_username: localStorage.getItem("login_username") || '',
            Login_password: localStorage.getItem("login_password") || '',
            type: 0,
            rem: false
        }
    },
    methods: {
        login() {
            //验证
            if (this.loginForm.Login_username == "") {
                swal({
                    title: "Error!",
                    text: "账号不能为空!",
                    type: "error",
                    confirmButtonText: "OK"
                });
                return;
            }
            if (this.loginForm.Login_password == "") {
                swal({
                    title: "Error!",
                    text: "密码不能为空!",
                    type: "error",
                    confirmButtonText: "OK"
                });
                return;
            }
            if (this.loginForm.Login_username.length < 5 || this.loginForm.Login_username.length > 18) {
                swal({
                    title: "Error!",
                    text: "账号长度为5~18位!",
                    type: "error",
                    confirmButtonText: "OK"
                });
                return;
            }

            if (this.loginForm.Login_password.length < 3 || this.loginForm.Login_password.length > 18) {
                swal({
                    title: "Error!",
                    text: "密码长度为3~18位!",
                    type: "error",
                    confirmButtonText: "OK"
                });
                return;
            }
            if (this.loginForm.type == 0) {
                if (this.loginForm.Login_username == "admin" && this.loginForm.Login_password == "123") {
                    if (this.loginForm.rem) {
                        localStorage.setItem("login_username", this.loginForm.Login_username);
                        localStorage.setItem("login_password", this.loginForm.Login_password);
                    } else {
                        localStorage.removeItem("login_username");
                        localStorage.removeItem("login_password");
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