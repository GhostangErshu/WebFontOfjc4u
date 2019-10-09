<template>
  <div class="contain">
    <el-carousel :interval="10000" type height="700px" width="100vw">
      <el-carousel-item v-for="item in list" :key="item.id" class="el-carousel__item">
        <!-- <h3>{{item.title}}</!-->
        <!-- <p>{{item.content}}</p> -->
        <div class="nav-image" :style="{backgroundImage:'url(' + item.picLink + ')'}"></div>
        <!-- <img class="nav-image" :src="item.picLink" alt="加载中..."> -->
        <!-- <el-image style="width: 100%; height: auto" :src="item.picLink" fit="contain"></el-image> -->
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      //默认个数为1个
      size: 1
    };
  },
  created() {
    //对轮播图进行初始化
    this.getLunboInfo();
  },
  mounted() {},
  methods: {
    async getLunboInfo() {
      //先获取信息
      let info = await this.$public.getLunboInfo();
      // this.list = info;
      if(info.status){
        this.list = info.content;
      }
      //进行设置
    }
  }
};
</script>

<style scoped>
.contain{
  overflow: hidden;
  /* display: table-cell;
  vertical-align:middle;
  text-align: center; */
}
.nav-image {
  width: 100vw;
  height: 80vh;
  background-size: 100%;
  background-position: center center;
}
.el-carousel__item h3 {
  display: inline;
  position: relative;
  top: 120px;
  right: -100px;
  font-size: 1.3em;
}
.el-carousel__item p {
  position: relative;
  top: 150px;
  right: -100px;
  font-size: 0.8em;
}
</style>
