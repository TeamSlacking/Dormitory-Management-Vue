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
                <td><span>{{ profile.scode }}</span></td>
                <td><span>{{ profile.sname }}</span></td>
                <td><span>{{ profile.dormitory}}</span></td>
                <td><span>{{ profile.roomId }}</span></td>
                <td><span>{{ time(profile.date) }}</span></td>
                <td><span>{{ profile.beizhu }}</span></td>
                <td>
                    <div v-if="this.userinfo.type != 2">
                        <button type="button" class="btn btn-sm btn-info mr-4 waves-effect waves-float waves-light" @click="editMode = true" >编辑</button>
                        <button type="button" class="btn btn-sm btn-danger waves-effect waves-float waves-light" @click="del(profile.id)">删除</button>
                    </div>
                    <div v-else>
                        <span>禁止</span>
                    </div>
                </td>
            </template>
            <template v-else>
                <td>
                    <input v-model="profile.scode" class="form-control" type="number" style="width: 85px;"/>
                </td>
                <td>
                    <input v-model="profile.sname" class="form-control" type="text" style="width: 50px;"/>
                </td>
                <td>
                    <select v-if="this.userinfo.type != 1" v-model="profile.dormitory" class="form-control" style="width: 110px;">
                        <option value="">请选择宿舍楼</option>
                        <option v-for="dormitory in dormitories" :value="dormitory">{{ dormitory }}</option>
                    </select>
                    <span v-else>禁止操作</span>
                </td>
                <td>
                    <input v-model="profile.roomId" class="form-control" type="number" style="width: 55px;"/>
                </td>
                <td>
                    <input v-model="profile.date" class="form-control" type="datetime-local" style="width: 150px;"/>
                </td>
                <td><textarea v-model="profile.beizhu" class="form-control" type="text-area" /></td>
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