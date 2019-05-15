<template>
    <div class="information">
        <div class="information-title">
            <span class="information-title-title">通知公告</span>
            <hr>
            <span class="information-title-right" >
                从当前数据中检索:
                <el-input v-model="input" placeholder="请输入内容" class="information-title-right-input"></el-input>
            </span>
        </div>
        <div class="information-content">
            <el-table
                :data="tableData"
                style="width: 100%"
                :default-sort = "{prop: 'title', order: 'descending'}"
                >
                <el-table-column
                prop="title"
                label="标题"
                sortable>
                </el-table-column>
                <el-table-column
                prop="click"
                label="点击"
                sortable
                width="180">
                </el-table-column>
                <el-table-column
                prop="author"
                label="发布人"
                :formatter="formatter"
                sortable
                width="180">
                </el-table-column>
                <el-table-column
                prop="time"
                label="发布时间"
                :formatter="formatter"
                sortable
                width="180">
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
            </el-pagination>
        </div>
    </div>
</template>

<script>
</script>

<style scoped>
.information{
    margin: auto;
    margin-top:30px;
    width: 55%;
    height: auto;
}
.information-title{
    text-align: left;
}
.information-title-title{
    font-size: 1.4em;
    font-weight: bold;
    text-indent: 1em;
}
.select-class{
    width: 90px;
}
.information-title-right{
    float: right;
    margin-right: 30px;
}
.information-title-right-input{
    width:200px;
    height: 30px;
}
.information-content{
    margin: 60px 0;
}
</style>