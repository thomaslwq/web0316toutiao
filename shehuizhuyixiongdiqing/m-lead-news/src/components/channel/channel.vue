<template>
  <div class="channel">
    <div class="c-header">
      <a class="el-icon-arrow-left" href="/"></a>
      <span>频道管理</span>
    </div>
    <div class="c-added">
      <h1>—— 点击删除以下频道 ——</h1>
      <transition-group tag="ul" name="added">
        <li
          v-for="(item,index) in channelList.added"
          :key="item"
          :class="{'c-rcmd': index === 0}"
          @click="del(index)"
        >{{item}}</li>
      </transition-group>
    </div>
    <div class="c-rest">
      <h1>—— 点击添加以下频道 ——</h1>
      <transition-group tag="ul" name="rest">
        <li v-for="(item,index) in channelList.rest" :key="item" @click="add(index)">{{item}}</li>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    channelList() {
      return this.$store.state.channelList;
    }
  },
  methods: {
    del(index) {
      let channelList = this.channelList;
      if (index)
        channelList.rest.push(...this.channelList.added.splice(index, 1));
      this.$store.commit("channelList", channelList);
    },
    add(index) {
      let channelList = this.channelList;
      channelList.added.push(...this.channelList.rest.splice(index, 1));
      this.$store.commit("channelList", channelList);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@keyframes enter {
  from {
    transform: scale(0.5);
  }
  to {
    transform: scale(1);
  }
}

.channel {
  .c-header {
    height: 100px;
    background: #799;
    color: #fff;
    font-size: 33px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    a {
      position: absolute;
      left: 20px;
      font-size: 44px;
      font-weight: 700;
      color: #fff;
    }
  }

  .c-added,
  .c-rest {
    h1 {
      padding: 20px;
      font-size: 27px;
      color: #666;
      text-align: center;
    }

    ul {
      display: flex;
      flex-flow: wrap;
      position: relative;

      li {
        width: calc((100% - 160px) / 4);
        height: 70px;
        border: 2px solid #999;
        border-radius: 5px;
        margin: 10px 20px;
        text-align: center;
        line-height: 70px;
        font-size: 30px;
        animation: enter 0.5s ease;

        &.c-rcmd {
          background: #eaeaea;
        }
      }
    }
  }

  .added-enter-active,
  .added-leave-active,
  .added-move,
  .rest-enter-active,
  .rest-leave-active,
  .rest-move {
    transition: all 1s ease;
  }

  .added-enter,
  .added-leave-to,
  .rest-enter,
  .rest-leave-to {
    transform: scale(0.5);
    opacity: 0;
  }

  .added-leave-active {
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .rest-leave-active {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
