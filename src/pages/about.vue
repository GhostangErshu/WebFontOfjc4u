<template>
  <div class="about" v-title data-title="发展历程  |  JC4U">
    <h1>JC4U发展历程</h1>
    <div v-for="item in nodeInfo" :key="item.id">
      <el-timeline>
        <el-timeline-item
          :timestamp="item.time.substring(0,item.time.indexOf(' '))"
          placement="top"
        >
          <el-card>
            <h4>{{item.title}}</h4>
            <br />
            <p>{{item.author}} 提交于 {{item.time}}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
     <h1>JC4U开发团队</h1>
     <div class="item-info">
       <div class="info-img"><img src="../assets/info_img.jpg"></div>
       <div class="info-detail">
         <span>姓名：唐熙</span>
         <span>负责：全栈</span>
         <span>QQ：2576445561</span>
         <span>WeChat：tx2576445561</span>
         <span>个人介绍：只是单纯喜欢搞程序设计，日常无聊就喜欢敲敲代码，虽然长得丑，但是有自知之明啊！</span>
       </div>
     </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nodeInfo: []
    };
  },
  methods: {
    async getHistoryNodeInfo() {
      let temp = await this.$public.getHistoryNodeInfo();
      this.nodeInfo = temp.reverse();
    }
  },
  mounted() {
    this.getHistoryNodeInfo();
  }
};
</script>

<style scoped>
.about {
  width: 60vw;
  margin: auto;
  text-align: left;
  margin-top: 100px;
  min-height: 90vh;
}
.about h1 {
  font-size: 1.8em;
  text-align: center;
  margin: 50px 0;
}
.item-info{
  height: 200px;
  margin:0;padding:0;
  position: relative;
  border-radius: 2px;
  box-shadow: 0px 2px 10px #ccc;
  margin:50px 0;
}
.info-img{
  display: inline-block;
  width: 15vw;
  height: inherit;
}
.info-img img{
  height: 140px;
  width: auto;
  position: absolute;
  top:30px;left:30px;
  border-radius: 2px;
}
.info-detail{
  display: inline-block;
  width: 40vw;
  position: absolute;
  top:10px;right:70px;
  height: auto;
  padding:10px;
}
.info-detail span{
  display: block;
  line-height: 2em;
}
</style>
