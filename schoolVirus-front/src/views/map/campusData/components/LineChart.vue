<template>
    <div class="echartsBox" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

export default {
    
    mixins: [resize],
   
    props: {
       
        chartData: {
            type: Object,
            required: true,
        },
    },
    
    data() {
        return {
            chart: null,
        };
    },
    watch: {
        chartData: {
            deep: true,
            handler(val) {
                this.setOptions(val);
            },
        },
    },
   
    mounted() {
        console.log(this.$el);
        this.$nextTick(() => {
            this.initChart();
        });
    },
    
    beforeDestroy() {
        if (!this.chart) {
            return;
        }
        
        this.chart.dispose();
        this.chart = null;
    },
    methods: {
        
        initChart() {
            this.chart = echarts.init(this.$el, "macarons");
            this.setOptions(this.chartData);
        },
        
        setOptions({ expectedData, actualData } = {}) {
            this.chart.setOption({
                
                xAxis: {
                    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    boundaryGap: false, 
                    axisTick: {
                        show: false, 
                    },
                },
                
                yAxis: {
                    axisTick: {
                        show: false, 
                    },
                },
                
                grid: {
                    left: 10,
                    right: 10,
                    bottom: 20,
                    top: 30,
                    containLabel: true, 
                },
                
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross", 
                    },
                    padding: [5, 10],
                },
                
                legend: {
                    
                    data: ["Number of confirmed cases", "Close contacts", "Moderate and high risk contacts", "Low risk contacts"],
                },
                
                series: [
                    {
                        name: "Number of confirmed cases",
                        
                        itemStyle: {
                            normal: {
                                color: "#CA0000",
                                lineStyle: {
                                    color: "#CA0000",
                                    width: 2,
                                },
                            },
                        },
                        
                        smooth: true,
                        type: "line",
                        data: [1,2,3,4,5,6,7],
                        animationDuration: 2800,
                        animationEasing: "cubicInOut",
                    },
                    {
                        name: "Close contacts",
                        smooth: true,
                        type: "line",
                        itemStyle: {
                            normal: {
                                color: "#CD8A09",
                                lineStyle: {
                                    color: "#CD8A09",
                                    width: 2,
                                },
                                areaStyle: {
                                    color: "#CD8A09",
                                },
                            },
                        },
                        data: [5,6,7,8,9,10,11],
                        animationDuration: 2800,
                        animationEasing: "quadraticOut",
                    },
                    {
                        name: "Moderate and high risk contacts",
                        itemStyle: {
                            normal: {
                                color: "#AC9408",
                                lineStyle: {
                                    color: "#AC9408",
                                    width: 2,
                                },
                            },
                        },
                        smooth: true,
                        type: "line",
                        data: [9,10,11,12,13,14,15],
                        animationDuration: 2800,
                        animationEasing: "cubicInOut",
                    },
                    {
                        name: "Low risk contacts",
                        smooth: true,
                        type: "line",
                        itemStyle: {
                            normal: {
                                color: "#70CAD2",
                                lineStyle: {
                                    color: "#70CAD2",
                                    width: 2,
                                },
                                areaStyle: {
                                    color: "#70CAD2",
                                },
                            },
                        },
                        data: [13,14,15,16,17,18,19],
                        animationDuration: 2800,
                        animationEasing: "quadraticOut",
                    },
                ],
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.echartsBox {
    width: 100%;
    height: 350px;
}
</style>
