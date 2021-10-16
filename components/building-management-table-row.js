import { dormitories } from "../utils/dormitories.js";
import { validateStudentManagement } from "../utils/validator.js";

export const BuildingTableRow = {
    template: `
        <tr>
            <td>
                <slot name="checkbox"></slot>
            </td>
            <td>
                <span>{{ profile.id }}</span>
            </td>
            <template v-if="!editMode">
				<td><span>{{ profile.name }}</span></td>
                <td><span>{{ profile.bio }}</span></td>
                <td><span>{{ profile.admin }}</span></td>
                <td>
                    <div>
                        <button type="button" class="btn btn-sm btn-info mr-4 waves-effect waves-float waves-light" @click="editMode = true" >编辑</button>
                        <button type="button" class="btn btn-sm btn-danger waves-effect waves-float waves-light" @click="del(profile.id)">删除</button>
                    </div>
                </td>
            </template>
            <template v-else>
				<td>
					<input v-model="profile.name" class="form-control" type="number" style="width: 110px;"/>
				</td>
                <td>
                    <input v-model="profile.bio" class="form-control" type="text" style="width: 83px;"/>
                </td>
                <td>
                    <input v-model="profile.admin" class="form-control" type="text" style="width: 110px;"/>
                </td>
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