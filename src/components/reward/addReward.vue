<template>
  <div class="wrap">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="奖惩名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="奖惩原因">
        <el-input v-model="form.reason"></el-input>
      </el-form-item>
      <el-form-item label="奖惩金额">
        <el-input v-model="form.instance"></el-input>
      </el-form-item>
      <el-form-item label="奖惩时间">
        <el-date-picker
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          v-model="form.d_time"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
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
        id:Math.ceil(Math.random()*100),
        name: '',
        reason: '',
        instance: '',
        d_time: ''
      }
    }
  },
  methods: {
    onSubmit() {
      axios.post('/api/prizePunishList/add', this.form).then(res => {
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
}
.el-date-editor.el-input {
  width: 100%;
}
</style>