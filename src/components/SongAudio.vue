<template>
  <div class="song-audio">
    <audio id="player"
           :src="url"
           controls = "controls"
           preload="true"
           @canplay="startPlay"
           @ended="ended"
    ></audio>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
    export default {
      name: "SongAudio",
      computed:{
        ...mapGetters([
          'id',
          'url',
          'isPlay'
        ])
      },
      watch:{
        //监听播放还是暂停
        isPlay: function(){
          this.togglePlay();
        }
      },
      methods:{
        //获取链接后准备播放
        startPlay(){
          let player = document.querySelector('#player');
          //开始播放
          player.play();
        },
        //播放完之后操作
        ended(){
          this.isPlay = false
        },
        togglePlay(){
          let player = document.querySelector('#player');
          if (this.isPlay){
            player.play();
          }else{
            player.pause();
          }
        }
      }
    }
</script>

<style scoped>
  .song-audio {
    display: none;
  }
</style>
