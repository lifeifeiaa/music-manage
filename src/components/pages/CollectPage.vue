<template>
  <div class="table">
    <div class="crumbs">
      <i class="el-icon-tickets"></i>收藏信息
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" size="mini" @click="delAll">批量删除</el-button>
        <el-input v-model="select_word" size="mini" placeholder="筛选关键词" class="handle-input"></el-input>
      </div>
    </div>

    <el-table size="mini" ref="multipleTable" border style="width: 100%" height="480px" :data="tableData" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column prop="name" label="歌手-歌名" align="center"></el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--删除弹窗-->
    <el-dialog title="删除歌曲" :visible.sync="deleteVisible" width="300px" center>
      <div align="center">删除不可恢复，是否确定删除？</div>
      <span slot="footer">
        <el-button size="mini" @click="deleteVisible = false">取消</el-button>
        <el-button size="mini" @click="deleteRow">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

  import {mixin} from "../../mixins/index"
  import {songOfSongId,deleteCollect,getCollectOfUserId} from "../../api";
  export default {
    mixins:[mixin],
    name: "Collect",
    props: ['id'],
    data(){
      return{
        deleteVisible: false, //删除弹窗
        tableData:[],
        tempData: [],
        select_word: '',
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
      //查询所有歌曲
      getData(){
        this.tableData = [];
        this.tempData = [];
        getCollectOfUserId(this.$route.query.id)
          .then(res => {
            for (let item of res){
              this.getSong(item.songId);
            }
          })
      },
      //根据歌曲id查询歌曲对象，放到tableData和tempData中
      getSong(id){
        songOfSongId(id)
          .then(res => {
            this.tempData.push(res);
            this.tableData.push(res);
          })
          .catch(err => {
            console.log(err);
          })
      },
      //删除歌曲
      deleteRow(){
        deleteCollect(this.$route.query.id,this.idx)
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
    }
  }
</script>

<style scoped>
  .handle-box {
    margin-bottom: 20px;
  }
  .handle-input {
    width: 250px;
    display: inline-block;
  }
</style>
