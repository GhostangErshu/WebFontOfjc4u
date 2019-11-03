<template>
  <div class="information" v-title data-title="信息通知 |  JC4U">
    <div class="information-title">
      <span class="information-title-title">通知公告</span>
      <hr />
    </div>
    <div class="information-content-searhbar">
      <el-input
        placeholder="请输入你想查找的公告标题"
        prefix-icon="el-icon-search"
        v-model="search"
        class="information-content-searhbar-input"
      ></el-input>
    </div>
    <div class="information-content">
      <el-table
        :data="listOfDisplay.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        :default-sort="{ order: 'descending'}"
        @row-click="goDetail"
      >
        <el-table-column prop="title" label="标题" sortable></el-table-column>
        <el-table-column prop="click" label="点击" sortable width="100"></el-table-column>
        <el-table-column prop="publisher" label="发布人" sortable width="120"></el-table-column>
        <el-table-column prop="time" label="发布时间" sortable width="180"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      listOfNotice: [],
      length: 0,
      input: "",
      currentPage: 10,
      pageNum: 1,
      listOfDisplay: []
    };
  },
  methods: {
    async getNoticeInfo() {
      //先获取所有的通知信息
      let temp = await this.$public.getAllNoticeInfo();
      if (temp.status) {
        this.listOfNotice = temp.content.reverse();
        this.length = this.listOfNotice.length;
        //默认第一次显示10个
        this.listOfDisplay = this.listOfNotice.slice(0, 10);
      }
    },
    handleSizeChange(e) {
      //变化每一页显示的个数
      this.currentPage = e;
      this.changeDispaly();
    },
    handleCurrentChange(e) {
      //变化显示的页数
      this.pageNum = e;
      this.changeDispaly();
    },
    formatter(row, column) {},
    changeDispaly() {
      //刷新表格视图
      let start = (this.pageNum - 1) * this.currentPage;
      this.listOfDisplay = this.listOfNotice.slice(
        start,
        start + this.currentPage
      );
    },
    goDetail(e) {
      // console.log(e);
      this.$router.push("/info-detail/" + e.notice_id);
    }
  },
  created() {
    this.getNoticeInfo();
  }
};
</script>

<style scoped>
.information {
  margin: auto;
  margin-top: 30px;
  width: 55%;
  margin-bottom: 50px;
  min-height: 80vh;
}
.information-title {
  text-align: left;
}
.information-title-title {
  font-size: 1.4em;
  font-weight: bold;
  text-indent: 1em;
}
.select-class {
  width: 90px;
}
.information-title-right {
  float: right;
  margin-right: 30px;
}
.information-title-right-input {
  width: 200px;
  height: 30px;
}
.information-content {
  margin: 30px 0 60px 0;
}
.information-content-searhbar {
  height: auto;
  text-align: left;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>