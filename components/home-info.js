const template = `
<div class="col-xl-4 order-xl-2">
<div class="card card-profile">
    <img src="./img/user-info.jpg" alt="Image placeholder" class="card-img-top">
    <div class="row justify-content-center">
        <div class="col-lg-3 order-lg-2">
            <div class="card-profile-image">
                <a href="#">
                    <img src="./img/images.png" class="rounded-circle">
                </a>
            </div>
        </div>
    </div>
    <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
        <button class="btn btn-sm btn-info mr-4 waves-effect waves-float waves-light">修改背景图片</button>
        <button class="btn btn-sm btn-primary  float-right waves-effect waves-float waves-light">修改头像</button>
    </div>
    <div class="card-body pt-0">
        <div class="row">
            <div class="col">
                <div class="card-profile-stats d-flex justify-content-center">
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
            <h5 class="h3" style="padding:0.8em">一人撑伞雨中行</h5>
            <button class="btn btn-sm btn-danger waves-effect waves-float waves-light" style="color:white" data-toggle="modal" data-target="#delete-account-modal">删除账号</button>
        </div>
    </div>
</div>
</div>
`;

export const HomeInfo = {
  name: "home-info",
  template,
};