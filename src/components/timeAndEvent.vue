<template>
  <div class="home-content-infomation">
    <!-- 分割线 -->
    <el-divider content-position="left">
      <span class="home-divider-text">
        历史上的事件
        <i class="el-icon-message"></i>
        <span class="more">
          |
          <a href="javascipt:0">more</a>
        </span>
      </span>
    </el-divider>
    <div class="info"><i class="el-icon-loading"></i> {{whenStr}}，现在时间：{{timeStr}}:{{time_second}}</div>
    <div class="info"><i class="el-icon-coffee-cup"></i> {{holiday}}</div>
    <div class="info" ><i class="el-icon-magic-stick"></i> {{'历史上的今天：'}}<br><br>
    <div v-for="item in historyEvents" :key="item.id" id="eventDisplay">
      <span>{{item.year+'年'+'的今天：'+item.title}}</span>
    </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            whenStr:"",
            timeStr:"",
            time_second:0,
            holiday:"加载中...",
            historyEvents:[]
        }
    },
    methods:{
        async getNextHoliday(){
            let temp = await this.$public.getNextHoliday();
            this.holiday = temp.tts;
        },
        setTime(){
            //获取现在的时间
            let now = new Date();
            //获取小时
            this.whenStr = this.judgeHour(now.getHours())+"好";
            this.timeStr = now.getFullYear()+'年'+(now.getMonth()+1)+'月'+now.getDate()+'日 '+now.getHours()+":"+now.getMinutes();
            this.time_second = now.getSeconds();
            //加0
            if(this.time_second.toString().length==1)
                this.time_second = '0'+this.time_second;
            setTimeout(this.setTime,1000)
        },
        judgeHour(e){
            let when;
            if(e>3&&e<=6){
                when = '凌晨';
            } else if(e>6&&e<=8){
                when = '早晨';
            } else if(e>8&&e<=11){
                when = '上午';
            } else if(e>11&&e<=13){
                when = '中午';
            } else if(e>13&&e<=17){
                when = '下午';
            } else if(e>17&&e<=19){
                when = '傍晚';
            } else if(e>19&&e<=23){
                when = '晚上';
            } else if(e>23&&e<3){
                when = '深夜';
            }
            return when;
        },
        async getHistoryEvent(){
          //获取现在的时间
          let now = new Date();
          //获取当前日期的历史事件
          let temp = await this.$public.getHistoryEvent(now.getMonth()+1,now.getDate());
          if(temp.status){
            let data = JSON.parse(temp.content).data;
            this.historyEvents = data.reverse().slice(0,8);
          }
        }
    },
    mounted(){
        this.setTime();
        this.getNextHoliday();
        this.getHistoryEvent();
    },
    updated(){
    }
};
</script>

<style scoped>
.home-content-infomation{
  height: 450px;
  overflow: hidden;
}
.grid-content a {
  text-decoration: none;
  color: black;
}
.home-divider-text {
  font-family: "等线";
  font-size: 18px;
  font-weight: bold;
}
.more {
  font-size: 0.8em;
  margin-left: 5px;
}
.more a {
  text-decoration: none;
  color: black;
}
.info{
    margin: 20px 0px;
    padding-left: 50px;
}
.info span{
  display: inline-block;
  line-height: 2em;
  text-indent: 3em;
}
#eventDisplay span{
  overflow: hidden;
}
</style>


