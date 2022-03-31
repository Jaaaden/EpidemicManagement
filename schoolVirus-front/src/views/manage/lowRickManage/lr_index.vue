<template>
    <transition-group
        name="animate__animated animate__bounce"
        :appear="true"
        enter-active-class="animate__fadeInLeftBig"
        leave-active-class="animate__fadeOutLeftBig"
    >
        <div class="lowRick-Manage" :key="1">
            <el-divider content-position="left" class="title"
                >low risk close contact management</el-divider
            >

            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input
                        placeholder="Please enter the name of the person to be searched"
                        v-model="queryInfo.query"
                    >
                        <el-button
                            slot="append"
                            icon="el-icon-search"
                            @click="queryLowRick()"
                        ></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="lowRickDrawer = true">Add low risk contact information</el-button>
                </el-col>
            </el-row>

            <el-table :data="newLowRickList" border stripe>
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
                    prop="m_building"
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
                            @click="showLowRick(scope.row)"
                        ></el-button>
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            size="mini"
                            @click="removeLowRick(scope.row)"
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
                :total="(queryInfo.total = lowRickList.length)"
            >
            </el-pagination>

            <el-drawer
                title="Add role"
                :visible.sync="lowRickDrawer"
                direction="rtl"
                :before-close="handleLowRickClose"
                class="drawer_one"
            >
                <el-form
                    ref="lowRickFormRef"
                    :model="lowRickForm"
                    :rules="lowRickRules"
                    label-position="left"
                    label-width="100px"
                    style="padding: 20px; padding-top: 0px"
                >
                    <el-form-item label="ID" prop="m_stuid">
                        <el-input v-model="lowRickForm.m_stuid"></el-input>
                    </el-form-item>
                    <el-form-item label="Name" prop="m_name">
                        <el-input v-model="lowRickForm.m_name"></el-input>
                    </el-form-item>
                    <el-form-item label="Gender" prop="m_gender">
                        <el-input v-model="lowRickForm.m_gender"></el-input>
                    </el-form-item>
                    <el-form-item label="Department" prop="m_college">
                        <el-input v-model="lowRickForm.m_college"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="Address" prop="m_building">
                        <el-input v-model="lowRickForm.m_building"></el-input>
                    </el-form-item>
                    <el-form-item label="Health status" prop="m_health_status">
                        <el-input
                            v-model="lowRickForm.m_health_status"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label-width="0px">
                        <el-button type="primary" @click="insertLowRick()"
                            >add</el-button
                        >
                        <el-button type="pain">reset</el-button>
                    </el-form-item>
                </el-form>
            </el-drawer>

            <el-dialog
                title="Modify low rist close contact"
                :visible.sync="lowRickDialog"
                width="50%"
            >
                <el-form
                    ref="lowRickFormRef"
                    :model="lowRickForm"
                    :rules="lowRickRules"
                    label-position="left"
                    label-width="100px"
                    style="padding: 20px; padding-top: 0px"
                >
                    <el-form-item label="ID" prop="m_stuid">
                        <el-input v-model="highRickForm.m_stuid"></el-input>
                    </el-form-item>
                    <el-form-item label="Name" prop="m_name">
                        <el-input v-model="highRickForm.m_name"></el-input>
                    </el-form-item>
                    <el-form-item label="Gender" prop="m_gender">
                        <el-input v-model="highRickForm.m_gender"></el-input>
                    </el-form-item>
                    <el-form-item label="Department" prop="m_college">
                        <el-input v-model="highRickForm.m_college"></el-input>
                    </el-form-item>
                    <el-form-item label="Address" prop="m_building">
                        <el-input v-model="highRickForm.m_building"></el-input>
                    </el-form-item>
                    <el-form-item label="Health status" prop="m_health_status">
                        <el-input
                            v-model="highRickForm.m_health_status"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label-width="0px">
                        <el-button type="primary" @click="updateLowRick()"
                            >modify</el-button
                        >
                        <el-button type="pain">reset</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </transition-group>
</template>

<script>
import {
    allLowRick,
    addLowRick,
    alterLowRick,
    getLowRick,
    deleteLowRick
} from "@/api/manage";
export default {
    name: "LowRickManage",
    data() {
        return {
            queryInfo: {
                query: "",
                pageNum: 1,
                pageSize: 2,
                total: 0,
            },
            lowRickList: [],
            lowRickDrawer: false,
            lowRickForm: {
                m_stuid: "",
                m_name: "",
                m_gender: "",
                m_college: "",
                m_building: "",
                m_health_status: "",
            },
            lowRickDialog: false,
            lowRickRules: {
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
                m_building: [
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
            }
        };
    },
    created() {
        this.getAllLowRick();
    },
    methods: {
        async getAllLowRick() {
            let res = await allLowRick();
            res.data.forEach((item) => {
                item.m_gender = item.m_gender === 0 ? "Male" : "Female";
            });
            this.lowRickList = res.data;
        },
        async queryLowRick() {
            if (this.queryInfo.query.length > 0) {
                let res = await getLowRick(this.queryInfo.query);
                this.lowRickList = res.data;
                console.log(this.lowRickList);
            } else {
                this.getAllLowRick();
            }
        },
        async insertLowRick() {
            let res = await addLowRick(this.lowRickForm);
            if (res.status === 200) {
                this.getAllLowRick();
                this.$message({
                    type: "success",
                    message: "Low risk contact is added successfully",
                });
            } else {
                this.$message({
                    type: "error",
                    message: "Low risk contact exists",
                });
            }
        },
        async showLowRick(row) {
            this.lowRickDialog = true;
            this.lowRickForm = row;
        },
        async updateLowRick() {
            let res = await alterLowRick(this.lowRickForm);
            if (res.status === 200) {
                this.getAllLowRick();
                this.$message({
                    type: "success",
                    message: "Low risk contact is modified successfully",
                });
                this.lowRickDialog = false;
            }
        },
        async removeLowRick(row) {
            let res = await deleteLowRick(row.id);
            if (res.status === 200) {
                this.getAllLowRick();
                this.$message({
                    type: "success",
                    message: "Low risk contact is deleted successfully",
                });
            }
        },
        handleLowRickClose(done) {
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
        newLowRickList() {
            return this.lowRickList.slice(
                (this.queryInfo.pageNum - 1) * this.queryInfo.pageSize,
                this.queryInfo.pageNum * this.queryInfo.pageSize
            );
        },
    },
};
</script>

<style lang="scss" scoped>
.lowRick-Manage {
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
