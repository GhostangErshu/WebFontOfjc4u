<template>
    <div class="detail" v-title :data-title="data_title">
        <div class="detail-title">
            <h2>成都大学关于开展2019年校级一流专业建设点申报工作的通知</h2>
            <hr>
        </div>
        <div class="detail-data">
            <span>浏览量：517</span>
            <span>发布人：管理员</span>
            <span>发布时间：2019-04-25</span>
        </div>
        <div class="detail-content">
            
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            data_title:"详情"
        }
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
    font-size: 1.3em;
    text-align: left;
    text-indent: 2em;
    line-height: 1.3em;
}
</style>
