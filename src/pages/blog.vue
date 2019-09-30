<template>
  <div v-title data-title="学长课堂 |  JC4U" class="contain">
    <div class="blog">
      <div class="blog-head">
        <div class="blog-class">“第二课”科创工作室学长课堂-{{classInfo.name}}</div>
        <hr />
        <div class="blog-head-info">
          上课学长:
          <span>{{classInfo.teacher}}</span>
        </div>
        <div class="blog-head-info">
          上课时间:
          <span>{{classInfo.semester}}</span>
        </div>
        <div class="blog-head-info">
          上课时长:
          <span>{{classInfo.length}}节</span>
        </div>
        <div class="blog-head-info">
          当前状态:
          <span v-if="classInfo.status==1" style="color:#67C23A">正在参与</span>
          <span v-if="classInfo.status==0" style="color:#EE2C2C">已结束</span>
        </div>
      </div>
      <div class="blog-body">
        <el-tabs v-model="activeName" lazy="true">
          <el-tab-pane name="notCompleted">
            <span slot="label">
              <i class="el-icon-edit-outline"></i> 待完成
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
                  <el-button type="text" size="small">下载题目要求</el-button>
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
              <el-table-column prop="submitter" label="提交人" width="100"></el-table-column>
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
              <el-table-column prop="submitter" label="提交人" width="100"></el-table-column>
              <el-table-column prop="corrector" label="批改人" width="100"></el-table-column>
              <el-table-column prop="rating_time" label="批阅时间"></el-table-column>
              <el-table-column prop="score" label="所得分数" width="100"></el-table-column>
              <el-table-column prop="workid" label="操作" width="200">
                <template slot-scope="scope">
                  <el-button @click="goResult(scope.row)" type="text" size="small">查看详情</el-button>
                  <el-button type="text" size="small">整体得分情况</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userid: "",
      activeName: "notCompleted",
      notCompletedData: [],
      notApprovedData: [],
      completedData: [],
      classInfo: {}
    };
  },
  methods: {
    goEditor(e) {
      this.$router.push("/blogEditor/" + e.workid);
    },
    goResult(e) {
      this.$router.push("/blogResult/" + e.workid);
    },
    indexMethod(index) {
      return index + 1;
    },
    async getNotCompletedData() {
      //这里的id就是用户id
      let temp = await this.$public.getNotCompletedDataById(this.userid);
      let array = [];
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
            (task.deadline - new Date().getTime() - 1000 * 60 * 60 * 24 * day) /
              (1000 * 60 * 60)
          );
          //进行字符串的拼接
          let tempString;
          if (day > 0) tempString = day + "天" + hour + "小时";
          else if (day == 1) tempString = hour + "小时";
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
              submitter: temp.content[i].name,
              corrector: temp.content[i].currector,
              rating_time: temp.content[i].time_currect,
              notes: temp.content[i].comment,
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
    async getClassInfo() {
      let temp = await this.$public.getClassInfoById(this.userid);
      if (temp.status) {
        this.classInfo = temp.content;
      }
    },
    putTaskid() {
      let tempArray = {
        notCompleted: new Array(this.notCompletedData.length),
        notApproved: new Array(this.notApprovedData.length),
        completed: new Array(this.completedData.length)
      };
      for (let i = 0; i < this.notCompletedData.length; i++) {
        tempArray.notCompleted.push(this.notCompletedData[i].workid);
      }
      for (let i = 0; i < this.notApprovedData.length; i++) {
        tempArray.notApproved.push(this.notApprovedData[i].workid);
      }
      for (let i = 0; i < this.completedData.length; i++) {
        tempArray.completed.push(this.completedData[i].workid);
      }
      this.$access_data = tempArray;
    }
  },
  created() {
    this.getUserId();
  },
  mounted() {
    this.getNotCompletedData();
    this.getNotApprovedData();
    this.getCompletedData();
    this.getClassInfo();
    this.putTaskid();
  }
};
</script>


<style scoped>
.contain {
  background-image: url("https://cdn.pixabay.com/photo/2019/06/14/09/25/cloud-4273197_960_720.png");
}
.blog {
  width: 50vw;
  display: inline-block;
  text-align: left;
  padding: 10px;
  border: 2px solid #eee;
  border-radius: 10px;
  margin-bottom: 20px;
  margin-top: 20px;
  min-height: 85vh;
  transition: all 0.5s;
  background-color: rgba(255, 255, 255, 0.9);
}
.blog:hover {
  box-shadow: 0px 0px 4px 3px #999;
}
.blog-head {
  padding: 5px;
}
.blog-class {
  height: 50px;
  line-height: 60px;
  text-indent: 2em;
  letter-spacing: 2px;
  font-size: 1.2em;
  font-weight: bold;
}
.blog-head-info {
  font-weight: bold;
  text-indent: 1em;
  margin: 15px 0;
}
.blog-head-info span {
  font-weight: normal;
  margin-left: 1em;
  font-size: 0.9em;
}
</style>
