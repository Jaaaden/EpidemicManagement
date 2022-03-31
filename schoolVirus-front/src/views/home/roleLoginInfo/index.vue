<template>
    <div class="role-container">
        <transition-group
            name="animate__animated animate__bounce"
            :appear="true"
            enter-active-class="animate__fadeInLeftBig"
            leave-active-class="animate__fadeOutLeftBig"
        >
           
            <el-card class="role-small-info" :key="1">
                <el-row type="flex" :gutter="60">
                    <el-col :span="1">
                        <img
                            src="@/assets/logo/logo.png"
                            alt='jyjyyjyyy'
                            class="avatar"
                        />
                    </el-col>
                    <el-col :span="13">
                        <p>Welcome to Campus Epidemic Prevention System</p>
                        <p>NUS</p>
                    </el-col>
                </el-row>
            </el-card>

            
            <el-row
                class="role-big-info"
                type="flex"
                justify="space-around"
                :key="2"
            >
                
                <el-col :span="11">
                    <div class="deadline">
                        <span>From the end of this period</span>
                        <flip-countdown deadline="2022-05-07"></flip-countdown>
                    </div>
                    <el-card class="role-left-info">
                        <h3>Basic Information</h3>
                        <ul>
                            <li>Account<span>{{roleList.i_stuid}}</span></li>
                            <li>Name<span>{{roleList.i_name}}</span></li>
                            <li>Gender<span>{{infoList.i_gender==0?'Male':'Female'}}</span></li>
                            <li>Birthday<span>{{infoList.i_birth}}</span></li>
                            <li>Department<span>{{infoList.i_college}}</span></li>
                            <li>Address<span>{{infoList.i_class}}</span></li>
                        </ul>
                    </el-card>
                </el-col>
               
                <el-col :span="11">
                    <el-card class="role-right-info">
                        <el-carousel
                            :interval="1000"
                            type="card"
                            height="200px"
                            :autoplay="true"
                            indicator-position="none"
                            style="margin-top:30px;"
                        >
                            <el-carousel-item v-for="(item,index) in imgPath" :key="index">
                                <img :src="item" alt="jyjyyjyyy">
                            </el-carousel-item>
                        </el-carousel>
                    </el-card>
                   
                    <el-card class="role-right-info" style="margin-top:30px;">
                        <h3>Educational information</h3>
                        <ul>
                            <li>University <span>{{infoList.i_university}}</span></li>
                            <li>Major <span>{{infoList.i_profession}}</span></li>
                            <li>Admission time <span>{{infoList.i_enter_time}}</span></li>
                            <li>Background <span>{{infoList.i_background}}</span></li>
                        </ul>
                    </el-card>
                </el-col>
            </el-row>
        </transition-group>
    </div>
</template>

<script>
import {
    getBasic,
} from "@/api/personal";
import "animate.css";
import FlipCountdown from 'vue2-flip-countdown'
export default {
    name: "RoleLoginInfo",
    created(){
        this.getUserInfo();
    },
    data() {
        return {
            infoList:[],
            roleList:[],
            calender: new Date(),
            imgPath: [
                require('@/assets/home_images/1.jpg'),
                require('@/assets/home_images/2.jpg'),
                require('@/assets/home_images/3.jpg')
            ]
        };
    },
    methods:{
        async getUserInfo(){
            let r_serial = this.$store.state.user.rolesData.r_serial
            let res = await getBasic(r_serial);
            console.log(res.data.length);
            if(res.data.length != 0){
                res.data[0].i_birth = res.data[0].i_birth.slice(0,10)
                res.data[0].i_enter_time = res.data[0].i_enter_time.slice(0,10)
                this.infoList = res.data[0];
                this.roleList = res.data[0];
            }else{
                this.$message({
                    type:'warning',
                    message:'Sorry, please fill in your personal information first'
                })
                this.$router.push({ path: this.redirect || "/personal/personalInfo" });
            }
        }
    },
    components: { FlipCountdown }
};
</script>

<style lang="scss" scoped>
ul li {
    list-style: none;
}
.role-container {
    .role-small-info {
        height: 60px;
        padding: 5px;
        .el-col:nth-child(1) {
            .avatar {
                width: 50px;
                background-color: rgba(0, 0, 0, 0.2);
                border: 1px solid black;
                border-radius: 100px;
            }
        }

        .el-col:nth-child(2) {
            color: black;
            p:first-child {
                font-size: 20px;
                padding-top: 5px;
                color: green;
            }
            p:last-child {
                font-size: 10px;
                line-height: 20px;
                color: black;
            }
        }
    }

    .role-big-info {
        margin-top: 20px;
        .deadline {
            text-align: center;
            span {
                font-size:30px;
                font-weight:bold;
                background: linear-gradient(to right, red, blue);
                -webkit-background-clip: text;
                color: transparent;
            }
        }
        
        .role-left-info {
            padding: 20px;
            height: 450px;
            h3 {
                padding-bottom: 5px;
                border-bottom: 1px solid #c6c6c6;
            }
            ul {
                li {
                    padding-bottom: 25px;
                    color: #666;
                }
                padding: 10px;
                span {
                    padding-left: 20px;
                    color: black;
                }
            }
        }
        .role-right-info:first-child {
            height: 270px;
            .el-carousel__item img {
                width:100%;
                height:100%;
            }

            .el-carousel__item:nth-child(2n) {
                background-color: #99a9bf;
            }

            .el-carousel__item:nth-child(2n + 1) {
                background-color: #d3dce6;
            }
        }
        .role-right-info:last-child {
            padding: 20px;
            height: 260px;
            h3 {
                padding-bottom: 5px;
                border-bottom: 1px solid #c6c6c6;
            }
            ul {
                li {
                    padding-bottom: 25px;
                    color: #666;
                }
                padding: 10px;
                span {
                    padding-left: 20px;
                    color: black;
                }
            }
        }
        
    }
}
</style>
