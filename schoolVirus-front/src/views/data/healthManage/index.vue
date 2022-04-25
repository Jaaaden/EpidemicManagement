<template>
    <transition-group
        name="animate__animated animate__bounce"
        :appear="true"
        enter-active-class="animate__fadeInLeftBig"
        leave-active-class="animate__fadeOutLeftBig"
    >
        <div class="health-container" :key="1">
            
            <el-card class="applyManage">
                <div class="title">
                    <i class="el-icon-tickets"></i>
                    <span>Personal Information</span>
                </div>

                
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-input
                            placeholder="Please type in your name"
                            v-model="applyQueryInfo.query"
                        >
                            <el-button
                                slot="append"
                                icon="el-icon-search"
                                @click="queryInfoer"
                            ></el-button>
                        </el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary" @click="applyDrawer = true"
                            >Add a declarant</el-button
                        >
                    </el-col>
                </el-row>

                
                <el-table :data="newApplyList" border stripe>
                    <el-table-column
                        align="center"
                        label="#"
                        type="index"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="Name"
                        prop="i_name"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        width="170px"
                        label="ID Number"
                        prop="i_idcard"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        width="130px"
                        label="Phone Number"
                        prop="i_phone"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="Gender"
                        prop="i_gender"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        width="90px"
                        label="Date of Birth"
                        prop="i_birth"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        width="90px"
                        label="Nationality / Region"
                        prop="i_nationality"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        width="250px"
                        label="Address"
                        prop="i_address"
                    ></el-table-column>
                    <el-table-column align="center" label="Operate" width="180px">
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                icon="el-icon-edit"
                                size="mini"
                                @click="showInfo(scope.row)"
                                >Edit</el-button
                            >
                            <el-button
                                type="danger"
                                icon="el-icon-delete"
                                size="mini"
                                @click="removeInfo(scope.row)"
                                >Delete</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>

               
                <el-pagination
                    @size-change="applyHandleSizeChange"
                    @current-change="applyHandleCurrentChange"
                    :current-page="applyQueryInfo.pageNum"
                    :page-sizes="[1, 2, 10, 15]"
                    :page-size="applyQueryInfo.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="(applyQueryInfo.total = applyList.length)"
                >
                </el-pagination>
            </el-card>

           
            <el-card class="healthManage">
                <div class="title">
                    <i class="el-icon-tickets"></i>
                    <span>Health Information</span>
                </div>

                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-input
                            placeholder="Please type in your name"
                            v-model="healthQueryInfo.query"
                        >
                            <el-button
                                slot="append"
                                icon="el-icon-search"
                                @click="queryMessage"
                            ></el-button>
                        </el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary" @click="healthDrawer = true"
                            >Add Health Information</el-button
                        >
                    </el-col>
                </el-row>
                
                <el-table :data="newHealthList" border stripe>
                    <el-table-column
                        align="center"
                        label="#"
                        type="index"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="ID"
                        prop="m_stuid"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="Name"
                        prop="m_name"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="Department"
                        prop="m_college"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="Address"
                        prop="m_recent_resi"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="State of Health"
                        prop="m_health_status"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="Condition Description"
                        prop="m_status_des"
                    ></el-table-column>
                    <el-table-column align="center" label="Operate" width="180px">
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                icon="el-icon-edit"
                                size="mini"
                                @click="showMessage(scope.row)"
                                >Edit</el-button
                            >
                            <el-button
                                type="danger"
                                icon="el-icon-delete"
                                size="mini"
                                @click="removeMessage(scope.row)"
                                >Delete</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
               
                <el-pagination
                    @size-change="healthHandleSizeChange"
                    @current-change="healthHandleCurrentChange"
                    :current-page="healthQueryInfo.pageNum"
                    :page-sizes="[1, 2, 5, 10]"
                    :page-size="healthQueryInfo.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="(healthQueryInfo.total = healthList.length)"
                >
                </el-pagination>
            </el-card>

            <el-card class="vaccinationManage">
                <div class="title">
                    <i class="el-icon-tickets"></i>
                    <span>Vaccination Records</span>
                </div>
                
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-input
                            placeholder="Please type in your name"
                            v-model="vaccinationQueryInfo.query"
                        >
                            <el-button
                                slot="append"
                                icon="el-icon-search"
                                @click="queryRecord"
                            ></el-button>
                        </el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-button
                            type="primary"
                            @click="vaccinationDrawer = true"
                            >Add vaccination record</el-button
                        >
                    </el-col>
                </el-row>
                
                <el-table :data="newVaccinationList" border stripe>
                    <el-table-column
                        align="center"
                        label="#"
                        type="index"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        width="200px"
                        label="ID"
                        prop="r_stuid"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="Name"
                        prop="r_name"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        width="200px"
                        label="Vaccine Name"
                        prop="r_vaccine"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        width="200px"
                        label="Vaccine Times"
                        prop="r_num"
                    ></el-table-column>
                    
                    <el-table-column
                        align="center"
                        label="Injection Time"
                        prop="r_vac_date"
                    ></el-table-column>
                    <el-table-column align="center" label="Operate" width="180px">
                        <template slot-scope="scope">
                        <el-button
                            type="primary"
                            icon="el-icon-edit"
                            size="mini"
                            @click="showRecord(scope.row)"
                            >Edit</el-button
                        >
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            size="mini"
                            @click="removeRecord(scope.row)"
                            >Delete</el-button
                        >
                        </template>
                    </el-table-column>
                </el-table>
                
                <el-pagination
                    @size-change="vaccinationHandleSizeChange"
                    @current-change="vaccinationHandleCurrentChange"
                    :current-page="vaccinationQueryInfo.pageNum"
                    :page-sizes="[1, 2, 5, 10]"
                    :page-size="vaccinationQueryInfo.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="
                        (vaccinationQueryInfo.total = vaccinationList.length)
                    "
                >
                </el-pagination>
            </el-card>

            
            <el-drawer
                title="Information Add"
                :visible.sync="applyDrawer"
                direction="rtl"
                :before-close="handleApplyClose"
                class="drawer_one"
            >
                <el-form
                    ref="applyFormRef"
                    :model="applyForm"
                    :rules="applyRules"
                    label-position="top"
                    style="padding: 20px; padding-top: 0px"
                >
                    <el-form-item label="Name" prop="i_name">
                        <el-input v-model="applyForm.i_name"></el-input>
                    </el-form-item>
                    <el-form-item label="ID Number" prop="i_idcard">
                        <el-input v-model="applyForm.i_idcard"></el-input>
                    </el-form-item>
                    <el-form-item label="Phone Number" prop="i_phone">
                        <el-input v-model="applyForm.i_phone"></el-input>
                    </el-form-item>
                    <el-form-item label="Gender" prop="i_gender">
                        <el-radio v-model="applyForm.i_gender" :label="0" border
                            >Male</el-radio
                        >
                        <el-radio v-model="applyForm.i_gender" :label="1" border
                            >Female</el-radio
                        >
                    </el-form-item>
                    <el-form-item label="Date of Birth" prop="i_birth">
                        <el-date-picker
                            v-model="applyForm.i_birth"
                            type="date"
                            placeholder="Select Date"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="Nationality / Region" prop="i_nationality">
                        <el-input v-model="applyForm.i_nationality"></el-input>
                    </el-form-item>
                   
                    <el-form-item label="Address" prop="i_address">
                        <el-input v-model="applyForm.i_address"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="insertInfo()"
                            >Add</el-button
                        >
                        <el-button type="pain">Reset</el-button>
                    </el-form-item>
                </el-form>
            </el-drawer>

            
            <el-drawer
                title="Health Information Added"
                :visible.sync="healthDrawer"
                direction="rtl"
                :before-close="handleHealthClose"
            >
                <el-form
                    ref="healthFormRef"
                    :model="healthForm"
                    :rules="healthRules"
                    label-position="top"
                    style="padding: 20px; padding-top: 0px"
                >
                    <el-form-item label="ID" prop="m_stuid">
                        <el-input v-model="healthForm.m_stuid"></el-input>
                    </el-form-item>
                    <el-form-item label="Name" prop="m_name">
                        <el-input v-model="healthForm.m_name"></el-input>
                    </el-form-item>
                    <el-form-item label="Department" prop="m_college">
                        <el-input v-model="healthForm.m_college"></el-input>
                    </el-form-item>
                    <el-form-item label="Address" prop="m_class">
                        <el-input v-model="healthForm.m_class"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="Contact Time" prop="m_touch_date">
                        <el-date-picker
                            v-model="healthForm.m_touch_date"
                            type="date"
                            placeholder="Select Date"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="Health Condition" prop="m_health_status">
                        <el-input
                            v-model="healthForm.m_health_status"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="Condition Description" prop="m_status_des">
                        <el-input v-model="healthForm.m_status_des"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="insertMessage()"
                            >Add</el-button
                        >
                        <el-button type="pain">Reset</el-button>
                    </el-form-item>
                </el-form>
            </el-drawer>

           
            <el-drawer
                title="Vaccination record added"
                :visible.sync="vaccinationDrawer"
                direction="rtl"
                :before-close="handleVaccinationClose"
            >
                <el-form
                    ref="inoculateFormRef"
                    :model="inoculateForm"
                    :rules="inoculateRules"
                    label-position="top"
                    style="padding: 20px; padding-top: 0px"
                >
                    <el-form-item label="ID" prop="r_stuid">
                        <el-input
                            v-model="inoculateForm.r_stuid"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="Name" prop="r_name">
                        <el-input
                            v-model="inoculateForm.r_name"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="Vaccine Name" prop="r_vaccine">
                        <el-input
                            v-model="inoculateForm.r_vaccine"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="Vaccine Times" prop="r_inject">
                        <el-input
                            v-model="inoculateForm.r_inject"
                        ></el-input>
                    </el-form-item>
                   
                    <el-form-item label="Injection Time" prop="r_vac_date">
                        <el-date-picker
                            v-model="inoculateForm.r_vac_date"
                            type="date"
                            placeholder="Select Date"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="insertRecord()">Add</el-button>
                        <el-button type="pain">Reset</el-button>
                    </el-form-item>
                </el-form>
            </el-drawer>

            
            <el-dialog
                title="Modify information"
                :visible.sync="applyDialog"
                width="50%"
            >
                <el-form
                    ref="applyFormRef"
                    :model="applyForm"
                    :rules="applyRules"
                    label-position="top"
                    style="padding: 20px; padding-top: 0px"
                >
                    <el-form-item label="Name" prop="i_name">
                        <el-input v-model="applyForm.i_name"></el-input>
                    </el-form-item>
                    <el-form-item label="License Number" prop="i_idcard">
                        <el-input v-model="applyForm.i_idcard"></el-input>
                    </el-form-item>
                    <el-form-item label="Phone Number" prop="i_phone">
                        <el-input v-model="applyForm.i_phone"></el-input>
                    </el-form-item>
                    <el-form-item label="Gender" prop="i_gender">
                        <el-radio v-model="applyForm.i_gender" :label="0" border
                            >Male</el-radio
                        >
                        <el-radio v-model="applyForm.i_gender" :label="1" border
                            >Female</el-radio
                        >
                    </el-form-item>
                    <el-form-item label="date of birth" prop="i_birth">
                        <el-date-picker
                            v-model="applyForm.i_birth"
                            type="date"
                            placeholder="select date"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="Nationality / Region" prop="i_nationality">
                        <el-input v-model="applyForm.i_nationality"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="Address" prop="i_address">
                        <el-input v-model="applyForm.i_address"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updateInfo()"
                            >Revise</el-button
                        >
                        <el-button type="pain">Reset</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>

            <el-dialog
                title="Revise Information"
                :visible.sync="healthDialog"
                width="50%"
            >
                <el-form
                    ref="healthFormRef"
                    :model="healthForm"
                    :rules="healthRules"
                    label-position="top"
                    style="padding: 20px; padding-top: 0px"
                >
                    <el-form-item label="ID" prop="m_stuid">
                        <el-input v-model="healthForm.m_stuid"></el-input>
                    </el-form-item>
                    <el-form-item label="Name" prop="m_name">
                        <el-input v-model="healthForm.m_name"></el-input>
                    </el-form-item>
                    <el-form-item label="Department" prop="m_college">
                        <el-input v-model="healthForm.m_college"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="Address" prop="m_recent_resi">
                        <el-input v-model="healthForm.m_recent_resi"></el-input>
                    </el-form-item>
                    
                    </el-form-item>
                    <el-form-item label="Contact Time" prop="m_touch_date">
                        <el-date-picker
                            v-model="healthForm.m_touch_date"
                            type="date"
                            placeholder="select date"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="Health Condition" prop="m_health_status">
                        <el-input
                            v-model="healthForm.m_health_status"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="Condition Description" prop="m_status_des">
                        <el-input v-model="healthForm.m_status_des"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updateMessage()"
                            >Edit</el-button
                        >
                        <el-button type="pain">Reset</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>

            
            <el-dialog
                title="Revise Information"
                :visible.sync="vaccinationDialog"
                width="50%"
            >
                <el-form
                    ref="inoculateFormRef"
                    :model="inoculateForm"
                    :rules="inoculateRules"
                    label-position="top"
                    style="padding: 20px; padding-top: 0px"
                >
                    <el-form-item label="ID" prop="r_stuid">
                        <el-input
                            v-model="inoculateForm.r_stuid"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="Name" prop="r_name">
                        <el-input
                            v-model="inoculateForm.r_name"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="Vaccine Name" prop="r_vaccine">
                        <el-input
                            v-model="inoculateForm.r_vaccine"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="Vaccine Times" prop="r_inject">
                        <el-input
                            v-model="inoculateForm.r_inject"
                        ></el-input>
                    </el-form-item>
                   
                    
                    <el-form-item label="Injection Time" prop="r_vac_date">
                        <el-date-picker
                            v-model="inoculateForm.r_vac_date"
                            type="date"
                            placeholder="select date"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updateRecord()">Modify vaccination records</el-button>
                        <el-button type="pain">Reset</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </transition-group>
