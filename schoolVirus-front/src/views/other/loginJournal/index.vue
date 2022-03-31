<template>
    <transition-group
        name="animate__animated animate__bounce"
        :appear="true"
        enter-active-class="animate__fadeInLeftBig"
        leave-active-class="animate__fadeOutLeftBig"
    >
        <div class="log-container" :key="1">
            
            <el-row>
                <el-col :span="8">
                    <el-input
                        placeholder="Please enter the name you want to search"
                        v-model="queryInfo.query"
                    >
                        <el-button
                            slot="append"
                            icon="el-icon-search"
                            @click="queryJournal()"
                        ></el-button>
                    </el-input>
                </el-col>
            </el-row>

           
            <el-card shadow="never">
                <el-table :data="newJournalList" border stripe>
                    <el-table-column
                        align="center"
                        label="#"
                        type="index"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="ID"
                        prop="j_stuid"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="Name"
                        prop="j_name"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="Role"
                        prop="j_role"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="Browser"
                        prop="j_browser"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="IP_Address"
                        prop="j_ip"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="IP_City"
                        prop="j_ipname"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="Login Time"
                        prop="j_date"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        label="Login Status"
                        prop="j_status"
                    ></el-table-column>
                </el-table>
            </el-card>

            
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pageNum"
                :page-sizes="[1, 2, 5, 10]"
                :page-size="queryInfo.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="(queryInfo.total = journalList.length)"
            >
            </el-pagination>
        </div>
    </transition-group>
</template>

<script>
import { allJournal, getJournal, addJournal } from "@/api/other";
export default {
    name: "LoginJournal",
    data() {
        return {
            
            queryInfo: {
                
                query: "",
               
                pageNum: 1,
                
                pageSize: 2,
               
                total: 0,
            },
            
            userList: [],
            journalList:[],
        };
    },
    created() {
        /*
            Login log implementation ideas
             1. Determine whether there is an intermediate value in the local storage. The intermediate value is to limit the user to refresh unlimitedly 
             and add data indefinitely.
             2. If there is no intermediate value in the local storage, add data and set the intermediate value in the add data function
             3. In the next refresh, because there is already an intermediate value in the local storage for judgment, no more data will be added.
             4. When the user logs out, the local storage is emptied, and logging in again will continue to add logs
             5. Each added log will be stored in the database
        */
        if(!localStorage.getItem('num')){
            this.addJournalData();
        }
        this.getAllJournal();
    },
    methods: {
        async queryJournal() {
            if (this.queryInfo.query.length > 0) {
                let res = await getJournal(this.queryInfo.query);
                this.journalList = res.data;
            } else {
                this.getAllJournal();
            }
        },
        handleSizeChange(val) {
            this.queryInfo.pageSize = val;
        },
        handleCurrentChange(val) {
            this.queryInfo.pageNum = val;
        },
        async addJournalData(){
            let data = returnCitySN;
            let {r_serial,r_name,r_role} = JSON.parse(localStorage.getItem("rolesData"));
            let status = localStorage.getItem("campusToken");
            if(status){
                status = 'Login successful'
            }
            let obj = {
                j_ip:data.cip,
                j_ipname:data.cname,
                j_browser:this.browserVersion,
                j_date:this.nowTime,
                j_name:r_name,
                j_stuid:r_serial,
                j_status:status,
                j_role: r_role,
                pid:r_role
            }
            await addJournal(obj);
            
            localStorage.setItem('num',1);
        },
        async getAllJournal(){
            let res = await allJournal();
            this.journalList = res.data;
        }
    },
    computed: {
        newJournalList() {
            // pageNum the current number of pages, pageSize the number of bars displayed per page
            // The first part of the paging formula: (current page number-1)*number of lines displayed per page: (1-1)*2=0, (2-1)*2=2
            // The second part of the paging formula: current number of pages * number of entries per page = total number: 1*2=2, 2*2=4
            // slice results: 0, 2, 2, 4
            return this.journalList.slice(
                (this.queryInfo.pageNum - 1) * this.queryInfo.pageSize,
                this.queryInfo.pageNum * this.queryInfo.pageSize
            );
        },
        browserVersion() {
            var userAgent = navigator.userAgent;
            if (userAgent.indexOf("Opera") > -1) {
                return "Opera";
            } else if (userAgent.indexOf("Firefox") > -1) {
                return "FF";
            } else if (userAgent.indexOf("Chrome") > -1) {
                return "Chrome";
            } else if (userAgent.indexOf("Safari") > -1) {
                return "Safari";
            } else if (userAgent.indexOf("MSIE 6.0") > -1) {
                return "IE6";
            } else if (userAgent.indexOf("MSIE 7.0") > -1) {
                return "IE7";
            } else if (userAgent.indexOf("MSIE 8.0") > -1) {
                return "IE8";
            } else if (userAgent.indexOf("MSIE 9.0") > -1) {
                return "IE9";
            } else if (userAgent.indexOf("MSIE 10.0") > -1) {
                return "IE10";
            } else if (userAgent.indexOf("MSIE 11.0") > -1) {
                return "IE11";
            }
            return "Browser";
        },
        nowTime(){
            return this.$moment().format('YYYY-MM-DD HH:mm:ss');
        }
    },
};
</script>

<style lang="scss" scoped>
.log-container {
    .el-row .el-col {
        line-height: 40px;
    }
    .el-card {
        margin: 20px 0px;
    }
}
</style>
