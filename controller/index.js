import { menu } from "../utils/menu.js";
import { getDormitoryAdmin, getStudentAdmin } from "../utils/mock-data.js";

const app = new Vue({
    el: '#app',
    data: {
        student: getStudentAdmin(),
        system: getDormitoryAdmin(), //取出来的数据
        loginForm: {
            username: localStorage.getItem("username") || '',
            password: localStorage.getItem("password") || '',
            type: 0, //用户类型  0为系统管理员 1为宿舍管理员 2为学生 默认为0
            rem: true, //勾选记住密码  默认为false
        },
    },
    created() {
        if(localStorage.getItem('adminUser') == '' || localStorage.getItem('adminUser') == null){
            localStorage.setItem('adminUser', 'admin');
        }
        if(localStorage.getItem('adminPass') == '' || localStorage.getItem('adminPass') == null){
            localStorage.setItem('adminPass', '123');
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
                Swal.fire({
                    icon: 'error',
                    title: '错误！',
                    text: '账号不能为空！',
                    button: '我知道了！'
                });
                return;
            }
            if (this.loginForm.password == "") {
                Swal.fire({
                    icon: 'error',
                    title: '错误！',
                    text: '密码不能为空！',
                    button: '我知道了！'
                });
                return;
            }
            if (this.loginForm.username.length < 5 || this.loginForm.username.length > 18) {
                Swal.fire({
                    icon: 'error',
                    title: '错误！',
                    text: '账号长度为5~18位！',
                    button: '我知道了！'
                });
                return;
            }

            if (this.loginForm.password.length < 3 || this.loginForm.password.length > 18) {
                Swal.fire({
                    icon: 'error',
                    title: '错误！',
                    text: '密码长度为5~18位！',
                    button: '我知道了！'
                });
                return;
            }
            //系统管理员登录
            if (this.loginForm.type == 0) {
                const user = localStorage.getItem("adminUser")
                const pass = localStorage.getItem("adminPass")
                if (this.loginForm.username == user && this.loginForm.password == pass) {
                    if (this.loginForm.rem) {
                        localStorage.setItem("adminUser", this.loginForm.username);
                        localStorage.setItem("password", this.loginForm.password);
                    } else {
                        localStorage.removeItem("adminUser");
                        localStorage.removeItem("adminPass");
                    }
                    sessionStorage.setItem("menu", JSON.stringify(menu));
                    sessionStorage.setItem("userinfo", JSON.stringify(this.loginForm))
                    location.href = 'home.html'
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: '错误！',
                        text: '账号或者密码错误！',
                        button: '我知道了！'
                    });
                    return;
                }
                //宿舍管理员登录
            } else if (this.loginForm.type == 1) {
                let isSucess = false; //判断账号是否正确
                for (let index in this.system) {
                    let item = this.system[index];
                    if (item.username == this.loginForm.username && item.password == this.loginForm.password) {
                        isSucess = true;
                        break; //中止循环
                        // continue 跳出当次循环
                    }
                }
                if (isSucess) {
                    if (this.loginForm.rem) {
                        localStorage.setItem("username", this.loginForm.username);
                        localStorage.setItem("password", this.loginForm.password);
                    } else {
                        localStorage.removeItem("username");
                        localStorage.removeItem("password");
                    }
                    let dorm = this.system.find(item => item.username == this.loginForm.username)
                    sessionStorage.setItem("dormUser",dorm.name)
                    sessionStorage.setItem("menu", JSON.stringify(menu));
                    sessionStorage.setItem("userinfo", JSON.stringify(this.loginForm))
                    location.href = 'home.html'
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: '错误！',
                        text: '账号或者密码错误！',
                        button: '我知道了！'
                    });
                    return;
                }
                //学生登录
            } else if (this.loginForm.type == 2) {
                let isSucess = false; //判断账号是否正确
                for (let index in this.student) {
                    let item = this.student[index];
                    if (item.scode == this.loginForm.username && item.password == this.loginForm.password) {
                        isSucess = true;
                        break; //中止循环
                    }
                }
                if (isSucess) {
                    if (this.loginForm.rem) {
                        localStorage.setItem("username", this.loginForm.username);
                        localStorage.setItem("password", this.loginForm.password);
                    } else {
                        localStorage.removeItem("username");
                        localStorage.removeItem("password");
                    }
                    let stu = this.student.find(item => item.scode == this.loginForm.username)
                    sessionStorage.setItem("stuUser",stu.sname)
                    sessionStorage.setItem("menu", JSON.stringify(menu));
                    sessionStorage.setItem("userinfo", JSON.stringify(this.loginForm))
                    location.href = 'home.html'
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: '错误！',
                        text: '登陆类型选择错误！',
                        button: '我知道了！'
                    });
                    return;
                }
            }
        },
    },
    computed: {
        
    },
})
