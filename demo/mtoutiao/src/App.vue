<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {

}
</script>

<style >
        * {
            padding: 0px;
            margin: 0px;
            box-sizing: border-box;
        }

        html {
            font-size: 62.5%;
            --themeColor: #d23f42;

            /* font-size:10%; */
            /* 
                基本的单位 rem 1rem = 10px 
                100vw 整个屏幕的宽度
                10vw 10%的屏幕的宽度
                100vh 整个屏幕的高度
                10vh 10%的屏幕的高度
                */
        }
</style>
