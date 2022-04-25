<template>
    <transition-group
            name="animate__animated animate__bounce"
            :appear="true"
            enter-active-class="animate__fadeInLeftBig"
            leave-active-class="animate__fadeOutLeftBig"
    >
    <div class="national-container" :key="1">
        <el-row type="flex" justify="space-between">
            <el-col :span="12" class="leftTop">
                <p>Singapore Epidemic Real-Time Data</p>
                <p>update data time：{{ lastUpdateTime }}</p>
                <p style="margin-top:10px;color:red">(Data from: Google News)</p>
            </el-col>
            <el-col :span="12" class="rightTop">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-card>
                            <p>Existing diagnosis</p>
                            <p>{{ chinaTotal.nowConfirm }}</p>
                            <p>
                                Compare yesterday<span>{{
                                    "+" + chinaAdd.nowConfirm
                                }}</span>
                            </p>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card>
                            <p>Import abroad</p>
                            <p>{{ chinaTotal.importedCase }}</p>
                            <p>
                                Compare yesterday<span>{{
                                    "+" + chinaAdd.importedCase
                                }}</span>
                            </p>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card>
                            <p>Total Diagnosis</p>
                            <p>{{ chinaTotal.confirm }}</p>
                            <p>
                                Compare yesterday<span>{{ "+" + chinaAdd.confirm }}</span>
                            </p>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card>
                            <p>Cumulative cure</p>
                            <p>{{ chinaTotal.heal }}</p>
                            <p>
                                Compare yesterday<span>{{ "+" + chinaAdd.heal }}</span>
                            </p>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                </el-row>
            </el-col>
        </el-row>
           
    </div>
    </transition-group>
</template>

<script>

const jsonp = require("jsonp");
import moment from 'moment'
import MapPage from "@/components/Map";
export default {
    name: "NationalData",
    data() {
        return {
            
            chinaTotal: {},
            
            chinaAdd: {},
            
            regionTotalArr: [],
            
            lastUpdateTime: null,
            
            chinaData:[],
            
            timer:null,
            
            beijingTime:null
        };
    },
    components: {
        "echart-china": MapPage,
    },
    created() {
        this.getData();
    },
    mounted() {
        
        this.timer = setInterval(() => {
            this.beijingTime = moment().format('');
        }, 100);
    },
    destroyed() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    },
    methods: {
        
        async getData() {
            await jsonp(
                "https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5",
                (err, res) => {
                    if (err) {
                        console.error(err.message);
                    } else {
                        const allData = JSON.parse(res.data);
                        
                        this.chinaTotal = allData.chinaTotal;
                        
                        this.chinaAdd = allData.chinaAdd;
                        
                        this.lastUpdateTime = allData.lastUpdateTime;
                        
                        const regionTotalArr = allData.areaTree[0].children;
                        regionTotalArr.forEach(item=>{
                            this.chinaData.push({
                                name:item.name,
                                nowConfirm:item.total.nowConfirm,
                                heal:item.total.heal,
                                healRate:item.total.healRate+'%',
                                dead:item.total.dead,
                                deadRate:item.total.deadRate+'%'
                            });
                        })
                       
                        const newRegionTotalArr = regionTotalArr.map((item) => {
                           
                            if (item.total.nowConfirm === 0) {
                                
                                return {
                                    name: item.name,
                                    itemStyle: {
                                        areaColor: "#E2EBF4",
                                    },
                                };
                            } else if (item.total.nowConfirm <= 9) {
                                return {
                                    name: item.name,
                                    itemStyle: {
                                        areaColor: "#FFE7B2",
                                    },
                                };
                            } else if (item.total.nowConfirm <= 99) {
                                return {
                                    name: item.name,
                                    itemStyle: {
                                        areaColor: "#FFCEA0",
                                    },
                                };
                            } else if (item.total.nowConfirm <= 499) {
                                return {
                                    name: item.name,
                                    itemStyle: {
                                        areaColor: "#FFA577",
                                    },
                                };
                            } else if (item.total.nowConfirm <= 999) {
                                return {
                                    name: item.name,
                                    itemStyle: {
                                        areaColor: "#FF6341",
                                    },
                                };
                            } else if (item.total.nowConfirm <= 9999) {
                                return {
                                    name: item.name,
                                    itemStyle: {
                                        areaColor: "#FF2736",
                                    },
                                };
                            } else {
                                return {
                                    name: item.name,
                                    itemStyle: {
                                        areaColor: "#DE1F05",
                                    },
                                };
                            }
                        });
                        // 保存处理好的数据
                        this.regionTotalArr = newRegionTotalArr;
                    }
                }
            );
        },
    },
};
</script>

