<template>
  <div class="download-content" v-title data-title="资源下载 |  JC4U">
    <div class="download-content-searhbar">
      <el-input
        placeholder="请输入你想查找的资源"
        prefix-icon="el-icon-search"
        v-model="serchText"
        @change="serchChange"
        class="download-content-searhbar-input"
      ></el-input>
      <el-row class="download-content-searhbar-button">
        <el-button icon="el-icon-search" type="info" onclick="alert('开发中...')">搜索</el-button>
      </el-row>
    </div>
    <div class="download-content-items">
      <el-table :data="downloadInfo" style="width: 100%" align="center">
        <el-table-column prop="id" width="60" label="#"></el-table-column>
        <el-table-column prop="name" width="250" label="资源名称"></el-table-column>
        <el-table-column prop="contributor" label="分享人" width="180"></el-table-column>
        <el-table-column prop="time" label="分享日期" width="180"></el-table-column>
        <el-table-column prop="visitNum" width="180" label="下载次数"></el-table-column>
      </el-table>
    </div>
    <div class="download-content-Pagination">
      <el-pagination
        :total="total"
        :background="useBackground"
        layout="prev, pager, next"
        :page-size="page_size"
        :current-page="current_page"
        :pagerCount="pager_count"
        @current-change="current_change"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 0,
      page_size: 10,
      // 必须为大于5小于21的奇数
      pager_count: 9,
      useBackground: true,
      downloadInfo: [],
      serchedInfo: [],
      allInfo: [],
      //初始当前页
      current_page: 1,
      serchText: ""
    };
  },
  created() {
    this.getAllInfo();
  },
  mounted() {
    // this.getAllInfo();
  },
  methods: {
    async getAllInfo() {
      let temp = await this.$public.getAllResouceInfo();
      if (temp.status) {
        this.allInfo = temp.content;
        this.total = this.allInfo.length;
        //调用一次数据
        this.display(1);
      }
    },
    display(pageId) {
      //确认需要显示的条目数
      let num =
        this.total > pageId * this.page_size
          ? this.page_size
          : this.total % this.page_size;
      //将数据装入目标数组
      let temp = this.allInfo.slice(
        (pageId - 1) * this.page_size,
        (pageId - 1) * this.page_size + num
      );
      let length = this.downloadInfo.length;
      //清空数组
      this.downloadInfo.splice(0, length);
      this.downloadInfo = this.downloadInfo.concat(temp);
    },
    current_change(log) {
      this.$data.current_page = log;
      this.display(this.$data.current_page);
    },
    serchChange() {
      //实现搜索功能
    },
    clearItems(e) {
      const length = e.length;
      for (var i = 0; i < length; i++) {
        e.pop();
      }
    }
  }
};
</script>

<style scoped>
.download-content {
  margin: auto;
  width: 60%;
  height: 90vh;
}
.download-content-searhbar {
  height: auto;
  width: 70%;
  text-align: left;
  margin: auto;
  margin-top: 40px;
  margin-bottom: 40px;
}
.download-content-searhbar-input {
  display: inline-block;
  width: 60%;
}
.download-content-searhbar-button {
  display: inline-block;
  width: 20%;
}
.download-content-items {
  height: auto;
}
.download-content-Pagination {
  height: 30px;
  background-color: azure;
}
</style>