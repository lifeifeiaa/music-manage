<template>
  <div id="app">
    <div style="z-index: 100;position: fixed">
      <SongAudio/>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import SongAudio from "./components/SongAudio";

export default {
  name: 'App',
  components: {
    SongAudio
  }
}
</script>

<style>
</style>
