<template>
  <div class="contain">
    <div id="blogEditor">
      <h1>任务提交</h1>
      <hr />
      <div class="notice">任务名称：{{taskInfo.title}}</div>
      <div class="notice">截止时间：{{taskInfo.deadline}}</div>
      <div class="notice">作业代号：{{msg}}</div>
      <hr />
      <div id="editor"></div>
      <div class="admin">
        <button class="button" id="submit">提 交</button>
        <button class="button" id="back" @click="back">返回</button>
        <button class="button" id="enclosure" @click.stop="uploadFile">浏览附件</button>
        <span class="filenameDisplay"></span>
        <input type="file" accept="image/*" @change="handleFile" class="hiddenInput" />
      </div>
    </div>
  </div>
</template>
<script>
import E from "wangeditor";

export default {
  data() {
    return {
      msg: "",
      file: {},
      taskInfo: {},
      path: "",
      userid: ""
    };
  },
  mounted() {
    this.getParm();
    this.initEditor();
    this.getTaskInfo();
  },
  created() {
    this.getUserId();
  },
  methods: {
    initEditor() {
      var editor = new E("#editor");
      editor.customConfig.uploadImgServer =
        this.$public.host + "/file/uploadImgForEditor";
      editor.customConfig.uploadImgParams = {
        token: this.$cookies.get("access-token")
      };
      editor.customConfig.uploadFileName = "file";
      editor.create();
      //进行监听
      let that = this;
      document.getElementById("submit").addEventListener(
        "click",
        function() {
          // 读取 html
          let content = editor.txt.html();
          // console.log(content)
          that.commitTask(content);
        },
        false
      );
    },
    async commitTask(content) {
      let result = await this.$public.commitTask(
        this.userid,
        this.msg,
        content,
        this.path
      );
      if (result.status) {
        this.$message({ message: "提交成功", type: "success" });
        setTimeout(this.$router.push("/blog"), 3000);
      } else this.$message({ message: result.error, type: "error" });
      // this.$alert(result,"提交结果",{confirmButtonText:"好的"},re=>this.$router.push("/blog")).catch(re=>console.log(re))
    },
    getUserId() {
      //判断cookies是否还存在
      if (this.$cookies.isKey("userid"))
        this.userid = this.$cookies.get("userid");
    },
    async getParm() {
      this.msg = this.$route.params.id;
      //验证taskid是否合法
      let access = await this.$public.checkTaskid(0, this.msg);
      if (!access.status) this.$router.push("/404");
    },
    back() {
      this.$router.go(-1);
    },
    async getTaskInfo() {
      //获取任务信息
      let temp = await this.$public.getTaskInfoByTaskid(this.msg);
      //对日期进行处理
      if (temp.status) {
        let now = new Date();
        now.setTime(parseInt(temp.content.deadline));
        let time =
          now.getFullYear() +
          "/" +
          (now.getMonth() + 1) +
          "/" +
          now.getDate() +
          "  剩余：" +
          Math.round(
            (temp.content.deadline - new Date().getTime()) / (1000 * 60 * 60)
          ) +
          "小时";
        //数据拼装
        this.taskInfo = {
          title: temp.content.title,
          deadline: time
        };
      }
    },
    // 打开文件上传
    uploadFile: function() {
      this.$el.querySelector(".hiddenInput").click();
    },
    handleFile: async function(e) {
      let $target = e.target || e.srcElement;
      let file = $target.files[0];

      let size = file.size;
      //判断文件是否大于
      if (size > 1024 * 1024 * 5) {
        this.$alert("上传的文件于5M,请选择小于5M的文件上传", "提示", {
          confirmButtonText: "好的"
        }).catch(re => console.log(re));
        return;
      }
      this.file = file;
      //判断是不是Java文件
      if (file.name.indexOf("java") == -1) {
        this.$alert("请上传Java源文件", "提示", {
          confirmButtonText: "好的"
        }).catch(re => console.log(re));
        return;
      }
      //创建一个form对象
      let params = new FormData();
      //append 向form表单添加数据
      params.append("file", file);
      // params.append("token", this.$cookies.get("access-token"));
      //添加请求头  通过form添加的图片和文件的格式必须是multipart/form-data
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      //请求后台接口，上传文件，接受后台返回的图片路径
      this.path = await this.$public.uploadJavaFile(params, config);
      //进行判断输出响应结果
      if (this.path != "" && this.path != undefined)
        this.$el.querySelector(".filenameDisplay").innerHTML =
          "<i class='el-icon-finished'>已上传：" + file.name;
      else
        this.$alert("附件上传失败", "提示", {
          confirmButtonText: "好的"
        }).catch(re => console.log(re));
    }
  }
};
</script>

<style scoped>
.contain {
  background-image: url("../assets/bg.jpg");
  background-size: 100% auto;
  min-height: 90vh;
  padding-top: 50px;
}
.hiddenInput {
  display: none;
}
#blogEditor {
  text-align: left;
  width: 50vw;
  padding: 30px 0;
  margin: auto;
  position: relative;
  background-color: white;
}
.admin {
  height: 60px;
}
h1 {
  font-size: 1.2em;
  text-indent: 20px;
  line-height: 30px;
  height: 30px;
}
.button {
  height: 50px;
  width: 120px;
  border: none;
  color: white;
  font-size: 14px;
  transition: all 0.8s;
  position: absolute;
  bottom: 20px;
}
#submit {
  background-color: #f4a460;
  right: 20px;
}
#back {
  background-color: goldenrod;
  right: 160px;
}
#enclosure {
  background-color: deepskyblue;
  right: 300px;
}

.button:hover {
  cursor: pointer;
  border: 1px solid #8f8f8f;
  color: black;
}
#submit:hover,
#back:hover,
#enclosure:hover {
  background-color: white;
}
.notice {
  font-size: 0.9em;
  height: 20px;
  line-height: 20px;
  margin: 10px 0;
  text-indent: 10px;
}
.filenameDisplay {
  display: inline-block;
  font-size: 0.9em;
  color: green;
  margin-top: 20px;
  margin-left: 20px;
  transition: all 0.5s;
}
.filenameDisplay:hover {
  text-decoration: underline;
  color: rgb(44, 43, 43);
  cursor: no-drop;
}
</style>
