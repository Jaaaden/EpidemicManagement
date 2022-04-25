<template>
    <transition-group
        name="animate__animated animate__bounce"
        :appear="true"
        enter-active-class="animate__fadeInLeftBig"
        leave-active-class="animate__fadeOutLeftBig"
    >
        <div class="journeyManage" :key="1">
            <el-divider content-position="left" class="title"
                >Trip data</el-divider
            >

            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input
                        placeholder="Please enter a name to search for: "
                        v-model="queryInfo.query"
                    >
                        <el-button
                            slot="append"
                            icon="el-icon-search"
                            @click="queryJourney()"
                        ></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="journeyDrawer = true"
                        >Add Trip Data</el-button
                    >
                </el-col>
            </el-row>

            <el-table :data="newJourneyList" border stripe>
                <el-table-column
                    align="center"
                    label="#"
                    type="index"
                ></el-table-column>
                <el-table-column
                    align="center"
                    label="ID"
                    prop="d_stuid"
                ></el-table-column>
                <el-table-column
                    align="center"
                    label="Name"
                    prop="d_name"
                ></el-table-column>
                <el-table-column
                    align="center"
                    label="Department"
                    width="130px"
                    prop="d_college"
                ></el-table-column>
                
                <el-table-column
                    align="center"
                    label="Address"
                    width="100px"
                    prop="d_building"
                ></el-table-column>
                
                <el-table-column
                    align="center"
                    label="Whether close contact patient in 14 days"
                    width="150px"
                    prop="d_in_reach"
                ></el-table-column>
                <el-table-column align="center" label="Operate" width="120px">
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            icon="el-icon-edit"
                            size="mini"
                            @click="showJourney(scope.row)"
                        ></el-button>
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            size="mini"
                            @click="removeJourney(scope.row)"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 
                pagination

                 current-page: current page number
                 page-sizes: Display the number of bars
                 page-size: the number of currently displayed bars
                 layout: what components are displayed by the pager
                 total: the total number of data
            -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pageNum"
                :page-sizes="[1, 2, 5, 10]"
                :page-size="queryInfo.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="(queryInfo.total = journeyList.length)"
            >
            </el-pagination>

            <!-- Add Trip Data dialog -->
            <el-drawer
                title="Add Trip Data"
                :visible.sync="journeyDrawer"
                direction="rtl"
                :before-close="handleJourneyClose"
                class="drawer_one"
            >
                <el-form
                    ref="journeyFormRef"
                    :model="journeyForm"
                    :rules="journeyRules"
                    label-position="left"
                    label-width="100px"
                    style="padding: 20px; padding-top: 0px"
                >
                    <el-form-item label="ID" prop="d_stuid">
                        <el-input v-model="journeyForm.d_stuid"></el-input>
                    </el-form-item>
                    <el-form-item label="Name" prop="d_name">
                        <el-input v-model="journeyForm.d_name"></el-input>
                    </el-form-item>
                    <el-form-item label="Department" prop="d_college">
                        <el-input v-model="journeyForm.d_college"></el-input>
                    </el-form-item>
                    <el-form-item label="Address" prop="d_building">
                        <el-input
                            v-model="journeyForm.d_building"
                        ></el-input>
                    </el-form-item>
                    
                    <el-form-item label="Whether close contact patient in 14 days" prop="d_in_reach">
                        <el-input v-model="journeyForm.d_in_reach"></el-input>
                    </el-form-item>
                    <el-form-item label-width="0px">
                        <el-button type="primary" @click="insertJourney()">add</el-button>
                        <el-button type="pain">reset</el-button>
                    </el-form-item>
                </el-form>
            </el-drawer>

            <el-dialog
                title="modify information"
                :visible.sync="journeyDialog"
                width="50%"
            >
                <el-form
                    ref="journeyFormRef"
                    :model="journeyForm"
                    :rules="journeyRules"
                    label-position="left"
                    label-width="100px"
                    style="padding: 20px; padding-top: 0px"
                >
                    <el-form-item label="ID" prop="d_stuid">
                        <el-input v-model="journeyForm.d_stuid"></el-input>
                    </el-form-item>
                    <el-form-item label="Name" prop="d_name">
                        <el-input v-model="journeyForm.d_name"></el-input>
                    </el-form-item>
                    <el-form-item label="Department" prop="d_college">
                        <el-input v-model="journeyForm.d_college"></el-input>
                    </el-form-item>
                    <el-form-item label="Address" prop="d_building">
                        <el-input
                            v-model="journeyForm.d_building"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="Whether close contact patient in 14 days" prop="d_in_reach">
                        <el-input v-model="journeyForm.d_in_reach"></el-input>
                    </el-form-item>
                    <el-form-item label-width="0px">
                        <el-button type="primary" @click="updateJourney()">modify</el-button>
                        <el-button type="pain">reset</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </transition-group>
