import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from "../components/Home";
import InfoPage from "../components/pages/InfoPage";
import ConsumerPage from "../components/pages/ConsumerPage";
import SingerPage from "../components/pages/SingerPage";
import SongListPage from "../components/pages/SongListPage";
import SongPage from "../components/pages/SongPage";
import ListSongPage from "../components/pages/ListSongPage";
import Collect from "../components/pages/CollectPage";
import CommentPage from "../components/pages/CommentPage";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      children:[
        {
          path: '/Info',
          name: 'InfoPage',
          component: InfoPage
        },
        {
          path: '/Consumer',
          component: ConsumerPage
        },
        {
          path: '/Singer',
          component: SingerPage
        },
        {
          path: '/SongList',
          component: SongListPage
        },
        {
          path: '/Song',
          component: SongPage
        },
        {
          path: '/ListSong',
          component: ListSongPage
        },
        {
          path: '/collect',
          component: Collect
        },
        {
          path: '/comment',
          component: CommentPage
        }
      ]
    }
  ]
})
