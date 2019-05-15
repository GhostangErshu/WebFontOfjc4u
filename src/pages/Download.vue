<template>
    <div class="download-content">
        <div class="download-content-searhbar">       
            <el-input
                placeholder="请输入你想查找的资源"
                prefix-icon="el-icon-search"
                v-model="serchText"
                @change="serchChange"
                class="download-content-searhbar-input">
            </el-input>
            <el-row class="download-content-searhbar-button">
                <el-button icon="el-icon-search"  type="info">搜索</el-button>
            </el-row>
        </div>
        <div class="download-content-items">
            <el-table
                :data="downloadInfo"
                style="width: 100%"
                align="center">
                <el-table-column 
                    prop="id"
                    width="60"
                    label="#">
                </el-table-column>
                <el-table-column 
                    prop="name"
                    width="250"
                    label="资源名称">
                </el-table-column>
                <el-table-column
                    prop="contributor"
                    label="分享人"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="time"
                    label="分享日期"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="visitNum"
                    width="180"
                    label="下载次数">
                </el-table-column>
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
                >
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                total:0,
                page_size:10,
                // 必须为大于5小于21的奇数
                pager_count:9,
                useBackground:true,
                downloadInfo:[],
                serchedInfo:[],
                allInfo:[],
                //当前页
                current_page:1,
                serchText:''
            }
        },
        created(){
        },
        mounted(){
            this.getAllInfo();
        },
        methods:{
            async getAllInfo(){
                const that = this;
                await this.$ajax.get("http://127.0.0.1/getAllSrcInfos.jc4u")
                .then(function(res){
                    console.log(res.data);
                    that.allInfo = res.data;
                    that.total = res.data.length;
                    that.serchedInfo = res.data;
                    //调用一次数据
                    that.display(1);
                })
                .catch(function(res){
                    console.log(res)
                });
            },
            display(pageId){
                //获取this对象
                const that =  this.$data;
                //确认需要显示的条目数
                let num = (that.total>(pageId*that.page_size))?that.page_size:that.total%that.page_size;
                //将数据装入目标数组
                let temp = that.serchedInfo.slice((pageId-1)*that.page_size,(pageId-1)*that.page_size+num);
                let length = that.downloadInfo.length;
                //清空数组
                that.downloadInfo.splice(0,length);
                that.downloadInfo = that.downloadInfo.concat(temp);
                // console.log(that.downloadInfo);
                // console.log(that.allInfo);
            },
            // prev_click(){
            //     this.$data.current_page--;
            //     this.display(this.$data.current_page);
            // },
            // next_click(){
            //     this.$data.current_page++;
            //     this.display(this.$data.current_page);
            // },
            current_change(log){
                this.$data.current_page = log;
                this.display(this.$data.current_page);
            },
            serchChange(){
                // const that = this.$data;
                // const length = that.allInfo.length;
                // const temp = that.serchedInfo;
                // //清空
                // this.clearItems(that.serchedInfo);
                // //将查找到的数据放入某数组
                // for(var i = 0;i<length;i++){
                //     // if((temp[i].name.toLocaleLowerCase()).indexOf(that.toLocaleLowerCase)!=-1){
                //     //     that.serchedInfo.push(allInfo[i]); 
                //     //     console.log(allInfo[i]);
                //     // }
                //     console.log(temp[i]);
                // }
                // console.log(that.serchedInfo);
                // this.display(that.current_page);
            },
            clearItems(e){
                const length = e.length;
                for(var i = 0;i<length;i++){
                    e.pop();
                }
            }
        }
    }

</script>

<style scoped>
.download-content{
    margin: auto;
    width: 60%;
    height: auto;
}
.download-content-searhbar{
    height: auto;
    width: 70%;
    text-align: left;
    margin: auto;
    margin-top:40px;
    margin-bottom:40px;
}
.download-content-searhbar-input{
    display: inline-block;
    width: 60%;
}
.download-content-searhbar-button{
    display: inline-block;
    width: 20%;

}
.download-content-items{
    height: auto;

}
.download-content-Pagination{
    height: 30px;
    background-color: azure;
}
</style>