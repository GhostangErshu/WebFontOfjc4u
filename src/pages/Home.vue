<template>
  <div class="carousel" align="center">
    <!-- 首页轮播图 -->
    <Carousel></Carousel>
  <div class="home-content">
    <div class="home-content-video">
      <!-- 分割线 -->
      <el-divider content-position="left" ><span class="home-divider-text" >视频讲解<i class="el-icon-video-camera"></i></span></el-divider>
      <el-row :gutter="20">
        <el-col :span="6"  v-for="item in 11" :key="item" >
          <div class="grid-content">
            <div class="home-content-video-item">
              <img src="#" alt="">
              <p>{{ item }}</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="home-comtent-infomation">
       <!-- 分割线 -->
      <el-divider content-position="left"><span class="home-divider-text" >通知公告<i class="el-icon-message"></i></span></el-divider>
      <ul>
        <li v-for="item in 6" :key="item">
          <span class="home-comtent-infomation-icon"><i class="el-icon-s-comment"></i></span>
          <span class="home-comtent-infomation-title">关于组织参加“南方测绘杯”第三届成都大学测绘技能竞赛暨第五届四川省大学生测绘技能竞赛选拔通知</span>
        </li>
      </ul>
    </div>
    <!-- 分割线 -->
    <el-divider content-position="left"><span class="home-divider-text" >推荐网站<i class="el-icon-monitor"></i></span></el-divider>
    <div>
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in 7" :key="item"><div class="grid-content">
          <div class="home-content-website">

          </div>
          </div></el-col>
      </el-row>
    </div>
  </div>
  <div class="calendar">
    <el-calendar v-model="value">
    </el-calendar>
  </div>
  </div>
</template>

<script>
import Carousel from "@/components/carousel"

export default{
    name:"Home",
    data(){
        return{
            msg:"首页",
            value: new Date()
        }
    },
    components:{
      Carousel
    }
}

</script>

<style scoped>
 
  .carousel{
      margin:  50px 100px;
  }
  .home-content{
    margin-top:80px;
    max-width: 1200px;
  }
  .home-divider-text{
    font-family: "等线";
    font-size: 18px;
    font-weight: bold;
  }
  .home-content-video{
    text-align: center;
  }
  .home-content-video-item{
    width: 170px;
    height: 120px;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    display: inline-block;
    margin: 15px 0 ;
  }
  .home-content-video-item img{
    height: 90px;
  }
  .home-comtent-infomation{
    text-align: left;
  }
  .home-comtent-infomation li{
    margin: 10px 50px;
    display: inline-block;
    font-size: 18px;
    font-family: "等线";
  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .home-content-website{
    background-color: antiquewhite;
    height: 150px;
    margin: 20px 20px;
  }
  .calendar{
    width: 50%;
  }
</style>