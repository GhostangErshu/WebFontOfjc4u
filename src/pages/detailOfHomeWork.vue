<template>
  <div class="contain">
    <div class="back" @click="back">
      <span>
        <img src="../assets/back.png" alt="返回" />
        <span class="backText">返回</span>
      </span>
    </div>
    <div class="ResultPage">
      <h1 class="pageTitle">{{info.title}}</h1>
      <hr />
      <div class="pageProperty">
        <span class="author">作者：{{info.author}}</span>
        <span class="releaseTime">发布时间：{{info.time}}</span>
        <span class="pageViews">分数：{{info.score}}</span>
      </div>
      <div class="pageContent"></div>
      <div class="comment">
        评语：
        <span>{{info.comment}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {},
      queryPrame: {},
      msg: ""
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    async getDetailInfo() {
      //获取Grade详细信息
      try {
        let linshi1 = await this.$public.getDataByIdAndTaskid(
          this.queryPrame.stuNum,
          this.queryPrame.taskId
        );
        let temp = linshi1.content;
        //获取task信息
        let linshi2 = await this.$public.getTaskInfoByTaskid(
          this.queryPrame.taskId
        );
        let task = linshi2.content;
        //新建一个title属性并赋值,使用原型对象的构造方法
        // temp.prototype.title = task.title;此方法不行，没有使用到构造函数
        //赋值
        this.info = {
          title: task.title,
          author: temp.name,
          time: temp.time_correct,
          score: temp.grade,
          content: temp.content,
          comment: temp.comment
        };
        //手动对dom进行操作
        this.$el.querySelector(".pageContent").innerHTML = temp.content;
      } catch (e) {this.go404()}
    },
    getUserId() {
      //判断cookies是否还存在
      if (this.$cookies.isKey("userid"))
        this.userid = this.$cookies.get("userid");
    },
    async getParm() {
      this.queryPrame = this.$route.query;
      // console.log(this.queryPrame)
    },
    go404() {
      this.$router.push("/404")
    }
  },
  mounted() {
    this.getParm();
    this.getDetailInfo();
  },
  created() {
    this.getUserId();
  }
};
</script>

<style scoped>
.contain {
  background-image: url("../assets/bg.jpg");
  min-height: 90vh;
  padding-top: 20px;
}
.back {
  height: 50px;
  width: 55vw;
  margin: auto;
  line-height: 50px;
  position: relative;
  transition: all 0.5s;
  background-color: white;
}
.back:hover {
  color: #666;
  cursor: pointer;
}
.back img {
  height: 30px;
  width: auto;
  position: absolute;
  left: 2%;
  top: 30%;
}
.backText {
  font-size: 0.9em;
  line-height: 1em;
  position: absolute;
  left: 4%;
  top: 50%;
}
.ResultPage {
  max-width: 55vw;
  margin: auto;
  background-image: url("../assets/approved.png");
  background-repeat: no-repeat;
  background-position: 10% top;
  background-color: white;
}
.pageTitle {
  height: 40px;
  font-size: 1.3em;
  line-height: 40px;
  padding-top: 20px;
}
.pageProperty {
  font-size: 0.9em;
  color: #666;
}
.pageProperty span {
  display: inline-block;
  margin: 0 5px;
}
.pageContent {
  padding: 30px;
  line-height: 40px;
  text-indent: 2em;
  text-align: left;
}
.comment {
  height: 50px;
  padding: 10px;
  border-top: 1px solid #9a9a9a;
  border-bottom: 1px solid #9a9a9a;
  line-height: 50px;
}
.comment span {
  text-decoration: underline;
}
.pageContent img {
  width: 50%;
  height: auto;
  display: inline-block;
}
/* table 样式 */
.pageContent table {
  margin: auto;
  width: 80%;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
}
.pageContent  table td,
table th {
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  padding: 3px 5px;
}
.pageContent table th {
  border-bottom: 2px solid #ccc;
  text-align: center;
}
.pageContent blockquote {
  padding:10px;
  display: block;
  border-left: 8px solid #60a9a6;
  padding: 5px 10px;
  margin: 10px 0;
  line-height: 1;
  font-size: 100%;
  background-color: #f1f1f1;
}
.pageContent code {
  padding: 15px;
  margin: 20px 0;
  display: inline-block;
  background-color: #2d2d2d;
  color: #fff;
  padding: 10px;
  font-size: 0.8em;
  border-radius: 5px;
}
.pageContent pre code {
  display: block;
  line-height: 1.1em;
}
.pageContent ul,
ol {
  margin: 10px 0 10px 20px;
}
</style>
