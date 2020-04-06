<template>
  <div>
    <!-- 卡片视图 -->
    <el-card class="box-card">
      <!-- <el-row :gutter="40">
        <el-col :span="10">
          <el-input
            @clear="getUserList()"
            v-model="queryInfo.query"
            clearable
            placeholder="请输入内容"
            class="input-with-select"
          >
            <el-button @click="getUserList()" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>-->
      <el-table :data="users" border style="width: 100%;margin-top:30px;">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="idcard" label="身份证号码"></el-table-column>
        <el-table-column prop="zc" label="职位"></el-table-column>
        <el-table-column prop="cl" label="学历"></el-table-column>
        <el-table-column prop="position" label="职称"></el-table-column>
        <el-table-column prop="np" label="籍贯"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editorClick(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteUser(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 3, 5]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>-->
    </el-card>
    <!-- 编辑用户 -->
    <el-dialog @close="editorDialogClosed" title="修改用户信息" :visible.sync="editorForm">
      <el-form ref="editorFrom" :model="editorFrom" :rules="addUserRules">
        <el-form-item prop="name" label="用户名" :label-width="formLabelWidth">
          <el-input v-model="editorFrom.name" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="电话" :label-width="formLabelWidth">
          <el-input v-model="editorFrom.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="职位" :label-width="formLabelWidth">
          <el-input v-model="editorFrom.zc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="idcard" label="身份证号" :label-width="formLabelWidth">
          <el-input v-model="editorFrom.zc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="address" label="地址" :label-width="formLabelWidth">
          <el-input v-model="editorFrom.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelBtn">取 消</el-button>
        <el-button type="primary" @click="editorSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      users: [],
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      total: 0,
      editorForm: false,
      editorFrom: {},
      formLabelWidth: '80px',
      editorDialogClosed: '',
      addUserRules: {}
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    // 删除用户
    deleteUser(id) {
      this.$confirm('确定要删除当前用户吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.delete('/api/staffList/del/' + id).then(res => {
          if (res.data.code !== 'OK') {
            return this.$message.error('删除失败')
          } else {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getUserList()
          }
        })
      })
    },
    // 编辑submit
    editorSubmit() {
      axios
        .put('/api/staffList/update', {
          id: this.editorFrom.id,
          name: this.editorFrom.name,
          phone: this.editorFrom.phone,
          zc: this.editorFrom.zc,
          address: this.editorFrom.address
        })
        .then(res => {
          if (res.data.code !== 'OK') {
            this.$message({
              message: '用户编辑失败',
              type: 'error'
            })
          } else {
            this.$message({
              message: '用户编辑成功',
              type: 'success'
            })
            this.getUserList();
            this.editorForm = false
          }
        })
    },
    // 编辑用户
    editorClick(id) {
      this.editorForm = true
      axios.get('/api/staffList/view/' + id).then(res => {
        if (res.data.code !== 'OK') {
          return this.$message.error('信息查询失败')
        } else {
          this.editorFrom = res.data.data
          console.log(res.data.data, '=======员工列表')
        }
      })
    },
    // 获取列表数据
    getUserList() {
      axios.get('/api/staffList/pages').then(res => {
        if (res.data.code !== 'OK') {
          return this.$message.error('信息查询失败')
        } else {
          this.total = res.data.total
          this.users = res.data.data
          console.log(this.users, '=====')
        }
      })
    },
    cancelBtn() {
      this.editorForm = false
    }
  }
}
</script>

<style lang="less" scoped>
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.text {
  font-size: 14px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}
.el-pagination {
  float: left;
  margin: 20px;
}
</style>