<template>
  <div>
    <el-form
      ref="searchForm"
      :inline="true"
      :model="searchWhere"
      class="demo-form-inline"
      style="margin-top: 20px"
    >
      <el-form-item label="书名" size="mini" prop="bookName">
        <el-input
          v-model="searchWhere.bookName"
          placeholder="书名"
          style="width: 150px"
        ></el-input>
      </el-form-item>
      <el-form-item label="出版社" size="mini" prop="press">
        <el-input
          v-model="searchWhere.press"
          placeholder="出版社"
          style="width: 150px"
        ></el-input>
      </el-form-item>
      <el-form-item label="图书类型" size="mini" prop="bookType">
        <el-select
          v-model="searchWhere.bookType"
          placeholder="图书类型"
          style="width: 120px"
        >
          <el-option
            v-for="option in bookTypeOptions"
            :key="option.type"
            :label="option.name"
            :value="option.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出版日期" size="mini" prop="publicationdate">
        <el-date-picker
          v-model="searchWhere.publicationdate"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item size="mini">
        <el-button type="info" @click="resetForm('searchForm')">重置</el-button>
        <el-button type="success" @click="addHandle">新增</el-button>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <!-- 对话框 -->
        <el-dialog
          title="图书信息编辑"
          :visible.sync="dialogFormVisible"
          width="500px"
        >
          <el-form
            :rules="rules"
            :model="form"
            label-width="auto"
            ref="addForm"
            style="width: 400px; margin-top: -20px; margin: 0 auto"
            size="mini"
          >
            <el-form-item label="书号" prop="bookISBN">
              <el-input v-model="form.bookISBN"></el-input>
            </el-form-item>
            <el-form-item label="书名" prop="bookName">
              <el-input v-model="form.bookName" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="作者">
              <el-input v-model="form.author"></el-input>
            </el-form-item>
            <el-form-item label="出版社">
              <el-input v-model="form.press"></el-input>
            </el-form-item>
            <el-form-item label="出版日期" prop="publicationdate">
              <el-date-picker
                v-model="form.publicationdate"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="价格">
              <el-input v-model="form.price"></el-input>
            </el-form-item>
            <el-form-item label="数量" prop="quantity">
              <el-input v-model.number="form.quantity"></el-input>
            </el-form-item>
            <el-form-item label="图书类型">
              <el-select v-model="form.bookType" placeholder="图书类型">
                <el-option
                  v-for="option in bookTypeOptions"
                  :key="option.type"
                  :label="option.name"
                  :value="option.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="
                form.id == null ? addData('addForm') : updateData('addForm')
              "
              >确 定</el-button
            >
          </div>
        </el-dialog>
      </el-form-item>
    </el-form>

    <el-table :data="bookinfolist" style="width: 100%" max-height="620px">
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
        <template slot-scope="scope">
          <span>{{ scope.row.booktype | bookTypeFilter }}</span>
        </template>
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
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
const bookTypeOptions = [
  { type: 1, name: "编程类" },
  { type: 2, name: "前端类" },
  { type: 3, name: "设计类" },
  { type: 4, name: "移动开发类" },
];
import bookinfoApi from "@/api/bookinfo";
export default {
  name: "BookInfo",
  data() {
    return {
      bookTypeOptions: bookTypeOptions,
      bookinfolist: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      searchWhere: {
        bookName: "",
        press: "",
        bookType: "",
        publicationdate: "",
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      dialogFormVisible: false,
      form: {
        id: null,
        bookISBN: "",
        bookName: "",
        author: "",
        press: "",
        publicationdate: "",
        price: "",
        bookType: "",
        quantity: 500,
      },
      // 新增图书表单校验规则
      rules: {
        bookISBN: [
          {
            required: true,
            message: "请输入书号",
            trigger: "blur",
          },
        ],
        bookName: [
          {
            required: true,
            message: "请输入书名",
            trigger: "blur",
          },
        ],
        publicationdate: [
          {
            required: true,
            message: "请选择日期",
            trigger: ["blur", "change"],
          },
        ],
        quantity: [
          {
            required: true,
            message: "数量不能为空",
            trigger: "blur",
          },
          {
            type: "number",
            message: "必须为数字值",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    // 数据需要在组件初始化后就要获取
    this.fetchData();
  },
  methods: {
    handleEdit(id) {
      this.addHandle();
      bookinfoApi.getBookById(id).then((resposne) => {
        const resp = resposne.data;
        if (resp.flag) {
          // 当点击编辑时，将从接口返回的数据复制给form
          this.form = resp.data;
        } else {
          this.$message({
            type: "warning",
            message: resp.message,
          });
        }
      });
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          bookinfoApi.deleteBookById(id).then((response) => {
            const resp = response.data;
            this.$message({
                type: resp.flag?"success":"error",
                message: "删除成功!",
              });
            if (resp.flag) {
              this.fetchData()
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    fetchData() {
      // bookinfoApi.getBookInfoList().then((response) => {
      bookinfoApi
        .search(this.currentPage, this.pageSize, this.searchWhere)
        .then((response) => {
          const resp = response.data;
          this.bookinfolist = resp.data.rows;
          this.total = resp.data.total;
        });
    },
    handleSizeChange(size) {
      this.pageSize = size;
      console.log(this.pageSize);
      this.fetchData();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.fetchData();
    },
    onSubmit() {
      console.log("submit!");
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    addData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          bookinfoApi.add(this.form).then((response) => {
            const resp = response.data;
            if (resp.flag) {
              this.fetchData();
              this.dialogFormVisible = false;
            } else {
              this.$message({
                type: "warning",
                message: resp.message,
              });
            }
          });
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },
    addHandle() {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs.addForm.resetFields();
      });
    },
    updateData(addForm) {
      this.$refs[addForm].validate((valid) => {
        if (valid) {
          bookinfoApi.updateBook(this.form).then((response) => {
            const resp = response.data;
            if (resp.flag) {
              // 刷新数据列表
              this.fetchData();
              this.form.id = null;
              this.dialogFormVisible = false;
            } else {
              this.$message({
                type: "warning",
                message: resp.message,
              });
            }
          });
        } else {
          return false;
        }
      });
    },
  },
  filters: {
    bookTypeFilter(type) {
      const booktypeobj = bookTypeOptions.find((v) => v.type == type);
      return booktypeobj ? booktypeobj.name : null;
    },
  },
};
</script>

<style scoped>
</style>