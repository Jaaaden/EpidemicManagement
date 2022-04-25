<template>
    <transition-group
        name="animate__animated animate__bounce"
        :appear="true"
        enter-active-class="animate__fadeInLeftBig"
        leave-active-class="animate__fadeOutLeftBig"
    >
        <div class="contactsRick-Manage" :key="1">
            <el-divider content-position="left" class="title"
                >The management of information that people close contact patient</el-divider
            >

            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input
                        placeholder="Please enter the name of the person you want to search: "
                        v-model="queryInfo.query"
                    >
                        <el-button
                            slot="append"
                            icon="el-icon-search"
                            @click="queryContacts()"
                        ></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="contactsDrawer = true">Add the information of close contact</el-button>
                </el-col>
            </el-row>

            <el-table :data="newContactsList" border stripe>
                <el-table-column
                    align="center"
                    label="#"
                    type="index"
                ></el-table-column>
                <el-table-column
                    align="center"
                    label="ID"
                    prop="m_stuid"
                    width="110px"
                ></el-table-column>
                <el-table-column
                    align="center"
                    label="Name"
                    prop="m_name"
                ></el-table-column>
                <el-table-column
                    align="center"
                    label="Gender"
                    prop="m_gender"
                ></el-table-column>
                <el-table-column
                    align="center"
                    label="Department"
                    prop="m_college"
                    width="155px"
                ></el-table-column>
                
                <el-table-column
                    align="center"
                    label="Address"
                    prop="m_recent_place"
                ></el-table-column>
                <el-table-column
                    align="center"
                    label="Recent contact history"
                    prop="m_recent_history"
                ></el-table-column>
                <el-table-column
                    align="center"
                    label="Health status"
                    prop="m_health_status"
                ></el-table-column>
                <el-table-column align="center" label="Operation" width="120px">
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            icon="el-icon-edit"
                            size="mini"
                            @click="showContacts(scope.row)"
                        ></el-button>
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            size="mini"
                            @click="removeContacts(scope.row)"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pageNum"
                :page-sizes="[1, 2, 5, 10]"
                :page-size="queryInfo.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="(queryInfo.total = contactsList.length)"
            >
            </el-pagination>

            <el-drawer
                title="Add the information of diagnosed patient"
                :visible.sync="contactsDrawer"
                direction="rtl"
                :before-close="handleContactsClose"
                class="drawer_one"
            >
                <el-form
                    ref="contactsFormRef"
                    :model="contactsForm"
                    :rules="contactsRules"
                    label-position="left"
                    label-width="100px"
                    style="padding: 20px; padding-top: 0px"
                >
                    <el-form-item label="ID" prop="m_stuid">
                        <el-input v-model="contactsForm.m_stuid"></el-input>
                    </el-form-item>
                    <el-form-item label="Name" prop="m_name">
                        <el-input v-model="contactsForm.m_name"></el-input>
                    </el-form-item>
                    <el-form-item label="Gender" prop="m_gender">
                        <el-input v-model="contactsForm.m_gender"></el-input>
                    </el-form-item>
                    <el-form-item label="Department" prop="m_college">
                        <el-input v-model="contactsForm.m_college"></el-input>
                    </el-form-item>

                    <el-form-item label="Address" prop="m_recent_place">
                        <el-input
                            v-model="contactsForm.m_recent_place"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="Recent contact history" prop="m_recent_history">
                        <el-input
                            v-model="contactsForm.m_recent_history"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="Health status" prop="m_health_status">
                        <el-input
                            v-model="contactsForm.m_health_status"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label-width="0px">
                        <el-button type="primary" @click="insertContacts()"
                            >add</el-button
                        >
                        <el-button type="pain">reset</el-button>
                    </el-form-item>
                </el-form>
            </el-drawer>

            <el-dialog
                title="modify the close contact information"
                :visible.sync="contactsDialog"
                width="50%"
            >
                <el-form
                    ref="contactsFormRef"
                    :model="contactsForm"
                    :rules="contactsRules"
                    label-position="left"
                    label-width="100px"
                    style="padding: 20px; padding-top: 0px"
                >
                    <el-form-item label="ID" prop="m_stuid">
                        <el-input v-model="contactsForm.m_stuid"></el-input>
                    </el-form-item>
                    <el-form-item label="Name" prop="m_name">
                        <el-input v-model="contactsForm.m_name"></el-input>
                    </el-form-item>
                    <el-form-item label="Gender" prop="m_gender">
                        <el-input v-model="contactsForm.m_gender"></el-input>
                    </el-form-item>
                    <el-form-item label="Department" prop="m_college">
                        <el-input v-model="contactsForm.m_college"></el-input>
                    </el-form-item>
                    <el-form-item label="Address" prop="m_recent_place">
                        <el-input
                            v-model="contactsForm.m_recent_place"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="A" prop="m_recent_history">
                        <el-input
                            v-model="contactsForm.m_recent_history"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="Health status" prop="m_health_status">
                        <el-input
                            v-model="contactsForm.m_health_status"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label-width="0px">
                        <el-button type="primary" @click="updateContacts()"
                            >modify</el-button>
                        <el-button type="pain">reset</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </transition-group>
