<template>
    <div class="health-container">
        <transition-group
            name="animate__animated animate__bounce"
            :appear="true"
            enter-active-class="animate__fadeInLeftBig"
            leave-active-class="animate__fadeOutLeftBig"
        >
            <el-row :gutter="20" :key="1">
                <el-col :span="10">
                    <el-tabs v-model="tabActiveName">
                        <el-tab-pane label="Applicant information" name="first">
                            <el-form
                                ref="applyFormRef"
                                :model="applyForm"
                                :rules="applyRules"
                                label-position="top"
                            >
                                <el-form-item label="Name" prop="i_name">
                                    <el-input
                                        v-model="applyForm.i_name"
                                        :disabled="true"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="ID number" prop="i_idcard">
                                    <el-input
                                        v-model="applyForm.i_idcard"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="Phone number" prop="i_phone">
                                    <el-input
                                        v-model="applyForm.i_phone"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="Gender" prop="i_gender">
                                    <el-radio
                                        v-model="applyForm.i_gender"
                                        :label="0"
                                        border
                                        >Male</el-radio
                                    >
                                    <el-radio
                                        v-model="applyForm.i_gender"
                                        :label="1"
                                        border
                                        >Female</el-radio
                                    >
                                </el-form-item>
                                <el-form-item label="Date of Birth" prop="i_birth">
                                    <el-date-picker
                                        v-model="applyForm.i_birth"
                                        type="date"
                                        placeholder="select date"
                                    >
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item
                                    label="nationality"
                                    prop="i_nationality"
                                >
                                    <el-input
                                        v-model="applyForm.i_nationality"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item
                                    label="domicile"
                                    prop="i_domicile"
                                >
                                    <el-input
                                        v-model="applyForm.i_domicile"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="Place of Birth" prop="i_native">
                                    <el-input
                                        v-model="applyForm.i_native"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="Address" prop="i_address">
                                    <el-input
                                        v-model="applyForm.i_address"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button
                                        type="primary"
                                        @click="insertInfoer()"
                                        >add</el-button
                                    >
                                    <el-button type="pain">reset</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane label="health information" name="second">
                            <el-form
                                ref="healthFormRef"
                                :model="healthForm"
                                :rules="healthRules"
                                label-position="top"
                            >
                                <el-form-item label="ID" prop="m_stuid">
                                    <el-input
                                        v-model="healthForm.m_stuid"
                                        :disabled="true"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="Name" prop="m_name">
                                    <el-input
                                        v-model="healthForm.m_name"
                                        :disabled="true"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="Department" prop="m_college">
                                    <el-input
                                        v-model="healthForm.m_college"
                                    ></el-input>
                                </el-form-item>
 
                                <el-form-item
                                    label="Recent Residence"
                                    prop="m_recent_resi"
                                >
                                    <el-input
                                        v-model="healthForm.m_recent_resi"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item
                                    label="Place recently go"
                                    prop="m_recent_touch"
                                >
                                    <el-input
                                        v-model="healthForm.m_recent_touch"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item
                                    label="Date"
                                    prop="m_recent_date"
                                >
                                    <el-date-picker
                                        v-model="healthForm.m_touch_date"
                                        type="date"
                                        placeholder="select date"
                                    >
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item
                                    label="Health status"
                                    prop="m_health_status"
                                >
                                    <el-input
                                        v-model="healthForm.m_health_status"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item
                                    label="Status description"
                                    prop="m_status_des"
                                >
                                    <el-input
                                        v-model="healthForm.m_status_des"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button
                                        type="primary"
                                        @click="insertMessage()"
                                        >add</el-button
                                    >
                                    <el-button type="pain">reset</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane label="COVID-19 vaccination records" name="third">
                            <el-form
                                ref="inoculateFormRef"
                                :model="inoculateForm"
                                :rules="inoculateRules"
                                label-position="top"
                            >
                                <el-form-item label="ID" prop="r_stuid">
                                    <el-input
                                        v-model="inoculateForm.r_stuid"
                                        :disabled="true"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="Name" prop="r_name">
                                    <el-input
                                        v-model="inoculateForm.r_name"
                                        :disabled="true"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="Name of the vaccination" prop="r_vaccine">
                                    <el-input
                                        v-model="inoculateForm.r_vaccine"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="inject number" prop="r_inject">
                                    <el-input
                                        v-model="inoculateForm.r_inject"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item
                                    label="The vaccination units"
                                    prop="r_vac_unit"
                                >
                                    <el-input
                                        v-model="inoculateForm.r_vac_unit"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item
                                    label="The vaccination date"
                                    prop="r_vac_date"
                                >
                                    <el-date-picker
                                        v-model="inoculateForm.r_vac_date"
                                        type="date"
                                        placeholder="select date"
                                    >
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item>
                                    <el-button
                                        type="primary"
                                        @click="insertRecord()"
                                        >add</el-button
                                    >
                                    <el-button type="pain">reset</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
                <el-col :span="14">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-descriptions
                                title="Applicant Information Preview"
                                :column="1"
                                border
                                class="preview-tab"
                            >
                                <el-descriptions-item>
                                    <template slot="label">
                                        <i class="el-icon-key"></i>
                                        Name
                                    </template>
                                    <span>{{ applyForm.i_name }}</span>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template slot="label">
                                        <i class="el-icon-user"></i>
                                        ID Number
                                    </template>
                                    <span>{{ applyForm.i_idcard }}</span>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template slot="label">
                                        <i class="el-icon-male"></i>
                                        Phone Number
                                    </template>
                                    <span>{{ applyForm.i_phone }}</span>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template slot="label">
                                        <i class="el-icon-timer"></i>
                                        Gender
                                    </template>
                                    <span>{{
                                        applyForm.i_gender == 0 ? 'Male' : 'Female'
                                    }}</span>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template slot="label">
                                        <i class="el-icon-medal-1"></i>
                                        Date of Birth
                                    </template>
                                    <span>{{ applyForm.i_birth }}</span>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template slot="label">
                                        <i class="el-icon-trophy-1"></i>
                                        Nationality
                                    </template>
                                    <span>{{ applyForm.i_nationality }}</span>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template slot="label">
                                        <i class="el-icon-medal-1"></i>
                                        Place of domicile
                                    </template>
                                    <span>{{ applyForm.i_domicile }}</span>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template slot="label">
                                        <i class="el-icon-money"></i>
                                        Place of Birth
                                    </template>
                                    <span>{{ applyForm.i_native }}</span>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template slot="label">
                                        <i class="el-icon-money"></i>
                                        Address
                                    </template>
                                    <span>{{ applyForm.i_address }}</span>
                                </el-descriptions-item>
                            </el-descriptions>
                        </el-col>
                        <el-col :span="12">
                            <el-descriptions
                                title="Health Information Preview"
                                :column="1"
                                border
                            >
                                <el-descriptions-item>
                                    <template slot="label">
                                        <i class="el-icon-postcard"></i>
                                        ID
                                    </template>
                                    <span>{{ healthForm.m_stuid }}</span>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template slot="label">
                                        <i class="el-icon-postcard"></i>
                                        Name
                                    </template>
                                    <span>{{ healthForm.m_name }}</span>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template slot="label">
                                        <i class="el-icon-postcard"></i>
                                        Department
                                    </template>
                                    <span>{{ healthForm.m_college }}</span>
                                </el-descriptions-item>
                                
                                <el-descriptions-item>
                                    <template slot="label">
                                        <i class="el-icon-postcard"></i>
                                        Recent live
                                    </template>
                                    <span>{{ healthForm.m_recent_resi }}</span>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template slot="label">
                                        <i class="el-icon-trophy"></i>
                                        Place recent go
                                    </template>
                                    <span>{{ healthForm.m_recent_touch }}</span>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template slot="label">
                                        <i class="el-icon-time"></i>
                                        Contact time
                                    </template>
                                    <span>{{ healthForm.m_touch_date }}</span>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template slot="label">
                                        <i class="el-icon-medal-1"></i>
                                        Health status
                                    </template>
                                    <span>{{
                                        healthForm.m_health_status
                                    }}</span>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template slot="label">
                                        <i class="el-icon-postcard"></i>
                                        Descriptions
                                    </template>
                                    <span>{{ healthForm.m_status_des }}</span>
                                </el-descriptions-item>
                            </el-descriptions>
                        </el-col>
                    </el-row>
                    <el-descriptions
                        title="Preview of COVID-19 vaccination"
                        :column="1"
                        border
                        style="margin-top: 30px"
                    >
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-postcard"></i>
                                ID
                            </template>
                            <span>{{ inoculateForm.r_stuid }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-postcard"></i>
                                Name
                            </template>
                            <span>{{ inoculateForm.r_name }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-postcard"></i>
                                Name of the vaccine
                            </template>
                            <span>{{ inoculateForm.r_vaccine }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-postcard"></i>
                                Injection time
                            </template>
                            <span>{{ inoculateForm.r_inject }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-postcard"></i>
                                The vaccination units
                            </template>
                            <span>{{ inoculateForm.r_vac_unit }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-postcard"></i>
                                The vaccination injection date
                            </template>
                            <span>{{ inoculateForm.r_vac_date }}</span>
                        </el-descriptions-item>
                    </el-descriptions>
                </el-col>
            </el-row>
        </transition-group>
    </div>
</template>

<script>
import {
    alterInfoer,
    alterMessage,
    alterRecord,
    getMessage,
    getRecord,
    getInfoer
} from "@/api/health";
export default {
    name: "HealthInput",
    data() {
        const pat = new RegExp("[^a-zA-Z0-9_\u4e00-\u9fa5]", "i");
        const phone = new RegExp(
            "/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/"
        );
        const email = new RegExp(
            "/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/"
        );
        const idCard = new RegExp(
            "/^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/"
        );

        let InvalidString = (rule, value, callback) => {

            if (pat.test(value) === true) {
                callback(new Error("Contains illegal strings and can only be alphanumeric or characters."));
            } else {
                callback();
            }
        };

        let InvalidPhone = (rule, value, callback) => {
            if (phone.test(value) === true) {
                callback(new Error("Contains invalid characters, and can only be numbers"));
            } else {
                callback();
            }
        };

        let InvalidEmail = (rule, value, callback) => {
            if (email.test(value) === true) {
                callback(new Error("Email is not valid"));
            } else {
                callback();
            }
        };

        let InvalidIdCard = (rule, value, callback) => {
            if (email.idCard(value) === true) {
                callback(new Error("The id number is invalid"));
            } else {
                callback();
            }
        };

        return {
            tabActiveName: "first",
            applyForm: {
                i_name: this.$store.state.user.rolesData.r_name,
                i_idcard: "",
                i_phone: "",
                i_gender: 0,
                i_birth: "2021/12/21",
                i_nationality: "",
                i_domicile: "",
                i_native: "",
                i_address: "",
            },
            healthForm: {
                m_stuid: this.$store.state.user.rolesData.r_serial,
                m_name: this.$store.state.user.rolesData.r_name,
                m_college: "",
                m_recent_resi: "",
                m_recent_touch: "",
                m_recent_touch: "",
                m_touch_date: "2021/12/21",
                m_health_status: "",
                m_status_des: "",
            },
            inoculateForm: {
                r_stuid: this.$store.state.user.rolesData.r_serial,
                r_name: this.$store.state.user.rolesData.r_name,
                r_vaccine: "",
                r_inject: "",
                r_vac_unit: "",
                r_vac_date: "2021/12/21",
            },
            applyRules: {
                i_name: [
                    { 
                        required: true, 
                        message: "Required field!",
                        trigger: "change blur focus"
                    },
                ],
                i_idcard: [
                    { 
                        required: true, 
                        message: "Required field!",
                        trigger: "change blur focus"
                    },
                ],
                i_phone: [
                    { 
                        required: true, 
                        message: "Required field!",
                        trigger: "change blur focus"
                    },
                ],
                i_gender: [
                    { 
                        required: true, 
                        message: "Required field!",
                        trigger: "change blur focus"
                    },
                ],
                i_birth: [
                    { 
                        required: true, 
                        message: "Required field!",
                        trigger: "change blur focus"
                    },
                ],
                i_nationality: [
                    { 
                        required: true, 
                        message: "Required field!",
                        trigger: "change blur focus"
                    },
                ],
                i_domicile: [
                    { 
                        required: true, 
                        message: "Required field!",
                        trigger: "change blur focus"
                    },
                ],
                i_native: [
                    { 
                        required: true, 
                        message: "Required field!",
                        trigger: "change blur focus"
                    },
                ],
                i_address: [
                    { 
                        required: true, 
                        message: "Required field!",
                        trigger: "change blur focus"
                    },
                ],
            },
            healthRules: {
                m_stuid: [
                    {
                        required: true,
                        message: "Required field!",
                        trigger: "change blur focus",
                    },
                ],
                m_name: [
                    {
                        required: true,
                        message: "Required field!",
                        trigger: "change blur focus",
                    },
                ],
                m_college: [
                    {
                        required: true,
                        message: "Required field!",
                        trigger: "change blur focus",
                    },
                ],
                m_recent_resi: [
                    {
                        required: true,
                        message: "Required field!",
                        trigger: "change blur focus",
                    },
                ],
                m_recent_touch: [
                    {
                        required: true,
                        message: "Required field!",
                        trigger: "change blur focus",
                    },
                ],
                m_recent_touch: [
                    {
                        required: true,
                        message: "Required field!",
                        trigger: "change blur focus",
                    },
                ],
                m_touch_date: [
                    {
                        required: true,
                        message: "Required field!",
                        trigger: "change blur focus",
                    },
                ],
                m_health_status: [
                    {
                        required: true,
                        message: "Required field!",
                        trigger: "change blur focus",
                    },
                ],
                m_status_des: [
                    {
                        required: true,
                        message: "Required field!",
                        trigger: "change blur focus",
                    },
                ],
            },
            inoculateRules: {
                r_stuid: [
                    {
                        required: true,
                        message: "Required field!",
                        trigger: "change blur focus",
                    },
                ],
                r_name: [
                    {
                        required: true,
                        message: "Required field!",
                        trigger: "change blur focus",
                    },
                ],
                r_vaccine: [
                    {
                        required: true,
                        message: "Required field!",
                        trigger: "change blur focus",
                    },
                ],
                r_inject: [
                    {
                        required: true,
                        message: "Required field!",
                        trigger: "change blur focus",
                    },
                ],
                r_num: [
                    {
                        required: true,
                        message: "Required field!",
                        trigger: "change blur focus",
                    },
                ],
                r_vac_unit: [
                    {
                        required: true,
                        message: "Required field!",
                        trigger: "change blur focus",
                    },
                ],
                r_vac_date: [
                    {
                        required: true,
                        message: "Required field!",
                        trigger: "change blur focus",
                    },
                ],
            },
        };
    },
    created() {
        this.getInfoers();
        this.getMessages();
        this.getRecords();
    },
    methods: {
        async insertInfoer() {
            let pid = this.$store.state.user.rolesData.r_role;
            this.applyForm.pid = pid;
            let res = await alterInfoer(this.applyForm);
            this.$message({
                type:'success',
                message:'Data Modification succeeded!'
            })
            this.getInfoers();
        },
        async insertMessage() {
            let pid = this.$store.state.user.rolesData.r_role;
            this.healthForm.pid = pid;
            let res = await alterMessage(this.healthForm);
            this.$message({
                type:'success',
                message:'Data Modification succeeded!'
            })
            this.getMessages();
        },
        async insertRecord() {
            let pid = this.$store.state.user.rolesData.r_role;
            this.inoculateForm.pid = pid;
            let res = await alterRecord(this.inoculateForm);
            this.$message({
                type:'success',
                message:'Data Modification succeeded!'
            })
            this.getRecords();
        },
        async getInfoers() {
            let names = this.$store.state.user.rolesData.r_name
            let res = await getInfoer(names);
            if(res.data.length != 0){
                res.data[0].i_birth = res.data[0].i_birth.slice(0,10);
                this.applyForm = res.data[0];
            }else{
                this.$message({
                    type:'warning',
                    message:'Please add or modify data!'
                })
            }
        },
        async getMessages() {
            let names = this.$store.state.user.rolesData.r_name
            let res = await getMessage(names);
            if(res.data.length != 0){
                res.data[0].m_touch_date = res.data[0].m_touch_date.slice(0,10);
                this.healthForm = res.data[0];
            }else{
                this.$message({
                    type:'warning',
                    message:'Please add or modify data!'
                })
            }
        },
        async getRecords() {
            let names = this.$store.state.user.rolesData.r_name
            let res = await getRecord(names);
            if(res.data.length != 0){
                res.data[0].r_vac_date = res.data[0].r_vac_date.slice(0,10);
                this.inoculateForm = res.data[0];
            }else{
                this.$message({
                    type:'warning',
                    message:'Please add or modify data!'
                })
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
