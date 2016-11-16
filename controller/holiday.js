/**
 * Created by 1 on 2016/5/16.
 */
// index page
var mongoose=require('mongoose');

var Holiday=mongoose.model('Holiday');

exports.addHoliday=function(req,res){

    var begin_time=req.body.begin_time;
    var end_time=req.body.end_time;
    var reason=req.body.reason;
    var user_name=req.body.user_name

    var newHoliday=new Holiday(
        {
            begin_time:begin_time,
            end_time:end_time,
            reason:reason,
            user_name:user_name,
            feedback:"0"
        }
    );
    newHoliday.save(function(err){
        if(err){
            res.json({"status":"error"})
        }else{
            res.json({"status":"success"});
        }
    });
}

exports.getHolidays=function(req,res){
    /*用户id*/
    var user_name=req.body.user_name;
    /*页数*/
    var page_num=req.body.page_num;
    console.log("currentPage"+page_num);
   /*分页*/
    Holiday.find({user_name:user_name}).sort({'_id':-1}).limit(10).skip((page_num-1)*10).exec(function (err, doc) {
        if(err){
            res.json({"status":"error","msg":"error_system"});
        }else{
            if(doc.isNull){
                res.json({"status":"success","msg":"data_empty"});
            }
            res.json({"status":"success","msg":doc});
        }
    })

    /*Holiday.find({user_name:user_name}, function (err, doc) {
        if(err){
            res.json({"status":"error","msg":"error_system"});
        }else{
            if(doc.isNull){
                res.json({"status":"success","msg":"data_empty"});
            }
            res.json({"status":"success","msg":doc});
        }
    })*/
}