<style lang="scss" scoped>
p {
    margin: 0;
    padding: 0;
}
.national-container {
    .leftTop {
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p:first-child {
            font-size: 60px;
            color: #f56c6c;
        }
        p:nth-child(2) {
            color: skyblue;
            font-size: 20px;
            margin: 10px 0px;
        }
        p:nth-child(3) {
            color: #ecb35c;
            font-size: 20px;
        }
    }
    .rightTop {
        .el-card {
            width: 150px;
            height: 80px;
            border-radius: 10px;
            box-sizing: border-box;
            color: black;
            font-size: 12px;
            border: 1px solid black;
        }
        .el-row:first-child {
            margin-bottom: 20px;
            .el-col:nth-child(1) .el-card {
                background-color: #fcf1f0;
                text-align: center;
                p:first-child {
                    font-size: 18px;
                    border-bottom: 1px solid #7d7d7d;
                    padding: 3px 0px;
                    color: black;
                }
                p:nth-child(2) {
                    margin: 3px 0px;
                    font-size: 20px;
                    color: #fd5041;
                }
                p:last-child {
                    font-size: 13px;
                    span {
                        margin-left: 3px;
                        color: #fd5041;
                    }
                }
            }
            .el-col:nth-child(2) .el-card {
                background-color: #fff6ee;
                text-align: center;
                p:first-child {
                    font-size: 18px;
                    border-bottom: 1px solid #7d7d7d;
                    padding: 3px 0px;
                    color: black;
                }
                p:nth-child(2) {
                    margin: 3px 0px;
                    font-size: 20px;
                    color: #ffa14e;
                }
                p:last-child {
                    font-size: 13px;
                    span {
                        margin-left: 3px;
                        color: #ffa14e;
                    }
                }
            }
            .el-col:nth-child(3) .el-card {
                background-color: #f1f7f2;
                text-align: center;
                p:first-child {
                    font-size: 18px;
                    border-bottom: 1px solid #7d7d7d;
                    padding: 3px 0px;
                    color: black;
                }
                p:nth-child(2) {
                    margin: 3px 0px;
                    font-size: 20px;
                    color: #56bc7c;
                }
                p:last-child {
                    font-size: 13px;
                    span {
                        margin-left: 3px;
                        color: #56bc7c;
                    }
                }
            }
            .el-col:nth-child(4) .el-card {
                text-align: center;
                p:first-child {
                    font-size: 18px;
                    border-bottom: 1px solid #7d7d7d;
                    padding: 3px 0px;
                    color: black;
                }
                p:nth-child(2) {
                    margin: 3px 0px;
                    font-size: 20px;
                    color: #5c92ca;
                }
                p:last-child {
                    font-size: 13px;
                    span {
                        margin-left: 3px;
                        color: #5c92ca;
                    }
                }
            }
        }
        .el-row:last-child {
            margin-bottom: 20px;
            .el-col:nth-child(1) .el-card {
                background-color: #fcf1f0;
                text-align: center;
                p:first-child {
                    font-size: 18px;
                    border-bottom: 1px solid #7d7d7d;
                    padding: 3px 0px;
                    color: black;
                }
                p:nth-child(2) {
                    margin: 3px 0px;
                    font-size: 20px;
                    color: #fd5041;
                }
                p:last-child {
                    font-size: 13px;
                    span {
                        margin-left: 3px;
                        color: #fd5041;
                    }
                }
            }
            .el-col:nth-child(2) .el-card {
                background-color: #fff6ee;
                text-align: center;
                p:first-child {
                    font-size: 18px;
                    border-bottom: 1px solid #7d7d7d;
                    padding: 3px 0px;
                    color: black;
                }
                p:nth-child(2) {
                    margin: 3px 0px;
                    font-size: 20px;
                    color: #ffa14e;
                }
                p:last-child {
                    font-size: 13px;
                    span {
                        margin-left: 3px;
                        color: #ffa14e;
                    }
                }
            }
            .el-col:nth-child(3) .el-card {
                background-color: #f1f7f2;
                text-align: center;
                p:first-child {
                    font-size: 18px;
                    border-bottom: 1px solid #7d7d7d;
                    padding: 3px 0px;
                    color: black;
                }
                p:nth-child(2) {
                    margin: 3px 0px;
                    font-size: 20px;
                    color: #56bc7c;
                }
                p:last-child {
                    font-size: 13px;
                    span {
                        margin-left: 3px;
                        color: #56bc7c;
                    }
                }
            }
            .el-col:nth-child(4) .el-card {
                text-align: center;
                p:first-child {
                    font-size: 18px;
                    border-bottom: 1px solid #7d7d7d;
                    padding: 3px 0px;
                    color: black;
                }
                p:nth-child(2) {
                    margin: 3px 0px;
                    font-size: 20px;
                    color: #5c92ca;
                }
                p:last-child {
                    font-size: 13px;
                    span {
                        margin-left: 3px;
                        color: #5c92ca;
                    }
                }
            }
        }
    }
    .leftBottom {
        margin: 0px auto;
    }
}
</style>
