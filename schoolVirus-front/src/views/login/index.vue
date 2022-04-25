<template>
    <!-- ogin-container -->
    <div class="login-container">
        <!-- login-form -->
        <div class="login-form">
            <!-- login-title -->
            <div class="login-title">
                <h3>Campus Epidemic Management System</h3>
            </div>
            <!-- tab reg -->
            <el-tabs v-model="activeName" :stretch="true" class="form-tabs">
                <el-tab-pane label="log in" name="first" class="login-tabs">
                    <el-form
                        ref="loginFormRef"
                        :model="loginForm"
                        :rules="loginRules"
                    >
                        <!-- account -->
                        <el-form-item prop="r_account">
                            <span class="svg-container">
                                <svg-icon icon-class="user" />
                            </span>
                            <el-input
                                type="text"
                                v-model="loginForm.r_account"
                                placeholder="Please enter Username"
                            />
                        </el-form-item>

                        <!-- password -->
                        <el-form-item prop="r_pwd">
                            <span class="svg-container">
                                <svg-icon icon-class="password" />
                            </span>
                            <!-- 
                                https://blog.csdn.net/qq_43681948/article/details/101109268
                            -->
                            <el-input
                                v-model="loginForm.r_pwd"
                                :type="passwordType"
                                placeholder="Please enter your password"
                                @keyup.enter.native="handleLoginData"
                                ref="password"
                            />
                            <span class="show-pwd" @click="showPwd">
                                <!-- The ternary determines whether the input box type is a password, if it is, it will show closed eyes, otherwise it will show open eyes -->
                                <svg-icon
                                    :icon-class="
                                        passwordType === 'password'
                                            ? 'eye'
                                            : 'eye-open'
                                    "
                                />
                            </span>
                        </el-form-item>

                        <!-- r_role -->
                        <el-form-item prop="r_role">
                            <el-radio-group v-model="loginForm.r_role">
                                <el-radio-button :label="1" border
                                    >Student</el-radio-button
                                >
                                <el-radio-button :label="2" border
                                    >Teacher</el-radio-button
                                >
                                <el-radio-button :label="3" border
                                    >Admin</el-radio-button
                                >
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item style="width: 100%; margin-bottom: 30px">
                            <el-button
                                type="primary"
                                @click.native.prevent="handleLoginData"
                                >log in</el-button
                            >
                            <el-button
                                type="info"
                                @click.native.prevent="resetLoginData"
                                >reset</el-button
                            >
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="sign up" name="second" class="register-tabs">
                    <el-form
                        ref="registerFormRef"
                        :model="registerForm"
                        :rules="registerRules"
                    >
                        <!-- account -->
                        <el-form-item prop="r_account">
                            <span class="svg-container">
                                <svg-icon icon-class="user" />
                            </span>
                            <el-input
                                type="text"
                                v-model="registerForm.r_account"
                                placeholder="Please enter account"
                            />
                        </el-form-item>

                        <!-- password -->
                        <el-form-item prop="r_pwd">
                            <span class="svg-container">
                                <svg-icon icon-class="password" />
                            </span>
                            <!-- 
                                https://blog.csdn.net/qq_43681948/article/details/101109268
                            -->
                            <el-input
                                v-model="registerForm.r_pwd"
                                :type="passwordType"
                                placeholder="Please enter your password"
                                ref="password"
                            />
                            <span class="show-pwd" @click="showPwd">
                                <svg-icon
                                    :icon-class="
                                        passwordType === 'password'
                                            ? 'eye'
                                            : 'eye-open'
                                    "
                                />
                            </span>
                        </el-form-item>

                        <el-form-item prop="r_check_pwd">
                            <span class="svg-container">
                                <svg-icon icon-class="password" />
                            </span>
                            <!-- 
                                https://blog.csdn.net/qq_43681948/article/details/101109268
                            -->
                            <el-input
                                v-model="registerForm.r_check_pwd"
                                :type="passwordType"
                                placeholder="Please confirm your password"
                                @keyup.enter.native="handleRegisterData"
                                ref="password"
                            />
                            <span class="show-pwd" @click="showPwd">
                                <svg-icon
                                    :icon-class="
                                        passwordType === 'password'
                                            ? 'eye'
                                            : 'eye-open'
                                    "
                                />
                            </span>
                        </el-form-item>

                        <el-form-item prop="r_serial">
                            <span class="svg-container">
                                <svg-icon icon-class="user" />
                            </span>
                            <el-input
                                type="text"
                                v-model="registerForm.r_serial"
                                placeholder="Please enter a number"
                            />
                        </el-form-item>

                        <!-- name -->
                        <el-form-item prop="r_name">
                            <span class="svg-container">
                                <svg-icon icon-class="user" />
                            </span>
                            <el-input
                                type="text"
                                v-model="registerForm.r_name"
                                placeholder="Please enter your name"
                            />
                        </el-form-item>

                        <!-- role -->
                        <el-form-item prop="r_role">
                            <el-radio-group v-model="registerForm.r_role">
                                <el-radio-button :label="1" border
                                    >Student</el-radio-button
                                >
                                <el-radio-button :label="2" border
                                    >Teacher</el-radio-button
                                >
                                <!-- <el-radio-button :label="3" border
                                    >Admin</el-radio-button
                                > -->
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item style="width: 100%; margin-bottom: 30px">
                            <el-button
                                type="primary"
                                @click.native.prevent="handleRegisterData"
                                >sign up</el-button
                            >
                            <el-button
                                type="info"
                                @click.native.prevent="resetRegisterData"
                                >reset</el-button
                            >
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import { register } from "@/api/home";
export default {
    name: "Login",
    data() {
        const pat = new RegExp("[^a-zA-Z0-9_\u4e00-\u9fa5]", "i");

        let InvalidString = (rule, value, callback) => {
            if (pat.test(value) === true) {
                callback(new Error("Contains invalid characters, only be letter or number is allowed"));
            } else {
                callback();
            }
        };

        return {
            activeName: "first",
            loginForm: {
                r_account: "18888888888",
                r_pwd: "a123321",
                r_role: 3,
            },
            registerForm: {
                r_account: "",
                r_pwd: "",
                r_check_pwd: "",
                r_role: 1,
                r_serial: "",
                r_name: "",
            },
            loginRules: {
                r_account: [
                    /*
                        required: required
                         trigger: when to trigger
                         validator: custom validation rules
                    */
                    { required: true, message: "Account is required" },
                    {
                        min: 6,
                        max: 12,
                        message: "Account length is between 6 and 12 characters",
                        trigger: "change blur focus",
                    },
                    { validator: InvalidString },
                ],
                r_pwd: [
                    { required: true, message: "Password is required" },
                    {
                        min: 6,
                        max: 16,
                        message: "Password length is between 6 and 16 characters",
                        trigger: "change blur focus",
                    },
                    { validator: InvalidString },
                ],
                r_role: [
                    {
                        required: true,
                        message: "Gender is required",
                        trigger: "blur",
                    },
                ],
            },
            registerRules: {
                r_account: [
                    { required: true, message: "Account is required" },
                    {
                        min: 6,
                        max: 12,
                        message: "Account length is between 6 and 12 characters",
                        trigger: "change blur focus",
                    },
                    { validator: InvalidString },
                ],
                r_pwd: [
                    { required: true, message: "Password is required" },
                    {
                        min: 6,
                        max: 16,
                        message: "Password length is between 6 and 16 characters",
                        trigger: "change blur focus",
                    },
                    { validator: InvalidString },
                ],
                r_check_pwd: [
                    { required: true, message: "Password is required" },
                    {
                        min: 6,
                        max: 16,
                        message: "Password length is between 6 and 16 characters",
                        trigger: "change blur focus",
                    },
                    { validator: InvalidString },
                ],
                r_serial: [
                    {
                        required: true,
                        message: "ID is required",
                        trigger: "change blur focus",
                    },
                ],
                r_name: [
                    {
                        required: true,
                        message: "Name is required",
                        trigger: "change blur focus",
                    },
                ],
                r_role: [
                    {
                        required: true,
                        message: "Gender is required",
                        trigger: "blur",
                    },
                ],
            },
            passwordType: "password",
            redirect: undefined,
        };
    },
    watch: {
        /*
            Any property of the vm instance can be monitored
            1. If the listener is a route
            2. The monitor is the object
            3. The formal parameter in the handler is the object
        */

        $route: {
            immediate: true,
            handler: function (route) {
                // Logic and judgment, if there is a query parameter, get the redirect (redirect) routing address
                this.redirect = route.query && route.query.redirect;
            },
        },
    },
    methods: {
        showPwd() {
            if (this.passwordType === "password") {
                this.passwordType = "";
            } else {
                this.passwordType = "password";
            }
            this.$nextTick(() => {
                this.$refs.password.focus();
            });
        },
        resetRegisterData() {
            this.$refs.registerFormRef.resetFields();
        },
        handleRegisterData() {
            this.$refs.registerFormRef.validate((valid) => {
                if (valid) {
                    return new Promise(async (resolve, reject) => {
                        await register(this.registerForm);
                        this.$message({
                            message: "Sign up successfully",
                            type: "success",
                        });
                        window.location.reload();
                        resolve();
                    });
                } else {
                    this.$message({
                        message: "Failed to sign up",
                        type: "error",
                    });
                    reject();
                }
            });
        },
        resetLoginData() {
            this.$refs.loginFormRef.resetFields();
        },
        handleLoginData() {
            this.$refs.loginFormRef.validate(async (valid) => {
                if (valid) {
                    this.$store
                        .dispatch("user/login", this.loginForm)
                        .then((res) => {
                            if (res) {
                                this.$message({
                                    message: `Hello, ${res.r_name}, welcome to Campus Epidemic Management System`,
                                    type: "success",
                                });
                                this.$router.push({
                                    path: this.redirect || "/",
                                });
                            } else {
                                this.$message({
                                    message:
                                        "Hello, maybe the account password is wrong, please check it!",
                                    type: "error",
                                });
                            }
                        });
                } else {
                    this.$message({
                        message: "Failed to log in",
                        type: "error",
                    });
                    return false;
                }
            });
        },
    },
};
</script>

