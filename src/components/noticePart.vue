<template>
  <div class="home-comtent-infomation">
    <!-- 分割线 -->
    <el-divider content-position="left">
      <span class="home-divider-text">
        通知公告
        <i class="el-icon-message"></i>
        <span class="more">
          |
          <a href="/#/information">more</a>
        </span>
      </span>
    </el-divider>
    <ul>
      <li v-for="item in listOfNotice" :key="item.id">
        <span class="home-comtent-infomation-icon">
          <i class="el-icon-s-comment"></i>
        </span>
        <span class="home-comtent-infomation-title" >
          <a href="javascript:void(0)" @click="goDetail(item)">{{item.title}}</a>
          <span v-if="isNew(item)">
            <img src="../assets/new.gif" />
          </span>
        </span>
        <span class="home-comtent-infomation-time">{{item.time}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listOfNotice: [],
      value: new Date()
    };
  },
  methods: {
    async getNoticeInfo() {
      let temp = await this.$public.getAllNoticeInfo();
      if (temp.status) {
        this.listOfNotice = temp.content.reverse().slice(0, 10);
      }
    },
    goDetail(e) {
      // console.log(e)
      this.$router.push("/info-detail/" + e.notice_id);
    },
    isNew(e){
      if(e!=undefined){
        //先将时间进行分割
        let time = e.time.split("/");
        // 获取当前时间
        let now = new Date().toLocaleDateString().split("/");
        //五天之内都为新的
        if(now[0]>=time[0]&&now[1]>=time[1]&&now[2]-time[2]<=5)
          return true;
      }
      return false;
    }
  },
  created() {
    this.getNoticeInfo();
  }
};
</script>

<style scoped>
.grid-content a {
  text-decoration: none;
  color: black;
}
.home-divider-text {
  font-family: "等线";
  font-size: 18px;
  font-weight: bold;
}
.home-comtent-infomation {
  text-align: left;
  height: 450px;
}
.home-comtent-infomation ul {
  display: inline-block;
}
.home-comtent-infomation li {
  margin: 20px 50px;
  display: block;
  font-size: 1em;
  transition: all 0.4s;
}

.home-comtent-infomation li a {
  transition: all 0.4s;
}
.home-comtent-infomation-title a {
  text-decoration: none;
  color: rgb(110, 110, 110);
}
.home-comtent-infomation-title a:hover {
  color: #444;
}
.home-comtent-infomation-time {
  float: right;
  margin-left: 50px;
  font-size: 0.9em;
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


