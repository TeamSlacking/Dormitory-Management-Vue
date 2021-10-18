

const template = `
    <div class="col-10">
        <div class="jumbotron">
            <h3 class="card-title">{{welcome}}</h3>
            <div class="card">
                <!-- 其余页面修改从这里开始直接注释下面的轮播图 -->
                <!-- 表格标题 -->
                <div>
                    <!-- 轮播图开始 -->
                    <div id="carouselExampleInterval" class="carousel slide" data-ride="carousel">
                        <ol class="carousel-indicators">
                            <li data-target="#carouselExampleInterval" data-slide-to="0" class="active">
                            </li>
                            <li data-target="#carouselExampleInterval" data-slide-to="1"></li>
                        </ol>
                        <div class=" carousel-inner ">
                            <div class="carousel-item active " data-interval="3000 ">
                                <img src="./img/1.svg " class="image" style="height: 300px;">
                            </div>
                            <div class="carousel-item " data-interval="3000 ">
                                <img src="./img/3.svg " class="image" style="height: 300px;">
                            </div>
                            <button class="carousel-control-prev" type="button"
                                data-target="#carouselExampleInterval" data-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="false"></span>
                            </button>
                            <button class="carousel-control-next" type="button"
                                data-target="#carouselExampleInterval" data-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                    <!-- 轮播图结束 -->
                    <!-- </div> 表格标题尾部div-->
                    <!-- 表格主体 -->
                    
                </div>
            </div>
        </div>
    </div>
`;

export const HomeWelcome = {
    name: "home-welcome",
    template,
    inject: ["userinfo"],
    computed: {
      welcome() {
          switch (Number(this.userinfo.type)) {
              case 0: return "欢迎您，系统管理员"
              case 1: return "欢迎您，宿舍管理员"
              default: return "欢迎您，同学"
          }
      }
  },
};
