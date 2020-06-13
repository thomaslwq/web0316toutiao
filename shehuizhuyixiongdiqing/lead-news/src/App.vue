<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
@import url("./assets/reset.css");
@import url("https://at.alicdn.com/t/font_1879325_pyya2gom3c.css");
@import url("./assets/detail.css");

html,
body {
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.el-tabs__item.is-active {
  color: #f66 !important;
}
.el-tabs__item:hover {
  color: #f66 !important;
}
.el-tabs__active-bar {
  background-color: #ed4040 !important;
}
.el-tabs__header {
  margin: 0;
}
.el-tabs__nav-wrap {
  padding-left: 20px;
}
.el-popover {
  width: 386px;
  height: 206px;
}
.el-textarea,
.el-textarea__inner {
  padding-top: 10px;
  background: #f6f6f4;
  border: none;
}
.el-input__inner {
  font-size: 18px;
  font-weight: 600;
  border: none;
  background: #f6f6f4;
}
.ql-toolbar.ql-snow {
  border-radius: 20px;
  background: #fff;
}
.el-input,
.el-input__count-inner,
.quillWrapper {
  background: #f6f6f4;
}
.quillWrapper {
  padding: 0 20px;
}
.ql-container.ql-snow {
  border: none !important;
}
.el-input-group__append {
  border: none !important;
  border-radius: 0 !important;
}
</style>
