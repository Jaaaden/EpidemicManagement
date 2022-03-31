<template>
    <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

const animationDuration = 6000;

export default {
    mixins: [resize],
    props: {
        className: {
            type: String,
            default: "chart",
        },
        width: {
            type: String,
            default: "100%",
        },
        height: {
            type: String,
            default: "300px",
        },
    },
    data() {
        return {
            chart: null,
        };
    },
    mounted() {
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

            this.chart.setOption({
                // tooltip component
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow", 
                    },
                },
                // draw grid
                grid: {
                    top: 10,
                    left: "2%",
                    right: "2%",
                    bottom: "3%",
                    containLabel: true, 
                },
             
                xAxis: [
                    {
                        type: "category", 
                        data: ["Management of Diagnosis", "Close Contact", "Medium-High Risk", "Lower Risk"],
                        axisTick: {
                            // Make sure the tick marks are aligned with the labels
                            alignWithLabel: true,
                        },
                    },
                ],
          
                yAxis: [
                    {
                        type: "value",
                        axisTick: {
                            show: false,
                        },
                    },
                ],
                series: [
                    {
                        name: "On-campus epidemic data",
                        type: "bar",
                        barWidth: "60%",
                        data: [79, 52, 200, 334],
                        animationDuration
                    }
                ],
            });
        },
    },
};
</script>
