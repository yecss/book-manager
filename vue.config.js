const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    port:8888,
    open:true,
    host:"127.0.0.1"
  },
  lintOnSave:false, //关闭格式检查
  productionSourceMap:false,//打包不生成map文件，加快打包速度
})