</template>

<script>
import {
    allInfoer,
    allHealth,
    allRecord,
    getInfoer,
    getMessage,
    getRecord,
    addInfoer,
    addMessage,
    addRecord,
    alterInfoer,
    alterMessage,
    alterRecord,
    deleteInfoer,
    deleteMessage,
    deleteRecord
} from "@/api/health";
export default {
    name: "HealthManage",
    created() {
        // console.log(this.$store.state.user.rolesData.personal_info.health_infoers[0],"申报人信息");
        // console.log(this.$store.state.user.rolesData.personal_info.health_messages[0],"健康信息");
        // console.log(this.$store.state.user.rolesData.personal_info.health_records[0],"接种信息");
        this.getAllInfoer();
        this.getAllHealth();
        this.getAllRecord();
    },
    data() {
        // Alphanumeric Chinese characters
        const pat = new RegExp("[^a-zA-Z0-9_\u4e00-\u9fa5]", "i");
        // Phone Regular
        const phone = new RegExp(
            "/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/"
        );
        // Email Regular
        const email = new RegExp(
            "/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/"
        );
        // Regular document number
        const idCard = new RegExp(
            "/^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/"
        );

       
        let InvalidString = (rule, value, callback) => {
            
            if (pat.test(value) === true) {
                callback(new Error("Include illegal characters, can only be numbers"));
            } else {
                callback();
            }
        };

        
        let InvalidPhone = (rule, value, callback) => {
            
            if (phone.test(value) === true) {
                callback(new Error("Include illegal characters, can only be numbers"));
            } else {
                callback();
            }
        };

        
        let InvalidEmail = (rule, value, callback) => {
           
            if (email.test(value) === true) {
                callback(new Error("Email is illegal"));
            } else {
                callback();
            }
        };

        
        let InvalidIdCard = (rule, value, callback) => {
            
            if (email.idCard(value) === true) {
                callback(new Error("ID number is invalid"));
            } else {
                callback();
            }
        };
        return {
            
            applyQueryInfo: {
                query: "",
                pageNum: 1, 
                pageSize: 2, 
                total: 0,
            },
            healthQueryInfo: {
                query: "",
                pageNum: 1,
                pageSize: 2,
                total: 0,
            },
            vaccinationQueryInfo: {
                query: "",
                pageNum: 1,
                pageSize: 2,
                total: 0,
            },
            
            applyList: [],
            healthList: [],
            vaccinationList: [],
            
            applyDrawer: false,
            healthDrawer: false,
            vaccinationDrawer: false,
            
            applyForm: {
                i_name: "",
                i_idcard: "",
                i_phone: "",
                i_gender: 0,
                i_birth: "2022/03/27",
                i_nationality: "",
                i_domicile: "",
                i_native: "",
                i_address: "",
            },
            healthForm: {
                m_stuid: "",
                m_name: "",
                m_college: "",
                m_class: "",
                m_recent_resi: "",
                m_recent_touch: "",
                m_touch_date: "2022/03/27",
                m_health_status: "",
                m_status_des: "",
            },
            inoculateForm: {
                r_stuid:'',
                r_name:'',
                r_vaccine:'',
                r_inject:'',
                r_num:'',
                r_manufacturer:'',
                r_vac_unit:'',
                r_vac_date:'2022/03/27',
            },
            
            applyRules: {
                i_name: [
                    { 
                        required: true, 
                        message: "Required fields!",
                        trigger: "change blur focus",
                    }
                ],
                i_idcard: [
                    { 
                        required: true, 
                        message: "Required fields!",
                        trigger: "change blur focus",
                    }
                ],
                i_phone: [
                    { 
                        required: true, 
                        message: "Required fields!",
                        trigger: "change blur focus",
                    }
                ],
                i_gender: [
                    { 
                        required: true, 
                        message: "Required fields!",
                        trigger: "change blur focus",
                    }
                ],
                i_birth: [
                    { 
                        required: true, 
                        message: "Required fields!",
                        trigger: "change blur focus",
                    }
                ],
                i_nationality: [
                    { 
                        required: true, 
                        message: "Required fields!",
                        trigger: "change blur focus",
                    }
                ],
                i_domicile: [
                    { 
                        required: true, 
                        message: "Required fields!",
                        trigger: "change blur focus",
                    }
                ],
                i_native: [
                    { 
                        required: true, 
                        message: "Required fields!",
                        trigger: "change blur focus",
                    }
                ],
                i_address: [
                    { 
                        required: true, 
                        message: "Required fields!",
                        trigger: "change blur focus",
                    }
                ],
            },
            healthRules: {
                m_stuid: [
                    { 
                        required: true, 
                        message: "Required fields!",
                        trigger: "change blur focus",
                    }
                ],
                m_name: [
                    { 
                        required: true, 
                        message: "Required fields!",
                        trigger: "change blur focus",
                    }
                ],
                m_college: [
                    { 
                        required: true, 
                        message: "Required fields!",
                        trigger: "change blur focus",
                    }
                ],
                m_class: [
                    { 
                        required: true, 
                        message: "Required fields!",
                        trigger: "change blur focus",
                    }
                ],
                m_recent_resi: [
                    { 
                        required: true, 
                        message: "Required fields!",
                        trigger: "change blur focus",
                    }
                ],
                m_recent_touch: [
                    { 
                        required: true, 
                        message: "Required fields!",
                        trigger: "change blur focus",
                    }
                ],
                m_touch_date: [
                    { 
                        required: true, 
                        message: "Required fields!",
                        trigger: "change blur focus",
                    }
                ],
                m_health_status: [
                    { 
                        required: true, 
                        message: "Required fields!",
                        trigger: "change blur focus",
                    }
                ],
                m_status_des: [
                    { 
                        required: true, 
                        message: "Required fields!",
                        trigger: "change blur focus",
                    }
                ],
            },
            inoculateRules: {
                r_stuid:[
                    { 
                        required: true, 
                        message: "Required fields!",
                        trigger: "change blur focus",
                    }
                ],
                r_name:[
                    { 
                        required: true, 
                        message: "Required fields!",
                        trigger: "change blur focus",
                    }
                ],
                r_vaccine:[
                    { 
                        required: true, 
                        message: "Required fields!",
                        trigger: "change blur focus",
                    }
                ],
                r_inject:[
                    { 
                        required: true, 
                        message: "Required fields!",
                        trigger: "change blur focus",
                    }
                ],
                r_num:[
                    { 
                        required: true, 
                        message: "Required fields!",
                        trigger: "change blur focus",
                    }
                ],
                r_manufacturer:[
                    { 
                        required: true, 
                        message: "Required fields!",
                        trigger: "change blur focus",
                    }
                ],
                r_vac_unit:[
                    { 
                        required: true, 
                        message: "Required fields!",
                        trigger: "change blur focus",
                    }
                ],
                r_vac_date:[
                    { 
                        required: true, 
                        message: "Required fields!",
                        trigger: "change blur focus",
                    }
                ],
            },
            
            applyDialog: false,
            healthDialog: false,
            vaccinationDialog: false,
        };
    },
    methods: {
        
        async getAllInfoer() {
            let res = await allInfoer();
            res.data.forEach((item) => {
                item.i_gender = item.i_gender == 0 ? "Male" : "Female";
            });
            this.applyList = res.data;
        },
        
        async getAllHealth() {
            let res = await allHealth();
            this.healthList = res.data;
        },
        
        async getAllRecord() {
            let res = await allRecord();
            this.vaccinationList = res.data;
        },
        
        async queryInfoer() {
            console.log(this.applyQueryInfo.query);
            if (this.applyQueryInfo.query.length > 0) {
                let res = await getInfoer(this.applyQueryInfo.query);
                this.applyList = res.data;
            } else {
                this.getAllInfoer();
            }
        },
        
        async queryMessage() {
            console.log(this.healthQueryInfo.query);
            if (this.healthQueryInfo.query.length > 0) {
                let res = await getMessage(this.healthQueryInfo.query);
                console.log(res);
                this.healthList = res.data;
            } else {
                this.getAllHealth();
            }
        },
        
        async queryRecord() {
            console.log(this.vaccinationQueryInfo.query);
            if (this.vaccinationQueryInfo.query.length > 0) {
                let res = await getRecord(this.vaccinationQueryInfo.query);
                console.log(res);
                this.vaccinationList = res.data;
            } else {
                this.getAllRecord();
            }
        },
        
        async insertInfo() {
            let res = await addInfoer(this.applyForm);
            if (res.status === 200) {
                this.getAllInfoer();
                this.$message({
                    type: "success",
                    message: "The applicant was added successfully",
                });
            } else {
                this.$message({
                    type: "error",
                    message: "The applicant already exists",
                });
            }
        },
       
        async insertMessage() {
            let res = await addMessage(this.healthForm);
            if (res.status === 200) {
                this.getAllHealth();
                this.$message({
                    type: "success",
                    message: "Health information added successfully",
                });
            } else {
                this.$message({
                    type: "error",
                    message: "Health information already exists",
                });
            }
        },
        
        async insertRecord() {
            let res = await addRecord(this.inoculateForm);
            if (res.status === 200) {
                this.getAllRecord();
                this.$message({
                    type: "success",
                    message: "Vaccination record added successfully",
                });
            } else {
                this.$message({
                    type: "error",
                    message: "Vaccination record already exists",
                });
            }
        },
        
        async showInfo(row) {
            this.applyDialog = true;
            row.i_gender = row.i_gender == "Male" ? 0 : 1;
            this.applyForm = row;
        },
        
        async showMessage(row) {
            this.healthDialog = true;
            this.healthForm = row;
        },
        
        async showRecord(row){
            this.vaccinationDialog = true;
            this.inoculateForm = row;
        },
        
        async updateInfo() {
            console.log(this.applyForm);
            let res = await alterInfoer(this.applyForm);
            if (res.status === 200) {
                this.getAllInfoer();
                this.$message({
                    type: "success",
                    message: "The applicant's modification was successful",
                });
                this.applyDialog = false;
            }
        },
        
        async updateMessage() {
            let res = await alterMessage(this.healthForm);
            if (res.status === 200) {
                this.getAllHealth();
                this.$message({
                    type: "success",
                    message: "Health information modified successfully",
                });
                this.healthDialog = false;
            }
        },
        
        async updateRecord() {
            let res = await alterRecord(this.inoculateForm);
            if (res.status === 200) {
                this.getAllRecord();
                this.$message({
                    type: "success",
                    message: "The vaccination record was modified successfully",
                });
                this.vaccinationDialog = false;
            }
        },
        
        async removeInfo(row) {
            let res = await deleteInfoer(row.id);
            if (res.status === 200) {
                this.getAllInfoer();
                this.$message({
                    type: "success",
                    message: "The applicant was deleted successfully",
                });
            }
        },
       
        async removeMessage(row) {
            let res = await deleteMessage(row.id);
            if (res.status === 200) {
                this.getAllHealth();
                this.$message({
                    type: "success",
                    message: "Health information deleted successfully",
                });
            }
        },
        
        async removeRecord(row) {
            let res = await deleteRecord(row.id);
            if (res.status === 200) {
                this.getAllRecord();
                this.$message({
                    type: "success",
                    message: "Vaccination record deleted successfully",
                });
            }
        },
        // Trigger 1 when the mouse leaves the drawer
        handleApplyClose(done) {
            done();
        },
        // Trigger 2 when the mouse leaves the drawer
        handleHealthClose(done) {
            done();
        },
        // Trigger 3 when the mouse leaves the drawer
        handleVaccinationClose(done) {
            done();
        },
        applyHandleSizeChange(val) {
            this.applyQueryInfo.pageSize = val;
        },
        applyHandleCurrentChange(val) {
            this.applyQueryInfo.pageNum = val;
        },
        healthHandleSizeChange(val) {
            this.healthQueryInfo.pageSize = val;
        },
        healthHandleCurrentChange(val) {
            this.healthQueryInfo.pageNum = val;
        },
        vaccinationHandleSizeChange(val) {
            this.vaccinationQueryInfo.pageSize = val;
        },
        vaccinationHandleCurrentChange(val) {
            this.vaccinationQueryInfo.pageNum = val;
        },
    },
    computed: {
        newApplyList() {
            return this.applyList.slice(
                (this.applyQueryInfo.pageNum - 1) * this.applyQueryInfo.pageSize,
                this.applyQueryInfo.pageNum * this.applyQueryInfo.pageSize
            );
        },
        newHealthList() {
            return this.healthList.slice(
                (this.healthQueryInfo.pageNum - 1) * this.healthQueryInfo.pageSize,
                this.healthQueryInfo.pageNum * this.healthQueryInfo.pageSize
            );
        },
        newVaccinationList() {
            return this.vaccinationList.slice(
                (this.vaccinationQueryInfo.pageNum - 1) * this.vaccinationQueryInfo.pageSize,
                this.vaccinationQueryInfo.pageNum * this.vaccinationQueryInfo.pageSize
            );
        },
    },
};
</script>

