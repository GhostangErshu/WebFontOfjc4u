<template>
  <div class="carousel" align="center" v-title data-title="首页 |  JC4U">
    <!-- 首页轮播图 -->
    <div class="carousel-content">
      <Carousel></Carousel>
    </div>
    <!--倒计时-->
    <div class="countDown">
      <countDown></countDown>
    </div>
    <div class="home-content">
      <!--信息模块-->
      <noticePart id="noticePart"></noticePart>
      <timeAndEvent id="timeAndWeather"></timeAndEvent>
      <!--视频模块-->
      <videoPart></videoPart>
      <!-- 推荐网站模块 -->
      <websitePart></websitePart>
    </div>
  </div>
</template>

<script>
import Carousel from "@/components/carousel";
import countDown from "@/components/countDown";
import videoPart from "@/components/videoPart";
import noticePart from "@/components/noticePart";
import websitePart from "@/components/websitePart";
import timeAndEvent from "@/components/timeAndEvent";

export default {
  name: "Home",
  data() {
    return {
    };
  },
  //加载组件
  components: {
    Carousel,
    countDown,
    videoPart,
    noticePart,
    websitePart,
    timeAndEvent
  }
};
</script>

<style scoped>
.carousel {
  margin: 20px 0 10px 0;
}

.carousel-content {
  width: 99vw;
  display: inline-block;
  margin-top: 10px;
  height: 90vh;
  overflow: hidden;
}

.countDown {
  position: fixed;
  right: 30px;
  top: 10vh;
  z-index: 99999;
}

.home-content {
  margin-top: 20px;
  max-width: 1200px;
  text-align: left;
}
#noticePart{
  width: 50%;
  display: inline-block;
}
#timeAndWeather{
  width: 32%;
  display: inline-block;
  position:absolute;
  text-align: left;
  padding-left:20px;
}
</style>