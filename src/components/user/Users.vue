<template>
  <div class="content">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="籍贯">
        <el-input v-model="form.np"></el-input>
      </el-form-item>
      <el-form-item label="民族">
        <el-input v-model="form.nation"></el-input>
      </el-form-item>
      <el-form-item label="出生日期">
        <div class="block">
          <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期"></el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="部门">
        <el-input v-model="form.position"></el-input>
      </el-form-item>
      <el-form-item label="职位">
        <el-select v-model="form.zc" placeholder="请选择职位">
          <el-option label="销售" value="销售"></el-option>
          <el-option label="测试" value="测试"></el-option>
          <el-option label="运营" value="运营"></el-option>
          <el-option label="开发" value="开发"></el-option>
          <el-option label="产品" value="产品"></el-option>
          <el-option label='总监' value="总监"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="专业">
        <el-input v-model="form.profession"></el-input>
      </el-form-item>
      <el-form-item label="学历">
        <el-select v-model="form.cl" placeholder="请选择">
          <el-option label="大专" value="大专"></el-option>
          <el-option label="本科" value="本科"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input type="input" v-model="form.idcard"></el-input>
      </el-form-item>
      <el-form-item label="居住地址">
        <el-input type="input" v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item label="员工编号">
        <el-input type="input" v-model="form.desc"></el-input>
      </el-form-item>-->
      <!-- <el-form-item label="上传照片">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.photo" :src="form.photo" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>-->
      <el-form-item style="text-align:center">
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
        name: '',
        sex: '',
        birthday: '',
        np: '',
        nation: '',
        zc: '',
        cl: '',
        idcard: '',
        phone: '',
        position: '',
        address: '',
        profession: '',
        photo: ''
      }
    }
  },
  methods: {
    onSubmit(form) {
      axios.post('/api/staffList/add', this.form).then(res => {
        if (res.data.code !== 'OK') {
          return this.$message.error('添加失败')
        } else {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.form = '';
        }
      })
    },
    // handleAvatarSuccess(res, file) {
    //   this.photo = URL.createObjectURL(file.raw)
    // },
    // beforeAvatarUpload(file) {
    //   const isJPG = file.type === 'image/jpeg'
    //   const isLt2M = file.size / 1024 / 1024 < 2

    //   if (!isJPG) {
    //     this.$message.error('上传头像图片只能是 JPG 格式!')
    //   }
    //   if (!isLt2M) {
    //     this.$message.error('上传头像图片大小不能超过 2MB!')
    //   }
    //   return isJPG && isLt2M
    // }
  }
}
</script>
<style lang="less" scoped>
.content {
  width: 40%;
  margin: 0 auto;
}
// 文件上传
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #666;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-date-editor.el-input {
  width: 100% !important;
}
.el-select {
  display: inline-block;
  position: absolute !important;
  width: 100%;
}
</style>
