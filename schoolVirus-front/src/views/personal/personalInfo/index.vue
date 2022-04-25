<template>
    <div class="personal-container">
        <transition-group
            name="animate__animated animate__bounce"
            :appear="true"
            enter-active-class="animate__fadeInLeftBig"
            leave-active-class="animate__fadeOutLeftBig"
        >
            <el-row :gutter="20" :key="1">
                <el-col :span="17">
                    <el-tabs v-model="tabActiveName" class="info-tab">
                        <el-tab-pane label="Basic Information" name="first">
                            <el-form
                                ref="basicFormRef"
                                :model="basicForm"
                                :rules="basicRules"
                            >
                                <el-form-item label="my account" prop="i_stuid">
                                    <el-input
                                        v-model="basicForm.i_stuid"
                                        :disabled="true"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="Name" prop="i_name">
                                    <el-input
                                        v-model="basicForm.i_name"
                                        :disabled="true"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="Gender" prop="i_gender">
                                    <el-radio
                                        v-model="basicForm.i_gender"
                                        :label="0"
                                        border
                                        >Male</el-radio
                                    >
                                    <el-radio
                                        v-model="basicForm.i_gender"
                                        :label="1"
                                        border
                                        >女</el-radio
                                    >
                                </el-form-item>
                                <el-form-item label="date of birth" prop="i_birth">
                                    <el-date-picker
                                        v-model="basicForm.i_birth"
                                        type="date"
                                        placeholder="select date"
                                    >
                                    </el-date-picker>
                                </el-form-item>
                                
                                
                                <el-form-item label="Department" prop="i_college">
                                    <el-input
                                        v-model="basicForm.i_college"
                                    ></el-input>
                                </el-form-item>
                               
                                <el-form-item>
                                    <el-button
                                        type="primary"
                                        @click="updateBasic()"
                                        >Refresh</el-button
                                    >
                                    <el-button type="info">Reset</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane label="Education Information" name="second">
                            <el-form
                                ref="educateFormRef"
                                :model="educateForm"
                                :rules="educateRules"
                            >
                                
                                <el-form-item
                                    label="My Major"
                                    prop="i_profession"
                                >
                                    <el-input
                                        v-model="educateForm.i_profession"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item
                                    label="profession"
                                    prop="i_enter_time"
                                >
                                    <el-date-picker
                                        v-model="educateForm.i_enter_time"
                                        type="date"
                                        placeholder="select date"
                                    >
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item
                                    label="background"
                                    prop="i_background"
                                >
                                    <el-input
                                        v-model="educateForm.i_background"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button
                                        type="primary"
                                        @click="updateBasic()"
                                        >Refresh</el-button
                                    >
                                    <el-button type="info">Reset</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
                <el-col :span="7">
                    <el-descriptions
                        title="Basic information preview"
                        :column="1"
                        border
                        class="preview-tab"
                    >
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-key"></i>
                                My Account
                            </template>
                            <span>{{ basicForm.i_stuid }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-user"></i>
                                Name
                            </template>
                            <span>{{ basicForm.i_name }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-male"></i>
                                Gender
                            </template>
                            <span>{{
                                basicForm.i_gender == 0 ? "Male" : "Female"
                            }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-timer"></i>
                                date of birth
                            </template>
                            <span>{{ basicForm.i_birth.slice(0, 10) }}</span>
                        </el-descriptions-item>
                        
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-trophy-1"></i>
                                University
                            </template>
                            <span>{{ basicForm.i_university }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-medal-1"></i>
                                Department
                            </template>
                            <span>{{ basicForm.i_college }}</span>
                        </el-descriptions-item>
                        
                    </el-descriptions>
                    <el-descriptions
                        title="Education information preview"
                        :column="1"
                        border
                        class="preview-tab"
                    >
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-postcard"></i>
                                University
                            </template>
                            <span>{{ educateForm.i_university }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-trophy"></i>
                                Department
                            </template>
                            <span>{{ educateForm.i_profession }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-time"></i>
                                Admission time
                            </template>
                            <span>{{
                                educateForm.i_enter_time.slice(0, 10)
                            }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-medal-1"></i>
                                background
                            </template>
                            <span>{{ educateForm.i_background }}</span>
                        </el-descriptions-item>
                    </el-descriptions>
                </el-col>
            </el-row>
        </transition-group>
    </div>
</template>

<script>
import {
    updateBasic,
    updateEducate,
    getBasic,
    insertBasic,
} from "@/api/personal";
export default {
    name: "PersonalInfo",
    data() {
       
        const pat = new RegExp("[^a-zA-Z0-9_\u4e00-\u9fa5]", "i");

        
        let InvalidString = (rule, value, callback) => {
            
            if (pat.test(value) === true) {
                callback(new Error("Contains illegal strings, can only be alphanumeric or Chinese characters"));
            } else {
                callback();
            }
        };

        return {
            tabActiveName: "first",
            basicForm: {
                i_stuid: this.$store.state.user.rolesData.r_serial,
                i_name: this.$store.state.user.rolesData.r_name,
                i_gender: 0,
                i_birth: "2021/12/21",
                i_nation: "Please enter content",
                i_university: "Please enter content",
                i_college: "Please enter content",
                i_class: "Please enter content",
            },
            educateForm: {
                i_university: "Please enter content",
                i_profession: "Please enter content",
                i_enter_time: "2021/12/21",
                i_background: "Please enter content",
            },
            basicRules: {
                i_stuid: [
                    { required: true, message: "Required fields!" },
                    {
                        min: 6,
                        max: 12,
                        message: "Account length is between 6 and 12 characters",
                        trigger: "change blur focus",
                    },
                    { validator: InvalidString },
                ],
                i_name: [
                    { required: true, message: "Required fields!" },
                    {
                        min: 6,
                        max: 12,
                        message: "Account length is between 6 and 12 characters",
                        trigger: "change blur focus",
                    },
                    { validator: InvalidString },
                ],
                i_gender: [
                    {
                        required: true,
                        message: "Required fields",
                        trigger: "change blur focus",
                    },
                ],
                i_birth: [
                    {
                        type: "date",
                        required: true,
                        message: "select date",
                        trigger: "change blur focus",
                    },
                ],
                
                i_university: [
                    {
                        required: true,
                        message: "Required fields",
                        trigger: "change blur focus",
                    },
                    { validator: InvalidString },
                ],
                i_college: [
                    {
                        required: true,
                        message: "Required fields",
                        trigger: "change blur focus",
                    },
                    { validator: InvalidString },
                ],
                i_class: [
                    {
                        required: true,
                        message: "Required fields",
                        trigger: "change blur focus",
                    },
                    { validator: InvalidString },
                ],
            },
            educateRules: {
                i_university: [
                    {
                        required: true,
                        message: "Required fields",
                        trigger: "change blur focus",
                    },
                    { validator: InvalidString },
                ],
                i_profession: [
                    {
                        required: true,
                        message: "Required fields",
                        trigger: "change blur focus",
                    },
                    { validator: InvalidString },
                ],
                i_enter_time: [
                    {
                        type: "date",
                        required: true,
                        message: "select date",
                        trigger: "change blur focus",
                    },
                ],
                i_background: [
                    {
                        required: true,
                        message: "Required fields",
                        trigger: "change blur focus",
                    },
                    { validator: InvalidString },
                ],
            },
        };
    },
    created() {
        this.getInfo();
    },
    methods: {
        async updateBasic() {
            let obj = Object.assign(this.basicForm, this.educateForm);
            let r_role = this.$store.state.user.rolesData.r_role;
            obj.rid = r_role;
            console.log(obj);
            let test = await updateBasic(obj);
            this.$message({
                type:'success',
                message:'Data modified successfully'
            })
            this.getInfo();
        },
        async getInfo() {
            let r_serial = this.$store.state.user.rolesData.r_serial;
            let res = await getBasic(r_serial);
            console.log(res);
            if(res.data.length==0){
                this.$message({
                    type:'warning',
                    message:'You do not have basic information, please fill in'
                })
            }else{
                this.basicForm = res.data[0];
                this.educateForm = res.data[0];
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.personal-container {
    .info-tab {
        max-width: 800px;
    }
    .preview-tab {
        max-width: 700px;
        margin-bottom: 30px;
    }
}
</style>
