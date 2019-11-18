<template>
  <div class="detail" v-title :data-title="data_title" v-loading="loading">
    <div class="detail-title">
      <h2>{{notice.title}}</h2>
    </div>
    <div class="detail-data">
      <span>
        <i class="el-icon-view"></i>
        浏览量：{{notice.click}}
      </span>
      <span>
        <i class="el-icon-user-solid"></i>
        发布人：{{notice.publisher}}
      </span>
      <span>
        <i class="el-icon-edit-outline"></i>
        发布时间：{{notice.time}}
      </span>
    </div>
    <div class="detail-content markdown-body" v-html="notice.content"></div>
  </div>
</template>

<script>
import showdown from "showdown";
import "github-markdown-css";

export default {
  data() {
    return {
      loading: false,
      data_title: "详情",
      notice: {
        title: "",
        publisher: "-",
        time: "-",
        click: "-",
        content: ""
      }
    };
  },
  methods: {
    async getNoticeInfo() {
      let id = this.$route.params.pathMatch;
      if (id != undefined && id.length == 32) {
        // console.log(this.$route.params.pathMatch)
        let temp = await this.$public.getNoticeInfoByNoticeId(id);
        if (temp.status) {
          this.notice = temp.content;
          this.data_title = temp.content.title;
        }
      }
      // this.setContent();
      this.loading = false;
    },
    // 这是将md文件转html
    setContent() {
      let converter = new showdown.Converter();
      let html = converter.makeHtml(this.notice.content);
      this.$el.querySelector(".detail-content").innerHTML = html;
    },
    //设置行号
  },
  mounted() {
    this.loading = true;
    this.getNoticeInfo();
  },
  created(){
    this.$public.addNoticeClickNum();
  }
};
</script>


<style scoped>
.detail {
  width: 60%;
  min-height: 80vh;
  margin: auto;
  font-weight: normal;
  margin-bottom: 50px;
}
.detail-title {
  margin-top: 20px;
  font-size: 1.5em;
  margin-bottom: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid #ccc;
}
.detail-data {
  font-size: 0.9em;
}
.detail-data span {
  margin: 0 20px;
}
.detail-content {
  /* font-family:  */
  margin-top: 12px;
  font-size: 1em;
  text-align: left;
}
</style>
