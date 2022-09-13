<template>
  <div>
    <el-table :data="bookinfolist" style="width: 100%" max-height="380">
      <el-table-column fixed type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column prop="bookISBN" label="书号" width="150">
      </el-table-column>
      <el-table-column prop="bookName" label="书名" width="200">
      </el-table-column>
      <el-table-column prop="author" label="作者" width="100">
      </el-table-column>
      <el-table-column prop="press" label="出版社" width="150">
      </el-table-column>
      <el-table-column prop="publicationdate" label="出版日期" width="150">
      </el-table-column>
      <el-table-column prop="price" label="价格" width="100"> </el-table-column>
      <el-table-column prop="quantity" label="数量" width="100">
      </el-table-column>
      <el-table-column prop="booktype" label="图书类型" width="100">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row.id)"
          >
            编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import bookinfoApi from "@/api/bookinfo";
export default {
  name: "BookInfo",
  data() {
    return {
      bookinfolist: [],
    };
  },
  created() {
    // 数据需要在组件初始化后就要获取
    this.fetchData();
  },
  methods: {
    handleEdit(id) {
      console.log("编辑", id);
    },
    handleDelete(id) {
      console.log("删除", id);
    },
    fetchData() {
      bookinfoApi.getBookInfoList().then((response) => {
        const resp = response.data;
        this.bookinfolist = resp.data;
      });
    },
  },
};
</script>

<style>
</style>