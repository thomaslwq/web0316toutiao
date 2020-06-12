<template>
<div class='newsList'>
    <div class="newsList-refresh">
        <div class="refresh-text">点击刷新</div>
    </div>
    <div class="newsList-list">


      <div class="list-item">
        <div class="item-left">
          <img src="http://wlanya.oss-cn-shenzhen.aliyuncs.com/2020_06_11/1c872634-9527-7d84-5da2-a72e5911078b.jpg" />
        </div>
        <div class="item-right">
          <div class="right-title">这里是文章标题</div>
          <div class="right-profile">
            <img src="http://sf1-ttcdn-tos.pstatp.com/img/pgc-image/f6cc8e95467f44e3bcdcf9d4ca0a58f6~120x256.image" />
            <div class="profile-nickname">小菜比</div>
          </div>
          <div class="right-date">2020-06-12 11:30:51</div>
        </div>
      </div>
      <div class="list-item">
        <div class="item-left">
          <img src="http://wlanya.oss-cn-shenzhen.aliyuncs.com/2020_06_11/1c872634-9527-7d84-5da2-a72e5911078b.jpg" />
        </div>
        <div class="item-right">
          <div class="right-title">这里是文章标题</div>
          <div class="right-profile">
            <img src="http://sf1-ttcdn-tos.pstatp.com/img/pgc-image/f6cc8e95467f44e3bcdcf9d4ca0a58f6~120x256.image" />
            <div class="profile-nickname">小菜比</div>
          </div>
          <div class="right-date">2020-06-12 11:30:51</div>
        </div>
      </div>
      <div class="list-item">
        <div class="item-left">
          <img src="http://wlanya.oss-cn-shenzhen.aliyuncs.com/2020_06_11/1c872634-9527-7d84-5da2-a72e5911078b.jpg" />
        </div>
        <div class="item-right">
          <div class="right-title">这里是文章标题</div>
          <div class="right-profile">
            <img src="http://sf1-ttcdn-tos.pstatp.com/img/pgc-image/f6cc8e95467f44e3bcdcf9d4ca0a58f6~120x256.image" />
            <div class="profile-nickname">小菜比</div>
          </div>
          <div class="right-date">2020-06-12 11:30:51</div>
        </div>
      </div>
      <div class="list-item">
        <div class="item-left">
          <img src="http://wlanya.oss-cn-shenzhen.aliyuncs.com/2020_06_11/1c872634-9527-7d84-5da2-a72e5911078b.jpg" />
        </div>
        <div class="item-right">
          <div class="right-title">这里是文章标题</div>
          <div class="right-profile">
            <img src="http://sf1-ttcdn-tos.pstatp.com/img/pgc-image/f6cc8e95467f44e3bcdcf9d4ca0a58f6~120x256.image" />
            <div class="profile-nickname">小菜比</div>
          </div>
          <div class="right-date">2020-06-12 11:30:51</div>
        </div>
      </div>
      
      


    </div>
</div>
</template>

<script>

export default {
components: {},
data() {
   return {

   };
},
}
</script>
<style lang='less' scoped>
.newsList {
  .newsList-refresh {
      width: 100%;
      height: 30px;
      line-height: 30px;
      border: 1px solid #95c1e8;
      background-color: #eff6fc;
      color: #4b8cd6;
      text-align: center;
      border-radius: 5px;
      cursor: pointer;
    .refresh-text {

    }
  }

  .newsList-list {
    .list-item {
      display: flex;
      padding: 20px 0;
      border-bottom: 1px solid #ddd;
      .item-left {
        img {
          width: 156px;
          height: 100px;
        }
      }

      .item-right {
        margin: 10px;
        line-height: 30px;
        .right-title {
          font-size: 18px;
          font-weight: 600;
        }

        .right-profile {
          display: flex;
          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 8px;
          }

          .profile-nickname {

          }
        }

        .right-date {

        }
      }
    }
  }
}
</style>