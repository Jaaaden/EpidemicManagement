<template>
    <transition-group
        name="animate__animated animate__bounce"
        :appear="true"
        enter-active-class="animate__fadeInLeftBig"
        leave-active-class="animate__fadeOutLeftBig"
    >
        <div class="confirmManage" :key="1">
        
            <el-divider content-position="left" class="title"
                >Diagnosis of management</el-divider
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
                            @click="queryConfirm()"
                        ></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="confirmDrawer = true"
                        >Adding Diagnostic Information</el-button
                    >
                </el-col>
            </el-row>

            <el-table :data="newConfirmList" border stripe>
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
                    label="Class"
                    prop="m_class"
                ></el-table-column>
                
                <el-table-column
                    align="center"
                    label="Sources"
                    prop="m_inject_source"
                ></el-table-column>
                <el-table-column
                    align="center"
                    label="The time of diagnosis"
                    prop="m_inject_date"
                ></el-table-column>
                <el-table-column align="center" label="Operation" width="120px">
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            icon="el-icon-edit"
                            size="mini"
                            @click="showConfirm(scope.row)"
                        ></el-button>
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            size="mini"
                            @click="removeConfirm(scope.row)"
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
                :total="(queryInfo.total = confirmList.length)"
            >
            </el-pagination>

            <el-drawer
                title="Add diagnosed patients information"
                :visible.sync="confirmDrawer"
                direction="rtl"
                :before-close="handleConfirmClose"
                class="drawer_one"
            >
                <el-form
                    ref="confirmFormRef"
                    :model="confirmForm"
                    :rules="confirmRules"
                    label-position="left"
                    label-width="100px"
                    style="padding: 20px; padding-top: 0px"
                >
                    <el-form-item label="ID" prop="m_stuid">
                        <el-input v-model="confirmForm.m_stuid"></el-input>
                    </el-form-item>
                    <el-form-item label="Name" prop="m_name">
                        <el-input v-model="confirmForm.m_name"></el-input>
                    </el-form-item>
                    <el-form-item label="Gender" prop="m_gender">
                        <el-input v-model="confirmForm.m_gender"></el-input>
                    </el-form-item>
                    <el-form-item label="Department" prop="m_college">
                        <el-input v-model="confirmForm.m_college"></el-input>
                    </el-form-item>
                    <el-form-item label="Sources" prop="m_inject_source">
                        <el-input
                            v-model="confirmForm.m_inject_source"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="The time of diagnosis" prop="m_inject_date">
                        <el-date-picker
                            v-model="confirmForm.m_inject_date"
                            type="date"
                            placeholder="date"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label-width="0px">
                        <el-button type="primary" @click="insertConfirm()"
                            >add</el-button
                        >
                        <el-button type="pain">reset</el-button>
                    </el-form-item>
                </el-form>
            </el-drawer>

            <el-dialog
                title="Modify the diagnosis information"
                :visible.sync="confirmDialog"
                width="50%"
            >
                <el-form
                    ref="confirmFormRef"
                    :model="confirmForm"
                    :rules="confirmRules"
                    label-position="left"
                    label-width="100px"
                    style="padding: 20px; padding-top: 0px"
                >
                    <el-form-item label="ID" prop="m_stuid">
                        <el-input v-model="confirmForm.m_stuid"></el-input>
                    </el-form-item>
                    <el-form-item label="Name" prop="m_name">
                        <el-input v-model="confirmForm.m_name"></el-input>
                    </el-form-item>
                    <el-form-item label="Gender" prop="m_gender">
                        <el-input v-model="confirmForm.m_gender"></el-input>
                    </el-form-item>
                    <el-form-item label="Department" prop="m_college">
                        <el-input v-model="confirmForm.m_college"></el-input>
                    </el-form-item>
                    <el-form-item label="Sources" prop="m_inject_source">
                        <el-input
                            v-model="confirmForm.m_inject_source"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="The time of dignosis" prop="m_inject_date">
                        <el-date-picker
                            v-model="confirmForm.m_inject_date"
                            type="date"
                            placeholder="date"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label-width="0px">
                        <el-button type="primary" @click="insertConfirm()"
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
    allInfection,
    addInfection,
    alterInfection,
    getInfection,
    deleteInfection,
} from "@/api/manage";
export default {
    name: "ConfirmManage",
    data() {
        return {
            queryInfo: {
                query: "",
                pageNum: 1,
                pageSize: 2,
                total: 0,
            },
            confirmList: [],
           
            confirmDrawer: false,
            confirmForm: {
                m_stuid: "",
                m_name: "",
                m_gender: "",
                m_college: "",
                m_class: "",
                m_building: "",
                m_build_num: "",
                m_inject_source: "",
                m_inject_date: "2021/12/20",
            },
            confirmDialog: false,
            confirmRules: {
                m_stuid: [
                    {
                        required: true,
                        message: "required!",
                        trigger: "change blur focus",
                    },
                ],
                m_name: [
                    {
                        required: true,
                        message: "required!",
                        trigger: "change blur focus",
                    },
                ],
                m_gender: [
                    {
                        required: true,
                        message: "required!",
                        trigger: "change blur focus",
                    },
                ],
                m_college: [
                    {
                        required: true,
                        message: "required!",
                        trigger: "change blur focus",
                    },
                ],
                m_class: [
                    {
                        required: true,
                        message: "required!",
                        trigger: "change blur focus",
                    },
                ],
                m_building: [
                    {
                        required: true,
                        message: "required!",
                        trigger: "change blur focus",
                    },
                ],
                m_build_num: [
                    {
                        required: true,
                        message: "required!",
                        trigger: "change blur focus",
                    },
                ],
                m_inject_source: [
                    {
                        required: true,
                        message: "required!",
                        trigger: "change blur focus",
                    },
                ],
                m_inject_date: [
                    {
                        required: true,
                        message: "required!",
                        trigger: "change blur focus",
                    },
                ],
            },
        };
    },
    created() {
        this.getAllConfirm();
    },
    methods: {
        async getAllConfirm() {
            let res = await allInfection();
            res.data.forEach((item) => {
                item.m_gender = item.m_gender === 0 ? "Male" : "Female";
                item.m_inject_date = item.m_inject_date.slice(0, 10);
            });
            this.confirmList = res.data;
            console.log(this.confirmList);
        },
        async queryConfirm() {
            if (this.queryInfo.query.length > 0) {
                let res = await getInfection(this.queryInfo.query);
                this.confirmList = res.data;
                console.log(this.confirmList);
            } else {
                this.getAllConfirm();
            }
        },
        async insertConfirm() {
            console.log(111);
            console.log(this.confirmForm);
            let res = await addInfection(this.confirmForm);
            console.log(res);
            if (res.status === 200) {
                this.getAllConfirm();
                this.$message({
                    type: "success",
                    message: "Patient is added successfully",
                });
            } else {
                this.$message({
                    type: "error",
                    message: "Patient already exists",
                });
            }
        },
        async showConfirm(row) {
            this.confirmDialog = true;
            this.confirmForm = row;
        },
        async updateConfirm() {
            let res = await alterInfection(this.confirmForm);
            if (res.status === 200) {
                this.getAllConfirm();
                this.$message({
                    type: "success",
                    message: "Patient is modified successfully",
                });
                this.confirmDialog = false;
            }
        },
        async removeConfirm(row) {
            let res = await deleteInfection(row.id);
            if (res.status === 200) {
                this.getAllConfirm();
                this.$message({
                    type: "success",
                    message: "The infected is deleted successfully",
                });
            }
        },
        handleConfirmClose(done) {
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
        newConfirmList() {
            // pageNum the current number of pages, pageSize the number of bars displayed per page
            // The first part of the paging formula: (current page number-1)*number of lines displayed per page: (1-1)*2=0, (2-1)*2=2
            // The second part of the paging formula: current number of pages * number of entries per page = total number: 1*2=2, 2*2=4
            // slice results: 0, 2, 2, 4
            return this.confirmList.slice(
                (this.queryInfo.pageNum - 1) * this.queryInfo.pageSize,
                this.queryInfo.pageNum * this.queryInfo.pageSize
            );
        },
    },
};
</script>

<style lang="scss" scoped>
.confirmManage {
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
