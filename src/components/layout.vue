<template>
  <div>
    <app-header></app-header>
    <app-navbar></app-navbar>
    <app-main></app-main>
  </div>
</template>

<script>
import AppHeader from "./AppHeader"
import AppNavbar from "./AppNavbar"
import AppMain from "./AppMain"
export default {
  name:'TheLayout',
  components:{
    AppHeader,
    AppNavbar,
    AppMain
  }
}
</script>

<style scoped>

.header{
  position: absolute;
  line-height: 50px;
  background-color: #130505;
  left: 0px;
  right: 0px;
  top: 0px;
}
.navbar{
  position: absolute;
  width: 200px;
  background-color: #545c64;
  left: 0;
  bottom: 0;
  top: 50px;
  overflow-y: auto;
}
.main{
  position: absolute;
  /* background-color: #1e2020; */
  left: 200px;
  right: 0;
  bottom: 0;
  top: 50px;
  padding: 5px;
  overflow-y: auto;
}
</style>