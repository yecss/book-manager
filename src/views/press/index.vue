<template>
  <div>
    <el-form
      ref="searchForm"
      :inline="true"
      :model="searchWhere"
      class="demo-form-inline"
      style="margin-top: 20px"
    >
      <el-form-item label="出版社名称" size="mini" prop="press">
        <el-input
          v-model="searchWhere.press"
          placeholder="出版社名称"
          style="width: 150px"
        ></el-input>
      </el-form-item>
      <el-form-item size="mini">
        <el-button type="primary" @click="fetchData">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="pressList" style="width: 100%" max-height="620px" highlight-current-row @current-change="currentChange">
      <el-table-column fixed type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column prop="pressName" label="出版社名称" width="150">
      </el-table-column>
      <el-table-column prop="pressAddress" label="出版社地址" width="190">
      </el-table-column>
      <el-table-column prop="code" label="邮编" width="100"> </el-table-column>
      <el-table-column prop="chargePerson" label="负责人" width="100">
      </el-table-column>
      <el-table-column prop="phone" label="电话" width="120"> </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, pager, next"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import pressApi from "@/api/press";
export default {
  name: "ThePress",
  data() {
    return {
      pressList: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      searchWhere: {
        pressName: "",
      },
    };
  },
  created() {
    // 数据需要在组件初始化后就要获取
    this.fetchData();
  },
  methods: {
    fetchData() {
      pressApi.search(this.currentPage,this.pageSize,this.searchWhere).then((response)=>{
        const resp = response.data
        this.pressList = resp.data.rows
        this.total = resp.data.total
      })
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.fetchData();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.fetchData();
    },
    currentChange(currentRow,oldCurrentRow){
      this.$emit('sendData',currentRow)
    }
  },
};
</script>

<style scoped>
</style>