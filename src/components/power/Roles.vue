<template>
  <div class="wrap">
    <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
      <el-form-item label="培训名称">
        <el-input v-model="sizeForm.name"></el-input>
      </el-form-item>
      <el-form-item label="培训等级">
        <el-input v-model="sizeForm.grade"></el-input>
      </el-form-item>
      <el-form-item label="培训地址">
        <el-input v-model="sizeForm.place"></el-input>
      </el-form-item>
      <el-form-item label="培训方式">
        <el-input v-model="sizeForm.style"></el-input>
      </el-form-item>
      <el-form-item label="负责人">
        <el-input v-model="sizeForm.resName"></el-input>
      </el-form-item>
      <el-form-item label="培训状态">
        <el-input v-model="sizeForm.status"></el-input>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker
            v-model="sizeForm.ntime"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
            v-model="sizeForm.etime"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item size="large">
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
      sizeForm: {
        name: '',
        grade: '',
        name: '',
        ntime: '',
        etime: '',
        place: '',
        style: '',
        resName: '',
        status: ''
      }
    }
  },
  methods: {
    onSubmit() {
      axios.post('/api/trainRecordList/add', this.sizeForm).then(res => {
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
          this.sizeForm = {}
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.wrap {
  width: 40%;
  text-align: center;
  margin: 0 auto;
}
.el-date-editor.el-input {
  width: 100% !important;
}
</style>