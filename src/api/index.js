//导入一些基础库
import axios from 'axios'
import cookies from "vue-cookies"
import router from '../router'
//加密算法
import crypto from 'crypto'

import qs from "qs"

//对axios进行一些统一的设置
//请求的最大时间
// axios.defaults.timeout = 10000

// const serverLocation = "http://47.106.222.240:7180" 
const serverLocation = "http://172.16.182.136:7180"
// const serverLocation = "http://localhost:10086"

const jc4u = {
  //后台请求地址
  host: serverLocation,
  tokenCheckUrl: serverLocation + "/verify/checkToken",
  imageCodeUrl:serverLocation+"/imageCode/getImage",
  //将get请求的函数进行封装
  async get(requestLocation) {
    let temp;
    //进行token添加
    let requestUrl = requestLocation.indexOf("?")!=-1?requestLocation + "&token=" + cookies.get("access-token"):requestLocation + "?token=" + cookies.get("access-token");
    await axios.get(this.host + requestUrl )
      .then(res => {
        temp = res.data
      })
      .catch(err => console.log(err))
    return temp;
  },
  //将post请求的函数进行封装
  async post(requestLocation, requestBody) {
    let temp;
    await axios.post(this.host + requestLocation, qs.stringify(requestBody)+ "&token=" + cookies.get("access-token"))
      .then(res => {
        temp = res.data
      })
      .catch(err => console.log(err))
    return temp;
  },
  //将post请求的函数进行封装
  async postWithConfig(requestLocation, requestBody, config) {
    let temp;
    await axios.post(this.host + requestLocation, requestBody, config)
      .then(res => {
        temp = res.data
      })
      .catch(err => console.log(err))
    return temp;
  },
  //api方法
  //通过ID获取登录次数
  async getNumOfLoginById(id) {
    return await this.get("/login/getNumOfLogin" + "?id=" + id);
  },
  //通过id获取用户信息
  async getUserInfoById(id) {
    return await this.post("/user/getInfo",{
      id:id
    });
  },
  //获取成绩排名前十的数据
  async getTotalTopTen() {
    return await this.get("/grade/getTopTen");
  },
  async listGradeInfoByTaskId(taskid){
    return await this.get("/grade/listDetail"+"?TaskId="+taskid)
  },
  //通过用户的id来获取ip信息
  async getUserIpInfoById(id) {
    return await this.get("/login/getLastLog" + "?id=" + id);
  },
  //获取网站发展历史节点信息
  async getHistoryNodeInfo() {
    return await this.get("/history/listNodeInfo");
  },
  //获取所有下载资源信息
  async getAllResouceInfo() {
    return await this.get("/source/listInfo");
  },
  //获取所有的通知信息
  async getAllNoticeInfo() {
    return await this.get("/notice/listInfo");
  },
  //获取所有的通知信息
  async addNoticeClickNum() {
    return await this.post("/notice/click");
  },
  //获取所有的通知信息
  async getNoticeInfoByNoticeId(notice_id) {
    return await this.get("/notice/getInfo"+"?id="+notice_id);
  },
  //获取倒计时信息
  async getCountDownInfo() {
    return await this.get("/countdown/getMostRecent");
  },
  //获取所有的轮播信息
  async getLunboInfo() {
    return await this.get("/carousel/getInfo");
  },
  //获取所有的视频信息
  async getAllVideoInfo() {
    return await this.get("/video/listInfo");
  },
  //获取所有的视频信息
  async getVideoInfo(id) {
    return await this.get("/video/getInfo"+"?id="+id);
  },
  //获取推荐网站信息
  async getAllWebsiteInfo() {
    return await this.get("/website/listInfo");
  },
  //获取一个背景图片
  async getBackGroundImage() {
    return await this.get("/image/getOne");
  },
  //通过id获取用户的成绩信息
  async getUserScoreInfoById(id) {
    return await this.get("/grade/getSimple" + "?id=" + id)
  },
  //通过id获取班级信息
  async getClassInfoById(id) {
    return await this.get("/classInfo/getInfo" + "?id=" + id);
  },
  //通过id获取历史班级信息
  async getAllClassInfoById(id) {
    return await this.get("/classInfo/listInfo" + "?id=" + id);
  },
  //通过id获取未完成任务信息
  async getNotCompletedDataById(id) {
    return await this.get("/grade/getNotCompleted" + "?id=" + id);
  },
  //通过id获取已完成任务信息
  async getCompletedDataById(id) {
    return await this.get("/grade/getCompleted" + "?id=" + id);
  },
  //通过id获取已完成任务信息
  async getDetailSrcDataById(id) {
    return await this.get("/source/getDetail" + "?id=" + id);
  },
  //通过id获取未批阅任务信息
  async getNotApprovedDataById(id) {
    return await this.get("/grade/getNotApproved" + "?id=" + id);
  },
  //通过id和taskid获取信息
  async getTaskInfoByTaskid(taskid) {
    return await this.get("/task/getDetailInfo" + "?taskId=" + taskid);
  },
  async listSimpleTaskInfo(id){
    return await this.get("/task/listSimpleInfo"+"?id="+id);
  },
  async getDataByIdAndTaskid(id, taskid) {
    return await this.get("/grade/getDataByIdAndTaskId" + "?stuNum=" + id + "&taskId=" + taskid);
  },
  //对taskid进行验证
  async checkTaskid(status, taskid) {
    return await this.get("/grade/checkTaskIdByStatus" + "?status=" + status + "&taskId=" + taskid);
  },
  //提交作业任务
  async commitTask(id, taskid, content, codeFileLink) {
    let requestBody = {
      stuNum: id,
      taskId: taskid,
      content: content,
      codeFileLink: codeFileLink.content
      // 这里是一个对象
    }
    return await this.post("/grade/commitTask", requestBody);
  },
  async submitSuggestion(e) {
    return await this.post("/suggestion/add", {
      name: e.username,
      content: e.content
    })
  },
  //获取当前验证码的值
  async getImageCode() {
    return await this.get("/imageCode/getCode");
  },
  //查看当前用户的全部日志
  async getAllLogsById(requestBody) {
    return await this.post("/login/listLog", requestBody)
  },
  //查看成绩细节
  async getDetailOfScore(requestBody) {
    return await this.post("/grade/getDetail", requestBody)
  },
  //增加下载量
  async addVisitNum(requestBody) {
    return await this.post("/source/increseVisitNum", requestBody)
  },
  //验证用户信息
  async verificateUser(requestBody) {
    return await this.post("/verify/login", requestBody);
  },
  //验证用户是否存在
  async checkUserExist(requestBody) {
    return await this.post("/user/checkExist", requestBody);
  },
  //新增email
  async updateEmail(requestBody) {
    return await this.post("/user/updateEmail", requestBody);
  },
  //重置密码时发邮件
  async sendEmailForResetPwd(requestBody) {
    return await this.post("/user/sendEmailForResetPwd", requestBody);
  },
  //重置密码
  async resetUserPwd(requestBody) {
    return await this.post("/user/ResetPwd", requestBody);
  },
  //修改密码
  async changeUserPwd(username, passwords) {
    //先对密码处理
    passwords.oldPwd = crypto.createHash("md5").update(passwords.oldPwd).digest("hex");
    passwords.newPwd = crypto.createHash("md5").update(passwords.newPwd).digest("hex");
    return await this.post("/user/updatePwd", {
      //传过去的参数
      stuNum: username,
      password: passwords.oldPwd,
      newPassword: passwords.newPwd
    })
  },
  //更新用户信息
  async updateUserInfo(id, requestBody) {
    //暂时只能更改签名
    return await this.post("/user/updateSign", {
      sign: requestBody.sign,
      username: id
    })
  },
  //上传头像
  async uploadHeadImg(file, config) {
    return await this.postWithConfig("/file/uploadHeadImg", file, config)
  },
  async uploadJavaFile(file, config) {
    return await this.postWithConfig("/file/uploadCodeFile", file, config)
  },
  async login(requestBody) {
    //进行验证请求
    let result = await this.verificateUser(requestBody);
    if (result.status) {
      //设置cookies值
      cookies.set("access-token", result.content);
      cookies.set("userid", requestBody.stuNum);
    }
    return result;
  },
  async getNextHoliday() {
    let msg;
    await axios.get('http://timor.tech/api/holiday/tts/next')
      .then(res => {
        msg = res.data;
      })
      .catch(err => console.log(err))
    return msg;
  },
  async getHistoryEvent(month, day) {
    return await this.get("/historyEvent/getInfo/"+"?month=" + month + '&day=' + day);
  },
  //检查用户的状态
  checkStaus() {
    //先检查有没有cookies
    if (router.app._route.name!="login") {
      return true
    }
    return false;
  },
  isPhone(){
    return window.navigator.userAgent.indexOf("Mobile")!=-1;
  },
  //注销登录
  logout() {
    //先将用户的cookie信息删除
    cookies.remove("access-token");
    cookies.remove("userid");
    //再跳转到登录页
    router.push("/login");
  }
}

export default jc4u;
