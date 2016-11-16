var User = require('../controller/user');
var Holiday = require('../controller/holiday');
var Signin = require('../controller/signin');


module.exports = function(app) {
  /*处理用户登录请求*/
  app.post('/phone_api/login',User.login);
  /*处理用户登录请求*/
  app.post('/phone_api/register',User.register);

  /*用户提交请假请求*/
  app.post('/phone_api/add_holiday',Holiday.addHoliday);
  /*获取用户提交请假记录*/
  app.post('/phone_api/get_holidays',Holiday.getHolidays);
  /*用户签到*/
  app.post('/phone_api/sign_in',Signin.signin);
  /*用户签到签到记录*/
  app.post('/phone_api/get_signins',Signin.getSignins);


};