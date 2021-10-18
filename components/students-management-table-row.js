import { dormitories } from "../utils/dormitories.js";
import { validateStudentManagement } from "../utils/validator.js";

export const StudentsTableRow = {
    template: `
        <tr>
            <td>
                <slot name="checkbox"></slot>
            </td>
            <td>
                <span>{{ profile.id }}</span>
            </td>
            <template v-if="!editMode">
				<td><span>{{ profile.scode }}</span></td>
                <td><span>{{ profile.sname }}</span></td>
                <td><span>{{ profile.gender == 1 ? "男" : "女" }}</span></td>
                <td><span>{{ profile.phone }}</span></td>
                <td><span>{{ profile.dormitory }}</span></td>
                <td><span>{{ profile.roomId }}</span></td>
                <td>
                    <div>
                        <button type="button" class="btn btn-sm btn-info mr-4 waves-effect waves-float waves-light" @click="editMode = true" >编辑</button>
                        <button type="button" class="btn btn-sm btn-danger waves-effect waves-float waves-light" @click="del(profile.id)">删除</button>
                    </div>
                </td>
            </template>
            <template v-else>
				<td>
					<input v-model="profile.scode" class="form-control" type="number" style="width: 110px;"/>
				</td>
                <td>
                    <input v-model="profile.sname" class="form-control" type="text" style="width: 83px;"/>
                </td>
                <td>
                    <select v-model="profile.gender" class="form-control" style="width: 73px;">
                        <option value="1">男</option>
                        <option value="2">女</option>
                    </select>
                </td>
                <td>
                    <input v-model="profile.phone" class="form-control" type="number" style="width: 145px;"/>
                </td>
                <td>
                    <select v-if="this.userinfo.type != 1" v-model="profile.dormitory" class="form-control" style="width: 110px;">
                        <option value="">请选择宿舍楼</option>
                        <option v-for="dormitory in dormitories" :value="dormitory">{{ dormitory }}</option>
                    </select>
                    <span v-else>禁止操作</span>
                </td>
                <td><input v-model="profile.roomId" class="form-control" type="text" style="width: 121px;"/></td>
                <td>
                    <div>
                    <button type="button" class="btn btn-sm btn-info mr-4 waves-effect waves-float waves-light mb-2" @click="save()">保存</button>
                    <button type="button" class="btn btn-sm btn-danger waves-effect waves-float waves-light mb-2" @click="cancel()">取消</button>
                    </div>
                </td>
            </template>
        </tr>
    `,
    props: {
        profile: {
            type: Object,
            required: true,
        },
    },
    inject: ["userinfo"],
    data: () => ({
        dormitories, // 宿舍楼列表
        editMode: false, // 显示编辑框
        originProfile: null,
        isChecked: false,
    }),
    mounted() {
        this.isChecked = this.isSelected;
        this.originProfile = {...this.profile };
    },
    methods: {
        save() {
            try {
                validateStudentManagement(this.profile); // 验证数据
            } catch (error) {
                alert(error.message); // 如果数据又不合法项，弹框提示
                return;
            }
            this.editMode = false; // 隐藏编辑栏
            this.originProfile = {...this.profile };
        },
        cancel() {
            this.editMode = false;
            Object.assign(this.profile, this.originProfile);
        },
        del(id) {
            this.$emit("del", id)
        },
    },
};