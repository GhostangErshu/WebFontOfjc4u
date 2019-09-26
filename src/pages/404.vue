<template>
  <div class="notfound-content" v-title data-title="页面不存在  |  JC4U">
    <div class="notfound-content-text">{{errorMsg}}</div>
    <div class="notfound-content-engText">{{englishMsg}}</div>
    <div class="notfound-content-img">
      <img src="../assets/404.png" alt />
    </div>
    <div class="auto_redirct">{{count}}S后将自动返回上一页</div>
    <div class="notfound-content-link" v-for="item in link" :key="item.id">
      <router-link :to="item.to" class="to">{{item.title}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorMsg: "抱歉，這個頁面無法取得",
      englishMsg: "JC4U is having trouble finding that page.",
      link: [
        {
          id: 1,
          title: "返回主页",
          to: "/"
        },
        {
          id: 2,
          title: "返回个人中心",
          to: "/mine"
        }
      ],
      count: 11
    };
  },
  methods: {
    autoToLastPage() {
        if(--this.count>0)
            setTimeout(this.autoToLastPage,1000);
        else this.$router.go(-1)
    }
  },
  mounted() {
    this.autoToLastPage();
  }
};
</script>

<style scoped>
.notfound-content {
  min-height: 85vh;
  width: 100%;
}
.notfound-content-text {
  font-size: 1.6em;
  margin-top: 120px;
}
.notfound-content-engText {
  margin-top: 30px;
  font-size: 1.1em;
}
.notfound-content-img {
  margin: auto;
  margin: 40px 0;
}
.notfound-content-link {
  font-size: 1.1em;
  margin: 40px 0;
}
.router-link-active {
  background-color: rgba(0, 0, 0, 0);
  border-bottom: none;
}
.auto_redirct {
  font-size: 1.2em;
}
.to {
  color: #3789ee;
  text-decoration: none;
  transition: all 0.5s;
  padding-bottom: 0;
}
.to:hover {
  color: #5e9de9;
  padding-bottom: 5px;
  border-bottom: 7px #5e9de9 solid;
}
</style>