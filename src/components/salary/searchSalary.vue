<template>
  <div>
    <!-- <div style="margin-bottom: 15px;">
      <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div> -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="userId" label="员工编号"></el-table-column>
      <el-table-column prop="salary" label="基本工资" show-overflow-tooltip></el-table-column>
      <el-table-column prop="wxian" label="浮动范围" show-overflow-tooltip></el-table-column>
      <el-table-column prop="ggjin" label="公积金" show-overflow-tooltip></el-table-column>
      <el-table-column prop="qqin" label="全勤奖金" show-overflow-tooltip></el-table-column>
      <el-table-column prop="villa" label="住房补助" show-overflow-tooltip></el-table-column>
      <el-table-column prop="ewai" label="额外补助" show-overflow-tooltip></el-table-column>
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
    <!-- 薪资编辑 -->
    <el-dialog @close="editorDialogClosed" title="修改用户信息" :visible.sync="editorFormVisible">
      <el-form ref="editorFrom" :model="editorFrom" :rules="addUserRules">
        <el-form-item prop="userId" label="员工编号" :label-width="formLabelWidth">
          <el-input v-model="editorFrom.userId" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item prop="salary" label="基本工资" :label-width="formLabelWidth">
          <el-input v-model="editorFrom.salary" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="qqin" label="全勤奖金" :label-width="formLabelWidth">
          <el-input v-model="editorFrom.qqin" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="ewai" label="额外补助" :label-width="formLabelWidth">
          <el-input v-model="editorFrom.ewai" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editorFormVisible = false">取 消</el-button>
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
      input3: '',
      tableData: [],
      multipleSelection: [],
      editorFormVisible: false,
      editorFrom: {},
      formLabelWidth: '80px',
      editorDialogClosed: '',
      addUserRules: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 删除用户
    deleteUser(id) {
      this.$confirm('确定要删除当前用户吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.delete('/api/salaryList/del/' + id).then(res => {
          if (res.data.code !== 'OK') {
            return this.$message.error('删除失败')
          } else {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getList()
          }
        })
      })
    },
    // 编辑submit
    editorSubmit() {
      axios
        .put('/api/salaryList/update', {
          id: this.editorFrom.id,
          salary: this.editorFrom.salary,
          qqin: this.editorFrom.qqin,
          ewai: this.editorFrom.ewai
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
            this.getList()
            this.editorFormVisible = false
          }
        })
    },
    // 编辑用户
    editorClick(id) {
      this.editorFormVisible = true
      axios.get('/api/salaryList/view/' + id).then(res => {
        if (res.data.code !== 'OK') {
          return this.$message.error('信息查询失败')
        } else {
          this.editorFrom = res.data.data
        }
      })
    },
    getList() {
      axios.get('/api/salaryList/pages').then(res => {
        if (res.data.code !== 'OK') {
          return this.$message.error('信息查询失败')
        } else {
          console.log(res.data.data)
          this.tableData = res.data.data
        }
      })
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleClick(row) {
      console.log(row)
    }
  }
}
</script>