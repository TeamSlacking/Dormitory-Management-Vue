import { TableRow } from "./admin-management-table-row.js";
import { dormitories } from "../utils/dormitories.js";
import { validateAdmin } from "../utils/validator.js"

/** @type {{people:{id: number; name: string; gender: 1 | 2; phone: string; dormitory: string, username: string}[]}} */
let data = Mock.mock({
    "people|112": [{
        "id|+1": 1,
        name: "@cname",
        "gender|1": [1, 2],
        phone: "@integer(13000000000, 19999999999)",
        "dormitory|1": dormitories,
        username: "@word",
    }, ],
});

data.people.forEach(person => person.phone = String(person.phone))

/** 空数据 */
const emptyPerson = {
    id: Infinity,
    name: "",
    gender: 1,
    phone: "",
    dormitory: "",
    username: "",
};

export const AdminManagement = {
    components: {
        "table-row": TableRow,
    },
    template: `
    <div class="col-md-10">
        <div class="jumbotron">
            <h3 class="contain">宿舍管理员管理</h3>
            <div class="card">
                <div class="card-header index-card-header">
                    <!-- 搜索栏 -->
                    <form action="#" id="search_form" class="form-inline">
                        <div class="mb-2 mr-sm-2">
                            <input v-model="searchForm.name" type="text" class="form-control" placeholder="姓名" />
                        </div>
                        <div class="mb-2 mr-sm-2">
                            <input v-model="searchForm.phone" type="number" class="form-control" placeholder="手机号" min="0" />
                        </div>
                        <div class="input-group mb-2 mr-sm-2">
                            <select v-model="searchForm.gender" class="form-control" style="width: auto">
                                <option value="0">请选择性别</option>
                                <option :value="1">男</option>
                                <option :value="2">女</option>
                            </select>
                        </div>
                        <div class="input-group mb-2 mr-sm-2">
                            <select v-model="searchForm.dormitory" value="" class="form-control" style="width: auto">
                                <option value="">请选择宿舍楼</option>
                                <option v-for="value in dormitories" :value="value">{{ value }}</option>
                            </select>
                        </div>
                    </form>
                    <div style="float: right">
                        <button type="button" class="btn btn-md btn-outline-success" @click="addModel = true">添加</button>
                        <button type="button" class="btn btn-md btn-outline-danger" @click="delBatch()">批量删除</button>
                    </div>
                </div>

                <div class="card-body">
                    <div class="row">
                        <table class="table table-striped table-bordered table-hover">
                            <thead class="text-center">
                                <th class="text-center">
                                    <input v-model="allChecked" type="checkbox" />
                                </th>
                                <th v-for="value in header" class="text-center">{{ value }}</th>
                            </thead>
                            <tbody class="text-center">
                                <!-- 渲染数据 -->
                                <template v-for="(profile, index) in viewData">
                                    <table-row :profile="profile" :key="profile.id" @del="del">
                                        <template v-slot:checkbox>
                                                <input type="checkbox" v-model="selectedIds" :value="profile.id" />
                                        </template>
                                    </table-row>
                                </template>
                                <!-- 添加数据栏 -->
                                <tr v-if="addModel">
                                    <td></td>
                                    <td></td>
                                    <td><input v-model="newData.name" class="form-control" type="text" style="width: 83px" /></td>
                                    <td>
                                        <select v-model="newData.gender" class="form-control" style="width: 63px">
                                            <option value="1">男</option>
                                            <option value="2">女</option>
                                        </select>
                                    </td>
                                    <td><input v-model="newData.phone" class="form-control" type="number" style="width: 145px" /></td>
                                    <td>
                                        <select v-model="newData.dormitory" class="form-control" style="width: 133px">
                                            <option value="">请选择宿舍楼</option>
                                            <option v-for="value in dormitories" :value="value">{{ value }}</option>
                                        </select>
                                    </td>
                                    <td><input v-model="newData.username " class="form-control" type="text" style="width: 121px" /></td>
                                    <td>
                                        <div class="btn-group" role="group">
                                            <button type="button" class="btn btn-outline-primary" @click="addPerson()">添加</button>
                                            <button type="button" class="btn btn-outline-danger" @click="addCancel()">取消</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- 分页组件 -->
                    <div class="flex-content" style="display: flex;">
                        <div class="col-md-2">
                            共
                            <span class="badge pill badge-danger">
                                {{ filteredData.length }}
                            </span>
                            条记录
                        </div>
                        <nav class="col-md-9" aria-label="Page navigation">
                            <ul class="pagination" style="display: flex; flex-wrap: wrap;">
                                <li
                                    :class="['page-item', { disabled: isFirstPage }]"
                                    @click="!isFirstPage && (currentPage = 1)"
                                >
                                    <a href="#" class="page-link">首页</a>
                                </li>
                                <li
                                    :class="['page-item', { disabled: isFirstPage }]"
                                    @click="!isFirstPage && (currentPage = currentPage - 1)"
                                >
                                    <a href="#" class="page-link">上一页</a>
                                </li>
                                <li
                                    v-for="i in totalPage"
                                    :key="i"
                                    :class="['page-item', { active: i == currentPage }]"
                                >
                                    <a href="#" @click="currentPage = i" class="page-link">{{ i }}</a>
                                </li>
                                <li
                                    :class="['page-item', { disabled: isLastPage }]"
                                    @click="currentPage < totalPage && (currentPage += 1)"
                                >
                                    <a href="#" class="page-link">下一页</a>
                                </li>
                                <li
                                    :class="['page-item', { disabled: isLastPage }]"
                                    @click="currentPage != totalPage && (currentPage = totalPage)"
                                >
                                    <a href="#" class="page-link">尾页</a>
                                </li>
                            </ul>
                        </nav>
                        <div class="col-md-1">
                            <select v-model="pageSize" class="form-control" style="width: auto">
                                <option :value="5">5</option>
                                <option :value="10">10</option>
                                <option :value="20">20</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    data: () => ({
        dormitories, // 宿舍楼列表
        header: ["序号", "姓名", "性别", "电话", "宿舍楼", "用户名", "操作"], // 表头
        data: data.people, // mock.js 生成的数据
        currentPage: 1, // 当前页码
        pageSize: 5, // 页面显示数据量
        addModel: false, // 是否开启添加数据栏
        newData: {...emptyPerson }, // 新数据存储对象
        selectedIds: [],
        searchForm: {
            name: "", // 名字搜索框
            phone: undefined, // 电话搜索框
            gender: 0, // 性别搜索框
            dormitory: "", // 宿舍搜索框
        },
    }),
    computed: {
        // 计算总页数
        totalPage() {
            return Math.ceil(this.filteredData.length / this.pageSize) || 1;
        },
        // 返回当前是否是在首页
        isFirstPage() {
            return this.currentPage == 1;
        },
        // 返回当前是否是在尾页
        isLastPage() {
            return this.currentPage == this.totalPage;
        },
        // 根据搜索条件筛选数据
        filteredData() {
            return this.data.filter(
                (v) =>
                v.name.includes(this.searchForm.name) &&
                (this.searchForm.phone ? v.phone.includes(this.searchForm.phone) : true) &&
                (this.searchForm.gender == 0 || this.searchForm.gender == v.gender) &&
                v.dormitory.includes(this.searchForm.dormitory)
            );
        },
        // 显示当前页码在的数据
        viewData() {
            const minIndex = (this.currentPage - 1) * this.pageSize;
            const maxIndex = minIndex + this.pageSize - 1;
            return this.filteredData.filter((_, i) => minIndex <= i && i <= maxIndex);
        },
        // 全选功能 checkbox
        allChecked: {
            // 如果当前表格显示的数据被全部勾选，则全选 checkbox 也会自动勾上
            get() {
                return this.viewData.length === 0 ? false : this.selectedIds.length === this.viewData.length
            },
            set(value) {
                if (value) {
                    this.selectedIds = this.viewData.map(v => v.id)
                } else {
                    // 如果 checkbox 被取消选中，则取消勾选所有数据
                    this.selectedIds = [];
                }
            },
        },
    },
    // 当搜索结果发生变动，自动切换到第一页，保证表格中的数据的是正确的
    watch: {
        pageSize() {
            this.currentPage = 1;
            this.selectedIds = [];
        },
        searchForm: {
            deep: true,
            handler() {
                this.currentPage = 1;
                this.selectedIds = [];
            },
        },
        // 页面需要显示的数据发生变动，取消所有勾选项
        viewData() {
            this.allChecked = false;
            // 当前页的数据全部被删除后，自动跳转到上一页
            this.viewData.length == 0 && this.currentPage != 1 && (this.currentPage -= 1);
        },
    },
    methods: {
        del(id) {
            const index = this.data.findIndex(p => p.id === id)
            Vue.delete(this.data, index)
        },
        // 批量删除
        delBatch() {
            this.selectedIds.forEach(this.del)
        },
        // 添加数据
        addPerson() {
            try {
                validateAdmin(this.newData) // 验证数据
            } catch (error) {
                alert(error.message) // 如果数据又不合法项，弹框提示
                return
            }
            this.addModel = false; // 隐藏添加数据栏
            this.newData.id = this.data[this.data.length - 1].id + 1;
            this.data.push(this.newData); // 添加新数据
            this.newData = {...emptyPerson }; // 清空添加数据栏内容
        },
        // 取消添加
        addCancel() {
            this.addModel = false; // 隐藏添加数据栏
            this.newData = {...emptyPerson }; // 清空添加数据栏内容
        },
    },
};