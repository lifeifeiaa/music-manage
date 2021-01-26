<template>
  <div class="table">
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" size="mini" @click="delAll">批量删除</el-button>
        <el-input v-model="select_word" size="mini" placeholder="请输入歌手名" class="handle-input"></el-input>
        <el-button type="primary" size="mini" @click="centerDialogVisible = true">添加歌手</el-button>
      </div>
    </div>

    <el-table size="mini" ref="multipleTable" border style="width: 100%" height="480px" :data="data" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column label="歌手图片" width="110" align="center">
        <template slot-scope="scope">
          <div class="singer-img">
            <img :src="getUrl(scope.row.pic)" style="width: 100%"/>
          </div>
          <el-upload :action="uploadUrl(scope.row.id)" :before-upload="beforeAvatorUpload"
          :on-success="handleAvatorSuccess">
            <el-button size="mini">更新图片</el-button>
          </el-upload>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="歌手" width="120" align="center"></el-table-column>
      <el-table-column label="性别" width="50"  align="center">
        <template slot-scope="scope">
          {{changeSex(scope.row.sex)}}
        </template>
      </el-table-column>
      <el-table-column label="生日" width="120" align="center">
        <template slot-scope="scope">
          {{attachBirth(scope.row.birth)}}
        </template>
      </el-table-column>
      <el-table-column prop="location" label="地区" width="100" align="center"></el-table-column>
      <el-table-column label="简介" >
        <template slot-scope="scope">
          <p style="height: 100px;overflow: scroll">{{scope.row.introduction}}</p>
        </template>
      </el-table-column>
      <el-table-column label="歌曲管理" width="110" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="songEdit(scope.row.id,scope.row.name)">歌曲管理</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background layout="total,prev,pager,next"
        :current-page="currentPage" :page-size="pageSize"
        :total="tableData.length" @current-change="handleCurrentChange">
      </el-pagination>
    </div>

    <!--添加歌手的弹窗-->
    <el-dialog title="添加歌手" :visible.sync="centerDialogVisible" width="400px" center>
      <el-form :model="registerForm" ref="registerForm" label-width="80px">
        <el-form-item prop="name" label="歌手名" size="mini">
          <el-input v-model="registerForm.name" placeholder="歌手名"></el-input>
        </el-form-item>
        <el-form-item label="性别" size="mini">
          <el-radio-group v-model="registerForm.sex">
            <el-radio :label="0">女</el-radio>
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">组合</el-radio>
            <el-radio :label="3">不明</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="birth" label="生日" size="mini">
          <el-date-picker type="date" placeholder="选择生日" v-model="registerForm.birth" style="width: 100%"></el-date-picker>
        </el-form-item>
        <el-form-item prop="location" label="地区" size="mini">
          <el-input v-model="registerForm.location" placeholder="地区"></el-input>
        </el-form-item>
        <el-form-item prop="introduction" label="简介" size="mini">
          <el-input type="textarea" v-model="registerForm.introduction" placeholder="简介"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="mini" @click="centerDialogVisible = false">取消</el-button>
        <el-button size="mini" @click="addSinger">确认</el-button>
      </span>
    </el-dialog>

    <!--修改歌手的弹窗-->
    <el-dialog title="修改歌手" :visible.sync="editVisible" width="400px" center>
      <el-form :model="form" ref="registerForm" label-width="80px">
        <el-form-item prop="name" label="歌手名" size="mini">
          <el-input v-model="form.name" placeholder="歌手名"></el-input>
        </el-form-item>
        <el-form-item label="性别" size="mini">
          <el-radio-group v-model="form.sex">
            <el-radio :label="0">女</el-radio>
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">组合</el-radio>
            <el-radio :label="3">不明</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日" size="mini">
          <el-date-picker type="date" placeholder="选择生日" v-model="form.birth" style="width: 100%"></el-date-picker>
        </el-form-item>
        <el-form-item prop="location" label="地区" size="mini">
          <el-input v-model="form.location" placeholder="地区"></el-input>
        </el-form-item>
        <el-form-item prop="introduction" label="简介" size="mini">
          <el-input type="textarea" v-model="form.introduction" placeholder="简介"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="mini" @click="editVisible = false">取消</el-button>
        <el-button size="mini" @click="editSave">确认</el-button>
      </span>
    </el-dialog>

    <!--删除弹窗-->
    <el-dialog title="删除歌手" :visible.sync="deleteVisible" width="300px" center>
      <div align="center">是否确定删除这个歌手？</div>
      <span slot="footer">
        <el-button size="mini" @click="deleteVisible = false">取消</el-button>
        <el-button size="mini" @click="deleteRow">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {setSinger,getAllSinger,updateSinger,delSinger} from "../../api";
  import {mixin} from "../../mixins/index"
  export default {
      mixins:[mixin],
      name: "SingerPage",
      data(){
        return{
          centerDialogVisible: false,
          editVisible: false,   //编辑弹出是否显示
          deleteVisible: false, //删除弹窗
          registerForm:{    //添加框
            name: '',
            sex: '',
            birth: '',
            location: '',
            introduction: ''
          },
          form:{    //编辑框
            id: '',
            name: '',
            sex: '',
            birth: '',
            location: '',
            introduction: ''
          },
          tableData:[],
          tempData: [],
          select_word: '',
          pageSize: 3,  //分页每一页数量
          currentPage: 1,  //当前页
          idx: -1,     //当前选择项
          multipleSelection: [],    //那些项打勾了
        }
      },
    computed:{
        data(){
          return this.tableData.slice((this.currentPage - 1) * this.pageSize,this.currentPage * this.pageSize)
        }
    },
    watch:{
        //搜索框里面发生变化时，搜索结果table列表的内容跟着发生变化
        select_word: function () {
          if (this.select_word == ''){
            this.tableData = this.tempData;
          }else{
            this.tableData = [];
            for (let item of this.tempData){
              if (item.name.includes(this.select_word)){
                this.tableData.push(item);
              }
            }
          }
        }
    },
    created() {
        this.getData();
    },
    methods:{
        //获取当前页
      handleCurrentChange(val){
        this.currentPage = val
      },
        //查询所有歌手
      getData(){
          this.tableData = [];
          this.tempData = [];
            getAllSinger()
              .then(res => {
                this.tableData = res;
                this.tempData = res;
                this.currentPage = 1;
              })
        },
        //添加歌手
      addSinger(){
          let d = this.registerForm.birth;
          let datetime = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
          let params = new URLSearchParams();
          params.append('name',this.registerForm.name);
          params.append('sex',this.registerForm.sex);
          params.append('pic','/img/singerPic/singer.jpg');
          params.append('birth',datetime);
          params.append('location',this.registerForm.location);
          params.append('introduction',this.registerForm.introduction);

          setSinger(params)
          .then(res => {
            if (res.code == 1){
              this.getData();
              this.$message.success("添加成功");
            }else{
              this.$message.error("添加失败")
            }
          })
          .catch(err => {
            console.log(err)
          });
          this.centerDialogVisible = false;
        },
      //弹出编辑页
      handleEdit(row){
        this.editVisible = true;
        this.form = {
          id: row.id,
          name: row.name,
          sex: row.sex,
          birth: row.birth,
          location: row.location,
          introduction: row.introduction
        }
      },
      //修改歌手
      editSave(){
        let d = new Date(this.form.birth);
        let datetime = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
        let params = new URLSearchParams();
        params.append('id',this.form.id);
        params.append('name',this.form.name);
        params.append('sex',this.form.sex);
        params.append('birth',datetime);
        params.append('location',this.form.location);
        params.append('introduction',this.form.introduction);

        updateSinger(params)
          .then(res => {
            if (res.code == 1){
              this.getData();
              this.$message.success("修改成功");
            }else{
              this.$message.error("修改失败")
            }
          })
          .catch(err => {
            console.log(err)
          });
        this.editVisible = false;
      },
        //更新图片
      uploadUrl(id){
          return `${this.$store.state.HOST}/singer/updateSingerPic?id=${id}`
        },
      //删除一名歌手
      deleteRow(){
        delSinger(this.idx)
        .then(res => {
          if (res){
            this.getData();
            this.$message.success("删除成功");
          }else{
            this.$message.success("删除失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
        this.deleteVisible = false;
      },
      //转向歌曲管理页面
      songEdit(id,name){
        this.$router.push({path:`/Song`,query:{id,name}});
      },
      }
    }
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}
  .singer-img {
    width: 100%;
    height: 80px;
    border-radius: 5px;
    margin-bottom: 5px;
    overflow: hidden;
  }
  .handle-input {
    width: 250px;
    display: inline-block;
  }
  .pagination {
    display: flex;
    justify-content: center;
  }
</style>
