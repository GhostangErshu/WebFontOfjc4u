<template>
  <div class="mine" v-title data-title="个人中心  |  JC4U" v-loading="loading">
    <div class="baseinfo">
      <!--用户头像，点击事件触发上传头像-->

      <div class="headimg">
        <el-tooltip class="item" effect="dark" content="点击上传新头像，推荐128X128" placement="right">
          <img :src="userinfo.head" alt="用户头像" @click.stop="uploadHeadImg" />
        </el-tooltip>
      </div>
      <!--这是基本信息-->
      <div class="baseinfo-text">
        <p class="baseinfo-text-name">姓名：{{userinfo.name}}</p>
        <br />
        <p class="baseinfo-text-signature">签名：{{userinfo.sign}}</p>
        <br />
        <p class="baseinfo-text-location">上次登录IP：{{ipinfo.ip}}</p>
        <br />
        <p class="baseinfo-text-location">上次登录地点：{{ipinfo.location}}</p>
        <br />
      </div>
    </div>
    <!--这是操作菜单-->
    <div class="info-meun">
      <el-row class="tac">
        <el-col :span="24">
          <el-menu background-color="#f5f5f5">
            <el-menu-item class="meun-info">
              <i class="el-icon-user-solid"></i>
              <span slot="title">个人信息</span>
            </el-menu-item>
            <el-menu-item @click="pwdChangeVisible = true">
              <i class="el-icon-s-help"></i>
              <span slot="title">密码修改</span>
            </el-menu-item>
            <el-menu-item @click="logsVisible=true">
              <i class="el-icon-location"></i>
              <span slot="title">登陆日志</span>
            </el-menu-item>
            <el-menu-item @click="scoreDetailVisible = true">
              <i class="el-icon-s-order"></i>
              <span slot="title">分数详情</span>
            </el-menu-item>
            <el-menu-item @click="suggestVisible = true">
              <i class="el-icon-guide"></i>
              <span slot="title">建设意见</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <!--右边的详情信息-->
    <div class="info-content">
      <div class="info-content-title">
        <span class="info-content-title-left">个人信息</span>
        <span
          class="info-content-title-right"
          style="cursor:pointer"
          @click="userInfoChangeVisible=true"
        >
          编辑
          <i class="el-icon-edit"></i>
        </span>
      </div>
      <hr />
      <div class="info-content-info">
        <span class="info-title">姓名</span>
        <span class="info-content-content">{{userinfo.name}}</span>
        <br />
        <br />
      </div>
      <div class="info-content-info">
        <span class="info-title">成绩</span>
        <span class="info-content-content">{{score}}</span>
        <br />
        <br />
      </div>
      <div class="info-content-info">
        <span class="info-title">班级</span>
        <span class="info-content-content">{{classInfo.name}}</span>
        <br />
        <br />
      </div>
      <div class="info-content-info">
        <span class="info-title">邮箱</span>
        <span class="info-content-content">{{userinfo.email}}</span>
        <br />
        <br />
      </div>
      <br />
      <div class="info-content-info" style="text-align:center;font-size:0.8em;color:red;">
        <span>
          *注意：邮箱十分重要，一经绑定成功，便不予修改，若要修改，请联系
          <a
            style="text-decoration:none;color:red"
            href="http://qm.qq.com/cgi-bin/qm/qr?k=EoCT_BevtjjW7yH96-xoce_7Dmxt4zcY"
            target="_blank"
          >管理员</a>
        </span>
      </div>
    </div>

    <!--成绩详情信息-->
    <el-dialog title="历史成绩详情" :visible.sync="scoreDetailVisible">
      <el-table :data="scoreDetails">
        <el-table-column property="id" label="序号" width="50"></el-table-column>
        <el-table-column property="name" label="姓名" width="100"></el-table-column>
        <el-table-column property="time_currect" label="时间"></el-table-column>
        <el-table-column property="grade" label="成绩"></el-table-column>
        <el-table-column property="comment" label="评价"></el-table-column>
      </el-table>
    </el-dialog>
    <!--最近登录日志信息-->
    <el-dialog title="最近登录日志" :visible.sync="logsVisible">
      <el-table :data="logs">
        <el-table-column property="name" label="姓名" width="100"></el-table-column>
        <el-table-column property="time" label="时间"></el-table-column>
        <el-table-column property="ip" label="登录IP"></el-table-column>
        <el-table-column property="location" label="登录地"></el-table-column>
      </el-table>
    </el-dialog>
    <!--修改密码-->
    <el-dialog
      title="修改密码"
      :visible.sync="pwdChangeVisible"
      :width="formLabelWidth"
      :before-close="handleClose"
    >
      <el-form :model="formOfRevisePwd">
        <el-form-item label="原密码">
          <el-input v-model="formOfRevisePwd.oldPwd" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="formOfRevisePwd.newPwd" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="重复新密码">
          <el-input v-model="formOfRevisePwd.repeatPwd" autocomplete="off" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="pwdChangeVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePwd">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改个人信息-->
    <el-dialog title="修改个人信息" :visible.sync="userInfoChangeVisible" :width="formLabelWidth">
      <el-form :model="formOfReviseInfo">
        <el-form-item label="姓名">
          <el-input v-model="formOfReviseInfo.name" autocomplete="on" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="签名">
          <el-input v-model="formOfReviseInfo.sign" placeholder="设置新签名"></el-input>
        </el-form-item>
        <el-form-item label="班级">
          <el-input v-model="formOfReviseInfo.class" autocomplete="on" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formOfReviseInfo.email" :disabled="true"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userInfoChangeVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUserInfo">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 意见框 -->
    <el-dialog
      title="请提出您的意见"
      :visible.sync="suggestVisible"
      :width="suggestWidth"
      :before-close="handleClose"
    >
      <el-input
        type="textarea"
        :rows="6"
        placeholder="请输入内容，不得小于20字，不得超过200字"
        v-model="suggestText"
      ></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="suggestVisible = false" plain>取 消</el-button>
        <el-button type="primary" @click="submitSuggestion" plain>确 定</el-button>
      </div>
    </el-dialog>

    <!--头像上传-->
    <!--只能使用jpeg格式-->
    <input type="file" accept="image/*" @change="handleFile" class="hiddenInput" />

    <el-dialog
      title="头像预览/确认"
      :visible.sync="headimgVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div class="head_img_up">
        <!-- 裁剪图片 -->
        <vue-cropper ref="cropper" :src="imgSrc" :cropmove="cropImage"></vue-cropper>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="headimgVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitHead">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增邮箱:针对于没有邮箱的用户 -->
    <el-dialog title="设置邮箱" :visible="!hasEmail" :width="formLabelWidth">
      <el-input v-model="newEmail" placeholder="输入你要设置的邮箱"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button >取 消</el-button>
        <el-button type="primary" @click="setNewEmail()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";

