<template>
    <div class='hearder'>
        <div class="right">
            <a href="javascript:;">下载App</a>
            <a href="javascript:;">注册头条号</a>
        </div>
        <div class="left">
            <a href="javascript:;">侵权投诉</a>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
   return {

   };
},

}
</script>
<style lang='less' scoped>
.hearder {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: black;
    position: relative;
  .right {
      a:nth-child(1){
          margin-left: 10px;
      }
    a {
        color: #ede9d1;
        margin: 10px;
    }
  }

  .left {
      a{
          position: absolute;
          right: 20px;
          color: #ddd;
      }
  }
}
</style>