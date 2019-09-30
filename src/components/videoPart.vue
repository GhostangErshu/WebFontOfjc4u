<template>
    <div class="home-content-video">
        <!-- 分割线 -->
        <el-divider content-position="left">
          <span class="home-divider-text">
            视频讲解
            <i class="el-icon-video-camera">
            </i><span class="more">| <a href="javascript:0">more</a></span>
          </span>
        </el-divider>
        <el-row :gutter="20">
          <el-col :span="6" v-for="item in listOfVideo" :key="item.id">
            <div class="grid-content">
              <a :href="item.videoLink" target="_blank">
                <div class="home-content-video-item">
                  <el-image class="image" :src="item.picLink"></el-image>
                  <p>{{item.title}}</p>
                  <p>发布时间:{{item.time}}</p>
                </div>
              </a>
            </div>
          </el-col>
        </el-row>
      </div>
</template>

<script>
export default {
  data(){
    return {
      listOfVideo: []
    }
  },
  methods:{
    async getVideoInfo() {
      let temp = await this.$public.getAllVideoInfo();
      if(temp.status){
        this.listOfVideo = temp.content
      } else console.log(temp.error)
    }
  },
  created(){
    this.getVideoInfo();
  }
}
</script>

<style scoped>

.home-divider-text {
  font-family: "等线";
  font-size: 18px;
  font-weight: bold;
}
.grid-content a {
  text-decoration: none;
  color: black;
}
.home-content-video {
  text-align: center;
  padding:20px 0;
}
.home-content-video-item {
  width: 170px;
  height: 130px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: inline-block;
  margin: 15px 0;
  position: relative;
  top: 0;
  transition: all 0.5s;
}
.home-content-video-item .image {
  position: relative;
  z-index: -1;
}

.home-content-video-item p {
  line-height: 25px;
  font-size: 0.8em;
}

.home-content-video-item:hover {
  top: -10px;
  cursor: pointer;
  background: url(../assets/video.png) no-repeat center 35%;
  background-color: rgb(200, 200, 200, 0.5);
  background-size: 50px 50px;
}
.more {
  font-size: 0.8em;
  margin-left: 5px;
}
.more a {
  text-decoration: none;
  color: black;
}
</style>


