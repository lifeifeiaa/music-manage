import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    HOST: 'http://47.100.137.146:8888',
    //音乐播放设置
    isPlay: false,      //是否播放中
    url: '',
    id: ''
  },
  getters: {
    isPlay: state => state.isPlay,
    url: state => state.url,
    id: state => state.id
  },
  mutations: {
    setIsPlay: (state, payload) => {state.isPlay = payload},
    setUrl: (state, payload) => {state.url = payload},
    setId: (state, payload) => {state.id = payload}
  }
})

export default store
