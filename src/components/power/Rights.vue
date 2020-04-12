<template>
  <div>
    <div style="margin-bottom: 15px;">
      <el-input placeholder="请输入培训名称" v-model="searchValue" class="input-with-select">
        <el-button @click="getList()" slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="培训名称"></el-table-column>
      <el-table-column prop="place" label="培训地址" show-overflow-tooltip></el-table-column>
      <el-table-column prop="resName" label="负责人" show-overflow-tooltip></el-table-column>
      <el-table-column prop="ntime" label="开始日期" ></el-table-column>
      <el-table-column prop="etime" label="结束日期"></el-table-column>
      <el-table-column label="操作" width="140px">
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
    <!-- 编辑 -->
    <el-dialog @close="editorDialogClosed" title="修改用户信息" :visible.sync="editorForm">
      <el-form ref="editorFrom" :model="editorFrom" :rules="addUserRules">
        <el-form-item prop="name" label="培训名称" :label-width="formLabelWidth">
          <el-input v-model="editorFrom.name" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item prop="place" label="培训地址" :label-width="formLabelWidth">
          <el-input v-model="editorFrom.place" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="resName" label="负责人" :label-width="formLabelWidth">
          <el-input v-model="editorFrom.resName" autocomplete="off"></el-input>
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
      input3: '',
      tableData: [],
      multipleSelection: [],
      editorForm: false,
      editorFrom: {},
      formLabelWidth: '80px',
      editorDialogClosed: '',
      addUserRules: {},
      searchValue:''
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
        axios.delete('/api/trainRecordList/del/' + id).then(res => {
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
        .put('/api/trainRecordList/update', {
          id: this.editorFrom.id,
          name: this.editorFrom.name,
          place: this.editorFrom.place,
          resName: this.editorFrom.resName
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
            this.getList();
            this.editorForm = false
          }
        })
    },
    // 编辑用户
    editorClick(id) {
      this.editorForm = true
      axios.get('/api/trainRecordList/view/' + id).then(res => {
        if (res.data.code !== 'OK') {
          return this.$message.error('信息查询失败')
        } else {
          this.editorFrom = res.data.data
        }
      })
    },
    getList() {
      axios.get('/api/trainRecordList/pages',{
        params:{
          name:this.searchValue
        }
      }).then(res => {
        if (res.data.code !== 'OK') {
          return this.$message.error('信息查询失败')
        } else {
          console.log(res.data.data)
          this.tableData = res.data.data
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
.el-input-group {
  width: 40% !important;
}
</style>