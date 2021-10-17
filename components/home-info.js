import { loadAvatar } from "../utils/avatar.js";

const template = `
<div class="col-md-10 col-xl-4 order-xl-2">
<div class="card card-profile">
    <img src="./img/user-info.jpg" alt="Image placeholder" class="card-img-top">
    <div class="row justify-content-center">
        <div class="col-lg-3 order-lg-2">
            <div class="card-profile-image">
                <a href="#">
                    <img :src="avatarSrc" class="rounded-circle">
                </a>
            </div>
        </div>
    </div>
    <div style="height: 80px;"></div>
    <div class="card-body pt-0">
        <div class="row">
            <div class="col">
                <div class="card-profile-stats d-flex" style="justify-content: space-evenly;">
                    <div>
                        <span class="heading">SystemAdmin</span>
                        <span class="description">类型</span>
                    </div>
                    <div>
                        <span class="heading">最高</span>
                        <span class="description">权限</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center">
            <h5 class="h3" style="padding:0.8em">{{ userinfo.username }}</h5>
            <button class="btn btn-sm btn-danger waves-effect waves-float waves-light" style="color:white" data-toggle="modal" data-target="#delete-account-modal">删除账号</button>
        </div>
    </div>
</div>
</div>
`;

export const HomeInfo = {
  name: "home-info",
  template,
  inject: ["userinfo"],
  computed: {
      avatarSrc() {
        //   return loadAvatar(this.userinfo.username);
        return this.userinfo.avatarSrc
      },
  },
};