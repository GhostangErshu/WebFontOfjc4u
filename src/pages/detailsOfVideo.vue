<template>
  <div class="video-page" v-loading="loading">
    <div class="video-content">
      <iframe
        :src="video.videoLink"
        scrolling="no"
        border="2"
        frameborder="yes"
        framespacing="1"
        allowfullscreen="true"
        id="playBox"
      ></iframe>
    </div>
    <div class="video-comment">
      <div class="video-comment-input">
        <div class="video-comment-input-title">视频评论</div>
        <div id="video-comment-input-box">
          <el-input
            @focus="isInput=!isInput"
            @blur="isInput=!isInput"
            type="textarea"
            :rows="1"
            placeholder="想说点什么"
            v-model="input"
          ></el-input>
          <transition name="el-fade-in-linear">
            <el-button
              v-show="isInput"
              id="input_button"
              type="success"
              icon="el-icon-check"
              size="small"
              plain
            >提交</el-button>
          </transition>
        </div>
      </div>
      <div class="video-comment-items" v-for="item in comments" :key="item.id">
        <div>
          <!-- 头像 -->
          <img
            :src="item.userHead"
          />
          <!-- <span class="video-comment-items-head"></span> -->
          <!-- 姓名 -->
          <span class="video-comment-items-name">{{item.name}}</span>
          <!-- 时间 -->
          <span class="video-comment-items-time">{{item.time}}</span>
          <!-- 评论内容 -->
          <div class="video-comment-items-content">{{item.content}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      loading: false,
      comments: [
        {
          id:1,
          userHead:
            "http://172.16.182.132:7979/uploadFiles/images/headImg/886ba4f8228044d9b4dedbf10b5e123f.png",
          name: "测试",
          time: "2019/10/11 12:03:42",
          content: "学长讲的很到位！"
        },
        {
          id:2,
          userHead:
            "http://172.16.182.132:7979/uploadFiles/images/headImg/886ba4f8228044d9b4dedbf10b5e123f.png",
          name: "测试",
          time: "2019/10/12 12:14:25",
          content: "我觉得在安装过程中还是有一点模糊"
        }
      ],
      isInput: false,
      video: {}
    };
  },
  methods: {
    async getVideoDetail() {
      this.loading = true;
      let id = this.$route.params.pathMatch;
      if (id != undefined && id.length == 32) {
        let temp = await this.$public.getVideoInfo(id);
        if (temp.status) {
          this.video = temp.content;
        } else this.$router.push("/404")
      } else this.$router.push("/404")
      //关闭加载动画
      this.loading = false;
    }
  },
  mounted(){
    this.getVideoDetail()
  }
};
</script>

<style scoped>
.video-page {
  text-align: center;
  min-height: 80vh;
}
.video-content {
  height: auto;
}
#playBox {
  width: 60vw;
  height: 80vh;
  margin-top: 10px;
}
.video-comment {
  margin: auto;
  width: 60vw;
  text-align: left;
  margin-top: 20px;
  margin-bottom: 20px;
}
.video-comment-input-title {
  border-left: 5px #03a9f4 solid;
  line-height: 40px;
  text-indent: 1.5em;
  font-weight: bold;
}
#video-comment-input-box {
  margin-top: 10px;
  padding: 10px;
  text-align: right;
}
#input_button {
  margin-top: 8px;
  transform: all 0.5s;
}
.video-comment-items {
  padding: 10px;
  border-bottom: 1px #ccc dashed;
  margin-bottom: 5px;
}
.video-comment-items img {
  border-radius: 50%;
  height: 40px;
  width: 40px;
  line-height: 40px;
}
.video-comment-items-name {
  display: inline-block;
  font-size: 0.9em;
  line-height: 50px;
  position: relative;
  top: -10px;
}
.video-comment-items-time {
  font-weight: lighter;
  display: inline-block;
  font-size: 0.8em;
  line-height: 50px;
  position: relative;
  top: -10px;
  text-indent: 5px;
}
.video-comment-items-content {
  text-indent: 3em;
  margin-bottom: 10px;
}
</style>