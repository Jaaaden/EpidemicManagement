<template>
    <transition-group
        name="animate__animated animate__bounce"
        :appear="true"
        enter-active-class="animate__fadeInLeftBig"
        leave-active-class="animate__fadeOutLeftBig"
    >
        <div class="alter-container" :key="1">
            <h3>Change Password</h3>
            <el-divider content-position="right">Campus Epidemic Management System</el-divider>
            <el-form
                :model="alterForm"
                :rules="alterRules"
                ref="alterFormRef"
                label-width="100px"
                :label-position="labelPosition"
            >
                <el-form-item label="New Password" prop="newPassword">
                    <el-input v-model="alterForm.newPassword"></el-input>
                </el-form-item>
                <el-form-item label="Confirm the new password" prop="checkPassword">
                    <el-input v-model="alterForm.checkPassword"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="updatePassword">Change Password</el-button>
                    <el-button type="info">Reset</el-button>
                </el-form-item>
            </el-form>
        </div>
    </transition-group>
</template>

<script>
import {updatePwd} from '@/api/personal'
export default {
    name: "AlterPassword",
    data() {
        
        const pat = new RegExp("[^a-zA-Z0-9_\u4e00-\u9fa5]", "i");

        
        let InvalidString = (rule, value, callback) => {
            
            if (pat.test(value) === true) {
                callback(new Error("Contains illegal strings, can only be alphanumeric or Chinese characters"));
            } else {
                callback();
            }
        };

        return {
            labelPosition: "right",
            alterForm: {
                newPassword: "Please enter a new password",
                checkPassword: "Please confirm new password",
            },
            alterRules: {
                oldPassword: [
                    { required: true, message: "Required fields" },
                    {
                        min: 6,
                        max: 16,
                        message: "6 to 16 characters long",
                        trigger: "change blur focus",
                    },
                    { validator: InvalidString },
                ],
                newPassword: [
                    { required: true, message: "Required fields" },
                    {
                        min: 6,
                        max: 16,
                        message: "6 to 16 characters long",
                        trigger: "change blur focus",
                    },
                    { validator: InvalidString },
                ],
                checkPassword: [
                    { required: true, message: "Required fields" },
                    {
                        min: 6,
                        max: 16,
                        message: "6 to 16 characters long",
                        trigger: "change blur focus",
                    },
                    { validator: InvalidString },
                ],
            },
        };
    },
    created(){
        // console.log();
    },
    methods:{
        async updatePassword(){
            let obj = {
                r_account: this.$store.state.user.rolesData.r_account,
                r_pwd: this.alterForm.newPassword
            }
            console.log(obj);
            let res = await updatePwd(obj);
            if(res.data.length >= 15) {
                localStorage.clear();
                this.$message({
                    message: 'Password reset complete',
                    type: 'success'
                });
                this.$router.push({ path: this.redirect || "/login" });
            }else{
                this.$message({
                    message: 'Password reset failed',
                    type: 'error'
                });
            }
        }
    }
};
</script>

<style>
.alter-container {
    max-width: 400px;
}
</style>
