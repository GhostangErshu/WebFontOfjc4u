<template>
  <div
    class="all"
    :style="{backgroundImage:'url(' + imgUrl + ')'}"
    v-title
    data-title="LOGIN | JC4U"
  >
    <div @keyup.enter="Check" class="login">
      <div class="login-box" :style="'width:'+boxWidth+'px;'">
        <div v-show="isShow">
          <div class="login-box-tips">
            <p>登录/LOGIN</p>
          </div>
          <div class="login-box-form">
            <div>
              <p>用户名/USERNAME：</p>
              <el-input
                autofocus
                placeholder="请输入用户名"
                v-model="username"
                class="login-box-form-text"
                suffix-icon="el-icon-user"
              ></el-input>
              <p>密码/PASSWORD：</p>
              <el-input
                placeholder="请输入密码"
                v-model="password"
                class="login-box-form-password"
                show-password
              ></el-input>
              <p>验证码/CAPTCHA：</p>
              <el-input v-model="code" class="login-box-form-code"></el-input>
              <span class="imageCode">
                <img
                  :src="imageCodeUrl"
                  onclick="javascript:this.src+='?tm'+Math.random()"
                  alt="点击刷新"
                />
              </span>
            </div>
            <div>
              <!-- 按回车键也能进行登录 -->
              <el-button plain class="login-box-form-submit" @click="Check">
                登录/LOGIN
                <i class="el-icon-right"></i>
              </el-button>
              <el-button plain class="login-box-form-forget" @click="resetPassword">
                忘记密码/FORGET
                <i class="el-icon-refresh-left"></i>
              </el-button>
            </div>
            <!-- <div class="moreLoginMethods">
              <div class="moreIcon"><img src="../assets/QQ.png" alt=""></div>
              <div class="moreIcon"><img src="../assets/wechat.png" alt=""></div>
            </div>-->
            <br />
            <p>Designed By JC4U</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";