<style lang="scss">

/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
        color: $cursor;
    }
}

/* reset element-ui css */
.login-container {
    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;

        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
            caret-color: $cursor;

            &:-webkit-autofill {
                box-shadow: 0 0 0px 1000px $bg inset !important;
                -webkit-text-fill-color: $cursor !important;
            }
        }
    }

    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
    min-height: 100%;
    width: 100%;
    /*
        BUG occurs when the picture is imported: Module not found: Error: Can't resolve
         1. The problem
             - There is no problem with the above two ways of writing for vue2.5 and below. This problem occurs in 2.6, which should be related to webpack configuration
         2. Problem analysis (webpack resource processing rules, divided into: relative path, unprefixed path, with ~ path, relative root directory path)
             1. Relative path: "./assets/logo_blue.png"
             2. The path without prefix "assets/logo_blue.png" is resolved as a relative path by webpack
             3. Paths with ~
                 - "~@/assets/theme/logo_blue.png" is parsed by webpack as require(src/assets/theme/logo_blue.png)
                 - Dynamically import @ is equivalent to /src when webpack is configured by resolve.alias
             4. The path "/assets/logo_blue.png" relative to the root directory is not resolved by webpack
    */
    background-image: url(~@/assets/login_images/2.jpg);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    overflow: hidden;

    .login-form {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        overflow: hidden;
        width: 440px;
        max-width: 100%;
        padding: 30px 35px 0;
        border-radius: 20px;
        background: rgba(43, 43, 43, 0.8);
    }

    .login-title {
        text-align: center;
        color: white;
        h3 {
            margin: 0px;
            font-size: 35px;
            font-weight: 900;
        }
    }
    .el-tabs .el-tabs__header .el-tabs__nav .el-tabs__item {
        color: white;
    }
    .form-tabs {
        margin-top: 20px;
        .login-tabs {
            .el-form-item:nth-child(3),
            .el-form-item:nth-child(4) {
                border: none;
                background: none;
                border-radius: none;
                text-align: center;
            }
        }
        .register-tabs {
            .el-form-item:nth-child(6),
            .el-form-item:nth-child(7) {
                border: none;
                background: none;
                border-radius: none;
                text-align: center;
            }
        }
    }

    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }

    .bottom {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 30px;
        background-color: rgba(0, 0, 0, 0.6);
        span {
            margin-right:20px;
        }
        p {
            text-align: center;
            margin: 0;
            padding: 0;
            line-height: 30px;

            color: white;
        }
        a:hover{
            color:skyblue;
            text-decoration:underline;
        }
    }
}
</style>
