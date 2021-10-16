import { menu } from "../utils/menu.js";
import { getDormitoryAdmin } from "../utils/mock-data.js";

const app = new Vue({
    el: '#app',
    data: {
        system: getDormitoryAdmin(), //取出来的数据
        loginForm: {
            username: localStorage.getItem("username") || '',
            password: localStorage.getItem("password") || '',
            type: 0, //用户类型  0为系统管理员 1为宿舍管理员 2为学生 默认为0
            rem: false, //勾选记住密码  默认为false
        }
    },
    methods: {
        /** @param {KeyboardEvent} event */
        keyup(event) {
            event.key === "Enter" && this.login()
        },
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
            //系统管理员登录
            if (this.loginForm.type == 0) {
                if (this.loginForm.username == "admin" && this.loginForm.password == "123") {
                    if (this.loginForm.rem) {
                        localStorage.setItem("username", this.loginForm.username);
                        localStorage.setItem("password", this.loginForm.password);
                    } else {
                        localStorage.removeItem("username");
                        localStorage.removeItem("password");
                    }
                    sessionStorage.setItem("menu", JSON.stringify(menu));
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
                //宿舍管理员登录
            } else if (this.loginForm.type == 1) {
                let isSucess = false; //判断账号是否正确
                for(let index in this.system){
                    let item = this.system[index];
                    if(item.username == this.loginForm.username && item.password == this.loginForm.password ){
                        isSucess = true;
                        break; //中止循环
                        // continue 跳出当次循环
                    }
                }
                if(isSucess){
                    if (this.loginForm.rem) {
                        localStorage.setItem("username", this.loginForm.username);
                        localStorage.setItem("password", this.loginForm.password);
                    } else {
                        localStorage.removeItem("username");
                        localStorage.removeItem("password");
                    }
                    sessionStorage.setItem("menu", JSON.stringify(menu));
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
                //学生登录
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
