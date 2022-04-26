import { request} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import { login} from "../../utils/asyncWx.js";
Page({
  // 获取用户信息
async  handleGetUserInfo(e){
   try {
      //console.log(e);
    // 1 获取用户信息
    const {encryptedData,rawData,iv,signature}=e.detail;
    // 2 获取小程序 登录成功  后的code值
    const {code}=await login();
    const loginParams={encryptedData,rawData,iv,signature,code};
   // console.log(code);
   // 3 发送请求 获取token值
   const token = await request ({url:"/users/wxlogin",data:loginParams,method:"post"});
  // console.log(res);
  // 4 把token 存入缓存中，同时跳转回上一个页面
  wx.setStorageSync("token","Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo");
  wx.navigateBack({
    delta: 1
  }); 
  
   } catch (error) {
     console.log(error);
   }
  }
})
