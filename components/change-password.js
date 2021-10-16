import { getDormitoryAdmin, saveDormitoryAdmin } from "../utils/mock-data.js";

export const ChangePassword = {
    name: "change-password",
    template: `
    <div class="col-md-10">
    <div class="jumbotron">
        <h3 class="contain">修改密码</h3>
        <hr>
        <div class="home-change-password-center">
            <input type="password" class="form-control home-change-password-input" v-model.trim="oldPass" placeholder="原密码">
        </div>
        <div class="home-change-password-center">
            <input type="password" class="form-control home-change-password-input" v-model.trim="newPass" placeholder="新密码">
        </div>
        <div class="home-change-password-center">
            <input type="password" class="form-control home-change-password-input" v-model.trim="repPass" placeholder="再次输入密码">
        </div>
        <div class="home-change-password-center">
            <button type="button" class="btn btn-primary " @click="changePassword" >修改密码</button>
        </div>
    </div>
</div>
    `,
    data: () => ({
        name: "修改密码",
        oldPass: "",
        newPass:'',
        repPass:'',
        system: getDormitoryAdmin(),
        userinfo: JSON.parse(sessionStorage.getItem("userinfo")),
    }),
    methods: {
        changePassword() {
            if (this.oldPass == '' || this.newPass == '' || this.repPass == '') {
                Swal.fire({
                    icon: 'error',
                    title: '错误',
                    text: '密码不能为空',
                    button: '我知道了！',
                })
                return;
            }

            if (this.newPass != this.repPass ) {
                Swal.fire({
                    icon: 'error',
                    title: '错误',
                    text: '确认密码必须一致',
                    button: '我知道了！',
                })
                return;
            }

            if(this.oldPass == this.userinfo.password) {
               if(this.userinfo.type == 0){

               } else if(this.userinfo.type == 1){
                     // 定义dormitoryAdmin   从getDormitoryAdmin()的数据里面遍历寻找当前账户的密码和当前账户账号
                     let dormitoryAdmin = this.system.find(item => item.password == this.oldPass && item.username == this.userinfo.username);
                     // 新的密码赋值给 找到的这条数据里面的password
                     dormitoryAdmin.password = this.newPass; 
                     saveDormitoryAdmin(this.system);
                     Swal.fire({
                        icon: 'success',
                        title: '成功',
                        text: '修改密码成功！',
                        button: 'ok！',
                    })
                    return;
               } else if(this.userinfo.type == 1){
                   
               }
            }
        }
    },
};