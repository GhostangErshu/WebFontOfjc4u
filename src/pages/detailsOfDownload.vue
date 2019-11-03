<template>
    <div class="detail"  v-title :data-title="data_title">
        <div class="detail-title">
            <h2>{{src.name}}</h2>
        </div>
        <div class="detail-data">
            <span><i class=""></i>下载次数：{{src.visitNum}}</span>
            <span><i class="el-icon-user"></i>贡献者：{{src.contributor}}</span>
            <span><i class=""></i>发布时间：{{src.time}}</span>
        </div>
        <div class="detail-content"></div>
        <div class="detail-button">
            <el-button @click="download">点击下载</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            data_title:"资源详情",
            src:{},
            id:""
        }
    },
    methods:{
        async getDetailInfo(){
            let temp = await this.$public.getDetailSrcDataById(this.id);
            if(temp.status){
                // console.log(temp.content)
                this.src = temp.content;
                this.$el.querySelector(".detail-content").innerHTML = temp.content.describe;
            }
        },
        getSrcId(){
            // console.log(this.$route.params.pathMatch)
            this.id = this.$route.params.pathMatch;
        },
        download(){
            this.$public.addVisitNum({id:this.id});
            window.open(this.src.link);
        }
    },
    mounted(){
        this.getSrcId();
        this.getDetailInfo();
    }
}
</script>


<style scoped>
.detail{
    width: 60%;
    margin: auto;
}
.detail-title{
    margin-top: 50px;
    font-size: 1.7em;
}
.detail-data span{
    margin: 0 20px;
}
.detail-content{
    margin: 30px 0;
    text-align: left;
    line-height: 1.3em;
}
.detail-content span{
    font-size: 1.3em;
    font-weight: bold;
    display: inline-block;
    margin-top:30px;
}
.detail-content p{ 
    font-size: 1.1em;
    text-indent: 2em;
}
.detail-content p img{ 
    width: 40%;
}
.detail-content-link ul{
    text-align: center;
    margin: 50px 0 100px 0;
}
.detail-content-link ul li{
    font-size: 1.4em;
    display: inline-block;
    margin: 0 20px;
}
.detail-content-link ul li a{
    text-decoration: none;
    border: 1px solid #cccccc;
    border-radius: 5%;
    padding: 10px;
    background-color: #909399;
    color: #fff;
}
.detail-content-link ul li a:hover{
    color: #000;
    background-color: #fff;
}
.detail-content-link ul li img{
    display: inline-block;
    width: 1.1em;
    position: relative;
    top:2px;
}
</style>