</template>

<script>
import {
    allClose,
    addClose,
    alterClose,
    getClose,
    deleteClose
} from "@/api/manage";
export default {
    name:'ContactsManage',
    data(){
        return {
            queryInfo:{
                query:'',
                pageNum:1,
                pageSize:2,
                total:0,
            },
            contactsList:[],
            contactsDrawer: false,
            contactsForm: {
                m_stuid: "",
                m_name: "",
                m_gender: "",
                m_college: "",
                m_recent_place:"",
                m_recent_history:"",
                m_health_status:""
            },
            contactsDialog: false,
            contactsRules: {
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
                m_gender: [
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

                m_recent_place: [
                    {
                        required: true,
                        message: "Required field!",
                        trigger: "change blur focus",
                    },
                ],
                m_recent_history: [
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
            },
        }
    },
    created() {
        this.getAllContacts();
    },
    methods: {
        async getAllContacts() {
            let res = await allClose();
            res.data.forEach((item) => {
                item.m_gender = item.m_gender === 0 ? "Male" : "Female";
            });
            this.contactsList = res.data;
        },
        async queryContacts() {
            if (this.queryInfo.query.length > 0) {
                let res = await getClose(this.queryInfo.query);
                this.contactsList = res.data;
                console.log(this.contactsList);
            } else {
                this.getAllContacts();
            }
        },
        async insertContacts() {
            let res = await addClose(this.contactsForm);
            if (res.status === 200) {
                this.getAllContacts();
                this.$message({
                    type: "success",
                    message: "T",
                });
            } else {
                this.$message({
                    type: "error",
                    message: "The close contact already exists",
                });
            }
        },
        async showContacts(row) {
            this.contactsDialog = true;
            this.contactsForm = row;
        },
        async updateContacts() {
            let res = await alterClose(this.contactsForm);
            if (res.status === 200) {
                this.getAllContacts();
                this.$message({
                    type: "success",
                    message: "The close contact is modified successfully",
                });
                this.contactsDialog = false;
            }
        },
        async removeContacts(row) {
            let res = await deleteClose(row.id);
            if (res.status === 200) {
                this.getAllContacts();
                this.$message({
                    type: "success",
                    message: "The close contact is deleted successfully",
                });
            }
        },
        handleContactsClose(done) {
            done();
        },
        handleSizeChange(val) {
            this.queryInfo.pageSize = val;
        },
        handleCurrentChange(val) {
            this.queryInfo.pageNum = val;
        },
    },
    computed: {
        newContactsList() {
            return this.contactsList.slice(
                (this.queryInfo.pageNum - 1) * this.queryInfo.pageSize,
                this.queryInfo.pageNum * this.queryInfo.pageSize
            );
        },
    },
};
</script>

<style lang="scss" scoped>
.contactsRick-Manage {
    .el-divider {
        height: 2px;
    }
    .el-divider__text {
        font-size: 25px;
    }
    .el-row {
        margin: 40px 0px 20px 0px;
    }
    .el-table {
        margin-bottom: 20px;
    }
}
</style>
