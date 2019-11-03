<template>
  <div>
    <el-tabs v-model="activeName" lazy="true" @tab-click="choose">
      <el-tab-pane name="notCompleted">
        <span slot="label">
          <i class="el-icon-edit-outline"></i> 待提交
        </span>
        <el-table :data="notCompletedData" style="width: 100%">
          <el-table-column type="index" :index="indexMethod"></el-table-column>
          <el-table-column prop="name" label="名称" width="300"></el-table-column>
          <el-table-column prop="publisher" label="发布人" width="100"></el-table-column>
          <el-table-column prop="deadline" label="剩余时间" width="180"></el-table-column>
          <el-table-column prop="notes" label="备注说明"></el-table-column>
          <el-table-column prop="workid" label="操作" width="150">
            <template slot-scope="scope">
              <!-- 这里处理的是当已截止的情况下怎么处理 -->
              <el-button
                @click="goEditor(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.deadline.indexOf('已截止')==-1"
              >提交</el-button>
              <el-button type="text" size="small" @click="downloadFile(scope.row)">下载题目要求</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="notApproved">
        <span slot="label">
          <i class="el-icon-mouse"></i> 未批阅
        </span>
        <el-table :data="notApprovedData" style="width: 100%">
          <el-table-column type="index" :index="indexMethod"></el-table-column>
          <el-table-column prop="name" label="名称" width="300"></el-table-column>
          <el-table-column prop="commit_time" label="提交时间"></el-table-column>
          <el-table-column prop="notes" label="备注说明" width="300"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="completed">
        <span slot="label">
          <i class="el-icon-finished"></i> 已完成
        </span>
        <el-table :data="completedData" style="width: 100%">
          <el-table-column type="index" :index="indexMethod"></el-table-column>
          <el-table-column prop="name" label="名称" width="300"></el-table-column>
          <el-table-column prop="corrector" label="批改人" width="100"></el-table-column>
          <el-table-column prop="rating_time" label="批阅时间"></el-table-column>
          <el-table-column prop="score" label="所得分数" width="100"></el-table-column>
          <el-table-column prop="workid" label="操作" width="200">
            <template slot-scope="scope">
              <el-button @click="goResult(scope.row)" type="text" size="small">查看详情</el-button>
              <el-button @click="goDetail()" type="text" size="small">整体得分情况</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "blog_body",
  data() {
    return {
      activeName: "notCompleted",
      notCompletedData: [],
      notApprovedData: [],
      completedData: [],
      chooseTag: 0
    };
  },
  methods: {
    goEditor(e) {
      this.$router.push("/blogEditor/" + e.workid);
    },
    goResult(e) {
      this.$router.push("/blogResult/" + e.workid);
    },
    goDetail(e) {
      this.$router.push("/score-detail");
    },
    downloadFile(e){
      // console.log(e)
      window.open(e.filelink);
    },
    indexMethod(index) {
      return index + 1;
    },
    async getNotCompletedData() {
      //这里的id就是用户id
      let temp = await this.$public.getNotCompletedDataById(this.userid);
      //创建一个array进行装数据
      var array = [];
      //获取到了未完成任务的列表
      if (temp.status) {
        // 再通过taskid对task内容进行查询
        for (let i = 0; i < temp.content.length; i++) {
          //通过taskid来查询task信息
          let temp2 = await this.$public.getTaskInfoByTaskid(
            temp.content[i].taskId
          );
          if (temp2.status) {
            let task = temp2.content;
            //进行日期的处理
            let day = Math.floor(
              (task.deadline - new Date().getTime()) / (1000 * 60 * 60 * 24)
            );
            let hour = Math.round(
              (task.deadline -
                new Date().getTime() -
                1000 * 60 * 60 * 24 * day) /
                (1000 * 60 * 60)
            );
            //进行字符串的拼接
            let tempString;
            if (day >= 0) tempString = day + "天" + hour + "小时";
            // else if (day == 0) tempString = hour + "小时";
            else tempString = "已截止";
            array[i] = {
              name: task.title,
              publisher: task.publisher,
              // 截止时间还有几天
              deadline: tempString,
              notes: task.notes,
              workid: task.taskId,
              filelink: task.fileLink
            };
          }
        }
      }
      this.notCompletedData = array;
    },
    async getCompletedData() {
      //这里的id就是用户id
      let temp = await this.$public.getCompletedDataById(this.userid);

      let array = [];
      if (temp.status)
        for (let i = 0; i < temp.content.length; i++) {
          //通过taskid来查询task信息
          let temp2 = await this.$public.getTaskInfoByTaskid(
            temp.content[i].taskId
          );
          if (temp2.status) {
            let task = temp2.content;
            //拼装数据
            array[i] = {
              name: task.title,
              corrector: temp.content[i].corrector,
              rating_time: temp.content[i].time_correct,
              score: temp.content[i].grade,
              workid: task.taskId
            };
          }
        }
      this.completedData = array;
    },
    async getNotApprovedData() {
      //这里的id就是用户id
      let temp = await this.$public.getNotApprovedDataById(this.userid);
      let array = [];
      if (temp.status) {
        for (let i = 0; i < temp.content.length; i++) {
          //查询task
          let temp2 = await this.$public.getTaskInfoByTaskid(
            temp.content[i].taskId
          );
          if (temp2.status) {
            let task = temp2.content;
            array[i] = {
              name: task.title,
              submitter: temp.content[i].name,
              commit_time: temp.content[i].time_submit,
              notes: task.notes
            };
          }
        }
      }
      this.notApprovedData = array;
    },
    getUserId() {
      //判断cookies是否还存在
      if (this.$cookies.isKey("userid"))
        this.userid = this.$cookies.get("userid");
    },
    choose(parme) {
      // console.log(parme)
      let e = parme.index;
      if (e == 0) {
        this.getNotCompletedData();
      } else if (e == 1) {
        this.getNotApprovedData();
      } else if (e == 2) {
        this.getCompletedData();
      } else console.log("指令错误");
    }
  },
  mounted() {
    this.getUserId();
    this.getNotCompletedData();
    // this.getNotApprovedData();
    // this.getCompletedData();
  }
};
</script>