export default {
  data() {
    return {
      imgSrc: "",
      userinfo: {},
      ipinfo: {},
      classInfo: {},
      score: 0,
      scoreDetails: [],
      logs: [],
      userid: "",
      suggestText: "",
      scoreDetailVisible: false,
      pwdChangeVisible: false,
      userInfoChangeVisible: false,
      headimgVisible: false,
      suggestVisible: false,
      logsVisible: false,
      loading: false,
      newEmail: "",
      hasEmail:true,
      //需要上传的头像资源
      file: {},
      formOfRevisePwd: {
        repeatPwd: "",
        newPwd: "",
        oldPwd: ""
      },
      formOfReviseInfo: {
        name: "",
        class: "",
        email: "",
        sign: ""
      },
      formLabelWidth: "20vw",
      suggestWidth: "30vw",
      avatar: ""
    };
  },
  components: { VueCropper },
  methods: {
    hasEmailMethod() {
      if (this.userinfo.email=="") {
        this.hasEmail = false;
      } else {
        this.hasEmail = true;
      }
    },
    async setNewEmail(){
      if(this.newEmail.length==0||this.newEmail.indexOf("@")==-1){
        alert("请检查你邮箱地址的输入");
        return;
      }
      //拼装参数
      let param = {
        stuNum:this.$cookies.get("userid"),
        email:this.newEmail
      }
      this.loading = true;
      let temp = await this.$public.updateEmail(param);
      if(temp!=undefined&&temp.status){
        this.$message.success("修改成功,请刷新");
        this.hasEmail = true;
        this.loading = false;
      } else this.$message.error(temp.error)
    },
    //通过id获取用户信息
    async getUserInfoById() {
      let temp = await this.$public.getUserInfoById(this.userid);
      if (temp.status) {
        this.userinfo = temp.content;
      }
    },
    //通过id获取用户登录信息
    async getUserIpInfoById() {
      let temp = await this.$public.getUserIpInfoById(this.userid);
      if (temp.status) {
        this.ipinfo = temp.content;
      }
    },
    //获取现在的总成绩
    async getUserScoreInfoById() {
      let temp = await this.$public.getUserScoreInfoById(this.userid);
      if (temp.status) {
        this.score = temp.content;
      }
    },
    //通过token验证去查看成绩细节
    async getDetailOfScore() {
      let temp = await this.$public.getDetailOfScore({
        id: this.userid,
        token: this.$cookies.get("access-token")
      });
      if (temp.status) {
        this.scoreDetails = temp.content;
      }
    },
    //获取所有当前用户的登录日志
    async getAllLogById() {
      let temp = await this.$public.getAllLogsById({
        id: this.userid,
        token: this.$cookies.get("access-token")
      });
      if (temp.status) this.logs = temp.content.reverse();
    },
    getUserId() {
      //判断cookies是否还存在
      if (this.$cookies.isKey("userid"))
        this.userid = this.$cookies.get("userid");
    },
    getBaseInfo() {
      //设置基本信息
      this.formOfReviseInfo.name = this.userinfo.name;
      this.formOfReviseInfo.email = this.userinfo.email;
      this.formOfReviseInfo.class = this.classInfo.name;
    },
    // 打开图片上传
    uploadHeadImg: function() {
      this.$el.querySelector(".hiddenInput").click();
    },
    // 将头像显示
    handleFile: function(e) {
      let $target = e.target || e.srcElement;
      let file = $target.files[0];

      let size = file.size;
      //判断文件是否大于2M
      if (size > 1024 * 1000 * 2) {
        this.$alert("上传的文件大于2M,请选择小于2M的文件上传", "提示", {
          confirmButtonText: "好的"
        });
        return;
      }
      this.file = file;
      var reader = new FileReader();
      reader.onload = data => {
        //在这里再调用显示预览头像
        this.headimgVisible = true;
        let res = data.target || data.srcElement;
        this.imgSrc = res.result;
      };
      reader.readAsDataURL(file);
    },
    cropImage() {
      this.avatar = this.$refs.cropper.getCroppedCanvas().toDataURL();
    },
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    //提交头像上传的请求
    async submitHead() {
      //获取图片资源
      //这里将base64码转成File文件
      let file = this.dataURLtoFile(this.avatar, "head.jpeg");
      // console.log(this.file)
      // console.log(file)
      //创建一个form对象
      let params = new FormData();
      //append 向form表单添加数据
      params.append("file", file);
      params.append("stuNum", this.userid);
      //添加请求头  通过form添加的图片和文件的格式必须是multipart/form-data
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      //向后台服务器发送上传头像请求
      let result = await this.$public.uploadHeadImg(params, config);
      //如果操作成功刷新页面
      if (result.status) {
        this.$alert("修改成功", "结果", {
          confirmButtonText: "我知道了",
          callback: re => {
            this.$router.go(0);
          }
        });
      } else
        this.$alert("修改失败，请稍后重试", "结果", {
          confirmButtonText: "好吧，等会再来"
        });
    },
    //关闭窗口时询问是否确认关闭
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //修改密码时触发
    async changePwd() {
      //对用户输入的值进行判断
      let input = this.formOfRevisePwd;
      //长度规范
      if (
        input.repeatPwd.length >= 6 &&
        input.newPwd.length >= 6 &&
        input.oldPwd.length >= 6
      ) {
        if (input.newPwd == input.repeatPwd) {
          let result = await this.$public.changeUserPwd(this.userid, input);
          //对请求的结果做判断
          if (result.status) {
            this.$alert("修改成功!下次登录生效", "提示", {
              confirmButtonText: "确认",
              callback: re => {
                this.$router.go(0);
              }
            });
          } else
            this.$alert("修改失败!", "提示", { confirmButtonText: "确认" });
        } else {
          this.$alert("两次输入的密码不一致", "提示", {
            confirmButtonText: "确认"
          });
        }
      } else {
        this.$alert("长度不符合规范", "提示", {
          confirmButtonText: "确认"
        });
      }
    },
    //提交意见
    async submitSuggestion() {
      if (this.suggestText.length < 200 && this.suggestText.length > 20) {
        let temp = await this.$public.submitSuggestion({
          username: this.userid,
          content: this.suggestText
        });
        if (temp.status)
          this.$message({ type: "success", message: "感谢你的建议" });
        else this.$message({ type: "error", message: temp.error });
        this.suggestText = "";
        this.suggestVisible = false;
      } else
        this.$alert("长度应该在20-200字", "提示", {
          confirmButtonText: "确认"
        });
    },
    //修改个人信息
    async updateUserInfo() {
      let index = await this.$public.updateUserInfo(
        this.userid,
        this.formOfReviseInfo
      );
      let message = "更新失败,请稍后重试!";
      //更新失败
      if (index.status) {
        message = "更新成功";
      }
      //提示信息
      this.$alert(message, "提示", {
        confirmButtonText: "确认",
        callback: re => {
          this.$router.go(0);
        }
      });
    },
    async getClassInfo() {
      let temp = await this.$public.getClassInfoById(this.userid);
      if (temp.status) this.classInfo = temp.content;
    }
  },
  created() {
    this.getUserId();
  },
  async mounted() {
    this.loading = true;
    await this.getUserInfoById();
    await this.getUserIpInfoById();
    await this.getClassInfo();
    await this.getUserScoreInfoById();
    await this.getDetailOfScore();
    await this.getAllLogById();
    await this.hasEmailMethod();
    this.loading = false;
  },
  updated() {
    //更新视图时，加载基本信息
    this.getBaseInfo();
  },
  watch: {}
};
</script>

