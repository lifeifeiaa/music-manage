export const mixin = {
  methods: {
    notify(title, type) {
      this.$notify({
        title: title,
        type: type
      })
    },
    getUrl(url) {
      return `${this.$store.state.HOST}${url}`
    },
    //获取性别
    changeSex(value){
      if (value == 0){
        return '女';
      }
      if (value == 1){
        return '男';
      }
      if (value == 2){
        return '组合';
      }
      if (value == 3){
        return '不明';
      }
      return value;
    },
    //生日格式
    attachBirth(val){
      return String(val).substr(0,10);
    },
    //上传图片之前的校验
    beforeAvatorUpload(file){
      const isJpg = (file.type === 'image/jpg')||(file.type === 'image/jpeg')||(file.type() === 'image/png');
      if (!isJpg){
        this.$message.error('上传图片只能是jpg或png格式');
        return false;
      }
      //小于2m
      const isLt2M = (file.size / 1024 /1024) < 2;
      if (!isLt2M){
        this.$message.error("上传头像图片大小不能超过2m");
        return false;
      }
      return true;
    },
    //上传图片成功之后
    handleAvatorSuccess(res){
      let _this = this;
      if (res.code == 1){
        _this.getData();
        _this.$message.success(res.msg);
      }else{
        _this.$message.error(res.msg);
      }
    },
    //弹出删除窗口
    handleDelete(id){
      this.idx = id;
      this.deleteVisible =true;
    },
    //把已经选择的项赋值给multipleSelection
    handleSelectionChange(val){
      this.multipleSelection = val;
    },
    //批量删除
    delAll(){
        for (let item of this.multipleSelection){
          this.handleDelete(item.id);
          this.deleteRow();
        }
        this.multipleSelection = [];
    },
  }
}
