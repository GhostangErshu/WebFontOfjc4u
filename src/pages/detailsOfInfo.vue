<template>
    <div class="detail" v-title :data-title="data_title" v-loading="loading">
        <div class="detail-title">
            <h2>{{notice.title}}</h2>
        </div>
        <div class="detail-data">
            <span><i class="el-icon-view"></i>浏览量：{{notice.click}}</span>
            <span><i class="el-icon-user-solid"></i>发布人：{{notice.publisher}}</span>
            <span><i class="el-icon-edit-outline"></i>发布时间：{{notice.time}}</span>
        </div>
        <div class="detail-content">
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            loading:false,
            data_title:"详情",
            notice:{
                title:"",
                publisher:"-",
                time:"-",
                click:"-",
                content:""
            }
        }
    },
    methods:{
        async getNoticeInfo(){
            let id = this.$route.params.pathMatch;
            if(id!=undefined&&id.length==32){
                // console.log(this.$route.params.pathMatch)
                let temp = await this.$public.getNoticeInfoByNoticeId(id);
                if(temp.status) {
                    this.notice = temp.content;
                    this.data_title = temp.content.title;
                    console.log(this.data_title)
                }
            }
            this.setContent();
            this.loading = false;
        },
        setContent(){
            this.$el.querySelector(".detail-content").innerHTML = this.notice.content;
        }
    },
    mounted(){
        this.loading = true;
        this.getNoticeInfo();
        this.$public.addNoticeClickNum();
    },
}
</script>


<style>
.detail{
    width: 60%;
    margin: auto;
    min-height: 80vh;
}
.detail-title{
    margin-top: 20px;
    font-size: 1.5em;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 2px solid #000;
}
.detail-data span{
    margin: 0 20px;
}
.detail-content{
    font-weight: normal;
    margin: 30px 0;
    font-size: 1.1em;
    text-align: left;
    text-indent: 2em;
    line-height: 1.3em;
}
.detail-content{
}
</style>
