<template>
  <div>
    <el-divider content-position="left">
      <span class="home-divider-text">
        推荐网站
        <i class="el-icon-monitor"></i>
      </span>
    </el-divider>
    <div>
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in listOfWebsite" :key="item.id">
          <div class="grid-content">
            <a :href="'http://'+item.webLink" target="_blank">
              <div class="home-content-website">
                <el-image class="image" :src="item.picLink" style="height: 100px;" fit="cover"></el-image>
                <h3>{{item.name}}</h3>
              </div>
            </a>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listOfWebsite: []
    };
  },
  methods: {
    async getWebsiteInfo() {
      let temp = await this.$public.getAllWebsiteInfo();
      if(temp.status){
        this.listOfWebsite = temp.content;
      }
    }
  },
  created() {
    this.getWebsiteInfo();
  }
};
</script>
<style scoped>
.grid-content a {
  text-decoration: none;
  color: black;
}

.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.home-content-website {
  height: 150px;
  margin: 20px 20px 60px 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  top: 0;
  transition: all 0.5s;
  text-align: center;
}
.home-content-website h3 {
  margin-top: 15px;
}
.home-content-website:hover {
  transform: scale(1.05, 1.05);
}

.home-divider-text {
  font-family: "等线";
  font-size: 18px;
  font-weight: bold;
}
</style>

