<template>
  <div class="wrap">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="所属员工">
        <el-select @change="optionsChange" v-model="value" placeholder="请选择">
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="员工编号">
        <el-input v-model="form.userId" disabled></el-input>
      </el-form-item>
      <el-form-item label="基本工资">
        <el-input v-model="form.salary"></el-input>
      </el-form-item>
      <el-form-item label="浮动范围">
        <el-input type="text" v-model="form.wxian"></el-input>
      </el-form-item>
      <el-form-item label="公积金">
        <el-input type="text" v-model="form.ggjin"></el-input>
      </el-form-item>
      <el-form-item label="全勤奖金">
        <el-input type="text" v-model="form.qqin"></el-input>
      </el-form-item>
      <el-form-item label="住房补助">
        <el-input type="text" v-model="form.villa"></el-input>
      </el-form-item>
      <el-form-item label="额外补助">
        <el-input type="text" v-model="form.ewai"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      form: {
        userId: '',
        salary: '',
        wxian: '',
        ggjin: '',
        qqin: '',
        villa: '',
        ewai: ''
      },
      options: [],
      value:'',
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    optionsChange(val){
      this.form.userId = val
      console.log(val,'=====')
    },
    // 获取列表数据
    getUserList() {
      axios.get('/api/staffList/pages').then(res => {
        if (res.data.code !== 'OK') {
          return this.$message.error('信息查询失败')
        } else {
          this.options = res.data.data
          console.log(this.users, '=====')
        }
      })
    },
    onSubmit() {
      axios.post('/api/salaryList/add', this.form).then(res => {
        if (res.data.code !== 'OK') {
          this.$message({
            message: '添加失败',
            type: 'error'
          })
        } else {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.value = ''
          this.form = {}
        }
      })
    }
  }
}
</script>
<style lang="less">
.wrap {
  width: 40%;
  margin: 0 auto;
  text-align: center;
}
.el-date-editor.el-input {
  width: 100%;
}
.el-select {
  width: 100%;
}
</style>