<template>
    <div>
      <el-row :gutter="20" class="mgb20">
        <el-col :span="6">
          <el-card>
            <div class="grid-content">
              <div class="grid-num">{{consumerCount}}</div>
              <div>用户总数</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div class="grid-content">
              <div class="grid-num">{{songCount}}</div>
              <div>歌曲总数</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div class="grid-content">
              <div class="grid-num">{{singerCount}}</div>
              <div>歌手数量</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div class="grid-content">
              <div class="grid-num">{{songListCount}}</div>
              <div>歌单数量</div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="mgb20">
        <el-col :span="12">
          <el-card>
            <div style="background-color: white;text-align: center">
              <h3>男女比例分布图</h3>
              <ve-pie :data="consumerBySex" :theme="options"></ve-pie>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <div style="background-color: white;text-align: center">
              <h3>歌曲类型分布</h3>
              <ve-histogram :data="songStyle"></ve-histogram>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="mgb20">
        <el-col :span="12">
          <el-card>
            <div style="background-color: white;text-align: center">
              <h3>歌手性别比例</h3>
              <ve-pie :data="singerSex"></ve-pie>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <div style="background-color: white;text-align: center">
              <h3>歌手国籍分布</h3>
              <ve-histogram :data="country"></ve-histogram>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import {getAllConsumer, getAllSinger, getAllSong, getAllSongList} from '../../api';
    export default {
      name: "InfoPage",
      data(){
        return{
          consumerCount: 0,   //用户总数
          songCount: 0,       //歌曲总数
          singerCount: 0,     //歌手总数
          songListCount: 0,   //歌单总数
          consumer: [],       //所有的用户
          consumerBySex:{     //用户性别比例
            columns: ['性别','总数'],
            rows: [
              {'性别': '男','总数': 0},
              {'性别': '女','总数': 0}
            ]
          },
          options: {
            color: ['#87cefa','#ffc0cb']
          },
          songStyle:{           //歌单风格分类
            columns: ['风格','总数'],
            rows: [
              {'风格': '流行音乐','总数': 0},
              {'风格': '摇滚','总数': 0},
              {'风格': '轻音乐','总数': 0},
              {'风格': '华语','总数': 0},
              {'风格': '粤语','总数': 0},
              {'风格': '欧美','总数': 0},
              {'风格': '日韩','总数': 0},
              {'风格': '说唱','总数': 0},
            ]
          },
          singerSex:{       //歌手性别比例
            columns: ['性别','总数'],
            rows: [
              {'性别': '女','总数': 0},
              {'性别': '男','总数': 0},
              {'性别': '组合','总数': 0},
              {'性别': '不明','总数': 0},
            ]
          },
          country: {       //歌手国籍比例
            columns: ['国籍','总数'],
            rows: [
              {'国籍': '中国','总数': 0},
              {'国籍': '韩国','总数': 0},
              {'国籍': '日本','总数': 0},
              {'国籍': '美国','总数': 0},
              {'国籍': '意大利','总数': 0},
              {'国籍': '英国','总数': 0},
            ]
          },
        }
      },
      created() {

      },
      mounted() {
        this.getConsumer();
        this.getSong();
        this.getSinger();
        this.getSongList();

      },
      methods: {
        getConsumer(){
          getAllConsumer()
            .then(res => {
              this.consumer = res;
              this.consumerCount = res.length;
              this.consumerBySex.rows[0]['总数'] = this.setSex(1,this.consumer);
              this.consumerBySex.rows[1]['总数'] = this.setSex(0,this.consumer);
            })
        },
        getSong(){
          getAllSong()
            .then(res => {
              this.songCount = res.length;
            })
        },
        getSinger(){
          getAllSinger()
            .then(res => {
              this.singerCount = res.length;
              this.singerSex.rows[0]['总数'] = this.setSex(0,res);
              this.singerSex.rows[1]['总数'] = this.setSex(1,res);
              this.singerSex.rows[2]['总数'] = this.setSex(2,res);
              this.singerSex.rows[3]['总数'] = this.setSex(3,res);

              for (let item of res){
                this.getByCountry(item.location);
              }
            })
        },
        getSongList(){
          getAllSongList()
            .then(res => {
              this.songListCount = res.length;
              for(let item of res){
                this.getByStyle(item.style)
              }
            })
        },
        setSex(sex,val){
          let count = 0;
          for (let item of val){
            if (sex == item.sex){
              count++;
            }
          }
          return count;
        },
        getByStyle(style){
          for (let item of this.songStyle.rows){
            if (style.includes(item['风格'])){
              item['总数']++;
            }
          }
        },
        getByCountry(location){
          for (let item of this.country.rows){
            if (location.includes(item['国籍'])){
              item['总数']++;
            }
          }
        },
      }
    }
</script>

<style scoped>
  .grid-content {
    display: inline;
    align-items: center;
    height: 50px;
    text-align: center;
    font-size: 15px;
    color: #ffcc66;
  }
  .grid-num {
    font-size: 30px;
    font-weight: bold;
  }
</style>