<style lang="scss" scoped>
.health-container {
    .applyManage {
        padding: 10px;
        margin-bottom: 30px;
        .title {
            margin: 10px;
            padding-bottom: 15px;
            border-bottom: 1px solid #cdcdcd;
        }
        .title span {
            margin-left: 5px;
        }
        .el-row {
            margin-top: 15px !important;
            margin-left: 1px !important;
        }
        .el-table {
            margin: 10px;
            margin-top: 16px;
        }
        .el-pagination {
            margin-left: 10px;
        }
    }
    .healthManage {
        padding: 10px;
        margin-bottom: 30px;
        .title {
            margin: 10px;
            padding-bottom: 15px;
            border-bottom: 1px solid #cdcdcd;
        }
        .title span {
            margin-left: 5px;
        }
        .el-row {
            margin-top: 15px !important;
            margin-left: 1px !important;
        }
        .el-table {
            margin: 10px;
            margin-top: 16px;
        }
        .el-pagination {
            margin-left: 10px;
        }
    }
    .vaccinationManage {
        padding: 10px;
        margin-bottom: 30px;
        .title {
            margin: 10px;
            padding-bottom: 15px;
            border-bottom: 1px solid #cdcdcd;
        }
        .title span {
            margin-left: 5px;
        }
        .el-row {
            margin-top: 15px !important;
            margin-left: 1px !important;
        }
        .el-table {
            margin: 10px;
            margin-top: 16px;
        }
        .el-pagination {
            margin-left: 10px;
        }
    }
}
</style>
