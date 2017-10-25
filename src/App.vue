<template>
  <div id="app">
    <appHeader></appHeader>
    <router-view></router-view>
  </div>
</template>

<script>
import appHeader from '@/components/appHeader'
export default {
  name: 'app',
  components: {
    appHeader
  }
}
</script>
<style src='@/assets/css/common.css'></style>
