<template>
  <div class="user-edit">
    <div class="e-header">
      <div class="e-headerCt">
        <a href="/" class="e-logo">
          <img src="//sf1-ttcdn-tos.pstatp.com/obj/ttfe/pgcfe/sz/mp-logo-toutiaohao.svg" />
        </a>
        <div class="e-user">
          <a class="e-info" @click="goTo('/userCenter')">
            <img :src="userInfo.avator" />
            <span>{{userInfo.nickname}}</span>
          </a>
          <div @click="logOut">退出登录</div>
        </div>
      </div>
    </div>
    <div class="e-content">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="账号信息" name="userInfo">
          <el-form :model="formData" label-width="80px">
            <el-form-item label="名称">
              <el-input v-model="formData.nickname"></el-input>
            </el-form-item>
            <el-form-item label="头像">
              <el-upload
                list-type="picture"
                action="http://tt.linweiqin.com/api/tt/aliossUpload"
                :show-file-list="false"
                :http-request="avatorUpLoad"
                :on-success="avatorUpLoadSuccess"
                :before-upload="beforeUpload"
              >
                <img v-if="formData.avator" :src="formData.avator" />
                <i v-else class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click.prevent="updateInfo">更新资料</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="密码管理" name="userPwd">
          <el-form :model="formPwd" label-width="80px">
            <el-form-item label="当前密码">
              <el-input type="password" v-model="formPwd.curPwd" show-password></el-input>
            </el-form-item>
            <el-form-item label="新密码">
              <el-input type="password" v-model="formPwd.newPwd" show-password></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click.prevent="updatePsw">更改密码</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: "userInfo",
      username: "",
      formData: {
        nickname: "",
        avator: ""
      },
      formPwd: {
        curPwd: "",
        newPwd: ""
      }
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  mounted() {
    if (this.userInfo.oauth_token) {
      this.formData.nickname = this.userInfo.nickname;
      this.formData.avator = this.userInfo.avator;
    } else {
      this.$message(`请先登录`);
      this.$router.replace("/");
    }
  },
  methods: {
    goTo(url) {
      this.$router.replace(url);
    },
    logOut() {
      this.axios.post("/logout").then(res => {
        this.$store.commit("ifLogin", false);
      });
      this.$message(`您已退出登录状态`);
      this.$router.replace("/");
    },
    avatorUpLoad(img) {
      let params = new FormData();
      params.append("file", img.file);
      this.axios
        .post(img.action, params)
        .then(res => {
          if (res.data.ret == 0) {
            img.onSuccess(res.data);
          } else {
            img.onFail(res.data);
          }
        })
        .catch(err => {
          img.onError();
        });
    },
    avatorUpLoadSuccess(res, file) {
      this.formData.avator = res.url;
    },
    beforeUpload(file) {
      if (file.type !== "image/jpeg")
        this.$message(`文件类型必须是JPG/JPEG格式`);
      if (file.size > 2 * 1024 * 1024) this.$message(`文件大小必须不大于2Mb`);
      return file.type === "image/jpeg" && file.size <= 2 * 1024 * 1024;
    },
    updateInfo() {
      let params = new FormData();
      params.append("nickname", this.formData.nickname);
      params.append("avator", this.formData.avator);
      params.append("oauth_token", this.userInfo.oauth_token);
      this.axios.post("/updateUserInfo", params).then(res => {
        this.$message(`${res.data.msg}`);
        if (res.data.ret == 0) {
          let user = {...this.userInfo}
          user.nickname = this.formData.nickname;
          user.avator = this.formData.avator;
          this.$store.commit("userInfo", user);
        }
      });
    },
    updatePsw() {
      let params = new FormData();
      params.append("currentPassword", this.formPwd.curPwd);
      params.append("updatePassword", this.formPwd.newPwd);
      params.append("oauth_token", this.userInfo.oauth_token);
      this.axios.post("/updatePassword", params).then(res => {
        this.$message(`${res.data.msg}`);
        this.formPwd.curPwd = '';
        this.formPwd.newPwd = '';
      });
    }
  }
};
</script>

<style scoped lang="less">
.user-edit /deep/ .el-input__inner {
  background: #fff;
  border: 1px solid #eee;
  font-size: 15px;
  font-weight: 200;
}

.user-edit /deep/ .el-upload {
  width: 150px;
  height: 150px;
  border-radius: 5px;
  border: 1px dashed #ccc;
  overflow: hidden;

  &:hover {
    border: 1px dashed #f66;
  }

  img {
    width: 100%;
    height: 100%;
  }
}

.user-edit {
  .e-header {
    width: 100%;
    box-shadow: 0 0 5px #ccc;
    background: #fff;
    margin-bottom: 15px;
    position: fixed;
    top: 0;
    z-index: 10;

    .e-headerCt {
      width: 1170px;
      height: 60px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .e-user {
        height: 100%;
        position: relative;
        display: flex;

        .e-info {
          display: flex;
          align-items: center;
          font-size: 15px;

          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 10px;
          }

          &::after {
            content: "";
            display: block;
            width: 0;
            height: 0;
            border: 5px solid #666;
            border-left-color: transparent;
            border-right-color: transparent;
            border-bottom-color: transparent;
            transform: translateY(3px);
            margin-left: 15px;
          }
        }

        div {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 110px;
          height: 0;
          border-radius: 5px;
          box-shadow: 0 3px 3px #ccc;
          background: #f6f6f4;
          opacity: 0;
          position: absolute;
          bottom: 0px;
          z-index: -10;
          transition: all .3s ease;
          cursor: pointer;
        }

        &:hover div {
          height: 40px;
          bottom: -40px;
          opacity: 1;
        }
      }
    }
  }

  .e-content {
    width: 1028px;
    margin: 100px auto 0;

    .el-tabs {
      .el-tab-pane {
        padding-top: 20px;

        .el-form {
          .el-form-item {
            .el-input {
              border-radius: 5px;
            }
          }
        }
      }
    }
  }
}
</style>
