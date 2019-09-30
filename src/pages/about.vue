<template>
  <div class="about" v-title data-title="发展历程  |  JC4U">
    <h1>JC4U项目主要时间节点</h1>
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
    <div class="mainUse">
      <h1>主要使用技术</h1>
      <h4>前端：Vue.js</h4>
      <h4>后端：Mybatis+Spring+SpringMVC</h4>
      <h4>服务器：nginx+tomcat</h4>
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
      if (temp.status) {
        this.nodeInfo = temp.content.reverse();
      }
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
.item-info {
  height: 200px;
  margin: 0;
  padding: 0;
  position: relative;
  border-radius: 2px;
  box-shadow: 0px 2px 10px #ccc;
  margin: 50px 0;
}
.info-img {
  display: inline-block;
  width: 15vw;
  height: inherit;
}
.info-img img {
  height: 140px;
  width: auto;
  position: absolute;
  top: 30px;
  left: 30px;
  border-radius: 2px;
}
.info-detail {
  display: inline-block;
  width: 40vw;
  position: absolute;
  top: 10px;
  right: 70px;
  height: auto;
  padding: 10px;
}
.info-detail span {
  display: block;
  line-height: 2em;
}
.mainUse{
  margin-top:20px;
  text-align: center;
}
.mainUse h4{
  font-weight: normal;
  padding-top:10px;
}
</style>
