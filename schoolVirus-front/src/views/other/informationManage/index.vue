<template>
    <transition-group
        name="animate__animated animate__bounce"
        :appear="true"
        enter-active-class="animate__fadeInLeftBig"
        leave-active-class="animate__fadeOutLeftBig"
    >
        <div class="info-container" :key="1">
            
            <el-card class="campusManage">
                
                <div class="title">
                    <i class="el-icon-tickets"></i>
                    <span>University Epidemic News Notification</span>
                </div>

               
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-input
                            placeholder="Please enter the title to be searched"
                            v-model="campusQueryInfo.query"
                        >
                            <el-button
                                slot="append"
                                icon="el-icon-search"
                                @click="queryCampus()"
                            ></el-button>
                        </el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary" @click="campusDrawer = true"
                            >Add university epidemic news</el-button
                        >
                    </el-col>
                </el-row>

                
                <el-table :data="newCampusInfoList" border stripe>
                    <el-table-column label="#" type="index"></el-table-column>
                    <el-table-column
                        label="Title"
                        prop="n_title"
                    ></el-table-column>
                    <el-table-column
                        label="Content"
                        prop="n_content"
                    ></el-table-column>
                    <el-table-column
                        label="Time"
                        prop="n_date"
                    ></el-table-column>
                    <el-table-column label="Operate" width="180px">
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                icon="el-icon-edit"
                                size="mini"
                                @click="showCampus(scope.row)"
                                >Add</el-button
                            >
                            <el-button
                                type="danger"
                                icon="el-icon-delete"
                                size="mini"
                                @click="removeCampus(scope.row)"
                                >Delete</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination
                    @size-change="campusHandleSizeChange"
                    @current-change="campusHandleCurrentChange"
                    :current-page="campusQueryInfo.pageNum"
                    :page-sizes="[1, 2, 5, 10]"
                    :page-size="campusQueryInfo.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="(campusQueryInfo.total = campusInfoList.length)"
                >
                </el-pagination>

                <el-drawer
                    title="On-campus epidemic news added"
                    :visible.sync="campusDrawer"
                    direction="rtl"
                    :before-close="handleCampusClose"
                    class="drawer_one"
                >
                    <el-form
                        ref="campusFormRef"
                        :model="campusForm"
                        :rules="campusRules"
                        label-position="left"
                        label-width="100px"
                        style="padding: 20px; padding-top: 0px"
                    >
                        <el-form-item label="Title" prop="n_title">
                            <el-input v-model="campusForm.n_title"></el-input>
                        </el-form-item>
                        <el-form-item label="Content" prop="n_content">
                            <el-input v-model="campusForm.n_content"></el-input>
                        </el-form-item>
                        <el-form-item label="Time" prop="n_date">
                            <el-input v-model="campusForm.n_date"></el-input>
                        </el-form-item>
                        <el-form-item label-width="0px">
                            <el-button type="primary" @click="insertCampus()"
                                >Add</el-button
                            >
                            <el-button type="pain">Reset</el-button>
                        </el-form-item>
                    </el-form>
                </el-drawer>

                <el-dialog
                    title="Modify the school epidemic information"
                    :visible.sync="campusDialog"
                    width="50%"
                >
                    <el-form
                        ref="campusFormRef"
                        :model="campusForm"
                        :rules="campusRules"
                        label-position="left"
                        label-width="100px"
                        style="padding: 20px; padding-top: 0px"
                    >
                        <el-form-item label="Title" prop="n_title">
                            <el-input v-model="campusForm.n_title"></el-input>
                        </el-form-item>
                        <el-form-item label="Content" prop="n_content">
                            <el-input v-model="campusForm.n_content"></el-input>
                        </el-form-item>
                        <el-form-item label="Time" prop="n_date">
                            <el-input v-model="campusForm.n_date"></el-input>
                        </el-form-item>
                        <el-form-item label-width="0px">
                            <el-button type="primary" @click="updateCampus()"
                                >Revise</el-button
                            >
                            <el-button type="pain">Reset</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>
            </el-card>

            
            <el-card class="nationalManage">
               
                <div class="title">
                    <i class="el-icon-tickets"></i>
                    <span>Domestic Epidemic Information Notice</span>
                </div>
                
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-input
                            placeholder="Please enter the title to be searched"
                            v-model="nationalQueryInfo.query"
                        >
                            <el-button
                                slot="append"
                                icon="el-icon-search"
                                @click="queryNational()"
                            ></el-button>
                        </el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary" @click="nationalDrawer = true">Add domestic epidemic news</el-button>
                    </el-col>
                </el-row>
                
                <el-table :data="newNationalInfoList" border stripe>
                    <el-table-column label="#" type="index"></el-table-column>
                    <el-table-column
                        label="Title"
                        prop="n_title"
                    ></el-table-column>
                    <el-table-column label="Time" prop="n_date"></el-table-column>
                    <el-table-column label="Operate" width="180px">
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                icon="el-icon-edit"
                                size="mini"
                                @click="showNational(scope.row)"
                                >Edit</el-button
                            >
                            <el-button
                                type="danger"
                                icon="el-icon-delete"
                                size="mini"
                                @click="removeNational(scope.row)"
                                >Delete</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    @size-change="nationalHandleSizeChange"
                    @current-change="nationalHandleCurrentChange"
                    :current-page="nationalQueryInfo.pageNum"
                    :page-sizes="[1, 2, 5, 10]"
                    :page-size="nationalQueryInfo.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="(nationalQueryInfo.total = nationalInfoList.length)"
                >
                </el-pagination>
                
                <el-drawer
                    title="Domestic epidemic news added"
                    :visible.sync="nationalDrawer"
                    direction="rtl"
                    :before-close="handleNationalClose"
                    class="drawer_one"
                >
                    <el-form
                        ref="nationalFormRef"
                        :model="nationalForm"
                        :rules="nationalRules"
                        label-position="left"
                        label-width="100px"
                        style="padding: 20px; padding-top: 0px"
                    >
                        <el-form-item label="Title" prop="n_title">
                            <el-input v-model="nationalForm.n_title"></el-input>
                        </el-form-item>
                        <el-form-item label="Time" prop="n_date">
                            <el-input v-model="nationalForm.n_date"></el-input>
                        </el-form-item>
                        <el-form-item label-width="0px">
                            <el-button type="primary" @click="insertNational()"
                                >Add</el-button
                            >
                            <el-button type="pain">Reset</el-button>
                        </el-form-item>
                    </el-form>
                </el-drawer>
                
                <el-dialog
                    title="Modify domestic epidemic information"
                    :visible.sync="nationalDialog"
                    width="50%"
                >
                    <el-form
                        ref="nationalFormRef"
                        :model="nationalForm"
                        :rules="nationalRules"
                        label-position="left"
                        label-width="100px"
                        style="padding: 20px; padding-top: 0px"
                    >
                        <el-form-item label="Title" prop="n_title">
                            <el-input v-model="nationalForm.n_title"></el-input>
                        </el-form-item>
                        <el-form-item label="Time" prop="n_date">
                            <el-input v-model="nationalForm.n_date"></el-input>
                        </el-form-item>
                        <el-form-item label-width="0px">
                            <el-button type="primary" @click="updateNational()"
                                >Revise</el-button
                            >
                            <el-button type="pain">Reset</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>
            </el-card>
        </div>
    </transition-group>
