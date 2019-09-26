//导入一些基础库
import axios from 'axios'
import cookies from "vue-cookies"
import router from '../router'
//加密算法
import crypto from 'crypto'

import qs from "qs"

//对axios进行一些统一的设置
//请求的最大时间
axios.defaults.timeout = 10000

const serviceUrl = "http://localhost:10010"

const jc4u = {
  //后台请求地址
  host: serviceUrl,
  //登录验证码
  imageCodeUrl:serviceUrl+"/jc4u.getImage",
  //验证token的接口
  tokenCheckUrl:serviceUrl+"/jc4u.checkToken",

  //将get请求的函数进行封装
  async get(requestLocation) {
    let temp;
    await axios.get(this.host + requestLocation)
      .then(res => {
        temp = res.data
      })
      .catch(err => console.log(err))
    return temp;
  },
  //将post请求的函数进行封装
  async post(requestLocation, requestBody) {
    let temp;
    await axios.post(this.host + requestLocation, qs.stringify(requestBody))
      .then(res => {
        temp = res.data
      })
      .catch(err => console.log(err))
    return temp;
  },
  //将post请求的函数进行封装
  async postWithConfig(requestLocation, requestBody,config) {
    let temp;
    await axios.post(this.host + requestLocation, requestBody,config)
      .then(res => {
        temp = res.data
      })
      .catch(err => console.log(err))
    return temp;
  },
  //api方法
  //通过ID获取登录次数
  async getNumOfLoginById(id) {
    return await this.get("/jc4u.getNumOfLogin/" + id);
  },
  //通过id获取用户信息
  async getUserInfoById(id) {
    return await this.get("/jc4u.getUserInfoById?id=" + id + "&token=" + cookies.get("access-token"));
  },
  //获取成绩排名前十的数据
  async getTotalTopTen(){
    return await this.get("/jc4u.getTopTenScore?token="+cookies.get("access-token"));
  },
  //通过用户的id来获取ip信息
  async getUserIpInfoById(id) {
    return await this.get("/jc4u.getLastLog/" + id);
  },
  //获取网站发展历史节点信息
  async getHistoryNodeInfo() {
    return await this.get("/jc4u.getAllHistoryNodeInfo");
  },
  //获取所有下载资源信息
  async getAllResouceInfo() {
    return await this.get("/jc4u.getAllSrcInfo");
  },
  //获取所有的通知信息
  async getAllNoticeInfo() {
    return await this.get("/jc4u.getAllNoticeInfo");
  },
  //获取倒计时信息
  async getCountDownInfo() {
    return await this.get("/jc4u.getMostRecentThing");
  },
  //获取所有的轮播信息
  async getLunboInfo() {
    return await this.get("/jc4u.getLunboInfo");
  },
  //获取所有的视频信息
  async getAllVideoInfo() {
    return await this.get("/jc4u.getAllVideoInfo");
  },
  //获取通知信息
  async getAllNoticeInfo() {
    return await this.get("/jc4u.getAllNoticeInfo");
  },
  //获取推荐网站信息
  async getAllWebsiteInfo() {
    return await this.get("/jc4u.getAllWebsiteInfo");
  },
  //获取一个背景图片
  async getBackGroundImage() {
    return await this.get("/jc4u.getOneImage");
  },
  //通过id获取用户的成绩信息
  async getUserScoreInfoById(id){
    return await this.get("/jc4u.getScoreById/"+id)
  },
  //通过id获取班级信息
  async getClassInfoById(id) {
    return await this.get("/jc4u.getClassInfoById?id=" + id + "&token=" + cookies.get("access-token"));
  },
  //通过id获取历史班级信息
  async getAllClassInfoById(id){
    return await this.get("/jc4u.getAllClassInfoById?id=" + id + "&token=" + cookies.get("access-token"));
  },
  //通过id获取未完成任务信息
  async getNotCompletedDataById(id){
    return await this.get("/jc4u.getNotCompletedDataById?id=" + id + "&token=" + cookies.get("access-token"));
  },
  //通过id获取已完成任务信息
  async getCompletedDataById(id){
    return await this.get("/jc4u.getCompletedDataById?id=" + id + "&token=" + cookies.get("access-token"));
  },
  //通过id获取未批阅任务信息
  async getNotApprovedDataById(id){
    return await this.get("/jc4u.getNotApprovedDataById?id=" + id + "&token=" + cookies.get("access-token"));
  },
  //通过id获取未批阅任务信息
  async getTaskInfoByTaskid(id){
    return await this.get("/jc4u.getTaskInfoByTaskid?taskid=" + id );
  },
  //通过id和taskid获取信息
  async getDataByIdAndTaskid(id,taskid){
    return await this.get("/jc4u.getDataByIdAndTaskid?id=" + id +"&taskid="+taskid+"&token=" + cookies.get("access-token"));
  },
  //对taskid进行验证
  async checkTaskid(status,taskid){
    return await this.get("/jc4u.checkTaskidByStatus?status="+status+"&taskid="+taskid+"&token="+cookies.get("access-token"));
  },
  //提交作业任务
  async commitTask(id,taskid,content,codeFileLink){
    let requestBody = {
      id:id,
      taskid:taskid,
      token: cookies.get("access-token"),
      content:content,
      codeFileLink:codeFileLink
    }
    return await this.post("/jc4u.commitTask",requestBody);
  },
  async submitSuggestion(e){
    return await this.post("/jc4u.addSuggestionById",{
      username:e.username,
      content:e.content,
      token:cookies.get("access-token")
    })
  },
  //获取当前验证码的值
  async getImageCode() {
    return await this.get("/jc4u.getImage.code");
  },
  //验证邮件是否已经发送
  async checkIsSendEmail(verifiCode){
    return await this.get("/jc4u.sendEmailForResetPwd?verifi="+verifiCode);
  },
  //查看当前用户的全部日志
  async getAllLogsById(requestBody){
    return await this.post("/jc4u.getAllLogById",requestBody)
  },
  //查看成绩细节
  async getDetailOfScore(requestBody){
    return await this.post("/jc4u.getScoreDetailsById",requestBody)
  },
  //验证用户信息
  async verificateUser(requestBody) {
    return await this.post("/jc4u.login", requestBody);
  },
  //验证用户是否存在
  async checkUserExist(requestBody){
    return await this.post("/jc4u.checkUserExistByName",requestBody);
  },
  //重置密码时发邮件
  async sendEmailForResetPwd(requestBody){
    return await this.post("/jc4u.sendEmailForResetPwd",requestBody);
  },
  //重置密码
  async resetUserPwd(requestBody){
    return await this.post("/jc4u.ResetPwd",requestBody);
  },
  //修改密码
  async changeUserPwd(username,passwords){
    //先对密码处理
    passwords.oldPwd = crypto.createHash("md5").update(passwords.oldPwd).digest("hex");
    passwords.newPwd = crypto.createHash("md5").update(passwords.newPwd).digest("hex");
    return await this.post("/jc4u.updatePwd",{
      //传过去的参数
      username:username,
      password:passwords.oldPwd,
      newPassword:passwords.newPwd,
      token:cookies.get("access-token")
    })
  },
  //更新用户信息
  async updateUserInfo(id,requestBody){
    //暂时只能更改签名
    return await this.post("/jc4u.updateUserSignById",{
      token:cookies.get("access-token"),
      sign:requestBody.sign,
      username:id
    })
  },
  //上传头像
  async uploadHeadImg(file,config){
    return await this.postWithConfig("/jc4u.uploadHeadImg",file,config)
  },
  async uploadJavaFile(file,config){
    return await this.postWithConfig("/jc4u.uploadJavaFile",file,config)
  },
  async login(requestBody) {
    //进行验证请求
    let result = await this.verificateUser(requestBody);
    if (result.token.length > 50) {
      //设置cookies值
      cookies.set("access-token", result.token);
      cookies.set("userid",result.userid);
    }
    return result.token;
  },
  async getNextHoliday(){
    let msg;
    await axios.get('http://timor.tech/api/holiday/tts/next')
      .then(res => {
        msg = res.data;
      })
      .catch(err => console.log(err))
      return msg;
  },
  async getHistoryEvent(month,day){
    return await this.get('/jc4u.getHistoryEvents?month='+month+'&day='+day);
  },
  //检查用户的状态
  checkStaus() {
    //先检查有没有cookies
    if (cookies.isKey("access-token")) {
      //再检查值是不是空
      if (cookies.get("access-token") != "") {
        return true;
      }
    }
    return false;
  },
  //注销登录
  logout() {
    //先将用户的cookie信息删除
    cookies.remove("access-token");
    cookies.remove("userid");
    //再跳转到登录页
    router.push("login");
  }
}

export default jc4u;
