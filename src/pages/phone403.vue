<template>
  <div class="notfound-content" v-title data-title="页面禁止访问  |  JC4U">
    <div class="notfound-content-text">{{errorMsg}}</div>
    <div class="notfound-content-engText">{{englishMsg}}</div>
    <div class="notfound-content-img">
      <img src="../assets/403.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorMsg: "不支持使用移动设备进行访问",
      englishMsg: "Mobile access is not supported."
    };
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
</style>