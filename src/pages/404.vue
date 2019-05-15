<template>
    <div class="notfound-content">
        <div class="notfound-content-text">很抱歉，您要访问的页面不存在！</div>
        <div class="notfound-content-img"><img src="../assets/404.jpg" alt=""></div>
        <div class="notfound-content-link"><a href="/">返回主页</a></div>
    </div>
</template>

<script>
    export default{
        // mounted(){
        //     this.test();
        // },
        // methods:{
        //     test(){
        //         this.$ajax.post("https://oapi.dingtalk.com/topapi/attendance/listschedule?access_token=ACCESS_TOKEN")
        //         .then(function(res){
        //             console.log(res.data);
        //         })
        //         .catch(function(res){
        //             console.log(res)
        //         })
        //     }
        // }
    }
</script>

<style scoped>
.notfound-content{
    margin: 100px 0 200px 0;
}
.notfound-content-text{
    padding-top:30px;
    font-size: 2em;
}
.notfound-content-img{
    margin: auto;
    margin: 50px 0;
}
.notfound-content-img img{
    width: 20%;
    height: 20%;
}
.notfound-content-link{
    font-size: 1.5em;
    margin: 50px 0;

}
</style>