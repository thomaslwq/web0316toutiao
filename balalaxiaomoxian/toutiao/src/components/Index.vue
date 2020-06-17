<template>
<div class="tt-index">
    <div class="tt-header">
        <Header></Header>
    </div>
    <div class="tt-content">
        <div class="tt-content-left">
            <Nav class="left-nav"></Nav>
        </div>
        <div class="tt-content-middle">
            <Post class="post"></Post>
            <NewsList class="newsList"></NewsList>
        </div>
        <div class="tt-content-right">
            <div class="right">
                <SearchInput class="right-searchInput"></SearchInput>
                <Login class="right-login"></Login>
                <HotNews class="right-hotNews"></HotNews>
                <More class="right-more"></More>
                <FriendLink class="right-friendLink"></FriendLink>
                <CopyRight class="right-copyRight"></CopyRight>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Header from "../components/header/Header"
//右侧，导航条
import Nav from "../components/nav/Nav"
//中间
import Post from "../components/post/Post"
import NewsList from "../components/news/NewsList"
//右侧
import SearchInput from "../components/searchInput/SearchInput"
import Login from "../components/login/Login"
import HotNews from "../components/hotNews/HotNews"
import More from "../components/hotNews/More"
import FriendLink from "../components/hotNews/FriendLink"
import CopyRight from "../components/hotNews/CopyRight"

export default {
components: {
    Header,
    Nav,
    SearchInput,
    Login,
    HotNews,
    More,
    Post,
    FriendLink,
    CopyRight,
    NewsList,
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
        .post {

        }

        .newsList {
            margin-top: 20px;
        }
    }

    .tt-content-right {
        flex: 1.5;
        .right{
            width: 340px;
            margin:0  auto;
            .right-searchInput {

            }
            .right-login {
                margin: 20px 0;
            }
            .right-hotNews{

            }
        }
    }
  }
}
</style>