<template>
    <transition-group
        name="animate__animated animate__bounce"
        :appear="true"
        enter-active-class="animate__fadeInLeftBig"
        leave-active-class="animate__fadeOutLeftBig"
    >
        <div class="highRick-Manage" :key="1">
            <el-divider content-position="left" class="title"
                >medium/high risk close contact management</el-divider
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
                            @click="queryHighRick()"
                        ></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="highRickDrawer = true">Add medium/high risk contact information</el-button>
                </el-col>
            </el-row>

            <el-table :data="newHighRickList" border stripe>
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
                            @click="showHighRick(scope.row)"
                        ></el-button>
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            size="mini"
                            @click="removeHighRick(scope.row)"
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
                :total="(queryInfo.total = highRickList.length)"
            >
            </el-pagination>

            <el-drawer
                title="The information of dignaosed patient is added"
                :visible.sync="highRickDrawer"
                direction="rtl"
                :before-close="handleHighRickClose"
                class="drawer_one"
            >
                <el-form
                    ref="highRickFormRef"
                    :model="highRickForm"
                    :rules="highRickRules"
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
                        <el-button type="primary" @click="insertHighRick()"
                            >add</el-button
                        >
                        <el-button type="pain">reset</el-button>
                    </el-form-item>
                </el-form>
            </el-drawer>

            <el-dialog
                title="modify diagnosed patient information"
                :visible.sync="highRickDialog"
                width="50%"
            >
                <el-form
                    ref="highRickFormRef"
                    :model="highRickForm"
                    :rules="highRickRules"
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
                        <el-button type="primary" @click="updateHighRick()"
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
    allHighRick,
    addHighRick,
    alterHighRick,
    getHighRick,
    deleteHighRick,
} from "@/api/manage";
export default {
    name: "HighRickManage",
    data() {
        return {
            queryInfo: {
                query: "",
                pageNum: 1,
                pageSize: 2,
                total: 0,
            },
            highRickList: [],
            highRickDrawer: false,
            highRickForm: {
                m_stuid: "",
                m_name: "",
                m_gender: "",
                m_college: "",
                m_building: "",
                m_health_status: "",
            },
            highRickDialog: false,
            highRickRules: {
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
            },
        };
    },
    created() {
        this.getAllHighRick();
    },
    methods: {
        async getAllHighRick() {
            let res = await allHighRick();
            res.data.forEach((item) => {
                item.m_gender = item.m_gender === 0 ? "Male" : "Female";
            });
            this.highRickList = res.data;
        },
        async queryHighRick() {
            if (this.queryInfo.query.length > 0) {
                let res = await getHighRick(this.queryInfo.query);
                this.highRickList = res.data;
                console.log(this.highRickList);
            } else {
                this.getAllHighRick();
            }
        },
        async insertHighRick() {
            let res = await addHighRick(this.highRickForm);
            if (res.status === 200) {
                this.getAllHighRick();
                this.$message({
                    type: "success",
                    message: "Close contact is added successfully",
                });
            } else {
                this.$message({
                    type: "error",
                    message: "Close contact exists",
                });
            }
        },
        async showHighRick(row) {
            this.highRickDialog = true;
            this.highRickForm = row;
        },
        async updateHighRick() {
            let res = await alterHighRick(this.highRickForm);
            if (res.status === 200) {
                this.getAllHighRick();
                this.$message({
                    type: "success",
                    message: "People in high risk is modified successfully",
                });
                this.highRickDialog = false;
            }
        },
        async removeHighRick(row) {
            let res = await deleteHighRick(row.id);
            if (res.status === 200) {
                this.getAllHighRick();
                this.$message({
                    type: "success",
                    message: "People in high risk is deleted successfully",
                });
            }
        },
        handleHighRickClose(done) {
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
        newHighRickList() {
            return this.highRickList.slice(
                (this.queryInfo.pageNum - 1) * this.queryInfo.pageSize,
                this.queryInfo.pageNum * this.queryInfo.pageSize
            );
        },
    },
};
</script>

<style lang="scss" scoped>
.highRick-Manage {
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
