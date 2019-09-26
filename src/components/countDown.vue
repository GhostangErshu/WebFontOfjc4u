<template>
  <div v-if="countdown_time>0">
    <div class="count-frist">
      <span class="count-text">距离</span>
      <span class="count-thing">{{countdown_thing}}</span>
      <span class="count-text">还有</span>
      <span class="count-time">{{countdown_time}}</span>
      <span class="count-text">天</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //事件的时间
      countdown_time: 0,
      //时间对象
      countdown_thing: ""
    };
  },
  methods: {
    async setCountDown() {
      //获取信息
      let info = await this.$public.getCountDownInfo();
      //将传过来的数据进行依次设置
      this.countdown_thing = info.thing;
      //将传过来的时间字符串进行转换
      let date = parseInt(info.time) - new Date().getTime();
      let time = Math.floor(date / (1000 * 60 * 60 * 24)) + 1;
      this.countdown_time = time;
    }
  },
  created() {
    this.setCountDown();
  }
};
</script>

<style scoped>
.count-frist {
  display: inline-block;
  height: auto;
  width: 100px;
  padding: 10px;
  background-color: #E1FFFF;
  border-radius: 5px;
  box-shadow: 2px 2px 2px #ccc;
  transition: all 0.5s;
}

.count-frist:hover {
  cursor: pointer;
  width: 200px;
}

.count-frist span {
  display: block;
  line-height: 1.5em;
}
.count-text {
  font-size: 1.2em;
}

.count-thing {
  font-size: 1.3em;
  color: #008b8b;
}

.count-time {
  font-size: 2em;
  color: red;
}
</style>