<style scoped>
.mine {
  margin: auto;
  margin-top: 40px;
  width: 60%;
}
.baseinfo {
  width: 30%;
  height: auto;
  background-color: #f5f5f5;
  border-radius: 3%;
}

.baseinfo p {
  overflow: auto;
  font-size: 0.9em;
}

.info-meun {
  border-radius: 3%;
  margin-top: 20px;
  width: 30%;
  height: auto;
  font-family: "等线";
}
.headimg img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px silver solid;
  margin-top: 10px;
  transition: all 0.5s;
}
.headimg img:hover {
  cursor: pointer;
  border: 4px #f5f5f5 solid;
}
.baseinfo-text {
  text-align: left;
  padding: 10px;
  font-family: "等线";
}
.baseinfo-text p {
  border-left: 5px seagreen solid;
  background-color: rgb(255, 255, 255);
  height: 24px;
  line-height: 24px;
  text-indent: 1em;
}
.info-content {
  width: 35%;
  position: absolute;
  left: 40%;
  top: 12%;
  padding: 20px;
  height: auto;
  font-family: "等线";
}
.info-content-title {
  margin-bottom: 12px;
}
.info-content-title-left {
  float: left;
  font-size: 1.3em;
  font-weight: bold;
}
.info-content-title-right {
  position: relative;
  left: 200px;
}
.info-content-info {
  text-align: left;
}
.info-title {
  text-align: center;
  display: inline-block;
  width: 120px;
  height: 60px;
  background-color: #f3f5f7;
  font-weight: bolder;
  line-height: 60px;
  font-size: 1.1em;
}
.info-content-content {
  display: inline-block;
  width: 40%;
  padding: 3%;
  border-bottom: 1px solid #f6f6f3;
}
.meun-info:hover {
  cursor: not-allowed;
}

.head_img_up {
  width: 100%;
}
.head_img_up img {
  width: 90px;
  height: 90px;
  border-radius: 50px;
}
.setting_right {
  display: flex;
  height: 37px;
  justify-content: flex-end;
  align-items: center;
}
.hiddenInput {
  display: none;
}
</style>