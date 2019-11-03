<template>
  <div v-title data-title="学长课堂 |  JC4U" class="contain">
    <div class="blog">
      <div class="blog-head">
        <div class="blog-class">“第二课”科创工作室学长课堂-{{classInfo.name}}</div>
        <hr />
        <div class="blog-head-info">
          上课学长:
          <span>{{classInfo.teacher}}</span>
        </div>
        <div class="blog-head-info">
          上课时间:
          <span>{{classInfo.semester}}</span>
        </div>
        <div class="blog-head-info">
          上课时长:
          <span>{{classInfo.length}}节</span>
        </div>
        <div class="blog-head-info">
          当前状态:
          <span v-if="classInfo.status==1" style="color:#67C23A">正在参与</span>
          <span v-if="classInfo.status==0" style="color:#EE2C2C">已结束</span>
        </div>
      </div>
      <div class="blog-body">
        <blog_body></blog_body>
      </div>
    </div>
  </div>
</template>

<script>
import blog_body from "@/components/blog-body.vue" 

export default {
  components:{
    blog_body
  },
  data() {
    return {
      userid: "",
      classInfo: {}
    };
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    getUserId() {
      //判断cookies是否还存在
      if (this.$cookies.isKey("userid"))
        this.userid = this.$cookies.get("userid");
    },
    async getClassInfo() {
      let temp = await this.$public.getClassInfoById(this.userid);
      if (temp.status) {
        this.classInfo = temp.content;
      }
    },
    choose(e){
      console.log(e.index)
    }
  },
  created() {
    this.getUserId();
  },
  mounted() {
    this.getClassInfo();
  }
};
</script>


<style scoped>
.contain {
  background-image: url("https://cdn.pixabay.com/photo/2019/06/14/09/25/cloud-4273197_960_720.png");
}
.blog {
  width: 50vw;
  display: inline-block;
  text-align: left;
  padding: 10px;
  border: 2px solid #eee;
  border-radius: 10px;
  margin-bottom: 20px;
  margin-top: 20px;
  min-height: 85vh;
  transition: all 0.5s;
  background-color: rgba(255, 255, 255, 0.9);
}
.blog:hover {
  box-shadow: 0px 0px 4px 3px #999;
}
.blog-head {
  padding: 5px;
}
.blog-class {
  height: 50px;
  line-height: 60px;
  text-indent: 2em;
  letter-spacing: 2px;
  font-size: 1.2em;
  font-weight: bold;
}
.blog-head-info {
  font-weight: bold;
  text-indent: 1em;
  margin: 15px 0;
}
.blog-head-info span {
  font-weight: normal;
  margin-left: 1em;
  font-size: 0.9em;
}
</style>
