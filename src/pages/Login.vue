<template>
    <div class="login">
        <div class="login-box">
            <div class="login-box-logo">
                <img src="../assets/kodinger.jpg" alt="">
            </div>
            <div class="login-box-tips">
                <p>JC4U登录系统</p>
            </div>
            <div class="login-box-form">
                <div>
                        <p>用户名：</p>
                        <el-input class="login-box-form-text" suffix-icon="el-icon-user"></el-input>
                        <p>密码：</p>
                        <el-input class="login-box-form-password" show-password></el-input>
                        <p>验证码：</p>
                        <el-input class="login-box-form-code"></el-input>
                        <span class="imageCode">
                            <img :src="imageCodeUrl" alt="">
                        </span>
                </div>
                <div class="login-box-form-switch">
                    <el-switch
                        v-model="value_switch"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-text="记住密码"
                        inactive-text="不记住密码">
                    </el-switch>
                </div>
                <div>
                     <el-button plain class="login-box-form-submit">登录<i class="el-icon-right"></i></el-button>
                     <el-button plain class="login-box-form-forget">忘记密码<i class="el-icon-refresh-left"></i></el-button>
                </div>
                <br>
                <p>Designed By JC4U</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            value_switch:true,
            imageCodeUrl:""
        }
    }
}
</script>
<style scoped>
    .login{
        width: 100%;
        height: auto;
        margin: 100px 0;
    }
    .login-box{
        background-color: #FBFBFB;
        margin: auto;
        width:30%;
        height: auto;
        padding: 20px 0;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
    .login-box-logo{
        margin: auto;
    }
    .login-box-logo img{
        width: 80px;
        border-radius: 50%;
        border: 5px silver solid;
    }
    .login-box-tips{
        margin: 20px 0;
    }
    .login-box-tips p{
        font-weight: bold;
        letter-spacing: 5px;
        font-size: 1.2em;
        color: rgb(134, 167, 180);
    }
    .login-box-form p{
        color: rgb(134, 167, 180);
        font-weight: bolder;
        padding: 10px 0;
        text-align: left;
        margin-left: 10%;
    }
    .login-box-form-text{
        width: 80%;
    }
    .login-box-form-password{
        width: 80%;
    }
    .login-box-form-code{
        position: relative;
        right:25%;
        width: 30%;
    }
    .login-box-form-submit{
        background-color: rgb(134, 167, 180);
        color: white;
        width: 80%;
        margin: 10px 0;
    }
    .login-box-form-forget{
        margin-left: 0;
        margin-top: 10px 0;
        margin-bottom: 10px 0;
        width: 80%;
    }
    .login-box-form-forget:hover{
        background-color: rgb(134, 167, 180);
        color: white;

    }
    .login-box-form-switch{
        margin-top: 10px; 
        margin-left: 10%;
        text-align: left;
    }
    .imageCode{
        position:absolute;
        left:48%;
    }
    .imageCode img{
        width: 50%;
    }
</style>