</template>

<script>
import {allJourney,addJourney,alterJourney,getJourney,deleteJourney} from "@/api/health";
export default {
    name: "journeyManage",
    data() {
        // Cross-domain request data
         const jsonp = require("jsonp");
        
         // Regular alphanumeric Chinese characters
         const pat = new RegExp("[^a-zA-Z0-9_\u4e00-\u9fa5]", "i");

         // Account password verification (anonymous function)
         let InvalidString = (rule, value, callback) => {
             // Verify invalid string
            if (pat.test(value) === true) {
                callback(new Error("Contains an illegal string, only letter or number is allowed"));
            } else {
                callback();
            }
        };
        return {
            queryInfo: {
                query: "",
                pageNum: 1,
                pageSize: 2,
                total: 0,
            },
            journeyList: [],
            journeyDrawer: false,
            journeyForm: {
                d_stuid:'',
                d_name:'',
                d_college:'',
                d_building:'',
                d_in_reach:'',
            },
            journeyDialog: false,
            journeyRules: {
                d_stuid:[
                    { 
                        required: true, 
                        message: "Required field!",
                        trigger: "change blur focus",
                    }
                ],
                d_name:[
                    { 
                        required: true, 
                        message: "Required field!",
                        trigger: "change blur focus",
                    }
                ],
                d_college:[
                    { 
                        required: true, 
                        message: "Required field!",
                        trigger: "change blur focus",
                    }
                ],
                d_building:[
                    { 
                        required: true, 
                        message: "Required field!",
                        trigger: "change blur focus",
                    }
                ],
                d_in_reach:[
                    { 
                        required: true, 
                        message: "Required field!",
                        trigger: "change blur focus",
                    }
                ],
            },
        };
    },
    created() {
        this.getAllJourney();
    },
    methods: {
         // all trip data
        async getAllJourney() {
            let res = await allJourney();
            this.journeyList = res.data;
         },
         // Itinerary fuzzy query
        async queryJourney() {
            if (this.queryInfo.query.length > 0) {
                let res = await getJourney(this.queryInfo.query);
                this.journeyList = res.data;
                console.log(this.journeyList);
            } else {
                this.getAllJourney();
            }
        },
        async insertJourney() {
            let res = await addJourney(this.journeyForm);
            if (res.status === 200) {
                this.getAllJourney();
                this.$message({
                    type: "success",
                    message: "Trip is added successfully",
                });
            } else {
                this.$message({
                    type: "error",
                    message: "Trip exists",
                });
            }
        },
        async showJourney(row) {
            this.journeyDialog = true;
            this.journeyForm = row;
        },
        async updateJourney() {
            let res = await alterJourney(this.journeyForm);
            if (res.status === 200) {
                this.getAllJourney();
                this.$message({
                    type: "success",
                    message: "Trip is modified successfully",
                });
                this.journeyDialog = false;
            }
        },
        async removeJourney(row) {
            let res = await deleteJourney(row.id);
            if (res.status === 200) {
                this.getAllJourney();
                this.$message({
                    type: "success",
                    message: "Trip is deleted successfully",
                });
            }
        },
        handleJourneyClose(done) {
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
        newJourneyList() {
            // pageNum the current number of pages, pageSize the number of bars displayed per page
             // The first part of the paging formula: (current page number-1)*number of lines displayed per page: (1-1)*2=0, (2-1)*2=2
             // The second part of the paging formula: current number of pages * number of entries per page = total number: 1*2=2, 2*2=4
             // slice results: 0, 2, 2, 4
            return this.journeyList.slice(
                (this.queryInfo.pageNum - 1) * this.queryInfo.pageSize,
                this.queryInfo.pageNum * this.queryInfo.pageSize
            );
        },
    },
};
</script>

<style lang="scss" scoped>
.journeyManage {
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