export default {
  data() {
    return {
      imageCodeUrl: "",
      username: "",
      password: "",
      code: "",
      realCode: "",
      imgUrl: "",
      boxWidth: 400,
      isShow: true,
      count: 100
    };
  },
  watch: {
    code() {
      if (this.code.length == 5) this.getImageCode();
    }
  },
  methods: {
    Check() {
      //检查验证码是否填好
      if (this.code == "") {
        this.$alert("请填写验证码", "输入检查", { confirmButtonText: "确定" });
      }
      //验证码正确的情况下
      if (this.code == this.realCode) {
        //用户名和密码都符合规范的时候
        if (this.username.length >= 6 && this.password.length >= 6) {
          this.password = this.$crypto
            .createHash("md5")
            .update(this.password)
            .digest("hex");
          this.login();
        } else {
          this.$alert("用户名和密码不符合规范(长度大于等于6)", "输入检查", {
            confirmButtonText: "确定"
          });
        }
      } else {
        this.$alert("验证码不正确", "输入检查", {
          confirmButtonText: "确定",
          callback: re => {
            let url = this.imageCodeUrl;
            this.imageCodeUrl = url + "?tm" + Math.random();
          }
        });
      }
    },
    async getImageCode() {
      this.realCode = await this.$public.getImageCode();
    },
    async login() {
      const that = this;
      //组装对象
      let requestBody = {
        stuNum: this.username,
        password: this.password
      };
      //进行验证请求
      let result = await this.$public.login(requestBody);
      //对返回的结果进行处理
      if (result.status) {
        this.hiddenBox();
        setTimeout(function() {
          //进行一次刷新
          that.$router.replace("/home");
          that.$router.go(0);
        }, 1000);
      } else
        this.$alert(result.error, "结果", {
          confirmButtonText: "确定",
          callback: re => {
            let url = this.imageCodeUrl;
            this.imageCodeUrl = url + "?tm" + Math.random();
          }
        });
      this.password = "";
    },
    async loadBackImage() {
      let temp = await this.$public.getBackGroundImage();
      if (temp.status) {
        this.imgUrl = temp.content.url;
      }
    },
    hiddenBox() {
      //将登录框的宽度设为0，使用过渡形成一个简单的动画
      this.boxWidth = 0;
    },
    async resetPassword() {
      //先判断用户的输入框中是否输入
      if (this.username.length >= 6) {
        //请求后台看是否有该用户
        let exist = await this.$public.checkUserExist({
          username: this.username
        });
        //如果存在就发送邮件
        if (exist != 0) {
          let verifiCode = await this.$public.sendEmailForResetPwd({
            username: this.username
          });
          this.$prompt("邮件已发送，输入你收到的验证码:", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            inputPattern: /^[0-9]{4}$/,
            inputErrorMessage: "验证码格式不正确"
          })
            .then(async re => {
              //验证是否发邮件
              let isSend = await this.$public.checkIsSendEmail(verifiCode);
              if (isSend) {
                //重置密码
                let result = await this.$public.resetUserPwd({
                  username: this.username,
                  code: re.value
                });
                this.$message({
                  type: "success",
                  message: result + "，即将刷新页面"
                });
                setTimeout(_ => this.$router.go(0), 600);
                //代理登录
              } else {
                this.$message({ type: "error", message: result });
              }
            })
            .catch(re => console.log(re));
        } else {
          this.$alert("用户不存在", "提示", {
            confirmButtonText: "重新输入"
          });
        }
      } else {
        this.$message({
          type: "warning",
          message: "请正确输入用户名"
        });
      }
    }
  },
  created() {
    this.loadBackImage();
    //初始化验证码请求地址
    this.imageCodeUrl = this.$public.imageCodeUrl;
  }
};
</script>
<style scoped>
.all {
  background-repeat: repeat;
  background-size: 100% auto;
  background-position: center;
  height: 100vh;
}
.login {
  width: 100%;
  height: auto;
  margin: 0 0;
}
.login-box {
  position: relative;
  top: 15vh;
  left: 25vw;
  background-color: rgba(256, 256, 256, 0.4);
  margin: auto;
  height: auto;
  padding: 40px 0;
  border-radius: 4px;
  transition: all 0.5s;
}
.login-box * {
  overflow: hidden;
}
.login-box-logo {
  margin: auto;
}
.login-box-logo img {
  width: 80px;
  border-radius: 50%;
  border: 5px silver solid;
}
.login-box-tips {
  margin: 20px 0;
}
.login-box-tips p {
  font-weight: bold;
  letter-spacing: 5px;
  font-size: 1.2em;
  color: #282b2d;
}
.login-box-form p {
  color: #282b2d;
  font-weight: bolder;
  padding: 10px 0;
  text-align: left;
  margin-left: 10%;
}
.login-box-form-text {
  width: 80%;
}
.login-box-form-password {
  width: 80%;
}
.login-box-form-code {
  position: relative;
  right: 25%;
  width: 30%;
}
.login-box-form-submit {
  text-decoration: none;
  transition: all 0.5s;
  background-color: #282b2d;
  color: white;
  width: 80%;
  margin: 10px 0;
}
.login-box-form-forget {
  transition: all 0.5s;
  margin-left: 0;
  margin-top: 10px 0;
  margin-bottom: 10px 0;
  width: 80%;
}
.login-box-form-forget:hover {
  background-color: rgb(134, 167, 180);
  color: white;
}
.login-box-form-switch {
  margin-top: 10px;
  margin-left: 10%;
  text-align: left;
}
.imageCode {
  position: absolute;
  left: 48%;
}
.imageCode img {
  width: 40%;
}

.moreLoginMethods {
  margin-top: 10px;
  text-align: center;
}

.moreIcon {
  float: left;
  margin-left: 28%;
}
.moreIcon:hover {
  cursor: pointer;
}
.moreIcon img {
  margin-top: 10px;
  height: 30px;
  width: 30px;
  display: inline-block;
}
</style>
