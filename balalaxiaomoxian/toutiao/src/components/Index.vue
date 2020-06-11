<template>
<div class="tt-index">
    <div class="tt-header">
        <Header></Header>
    </div>
    <div class="tt-content">
        <div class="tt-content-left">
            <Nav class="left-nav"></Nav>
        </div>
        <div class="tt-content-middle"></div>
        <div class="tt-content-right">
            <div class="right">
                <SearchInput class="right-searchInput"></SearchInput>
                <Login class="right-login"></Login>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Header from "../components/header/Header"
import Nav from "../components/nav/Nav"
import SearchInput from "../components/searchInput/SearchInput"
import Login from "../components/login/Login"

export default {
components: {
    Header,
    Nav,
    SearchInput,
    Login,
},
data() {
   return {

   };
},

methods: {

},


}
</script>
<style lang="less"  scoped>
.tt-index {
  .tt-header {
    header {

    }
  }

  .tt-content {
      display: flex;
      padding: 0px 10vw 0px 10vw;
      width: 100vw;
      margin-top: 20px;
    .tt-content-left {
        flex: 1;
        .left-nav {
            margin: 0 auto;
        }
    }

    .tt-content-middle {
        flex: 2.5;
    }

    .tt-content-right {
        flex: 1.5;
        .right{
            width: 340px;
            margin:0  auto;
            .right-searchInput {

            }
            .right-login {
                margin-top: 20px;
            }
        }
    }
  }
}
</style>