/**
 * Created by 1 on 2016/5/16.
 */
var mongoose=require('mongoose');

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

mongoose.model('Signin',signinschema);

