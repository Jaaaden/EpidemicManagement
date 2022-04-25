<template>
    <transition-group
        name="animate__animated animate__bounce"
        :appear="true"
        enter-active-class="animate__fadeInLeftBig"
        leave-active-class="animate__fadeOutLeftBig"
    >
        <div class="personal-container" :key="1">
            <el-row :gutter="70">
                <el-col :span="15">
                    <el-tabs v-model="tabActiveName" class="info-tab">
                        <el-tab-pane label="log in" name="first">
                            <el-row :gutter="20">
                                <el-col :span="8">
                                    <el-input
                                        placeholder="Please enter the role name"
                                        v-model="roleQueryInfo.query"
                                    >
                                        <el-button
                                            slot="append"
                                            icon="el-icon-search"
                                            @click="queryRole()"
                                        ></el-button>
                                    </el-input>
                                </el-col>
                                <el-col :span="4">
                                    <el-button
                                        type="primary"
                                        @click="roleDrawer = true"
                                        >add role</el-button
                                    >
                                </el-col>
                            </el-row>

                            <el-table :data="newRoleList" border stripe>
                                <el-table-column
                                    align="center"
                                    label="#"
                                    type="index"
                                ></el-table-column>
                                <el-table-column
                                    align="center"
                                    label="ID"
                                    prop="r_account"
                                ></el-table-column>
                                <el-table-column
                                    align="center"
                                    label="Name"
                                    prop="r_name"
                                ></el-table-column>
                                <el-table-column
                                    align="center"
                                    label="Role"
                                    prop="r_role"
                                ></el-table-column>
                                <el-table-column
                                    align="center"
                                    label="Operation"
                                    width="180px"
                                >
                                    <template slot-scope="scope">
                                        <el-button
                                            type="primary"
                                            icon="el-icon-edit"
                                            size="mini"
                                            @click="showRole(scope.row)"
                                            >edit</el-button
                                        >
                                        <el-button
                                            type="danger"
                                            icon="el-icon-delete"
                                            size="mini"
                                            @click="removeRole(scope.row)"
                                            >cancel</el-button
                                        >
                                    </template>
                                </el-table-column>
                            </el-table>

                            <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="roleQueryInfo.pageNum"
                                :page-sizes="[1, 2, 5, 10]"
                                :page-size="roleQueryInfo.pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="(roleQueryInfo.total = roleList.length)"
                            >
                            </el-pagination>

                            <el-drawer
                                title="add role"
                                :visible.sync="roleDrawer"
                                direction="rtl"
                                :before-close="handleRoleClose"
                                class="drawer_one"
                            >
                                <el-form
                                    ref="roleFormRef"
                                    :model="roleForm"
                                    :rules="roleRules"
                                    label-position="left"
                                    label-width="100px"
                                    style="padding: 20px; padding-top: 0px"
                                >
                                    <el-form-item label="ID" prop="r_account">
                                        <el-input
                                            v-model="roleForm.r_account"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item label="Name" prop="r_name">
                                        <el-input
                                            v-model="roleForm.r_name"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item label="Role" prop="r_role">
                                        <el-input
                                            v-model="roleForm.r_role"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item label-width="0px">
                                        <el-button
                                            type="primary"
                                            @click="insertRole()"
                                            >add</el-button
                                        >
                                        <el-button type="pain">reset</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-drawer>

                            <el-dialog
                                title="modify role"
                                :visible.sync="roleDialog"
                                width="50%"
                            >
                                <el-form
                                    ref="roleFormRef"
                                    :model="roleForm"
                                    :rules="roleRules"
                                    label-position="left"
                                    label-width="100px"
                                    style="padding: 20px; padding-top: 0px"
                                >
                                    <el-form-item label="ID" prop="m_stuid">
                                        <el-input
                                            v-model="roleForm.r_account"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item label="Name" prop="m_name">
                                        <el-input
                                            v-model="roleForm.r_name"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item label="Role" prop="m_name">
                                        <el-input
                                            v-model="roleForm.r_role"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item label-width="0px">
                                        <el-button
                                            type="primary"
                                            @click="updateRole()"
                                            >modify</el-button
                                        >
                                        <el-button type="pain">reset</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-dialog>
                        </el-tab-pane>
                        <el-tab-pane label="recorder information" name="second">
                            <el-form
                                ref="authorFormRef"
                                :model="authorForm"
                                :rules="authorRules"
                                label-position="top"
                            >
                                <el-form-item label="recorder information" prop="a_name">
                                    <el-input v-model="authorForm.a_name">
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="recorder phone" prop="a_phone">
                                    <el-input
                                        v-model="authorForm.a_phone"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="recorder email" prop="a_email">
                                    <el-input
                                        v-model="authorForm.a_email"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button
                                        type="primary"
                                        @click="updateAuthorInfo()"
                                        >update</el-button
                                    >
                                    <el-button type="pain">reset</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
                <el-col :span="7">
                    <el-descriptions
                        title="Recorder information Preview"
                        :column="1"
                        border
                        class="preview-tab"
                    >
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-key"></i>
                                nickname
                            </template>
                            <span>{{ authorForm.a_name }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-user"></i>
                                no 
                            </template>
                            <span>{{ authorForm.a_phone }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-male"></i>
                                my email
                            </template>
                            <span>{{ authorForm.a_email }}</span>
                        </el-descriptions-item>
                    </el-descriptions>
                </el-col>
            </el-row>
        </div>
    </transition-group>
</template>

<script>
import {
    allRole,
    addRole,
    alterRole,
    getRole,
    deleteRole,
    allAuthor,
    alterAuthor,
} from "@/api/other";
export default {
    name: "RoleDataManage",
    created() {
        this.getAllRole();
        this.getAllAuthor();
    },
    data() {
        const pat = new RegExp("[^a-zA-Z0-9_\u4e00-\u9fa5]", "i");
        const phone = new RegExp(
            "/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/"
        );
        const email = new RegExp(
            "/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/"
        );
        let InvalidString = (rule, value, callback) => {
            if (pat.test(value) === true) {
                callback(new Error("Contains illegal strings, only number or letter is allowed."));
            } else {
                callback();
            }
        };
        let InvalidPhone = (rule, value, callback) => {
            if (phone.test(value) === true) {
                callback(new Error("Contains illegal strings, only number is allowed."));
            } else {
                callback();
            }
        };
        let InvalidEmail = (rule, value, callback) => {
            if (email.test(value) === true) {
                callback(new Error("email is illegal"));
            } else {
                callback();
            }
        };
        return {
            tabActiveName: "first",
            roleQueryInfo: {
                query: "",
                pageNum: 1,
                pageSize: 2,
                total: 0,
            },
            roleList: [],
            roleDrawer: false,
            roleForm: {
                r_account: "",
                r_name: "",
                r_role: "",
            },
            roleDialog: false,
            roleRules: {
                r_account: [
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
                r_role: [
                    {
                        required: true,
                        message: "Required field!",
                        trigger: "change blur focus",
                    },
                ],
            },
            authorForm: {
                a_name: "",
                a_phone: "",
                a_mail: ""
            },
            authorRules: {
                a_name: [
                    {
                        required: true,
                        message: "Required field!",
                        trigger: "change blur focus",
                    },
                ],
                a_phone: [
                    {
                        required: true,
                        message: "Required field!",
                        trigger: "change blur focus",
                    },
                ],
                a_mail: [
                    {
                        required: true,
                        message: "Required field!",
                        trigger: "change blur focus",
                    },
                ]
            },
        };
    },
    methods: {
        async getAllRole() {
            let res = await allRole();
            res.data.forEach((item) => {
                if (item.r_role == 1) {
                    item.r_role = "Student";
                } else if (item.r_role == 2) {
                    item.r_role = "Teacher";
                } else {
                    item.r_role = "Admin";
                }
            });
            this.roleList = res.data;
        },
        async getAllAuthor() {
            let res = await allAuthor();
            this.authorForm = res.data[0];
        },
        async queryRole() {
            if (this.roleQueryInfo.query.length > 0) {
                let res = await getRole(this.roleQueryInfo.query);
                this.roleList = res.data;
                console.log(this.roleList);
            } else {
                this.getAllRole();
            }
        },
        async insertRole() {
            let res = await addRole(this.roleForm);
            if (res.status === 200) {
                this.getAllRole();
                this.$message({
                    type: "success",
                    message: "role is added successfully",
                });
            } else {
                this.$message({
                    type: "error",
                    message: "role exists",
                });
            }
        },
        async showRole(row) {
            this.roleDialog = true;
            this.roleForm = row;
        },
        async updateRole() {
            let res = await alterRole(this.roleForm);
            if (res.status === 200) {
                this.getAllRole();
                this.$message({
                    type: "success",
                    message: "role is modified successfully",
                });
                this.roleDialog = false;
            }
        },
        async updateAuthorInfo() {
            console.log(this.authorForm);
            let res = await alterAuthor(this.authorForm);
            if (res.status === 200) {
                this.getAllAuthor();
                this.$message({
                    type: "success",
                    message: "recorded information is modified successfully",
                });
            }
        },
        async removeRole(row) {
            let res = await deleteRole(row.id);
            if (res.status === 200) {
                this.getAllRole();
                this.$message({
                    type: "success",
                    message: "role is deleted successfully",
                });
            }
        },
        handleRoleClose(done) {
            done();
        },
        handleSizeChange(val) {
            this.roleQueryInfo.pageSize = val;
        },
        handleCurrentChange(val) {
            this.roleQueryInfo.pageNum = val;
        },
    },
    computed: {
        workTime() {
            return (
                this.authorForm.a_start_time + "-" + this.authorForm.a_end_time
            );
        },
        newRoleList() {
            return this.roleList.slice(
                (this.roleQueryInfo.pageNum - 1) * this.roleQueryInfo.pageSize,
                this.roleQueryInfo.pageNum * this.roleQueryInfo.pageSize
            );
        },
    },
};
</script>

<style lang="scss" scoped>
.personal-container {
    padding-left: 20px;
    .info-tab {
        max-width: 800px;
        .el-row {
            margin: 10px 0px 20px 0px;
        }
        .el-table {
            margin-bottom: 20px;
        }
    }
    .preview-tab {
        max-width: 700px;
        margin-bottom: 30px;
    }
}
</style>
