<template>
  <div>
    <h1 align="center">欢迎来到小豆子图书管理系统</h1>
    <div ref="echartDemoDiv" style="width: 100%; height: 400px"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import bookInfoApi from "@/api/bookinfo"
export default {
  name: "TheHome",
  data() {
    return {
      bookTypeData:{
        bookType:[],
        quantitySum:[]
      }
    };
  },
  computed:{
    options: function(){
      let option = {
        // 配置图标属性
        title: {
          text: "各种类型的图书库存数量",
          left: "center",
          textStyle: {
            color: "#000",
          },
        },
        // 提示信息
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // type:"shadow"
          },
        },
        legend: {
          top:30,
          data: [{
            name:'库存数量',
            icon:'circle',
            textStyle:{
              color:'#545c64',
              fontFamily:'微软雅黑',
              fontSize:16
            }
          }],
        },
        xAxis: {
          type: "category",
          data: this.bookTypeData.bookType,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "库存数量",
            data: this.bookTypeData.quantitySum,
            type: "line",
          },
        ],
      }
      return option
    }
  },
  methods: {
    drawLine() {
      // 准备容器
      this.chartDemo = echarts.init(this.$refs['echartDemoDiv'])
      // 绘制图表
      this.chartDemo.setOption(this.options,true);
      // 让图表随着窗口自动缩放
      window.addEventListener('resize',this.chartDemo.resize)
    },
    getBookTypeSum(){
      bookInfoApi.getTypeSum().then((response)=>{
        const resp = response.data
        if(resp.flag){
          this.bookTypeData.bookType = resp.data.bookType
          this.bookTypeData.quantitySum = resp.data.quantitySum
        }
        else{
          this.$message({
            type:'warning',
            message:resp.message
          })
        }
      })
    }
  },
  mounted() {
    this.getBookTypeSum()
    this.drawLine();
  },
  watch:{
    options(newV,oldV){
      if(newV!==oldV){
        this.chartDemo.setOption(newV);
      }
    }
  }
};
</script>

<style scoped>
</style>