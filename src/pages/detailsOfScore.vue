<template>
  <div class="contain">
    <div class="content">
      <div class="ScoreTitle">{{title}}</div>
      <div class="ScorePanel">
        <div class="PanelContent">
          <div class="General">
            最近任务成绩排行榜
            <el-select v-model="option" placeholder="请选择任务" size="small" class="select">
              <el-option
                v-for="item in tasks"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <br />
          <br />
          <div class="singleItem" id="title">
            <span>排名</span>
            <span>姓名</span>
            <span>分数</span>
            <span>班级</span>
            <span>详情</span>
          </div>
          <div v-for="item in totalList" :key="item.id">
            <div class="singleItem">
              <span>{{item.ranking}}</span>
              <span>{{item.name}}</span>
              <span>{{item.score}}</span>
              <span>{{item.className}}</span>
              <span class="detail" @click="toDetail">{{"查看详情"}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="ScorePanel">
        <div class="PanelContent">
          <div class="General">总成绩前十排行榜</div>
          <div class="item" id="title">
            <span>排名</span>
            <span>姓名</span>
            <span>总分数</span>
            <span>班级</span>
          </div>
          <div v-for="item in totalList" :key="item.id">
            <div v-if="item.ranking==1" class="item">
              <span>
                <img src="../assets/1.png" />
              </span>
              <span>{{item.name}}</span>
              <span>{{item.score}}</span>
              <span>{{item.className}}</span>
            </div>
            <div v-if="item.ranking==2" class="item">
              <span>
                <img src="../assets/2.png" />
              </span>
              <span>{{item.name}}</span>
              <span>{{item.score}}</span>
              <span>{{item.className}}</span>
            </div>
            <div v-if="item.ranking==3" class="item">
              <span>
                <img src="../assets/3.png" />
              </span>
              <span>{{item.name}}</span>
              <span>{{item.score}}</span>
              <span>{{item.className}}</span>
            </div>
            <div v-if="item.ranking>3" class="item">
              <span>{{item.ranking}}</span>
              <span>{{item.name}}</span>
              <span>{{item.score}}</span>
              <span>{{item.className}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "JC4U&学长课堂成绩排行榜",
      totalList: [],
      option:"",
      tasks:[
        {
          value:'01012',
          name:'类的继承'
        }
      ]
    };
  },
  methods:{
    async getTotalTopTen(){
      //获得原始数据
      let temp = await this.$public.getTotalTopTen();
      //对数据进行进一步处理
      let tempArray = new Array(temp.length);
      for(let i=0;i<temp.length;i++)
         tempArray[i] = {
          ranking:i+1,
          name:temp[i].name,
          score:temp[i].grade,
          className:temp[i].temp
      }
      //赋值
      this.totalList = tempArray;
    },
    toDetail(){
      alert("查看详情")
    }
  },
  mounted(){
    this.getTotalTopTen();
  },
  //监控选择框的值
  watch:{
    option(e){
      console.log(e)
    }
  }
};
</script>

<style scoped>
.contain {
  height: auto;
  background-image: url("http://weiliicimg1.pstatp.com/weili/sm/704589488053682185.webp");
}
.content {
  margin: auto;
  padding-top: 30px;
  width: 70vw;
  height: 90vh;
  background-color: rgba(200, 200, 200, 0.4);
  margin: auto;
}
.ScoreTitle {
  margin: 0 2.5vw;
  height: 5vh;
  width: 65vw;
  line-height: 5vh;
  font-size: 1.5em;
  color: #1781bf;
}
.ScorePanel {
  width: 30vw;
  height: 80vh;
  background-color: rgb(150, 150, 150, 0.6);
  margin: 2vh 2.5vw 3vh 2.5vw;
  float: left;
}
.General {
  height: 30px;
  line-height: 30px;
  font-size: 0.9em;
  font-weight: bold;
}
.PanelContent {
  padding: 10px 15px;
}
.item {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  padding-left: 5px;
  background-color: #ccc;
  color: #222;
  font-size: 0.9em;
}
.item span {
  margin: 0;
  display: inline-block;
  width: 20%;
  overflow:hidden;
}
.singleItem{
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: #ccc;
  color: #222;
  font-size: 0.9em;
}
.singleItem span {
  margin: 0;
  display: inline-block;
  width: 16%;
  overflow:hidden;
}
.detail{
  transition: all 0.5s;
}
.detail:hover{
  font-weight: bold;
  color: #000;
  cursor: pointer;
}
#title {
  font-weight: bold;
  background-color: #475851;
  color: #fff;
  font-size: 1em;
}
img {
  height: 30px;
  position: relative;
  top: 10px;
}
</style>

