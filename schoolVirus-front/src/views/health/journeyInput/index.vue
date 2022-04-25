<template>
    <transition-group
        name="animate__animated animate__bounce"
        :appear="true"
        enter-active-class="animate__fadeInLeftBig"
        leave-active-class="animate__fadeOutLeftBig"
    >
        <div class="journeyInput" :key="1">
            <el-row :gutter="100">
                <el-col :span="13">
                    <div class="title">
                        <i class="el-icon-tickets"></i>
                        <span>Journey Record</span>
                    </div>

                    <el-form
                        ref="journeyFormRef"
                        :model="journeyForm"
                        :rules="journeyRules"
                        label-position="left"
                        label-width="140px"
                    >
                        <el-form-item label="ID" prop="d_stuid">
                            <el-input v-model="journeyForm.d_stuid" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="Name" prop="d_name">
                            <el-input v-model="journeyForm.d_name" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="Department" prop="d_college">
                            <el-input
                                v-model="journeyForm.d_college"
                            ></el-input>
                        </el-form-item>
                        
                        <el-form-item label="Address" prop="d_building">
                            <el-input
                                v-model="journeyForm.d_building"
                            ></el-input>
                        </el-form-item>

                        <el-form-item
                            label="Whether close contact patient in 14 days"
                            prop="d_in_reach"
                        >
                            <el-input
                                v-model="journeyForm.d_in_reach"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label-width="0px">
                            <el-button type="primary" @click="insertJourney()"
                                >add</el-button
                            >
                            <el-button type="pain">reset</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="9">
                    <el-descriptions
                        title="Applicant Information Preview"
                        :column="1"
                        border
                        class="preview-tab"
                    >
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-key"></i>
                                ID
                            </template>
                            <span>{{ journeyForm.d_stuid }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-key"></i>
                                Name
                            </template>
                            <span>{{ journeyForm.d_name }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-key"></i>
                                Department
                            </template>
                            <span>{{ journeyForm.d_college }}</span>
                        </el-descriptions-item>
                        
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-male"></i>
                                Address
                            </template>
                            <span>{{ journeyForm.d_building }}</span>
                        </el-descriptions-item>
                        
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-money"></i>
                                Whether close contact patient in 14 days
                            </template>
                            <span>{{ journeyForm.d_in_reach }}</span>
                        </el-descriptions-item>
                    </el-descriptions>
                </el-col>
            </el-row>
        </div>
    </transition-group>
</template>

<script>
import { addJourney, alterJourney, getJourney } from "@/api/health";
export default {
    name: "JourneyInput",
    data() {

        const pat = new RegExp("[^a-zA-Z0-9_\u4e00-\u9fa5]", "i");

        let InvalidString = (rule, value, callback) => {
            if (pat.test(value) === true) {
                callback(new Error("Contains invalid character, only letter or number is allowed"));
            } else {
                callback();
            }
        };

        return {
            journeyForm: {
                d_building: "",
                d_college: "",
                d_in_reach: "",
                d_name: this.$store.state.user.rolesData.r_name,
                d_stuid: this.$store.state.user.rolesData.r_serial
            },
            journeyRules: {
                d_stuid: [
                    {
                        required: true,
                        message: "Required field!",
                        trigger: "change blur focus",
                    },
                ],
                d_building: [
                    {
                        required: true,
                        message: "Required field!",
                        trigger: "change blur focus",
                    },
                ],
                d_college: [
                    {
                        required: true,
                        message: "Required field!",
                        trigger: "change blur focus",
                    },
                ],
                d_in_reach: [
                    {
                        required: true,
                        message: "Required field!",
                        trigger: "change blur focus",
                    },
                ],
                d_name: [
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
        this.getJourneys();
    },
    methods: {
        async insertJourney() {
            let pid = this.$store.state.user.rolesData.r_role;
            this.journeyForm.pid = pid;
            let res = await alterJourney(this.journeyForm);
            this.$message({
                type: "success",
                message: "Data is modified successfully!",
            });
            this.getJourneys();
        },
        async getJourneys() {
            let r_serial = this.$store.state.user.rolesData.r_serial;
            let res = await getJourney(r_serial);
            console.log(res);
            if (res.data.length != 0) {
                res.data[0].d_return_date = res.data[0].d_return_date.slice(0, 10);
                this.journeyForm = res.data[0];
            } else {
                this.$message({
                    type: "warning",
                    message: "Please add or modify data!",
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.journeyInput {
    padding-left: 20px;
    .title {
        padding-bottom: 20px;
        border-bottom: 1px solid #dadada;
        margin-bottom: 15px;
        span {
            margin-left: 10px;
            font-weight: bold;
            font-size: 17px;
        }
    }
}
</style>
