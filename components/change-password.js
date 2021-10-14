export const ChangePassword = {
    name: "change-password",
    template: `
    <div class="col-md-10">
    <div class="jumbotron">
        <h3 class="contain">修改密码</h3>
        <hr>
        <div class="home-change-password-center">
            <input type="password" class="form-control home-change-password-input" id="old_pass" placeholder="原密码">
        </div>
        <div class="home-change-password-center">
            <input type="password" class="form-control home-change-password-input" id="new_pass" placeholder="新密码">
        </div>
        <div class="home-change-password-center">
            <input type="password" class="form-control home-change-password-input" id="rep_pass" placeholder="再次输入密码">
        </div>
        <div class="home-change-password-center">
            <button type="button" class="btn btn-primary ">修改密码</button>
        </div>
    </div>
</div>
    `,
    data: () => ({
        name: "修改密码"
    }),
};