</template>

<script>
import {
    allCampus,
    addCampus,
    alterCampus,
    getCampus,
    deleteCampus,
    allDomestic,
    addDomestic,
    alterDomestic,
    getDomestic,
    deleteDomestic,
} from "@/api/other";
export default {
    name: "InformationManage",
    data() {
        return {
            campusQueryInfo: {
                query: "",
                pageNum: 1,
                pageSize: 2,
                total: 0,
            },
            campusInfoList: [],
            campusDrawer: false,
            campusDialog: false,
            campusForm: {
                n_title: "",
                n_content: "",
                n_date: "",
            },
            campusRules: {
                n_title: [
                    {
                        required: true,
                        message: "Required fields!",
                        trigger: "change blur focus",
                    },
                ],
                n_content: [
                    {
                        required: true,
                        message: "Required fields!",
                        trigger: "change blur focus",
                    },
                ],
                n_date: [
                    {
                        required: true,
                        message: "Required fields!",
                        trigger: "change blur focus",
                    },
                ],
            },

            nationalQueryInfo: {
                query: "",
                pageNum: 1,
                pageSize: 2,
                total: 0,
            },
            nationalInfoList: [],
            nationalDrawer: false,
            nationalDialog: false,
            nationalForm: {
                n_title: "",
                n_date: "",
            },
            nationalRules: {
                n_title: [
                    {
                        required: true,
                        message: "Required fields!",
                        trigger: "change blur focus",
                    },
                ],
                n_date: [
                    {
                        required: true,
                        message: "Required fields!",
                        trigger: "change blur focus",
                    },
                ],
            },
        };
    },
    created() {
        this.getAllCampus();
        this.getAllNational();
    },
    methods: {
        async getAllCampus() {
            let res = await allCampus();
            res.data.forEach(item=>{
                item.n_date = item.n_date.slice(0,10);
            })
            this.campusInfoList = res.data;
        },
        async queryCampus() {
            if (this.campusQueryInfo.query.length > 0) {
                let res = await getCampus(this.campusQueryInfo.query);
                this.campusInfoList = res.data;
            } else {
                this.getAllCampus();
            }
        },
        async insertCampus() {
            let res = await addCampus(this.campusForm);
            if (res.status === 200) {
                this.getAllCampus();
                this.$message({
                    type: "success",
                    message: "On-campus notification added successfully",
                });
            } else {
                this.$message({
                    type: "error",
                    message: "On-campus notification exists",
                });
            }
        },
        async showCampus(row) {
            this.campusDialog = true;
            this.campusForm = row;
        },
        async updateCampus() {
            let res = await alterCampus(this.campusForm);
            if (res.status === 200) {
                this.getAllCampus();
                this.$message({
                    type: "success",
                    message: "On-campus notification modification is successfully",
                });
                this.campusDialog = false;
            }
        },
        async removeCampus(row) {
            let res = await deleteCampus(row.id);
            if (res.status === 200) {
                this.getAllCampus();
                this.$message({
                    type: "success",
                    message: "On-campus notification deleted successfully",
                });
            }
        },
        handleCampusClose(done) {
            done();
        },

        async getAllNational() {
            let res = await allDomestic();
            this.nationalInfoList = res.data;
        },
        async queryNational() {
            if (this.nationalQueryInfo.query.length > 0) {
                let res = await getDomestic(this.nationalQueryInfo.query);
                this.nationalInfoList = res.data;
            } else {
                this.getAllNational();
            }
        },
        async insertNational() {
            let res = await addDomestic(this.nationalForm);
            if (res.status === 200) {
                this.getAllNational();
                this.$message({
                    type: "success",
                    message: "Domestic notice added successfully",
                });
            } else {
                this.$message({
                    type: "error",
                    message: "Domestic notice already exists",
                });
            }
        },
        async showNational(row) {
            this.nationalDialog = true;
            this.nationalForm = row;
        },
        async updateNational() {
            let res = await alterDomestic(this.nationalForm);
            if (res.status === 200) {
                this.getAllNational();
                this.$message({
                    type: "success",
                    message: "The domestic notice was amended successfully",
                });
                this.nationalDialog = false;
            }
        },
        async removeNational(row) {
            let res = await deleteDomestic(row.id);
            if (res.status === 200) {
                this.getAllNational();
                this.$message({
                    type: "success",
                    message: "Domestic notice added successfully",
                });
            }
        },
        handleNationalClose(done) {
            done();
        },
        campusHandleSizeChange(val) {
            this.campusQueryInfo.pageSize = val;
        },
        campusHandleCurrentChange(val) {
            this.campusQueryInfo.pageNum = val;
        },
        nationalHandleSizeChange(val) {
            this.nationalQueryInfo.pageSize = val;
        },
        nationalHandleCurrentChange(val) {
            this.nationalQueryInfo.pageNum = val;
        },
    },
    computed: {
        newCampusInfoList() {
            // pageNum the current number of pages, pageSize the number of bars displayed per page
            // The first part of the paging formula: (current page number-1)*number of lines displayed per page: (1-1)*2=0, (2-1)*2=2
            // The second part of the paging formula: current number of pages * number of entries per page = total number: 1*2=2, 2*2=4
            // slice results: 0, 2, 2, 4
            return this.campusInfoList.slice(
                (this.campusQueryInfo.pageNum - 1) * this.campusQueryInfo.pageSize,
                this.campusQueryInfo.pageNum * this.campusQueryInfo.pageSize
            );
        },
        newNationalInfoList() {
            // pageNum the current number of pages, pageSize the number of bars displayed per page
            // The first part of the paging formula: (current page number-1)*number of lines displayed per page: (1-1)*2=0, (2-1)*2=2
            // The second part of the paging formula: current number of pages * number of entries per page = total number: 1*2=2, 2*2=4
            // slice results: 0, 2, 2, 4
            return this.nationalInfoList.slice(
                (this.nationalQueryInfo.pageNum - 1) * this.nationalQueryInfo.pageSize,
                this.nationalQueryInfo.pageNum * this.nationalQueryInfo.pageSize
            );
        }
    },
};
</script>

<style lang="scss" scoped>
.info-container {
    .campusManage {
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
    .nationalManage {
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
