import { dormitories } from "../utils/dormitories.js";
import { validateAbsenceRecord } from "../utils/validator.js";

export const AbsenceTableRow = {
    template: `
        <tr>
            <td>
                <slot name="checkbox"></slot>
            </td>
            <td>
                <span>{{ profile.id }}</span>
            </td>
            <template v-if="!editMode">
                <td><span>{{ profile.schoolid }}</span></td>
                <td><span>{{ profile.name }}</span></td>
                <td><span>{{ profile.dormitory}}</span></td>
                <td><span>{{ profile.room }}</span></td>
                <td><span>{{ time(profile.date) }}</span></td>
                <td><span>{{ profile.beizhu }}</span></td>
                <td>
                    <div>
                        <button type="button" class="btn btn-outline-primary" @click="editMode = true" >编辑</button>
                        <button type="button" class="btn btn-outline-danger" @click="del(profile.id)">删除</button>
                    </div>
                </td>
            </template>
            <template v-else>
                <td>
                    <input v-model="profile.schoolid" class="form-control" type="number" style="width: 110px;"/>
                </td>
                <td>
                    <input v-model="profile.name" class="form-control" type="text" style="width: 83px;"/>
                </td>
                <td>
                    <select v-model="profile.dormitory" class="form-control" style="width: 122px;">
                        <option value="">请选择宿舍楼</option>
                        <option v-for="dormitory in dormitories" :value="dormitory">{{ dormitory }}</option>
                    </select>
                </td>
                <td>
                    <input v-model="profile.room" class="form-control" type="number" style="width: 83px;"/>
                </td>
                <td>
                    <input v-model="profile.date" class="form-control" type="datetime-local" style="width: 150px;"/>
                </td>
                <td><textarea v-model="profile.beizhu" class="form-control" type="text-area" /></td>
                <td>
                    <div>
                        <button type="button" class="btn btn-outline-primary mb-2" @click="save()">保存</button>
                        <button type="button" class="btn btn-outline-danger mb-2" @click="cancel()">取消</button>
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
        this.originProfile = { ...this.profile };
    },
    methods: {
        save() {
            try {
                validateAbsenceRecord(this.profile); // 验证数据
            } catch (error) {
                alert(error.message); // 如果数据又不合法项，弹框提示
                return;
            }
            this.profile.date=this.profile.date.replace("T", " ");
            this.editMode = false; // 隐藏编辑栏
            this.originProfile = { ...this.profile };
        },
        cancel() {
            this.editMode = false;
            Object.assign(this.profile, this.originProfile);
        },
        del(id) {
            this.$emit("del", id)
        },
        time(date) {
            return date.replace("T", " ");
        },
    },
};