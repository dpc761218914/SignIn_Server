# SignIn_Server
签到APP服务端
博客：http://www.jianshu.com/p/feda0083161d

### 一、APP原型
参考另一篇博客：https://my.oschina.net/u/2480757/blog/788578

### 二、项目需求
为签到App提供登录、注册、请假，签到等相关数据接口。

### 三、项目结构
![输入图片说明](https://static.oschina.net/uploads/img/201611/16162256_TqLD.png "在这里输入图片标题")

### 四、数据库设计  
用到了Mongoose将实体类和数据库对象一一对应起来，同时通过Mongoose操作数据库也极为简单。
![输入图片说明](https://static.oschina.net/uploads/img/201611/16162418_AmTY.png "在这里输入图片标题")

###五、编写相关实体类

> 用户  
var  userschema=new mongoose.Schema({  
    username:String,  
    password:String  
});    
签到记录  
var  signinschema=new mongoose.Schema({  
    user_name:String,  
    unique_id:String,/*username+日期*/  
    am_signin:String,  
    am_signout:String,    
    pm_signin:String,  
    pm_signout:String,  
    night_signout:String,  
    night_signin:String,  
    create_date:{type: Date, default: Date.now}  
});    
请假记录  
var  holidayschema=new mongoose.Schema({  
    user_name:String,  
    begin_time:String,  
    end_time:String,    
    reason:String,  
    feedback:String    
});  

### 六、路由控制
APP需要什么样的接口，在此文件里配置，然后再在相应的控制器中写相应的函数逻辑处理代码。
```
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
```  
### 七、主要代码
**7.1、用户登录**
```
/*处理用户登录请求*/
exports.login=function(req,res){
    var username=req.body.username;
    var password=req.body.password;

    User.findOne({username:username}, function (err, docs) {
        if(err){
            res.json({"status":"error","msg":"error_system"});/*系统错误*/
        }else if(docs==null){
            res.json({"status":"error","msg":"error_username"});/*用户名不存在*/
        } else {
            if(docs.password==password){
                res.json({"status":"success","msg":""});
            }
            else{
                res.json({"status":"error","msg":"error_password"});
            }
        }
    })
}
```  
**7.2、用户签到**：主要判断用户点击的按钮，同时需要当前是否存在用户签到记录，通过一个可预见性的Unique_id来实现。及用户名加日期来限制该记录当天的唯一性。
```
exports.signin=function(req,res){
    var unique_id=req.body.unique_id;
    var user_name=req.body.user_name;
    var type=req.body.type;
    var date=req.body.date;
    Signin.findOne({unique_id:unique_id}, function (err, docs) {
        if(err){
            res.json({"status":"error","msg":"error_system"});/*系统错误*/
        }else if(docs==null){
            /*如何没有找到签到记录，那么是当天第一次签到*/
            var newSignin=new Signin();
            newSignin.unique_id=unique_id;
            newSignin.user_name=user_name;
            if(type=="am_signin"){
                newSignin.am_signin=date;
                newSignin.am_signout="0";
                newSignin.pm_signin="0";
                newSignin.pm_signout="0";
                newSignin.night_signin="0";
                newSignin.night_signout="0";
                newSignin.save(function(err){
                    if(err){
                        res.json({"status":"error","msg":"error_system"})
                    }else{
                        res.json({"status":"success","msg":""});
                    }
                });
            }else if(type=="am_signout"){
                newSignin.am_signin="0";
                newSignin.am_signout=date;
                newSignin.pm_signin="0";
                newSignin.pm_signout="0";
                newSignin.night_signin="0";
                newSignin.night_signout="0";
                newSignin.save(function(err){
                    if(err){
                        res.json({"status":"error","msg":"error_system"})
                    }else{
                        res.json({"status":"success","msg":""});
                    }
                });
            }else if(type=="pm_signin"){
                newSignin.am_signin="0";
                newSignin.am_signout="0";
                newSignin.pm_signin=date;
                newSignin.pm_signout="0";
                newSignin.night_signin="0";
                newSignin.night_signout="0";
                newSignin.save(function(err){
                    if(err){
                        res.json({"status":"error","msg":"error_system"})
                    }else{
                        res.json({"status":"success","msg":""});
                    }
                });
            }else if(type=="pm_signout"){
                newSignin.am_signin="0";
                newSignin.am_signout="0";
                newSignin.pm_signin="0";
                newSignin.pm_signout=date;
                newSignin.night_signin="0";
                newSignin.night_signout="0";
                newSignin.save(function(err){
                    if(err){
                        res.json({"status":"error","msg":"error_system"})
                    }else{
                        res.json({"status":"success","msg":""});
                    }
                });
            }else if(type=="night_signin"){
                newSignin.am_signin="0";
                newSignin.am_signout="0";
                newSignin.pm_signin="0";
                newSignin.pm_signout="0";
                newSignin.night_signin=date;
                newSignin.night_signout="0";
                newSignin.save(function(err){
                    if(err){
                        res.json({"status":"error","msg":"error_system"})
                    }else{
                        res.json({"status":"success","msg":""});
                    }
                });
            }else if(type=="night_signout"){
                newSignin.am_signin="0";
                newSignin.am_signout="0";
                newSignin.pm_signin="0";
                newSignin.pm_signout="0";
                newSignin.night_signin="0";
                newSignin.night_signout=date;
                newSignin.save(function(err){
                    if(err){
                        res.json({"status":"error","msg":"error_system"})
                    }else{
                        res.json({"status":"success","msg":""});
                    }
                });
            }
        } else {
            /*如果有记录，只需要修改签到记录即可*/
            if(type=="am_signin"){
                /*修改签到记录*/
                if(docs.am_signin=="0"){
                    docs.am_signin=date;
                    docs.save(function(err){
                        if(err){
                            res.json({"status":"error","msg":"error_system"})
                        }else{
                            res.json({"status":"success","msg":""});
                        }
                    });
                }else{
                    /*如果有记录，则表示已经签到过了*/
                    res.json({"status":"error","msg":"already_signin"});
                }
            }else if(type=="am_signout"){
                if(docs.am_signout=="0"){
                    docs.am_signout=date;
                    docs.save(function(err){
                        if(err){
                            res.json({"status":"error","msg":"error_system"})
                        }else{
                            res.json({"status":"success","msg":""});
                        }
                    });
                }else{
                    /*如果有记录，则表示已经签到过了*/
                    res.json({"status":"error","msg":"already_signin"});
                }
            }else if(type=="pm_signin"){
                if(docs.pm_signin=="0"){
                    docs.pm_signin=date;
                    docs.save(function(err){
                        if(err){
                            res.json({"status":"error","msg":"error_system"})
                        }else{
                            res.json({"status":"success","msg":""});
                        }
                    });
                }else{
                    /*如果有记录，则表示已经签到过了*/
                    res.json({"status":"error","msg":"already_signin"});
                }
            }else if(type=="pm_signout"){
                if(docs.pm_signout=="0"){
                    docs.pm_signout=date;
                    docs.save(function(err){
                        if(err){
                            res.json({"status":"error","msg":"error_system"})
                        }else{
                            res.json({"status":"success","msg":""});
                        }
                    });
                }else{
                    /*如果有记录，则表示已经签到过了*/
                    res.json({"status":"error","msg":"already_signin"});
                }
            }else if(type=="night_signin"){
                if(docs.night_signin=="0"){
                    docs.night_signin=date;
                    docs.save(function(err){
                        if(err){
                            res.json({"status":"error","msg":"error_system"})
                        }else{
                            res.json({"status":"success","msg":""});
                        }
                    });
                }else{
                    /*如果有记录，则表示已经签到过了*/
                    res.json({"status":"error","msg":"already_signin"});
                }
            }else if(type=="night_signout"){
                if(docs.night_signout=="0"){
                    docs.night_signout=date;
                    docs.save(function(err){
                        if(err){
                            res.json({"status":"error","msg":"error_system"})
                        }else{
                            res.json({"status":"success","msg":""});
                        }
                    });
                }else{
                    /*如果有记录，则表示已经签到过了*/
                    res.json({"status":"error","msg":"already_signin"});
                }
            }
        }
    })
}
```
**7.3 关于分页获取签到记录**
sort按照id倒序排列，limit每页显示10条记录，skip跳过多少条记录。
```
/*获得用户签到记录*/
exports.getSignins=function(req,res){
    /*用户id*/
    var user_name=req.body.user_name;
    /*页数*/
    var page_num=req.body.page_num;
    /*分页*/
    Signin.find({user_name:user_name}).sort({'_id':-1}).limit(10).skip((page_num-1)*10).exec(function (err, doc) {
        if(err){
            res.json({"status":"error","msg":"error_system"});
        }else{
            if(doc.isNull){
                res.json({"status":"success","msg":"data_empty"});
            }
            res.json({"status":"success","msg":doc});
        }
    })
}
```

###八、问题与总结
使用Natapp内外网映射工具的时候需要修改端口号，将其从默认3000修改为80。
![输入图片说明](https://static.oschina.net/uploads/img/201611/16164255_oLsX.png "在这里输入图片标题")  
**APP项目源码：** https://github.com/dpc761218914/SignIn  
**Node.js服务端源码：** https://github.com/dpc761218914/SignIn_Server
