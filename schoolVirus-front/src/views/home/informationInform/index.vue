<template>
    <div class="inform-container">
        <transition-group
            name="animate__animated animate__bounce"
            :appear="true"
            enter-active-class="animate__fadeInLeftBig"
            leave-active-class="animate__fadeOutLeftBig"
        >
        <el-row :gutter="20" :key="1">
            
            <el-col :span="16">
                <el-card class="inform-card">
                    <p class="big-title">On-campus Epidemic Notification</p>
                    <ul>
                        <li v-for="(item) in campusList" :key="item.id">
                            <div class="small-title">
                                <span>Notification</span>
                                <span>{{item.n_content}}</span>
                                <span>{{item.n_date.slice(0,10)}}</span>
                            </div>
                            <p class="small-content">{{item.n_content}}</p>
                        </li>
                    </ul>
                </el-card>
            </el-col>
            
            <el-col :span="8">
                <el-card class="national-card">
                    <p class="national-title">The latest domestic epidemic news</p>
                    <vue-seamless-scroll :data="domesticList" class="seamless-warp" :class-option="defaultOption">
                        <ul class="seamless-container">
                            <li v-for="(item,index) in domesticList" :key="index">
                                <span class="title">{{item.n_title}}</span>
                                <span class="date">{{item.n_date.slice(0,10)}}</span>
                            </li>
                        </ul>
                    </vue-seamless-scroll>
                </el-card>
                
            </el-col>
        </el-row>
        </transition-group>
    </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
import {campusNotices,domesticNotices} from '@/api/home'
export default {
    name: "InformationInform",
    data(){
        return {
            campusList:[],
            domesticList:[],
            authorList:[]
        }
    },
    mounted(){
        this.getCampusNotice();
        this.getDomesticNotice();
        console.log(this.$store.state.user.rolesData.author)
        console.log(this.hiddenAuthor);
    },
    methods:{
        // 获取校内通知
        async getCampusNotice(){
            let campusData = await campusNotices();
            this.campusList = campusData.data;
            console.log()
        },
        // 获取国内通知
        async getDomesticNotice(){
            let domesticData = await domesticNotices();
            this.domesticList = domesticData.data;
        }
    },
    computed:{
        defaultOption(){
            return {
                step: 0.2, // 数值越大速度滚动越快
                limitMoveNum: this.domesticList.length, // 开始无缝滚动的数据量 this.dataList.length
                hoverStop: true, // 是否开启鼠标悬停stop
                direction: 0, // 0向下 1向上 2向左 3向右
                openWatch: true, // 开启数据实时监控刷新dom
                singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
                singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
                waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
            }
        },
        hiddenAuthor(){
            if(this.$store.state.user.rolesData.r_role!=3){
                return 'display:none'
            }else{
                this.authorList = this.$store.state.user.rolesData.author;
            }
        }
    },
    components: {
        vueSeamlessScroll
    }
};
</script>

<style lang="scss" scoped>
ul li{
    list-style: none;
}
.inform-container {
    .inform-card {
        padding:18px;
        box-sizing: border-box;
        .big-title {
            font-size:20px;
            font-weight:900;
            padding-bottom:10px;
            border-bottom:1px solid #C6C6C6;
        }
        li {
            margin-top:20px;
        }
        .small-title {
            font-size:15px;
            span:nth-child(1){
                display:inline-block;
                border: 1px solid #E0E0E0;
                box-sizing: border-box;
                padding:5px;
                color:#4D4D4D;
            }
            span:nth-child(2){
                color:black;
                margin-left:3px;
            }
            span:nth-child(3){
                color:#9999AA;
                float:right;
            }
        }
        .small-content {
            margin-top:5px;
            background-color: #F7F7F7;
            padding:15px;
            box-sizing: border-box;
            font-size:15px;
            border-bottom:1px solid #F0F0F2;
        }
    }
    .national-card {
        padding:18px;
        .national-title {
            color: #2E94C6;
            border-bottom:1px solid #C6C6C6;
            padding-bottom:10px;
            font-size:20px;
            font-weight:900;
            
        }
        .seamless-warp {
            margin-top:10px;
            height: 229px;
            overflow: hidden;
            .seamless-container li{
                padding-bottom: 20px;
                .title {
                    color: #494949;
                }
                .date {
                    float:right;
                }
            }
        }
    }
    .contact-card {
        margin-top:30px;
        padding:20px;
        height: 350px;
        p {
            font-size:15px;
            color:#848484;
            text-align: center;
            padding-bottom: 10px;
        }
        .list-one {
            display:flex;
            flex-direction: row;
            justify-content: space-around;
            border-top: 1px solid #F3F3F3;
            border-bottom: 1px solid #F3F3F3;
            padding: 20px 0px;
            margin: 20px 0px;
            color: #666666;
        }
        .list-two {
            text-align: center;
            li {
                margin-bottom: 20px;
                color: #9D9EAE;
            }
        }
    }
}
</style>
